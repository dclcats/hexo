---
title: Reactjs学习笔记
comments: true
reward: false
date: 2017-08-29 12:08:41
update:
description:
tags:
 - JavaScript
 - Reactjs
categories:
 - JavaScript
 - Reactjs
---


## 安装

React 非常灵活，可用于各种项目。你可以使用它创建一个新的应用程序，但是，你也可以逐渐将其引入现有的代码库，而无需重写。

### 创建新的App

通过 Create React App 是构建新的 React 单页应用的一个很好的方式，它已经设置好了开发环境，减少了配置中的麻烦。当然也可以在其基础上进行一些额外的、配合项目情况的设置。

```stylus?linenums
npm install -g create-react-app		//全局安装 Create React App

create-react-app my-app				//创建一个名为 my-app 的 react 项目

cd my-app
npm start					//将会在默认浏览器打开，预览初始页面效果
```

### 已有项目引入

可以通过 npm 或 yarn 安装引入 也可以通过 `script` 标签引入

```stylus?linenums

npm install --save react react-dom

<script src="https://unpkg.com/react@15/dist/react.min.js"></script>
<script src="https://unpkg.com/react-dom@15/dist/react-dom.min.js"></script>
```

## 处理事件

ES6类语法，对于事件 需要通过 `bind` 绑定 `this` 