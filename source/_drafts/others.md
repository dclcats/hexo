---
title: 杂项
url: others
date: 2016-09-25 10:23:13
update: 2017-04-25 16:38:01
description: 关于JavaScript的一些基础概念的理解
tags:
 - javascript
 - this
 - call
 - apply
 - bind
categories:
 - front-end
 - JavaScript
comments: true
reward: false
---

### 关于 this

#### call & apply

> func.call(obj)
> 在obj的环境中调用 func() 
> 函数 apply 类似

****区别：****
+ func.call(obj, para1, para2, para3, ...)
+ func.apply(obj, [para1, para2, para3, ...])

<!--more-->

#### bind

> bind() 绑定至指定对象
> func.bind(obj)  将 func 绑定到 obj 环境下

#### this 指向

函数调用方式：

+ 直接调用（在全局环境下直接调用函数， 则 this 指向全局对象 window（浏览器环境）或 global （node环境））
+ 方法调用指向被调用方法的最近层对象， 在哪调用就是那
+ new 调用 ，对构造函数使用 new 生成新对象，则其中的 this 指向新生成对象

调用事件处理函数时，this会指向触发事件的DOM元素上
