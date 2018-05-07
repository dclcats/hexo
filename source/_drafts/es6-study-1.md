---
title: ES6 学习笔记 （一）
url: es6-study-1
comments: true
reward: false
date: 2017-08-04 10:09:34
description:
tags:
 - front-end
 - javascript
 - ES6
categories:
 - front-end
 - JavaScript
---

## 前言

工欲善其事必先利其器， ES6发布已经两个年头了，浏览器对其的支持度越来越高，但仍存在浏览器不支持的特性，而且相对老式的浏览器对其的支持也存在问题（考虑兼容性）。所以，我们在使用ES6的这些新特性的过程中，就需要一些途径将其转化为正常浏览器可以支持运行的js文件。这时候就需要一个转码器。

<!--more-->

## 转码器

js转码器，简单来说就是将ES6的代码，转化成ES5来实现，

```stylus?linenums
//ES6 转码前
[1,2,3].map(v => v * 3);

//ES5 转码后
[1,2,3].map(function(v) {
  return v * 3;
}
```

常用的转码其是babel， 某些网站也提供在线转码， 可自行google

可以通过安装 babel-cli 工具，进行命令行转码（本文不具体介绍安装与使用，可自行google， 或到babel官网查看使用方法）

也可以依附于项目中，在对应的打包工具中进行配置，gulp中有gulp-babel， webpack 中有 babel-loader
然后通过 文件 `.babelrc` 进行相应的配置

使用 babel-core 可以调用babel的API进行转码

Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。

举例来说，ES6 在Array对象上新增了Array.from方法。Babel 就不会转码这个方法。如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个垫片。

详细清单可以查看babel-plugin-transform-runtime模块的definitions.js文件。

