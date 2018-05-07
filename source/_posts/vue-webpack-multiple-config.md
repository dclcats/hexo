---
title: vue&webpack多页面配置
url: vue-webpack-multiple-config
newsauthor: true
tags:
  - javascript
  - vue
  - webpack
categories:
  - frontend
comments: true
reward: true
date: 2018-04-13 13:30:55
description: 
---


## 前言

最近由于项目需求，选择使用vue框架，webpack打包直接使用的vue-cli，因为需要多页面而vue-cli只有单页面，所以就决定修改vue-cli的配置文件来满足开发需求。

<!-- more -->

## html-webpack-plugin

实现需求需要用到这个插件， 具体信息请看[这里][1]

对于多页面入口我们需要在插件数组中多次声明该插件
`To generate more than one HTML file, declare the plugin more than once in your plugins array`

对于正常的开发需求我们需要配置该插件的信息（这里只介绍一些基本的信息，读者可根据自身情况扩展）

> title: 文件标题信息（对于多个文件使用同一个模板文件很有用，在模板文件的title中添加代码 `<%= htmlWebpackPlugin.options.title %>`）
> template: 模板文件（模板html文件）
> filename: 生成的html文件名
> chunks: 允许插入的模块名（此处一般添加公共块，以及每个页面独立的块，请注意添加的顺序）

以上这些配置是我举例需要独立控制的配置信息，有关配置的其他信息这里不再多说。

我们需要单独创建一个配置文件来定义我们上边的自定义信息，这里呢在config文件下添加`multiple.js`文件

## multiple.js

简单粗暴上段代码：

```stylus?linenums
const path = require('path');

module.exports = {
  index: 'page1/index.html',
  pages: [
    {
      page: 'page1',
      entry: path.resolve(__dirname, '../src/page1/main.js'),
      title: '这是页面1',
      filename: path.resolve(__dirname, '../dist/page1/index.html'),
      template: path.resolve(__dirname, '../index.html')
    },
    {
      page: 'page2',
      entry: path.resolve(__dirname, '../src/page2/main.js'),
      title: '这是页面2',
      filename: path.resolve(__dirname, '../dist/page2/index.html'),
      template: path.resolve(__dirname, '../index.html')
    },
	***
}
```

其中`index`表示开发阶段devServer使用的首页，便于控制（也可以不设置直接在devServer里配置）


## 正文

哈哈哈，前边都是基础准备工作，
接下来开始正文，我们知道对于多页面配置首先要webpack的entry为多入口，所以在webpack的 `base` 配置中配置多入口，因为这个入口文件需要我们在`multiple.js`中控制，所以首先引入`multiple.js`，然后生成entry对象

```stylus?linenums
/* webpack.base.conf.js */

const multiple = require('../config/multiple')  // 引入文件

const entry = {};

multiple.pages.forEach((value, index) => {
  entry[value.page] = value.entry;
})

// 在webpack配置中配置
const webpackConfig = {
  ***
  entry: entry,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  ***
}

multiple.pages.forEach((value, index) => {
  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      title: value.title || '这里是标题',
      filename: value.filename,
      template: value.template,
      inject: true,
      hash: true,
      chunks: ['manifest', 'vendor', 'app', value.page],
      minify: false,
      chunksSortMode: 'dependency'
    })
  )
})

***
```

注：在vue-cli配置中的`webpack.prop.conf.js`有配置HtmlWebpackPlugin，注意将其注释掉

在 `webpack.dev.conf.js` 中的devServer配置中可以自定义打开首页，这个可以根据需求配置此处不再赘余。

至此所有的配置已完成，可以修改 `multiple.js` 文件定制自己的多页面开发了

总结一下，我们需要修改的文件

`webpack.base.conf.js` 修改入口文件，根据我们的配置文件
`webpack.prop.conf.js` 注释掉默认的HtmlWebpackPlugin配置
`webpack.dev.conf.js` 根据需求定制入口页面
`multiple.js` 定制我们自己的多页面信息

另：对于我们的 `vendor` 文件我们也需要做出相应的修改（主要是应对不同页面引用不同的公共文件，而造成页面加载不必要的文件）（需要的插件 `webpack.optimize.CommonsChunkPlugin` ），具体的配置修改，将在下次说明。手动[调皮]

[原文地址][2]

欢迎交流学习


  [1]: https://github.com/jantimon/html-webpack-plugin
  [2]: http://blog.chriz.site/2018/04/13/vue-webpack-multiple-config/