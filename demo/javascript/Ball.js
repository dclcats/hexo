(function(win) {
    function Ball(opts) {
        var opts = opts ? opts : {}; 
        this.radius = opts.radius || Math.random() * 1 + 3;
        this.color = opts.color || 'rgba(29,188,251,.8)';
        this.x = opts.x || Math.random() * (opts.canvas.width - 2 * this.radius) + this.radius;
        this.y = opts.y || Math.random() * (opts.canvas.height - 2 * this.radius) + this.radius;
        this.vx = opts.vx || Math.random() * 2 - 1;
        this.vy = opts.vy || Math.random() * 2 - 1;
        this.rotate = 0;
        this.scale = 1;
    }

    Ball.prototype.draw = function(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.scale, this.scale);
        ctx.rotate(this.rotate);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.restore();
    }

    win.Ball = Ball;
})(window);