
/* 参数情况
dragEle：需要拖动的元素（可以为元素本身，也可以为元素的具有唯一性的选择器 "#drag" or ".drag"）
tarEle：目标位置元素
posArr：定位数组（需要将元素拖至的固定区域,顺序为top,left,width,height）注：tarEle与posArr设置一个即可，两个同时设置则以tarEle为主
onDrag：回调函数 */

(function(win, doc){

	var ua = navigator.userAgent;
	
	function setTarPos(t, l, w, h) {
		this.tarT = t || 0;
		this.tarL = l || 0;
		this.tarW = w || 0;
		this.tarH = h || 0;
	}
	function setCssMove(x, y, s, zi) {
		var x = x || 0,
			y = y || 0,
			s = s || 1,
			zi = zi || 999;
		this.dragEle.style.cssText += '-webkit-transform: translate('+x+'px,'+y+'px) scale('+ s +');z-index: ' + zi +'';
	}

	function Drag(opts) {
		this.opts = opts || {};

		this.deviation = opts.deviation || 10,
		this.init();
		this.setEvent();
	}

	Drag.prototype = {
		$: function(e, d) {
			return (d || doc).querySelector(e);
		}
	}

	Drag.prototype.init = function () {
		//需拖动的元素
		this.dragEle = typeof this.opts.dragEle === "string" ? this.$(this.opts.dragEle) : this.opts.dragEle;
		if(!!this.opts.tarEle) {
			//目标位置的元素
			this.tarEle = typeof this.opts.tarEle === 'string' ? this.$(this.opts.tarEle) : this.opts.tarEle;
			setTarPos.call(this, 
				this.tarEle.offsetTop, 
				this.tarEle.offsetLeft, 
				this.tarEle.offsetWidth ||  this.tarEle.clientWidth, 
				this.tarEle.offsetHeight || this.tarEle.clientHeight)
		} else {
			setTarPos.apply(this, this.opts.posArr);
		}

		this.moveX = this.moveY = 0;
		this.top = this.nowY = this.dragEle.offsetTop;
		this.left = this.nowX = this.dragEle.offsetLeft;
		this.width = this.dragEle.offsetWidth || this.dragEle.clientWidth;
		this.height = this.dragEle.offsetHeight || this.dragEle.clientHeight;

	}


	

	Drag.prototype.setEvent = function() {

		var that = this;

		var start = function(e) {
			e.preventDefault();
			e.stopPropagation();
			that.startX = e.pageX || e.touches[0].pageX;
			that.startY = e.pageY || e.touches[0].pageY;

			that.moveX = that.moveY = 0;
			that.checkPos();
		}

		var move = function(e) {
			e.preventDefault();
	    	e.stopPropagation();
			that.nowY = e.pageY || e.touches[0].pageY;
	    	that.nowX = e.pageX || e.touches[0].pageX;

			that.moveY = that.nowY - that.startY;
			that.moveX = that.nowX - that.startX;

	    	that.lenY = that.top + that.moveY;
	    	that.lenX = that.left + that.moveX;

			that.checkPos('move');

			that.moveY = that.lenY - that.top;
			that.moveX = that.lenX - that.left;

			setCssMove.call(that, that.moveX, that.moveY);
		}

		var end = function(e) {
			that.checkPos('end');
		}

		this.reEvent = function() {
			if(/Android|iphone/i.test(ua)) {
				that.dragEle.removeEventListener("touchstart", start);
				that.dragEle.removeEventListener("touchmove", move);
				that.dragEle.removeEventListener("touchend", end);
			} else {
				that.dragEle.removeEventListener("mousedown", start);
				that.dragEle.removeEventListener("mousemove", move);
				that.dragEle.removeEventListener("mouseup", end);
			}
		}

		if(/Android|iphone/i.test(ua)) {
			that.dragEle.addEventListener("touchstart", start);
			that.dragEle.addEventListener("touchmove", move);
			that.dragEle.addEventListener("touchend", end);
		} else {
			that.dragEle.addEventListener("mousedown", start);
			that.dragEle.addEventListener("mousemove", move);
			that.dragEle.addEventListener("mouseup", end);
		}
	}
	Drag.prototype.reset = function() {
		this.moveX = this.moveY = 0;
		this.startX = this.startY = 0;
		this.nowY = this.top;
		this.nowX = this.left;
		setCssMove.call(this, 0, 0, this.opts.scale || 1, 3);
	}
	Drag.prototype.checkPos = function(type) {
		var x = this.lenX,
			y = this.lenY,
			that = this;

		if(type === 'move') {
			if(x < 0) {
				this.lenX = 0;
			} else if(x + this.width > (doc.body.clientWidth || window.screen.width)) {
				this.lenX = doc.body.clientWidth - this.width;
			}
			if(y < 0) {
				this.lenY = 0;
			} else if(y + this.height > (doc.body.clientHeight || window.screen.height)) {
				this.lenY = doc.body.clientHeight - this.height;
			}
		} else if(type === "end") {
			if(!this.opts.big && x > this.tarL - this.deviation && x < this.tarL + this.deviation &&  y > this.tarT - this.deviation && y < this.tarT + this.deviation) {
				setCssMove.call(this, this.tarL - this.left, this.tarT - this.top, 1, 3);
				this.reEvent();
				this.opts.onDrag();
			} else if(this.opts.big && x > this.tarL - this.deviation && x + this.width < this.tarL + this.tarW + this.deviation &&  y > this.tarT - this.deviation && y + this.height < this.tarT + this.tarH + this.deviation) {
				setCssMove.call(this, this.tarL - this.left, this.tarT - this.top, 1, 3);
				this.reEvent();
				this.opts.onDrag(this.dragEle);
			} else {
				this.reset();
			}
		} else {
			setCssMove.call(this);
		}
	}
	win.Drag = Drag;
})(window, document);