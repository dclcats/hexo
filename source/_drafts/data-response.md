---
title: 数据响应系统
url: data-response
comments: true
reward: false
date: 2017-08-21 15:23:50
update:
description:
tags:
- JavaScript
- 数据响应
categories:
 - front-end
 - JavaScript
---

vue 最大的卖点就是双向数据绑定， 一直很想探其究竟。

<!--more-->

### 数据响应化

#### 对象响应化

**Object.defineProperty**


[参考于文档MDN][1]

首相其使用语法，

```stylus
Object.defineProperty(obj, prop, descriptor)
```

+ obj：需要被操作的目标对象。
+ prop：目标对象需要定义或修改的属性的名称。
+ descriptor：将被定义或修改的属性的描述符。
+ 返回值：被传递给函数的对象。


#### 数据响应化

数组操作一般使用 `push` `pop` `shift` 等，但是这些函数都不支持触发 `setter` & `getter`

可通过自制变异函数来替代原生函数，进而实现数据的响应化


  [1]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty