---
title: this 指向详细解析（箭头函数）
url: javascript-this
layout: post
newsauthor: true
comments: true
reward_settings:
  enable: true
date: 2017-06-19 15:14:01
update:
description: this指向问题分析、总结，包括箭头函数内部的this指向
tags:  
  - front-end
  - javascript
  - 箭头函数
categories:
  - front-end
---

## 前言

this 指向问题是入坑前端必须了解知识点，现在迎来了ES6时代，因为箭头函数的出现，所以感觉有必要对 this 问题梳理一下，遂有此文

在非箭头函数下， this 指向调用其所在函数的对象，而且是离谁近就是指向谁（此对于常规对象，原型链， getter & setter等都适用）；构造函数下，this与被创建的新对象绑定；DOM事件，this指向触发事件的元素；内联事件分两种情况，bind绑定， call & apply 方法等， 容以下一步一步讨论。箭头函数也会穿插其中进行讨论。

<!--more-->

## 全局环境下

在全局环境下，this 始终指向全局对象（window）, 无论是否严格模式；

``` stylus?linenums
console.log(this.document === document); // true

// 在浏览器中，全局对象为 window 对象：
console.log(this === window); // true

this.a = 37;
console.log(window.a); // 37
```
## 函数上下文调用

### 函数直接调用

普通函数内部的this分两种情况，严格模式和非严格模式。

严格模式下，this 的值默认为全局对象window

```stylus?linenums
function f1(){
  return this;
}

f1() === window; // true
```
非严格模式， this的值为undefined

```stylus?linenums
function f2(){
  "use strict"; // 这里是严格模式
  return this;
}

f2() === undefined; // true
```

### 对象中的this

对象内部方法的this指向调用这些方法的对象， 

1. 函数的定义位置不影响其this指向，this指向只和调用函数的对象有关。
2. 多层嵌套的对象，内部方法的this指向离被调用函数最近的对象（window也是对象，其内部对象调用方法的this指向内部对象， 而非window）。

```stylus?linenums
//1
var o = {
  prop: 37,
  f: function() {
    return this.prop;
  }
};
console.log(o.f());  //37
var a = o.f;
console.log(a()):  //undefined

var o = {prop: 37};

function independent() {
  return this.prop;
}

o.f = independent;

console.log(o.f()); // logs 37

//2
o.b = {
  g: independent,
  prop: 42
};
console.log(o.b.g()); // logs 42
```
#### 原型链中this

原型链中的方法的this仍然指向调用它的对象，与以上讨论一致；看个例子，
```stylus?linenums
var o = {
  f : function(){ 
    return this.a + this.b; 
  }
};
var p = Object.create(o);
p.a = 1;
p.b = 4;

console.log(p.f()); // 5
```
可以看出， 在p中没有属性f，当执行p.f()时，会查找p的原型链，找到 f 函数并执行，但这与函数内部this指向对象 p 没有任何关系，只需记住谁调用指向谁。

以上对于函数作为getter & setter 调用时同样适用。

### 构造函数中this

构造函数中的this与被创建的新对象绑定。

注意：当构造器返回的默认值是一个this引用的对象时，可以手动设置返回其他的对象，如果返回值不是一个对象，返回this。

```stylus?linenums
function C(){
  this.a = 37;
}

var o = new C();
console.log(o.a); // logs 37


function C2(){
  this.a = 37;
  return {a:38};
}

var b = new C2();
console.log(b.a); // logs 38
```
以上两个例子内部的this都指向对象o, 看到这里的你不妨在控制台执行下以上代码，看看对象 o 和 b ，这些是属于构造函数的内容了，此处不多做介绍。（C2函数中的this.a = 37 对整个过程完全没有影响的， 可以被忽略的）。

### call & apply

当函数通过Function对象的原型中继承的方法 call() 和 apply() 方法调用时， 其函数内部的this值可绑定到 call() & apply() 方法指定的第一个对象上， 如果第一个参数不是对象，JavaScript内部会尝试将其转换成对象然后指向它。

例子：

```stylus?linenums
function add(c, d){
  return this.a + this.b + c + d;
}

var o = {a:1, b:3};

add.call(o, 5, 7); // 1 + 3 + 5 + 7 = 16

add.apply(o, [10, 20]); // 1 + 3 + 10 + 20 = 34

function tt() {
  console.log(this);
}
// 返回对象见下图（图1）
tt.call(5);  // Number {[[PrimitiveValue]]: 5} 
tt.call('asd'); // String {0: "a", 1: "s", 2: "d", length: 3, [[PrimitiveValue]]: "asd"}
```
![图1][1]

### bind 方法

bind方法在ES5引入， 在Function的原型链上， `Function.prototype.bind`。通过bind方法绑定后， 函数将被永远绑定在其第一个参数对象上， 而无论其在什么情况下被调用。

```stylus?linenums
function f(){
  return this.a;
}

var g = f.bind({a:"azerty"});
console.log(g()); // azerty

var o = {a:37, f:f, g:g};
console.log(o.f(), o.g()); // 37, azerty
```

### DOM 事件处理函数中的 this & 内联事件中的 this

**DOM事件处理函数**

1. 当函数被当做监听事件处理函数时， 其 this 指向触发该事件的元素 （针对于addEventListener事件）

```stylus?linenums
  // 被调用时，将关联的元素变成蓝色
	function bluify(e){
	  //在控制台打印出所点击元素
	  console.log(this);
	  //阻止时间冒泡
	  e.stopPropagation();
	  //阻止元素的默认事件
	  e.preventDefault();      
	  this.style.backgroundColor = '#A5D9F3';
	}

	// 获取文档中的所有元素的列表
	var elements = document.getElementsByTagName('*');

	// 将bluify作为元素的点击监听函数，当元素被点击时，就会变成蓝色
	for(var i=0 ; i<elements.length ; i++){
	  elements[i].addEventListener('click', bluify, false);
	}

```
以上代码建议在网页中执行以下，看下效果。

**内联事件**
内联事件中的this指向分两种情况：

1. 当代码被内联处理函数调用时，它的this指向监听器所在的DOM元素
2. 当代码被包括在函数内部执行时，其this指向等同于 ****函数直接调用****的情况，即在非严格模式指向全局对象window， 在严格模式指向undefined

![代码块][2]

页面的代码块

![浏览器显示的按钮][3]

在浏览器内显示三个按钮

![依次点击后在控制台的输出值][4]

依次点击上边的三个按钮后在控制台的输出结果，

建议自己操作一遍以便于更好的理解。

### setTimeout & setInterval 

对于延时函数内部的回调函数的this指向全局对象window（当然我们可以通过bind方法改变其内部函数的this指向）
看下边代码及截图

```stylus?linenums
//默认情况下代码
function Person() {  
    this.age = 0;  
    setTimeout(function() {
        console.log(this);
    }, 3000);
}

var p = new Person();//3秒后返回 window 对象
==============================================
//通过bind绑定
function Person() {  
    this.age = 0;  
    setTimeout((function() {
        console.log(this);
    }).bind(this), 3000);
}

var p = new Person();//3秒后返回构造函数新生成的对象 Person{...}
```

![默认情况下this指向情况][5]

![通过bind绑定后内部this指向][6]



## 箭头函数中的 this

由于箭头函数不绑定this， 它会捕获其所在（即定义的位置）上下文的this值， 作为自己的this值，

1. 所以 call() / apply() / bind() 方法对于箭头函数来说只是传入参数，对它的 this 毫无影响。
2. 考虑到 this 是词法层面上的，严格模式中与 this 相关的规则都将被忽略。（可以忽略是否在严格模式下的影响）

因为箭头函数可以捕获其所在上下文的this值 所以

```stylus?linenums
function Person() {  
    this.age = 0;  
    setInterval(() => {
        // 回调里面的 `this` 变量就指向了期望的那个对象了
        this.age++;
    }, 3000);
}

var p = new Person();
```
以上代码可以得到我们所以希望的值，下图可以看到，在setTimeout中的this指向了构造函数新生成的对象，而普通函数指向了全局window对象

![箭头函数在setTimeout中][7]

```stylus?linenums
var adder = {
  base : 1,
    
  add : function(a) {
    var f = v => v + this.base;
    return f(a);
  },

  addThruCall: function inFun(a) {
    var f = v => v + this.base;
    var b = {
      base : 2
    };
            
    return f.call(b, a);
  }
};

console.log(adder.add(1));         // 输出 2
console.log(adder.addThruCall(1)); // 仍然输出 2（而不是3，其内部的this并没有因为call() 而改变，其this值仍然为函数inFun的this值，指向对象adder
```
bind() & apply() 读者可以自行测试

对于是否严格模式示例代码（可以复制进控制台进行验证）

```stylus?linenums
var f = () => {'use strict'; return this};
var p = () => { return this};
console.log(1,f() === window);
console.log(2,f() === p());
//1 true
//2 true
```
![测试][8]

以上的箭头函数都是在方法内部，总之都是以非方法的方式使用，如果将箭头函数当做一个方法使用会怎样呢？
上例子

```stylus?linenums
var obj = {
  i: 10,
  b: () => console.log(this.i, this),
  c: function() {
    console.log( this.i, this)
  }
}
obj.b();  // undefined window{...}
obj.c();  // 10 Object {...}
```
![返回值][9]
可以看到，作为方法的箭头函数this指向全局window对象，而普通函数则指向调用它的对象

以上为个人学习整理内容， 文中例子参考MDN， 欢迎交流学习

## 参考文献

[this - JavaScript | MDN][10]
[箭头函数 - JavaScript | MDN][11]


  [1]: ./images/1497928029232.jpg
  [2]: ./images/1497930173633.jpg
  [3]: ./images/1497930076697.jpg
  [4]: ./images/1497930106366.jpg
  [5]: ./images/1497939888703.jpg
  [6]: ./images/1497939918422.jpg
  [7]: ./images/1497939580720.jpg
  [8]: ./images/1497932186846.jpg
  [9]: ./images/1497939013062.jpg
  [10]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this#%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0%E4%B8%AD%E7%9A%84_this
  [11]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arrow_functions#%E5%83%8F%E6%96%B9%E6%B3%95%E4%B8%80%E6%A0%B7%E4%BD%BF%E7%94%A8%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0