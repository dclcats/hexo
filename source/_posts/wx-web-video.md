---
title: 安卓下微信内置浏览器视频出现解析错误
url: wx-web-video
layout: post
newsauthor: true
description: 安卓下微信内置浏览器视频报解析错误
tags:
  - front-end
  - javascript
  - video
categories:
  - front-end
comments: true
reward_settings:
  enable: false
date: 2017-05-10 15:52:06
update:
---


[原文地址][1]

今天给客户做一个微信端的HTML5的动画页面，页面内有一个视频文件，今天上线，这是前提。刚上线不久，客户的服务器便不堪重负，为了解决问题，我们将该页面的媒体文件放在自己的服务器上。问题来了，转移媒体文件之后，发现在安卓机上视频报出解析错误（当时测试机型为华为和三星，由于公司大部分都是iphone党，安卓机型有限）。

<!--more-->

视频播放使用的是video标签形式，通过三方包 videojs。遂bing、google查之，发现网上关于这块内容不多，在[X5][2]论坛上也有人报出这个问题，但没有解决方案。当我们发现一个问题，在客户的服务器上没有遇到解析错误的问题，iphone上没有，chrome上没有。当然首先想到，两个服务器，一个报错一个没报错，便把问题矛头指向服务器配置上。然后问题提交给服务器端，最终发现是由于服务器开启了gzip压缩（关于gzip压缩下次详解），对视频文件进行压缩后传给浏览器。

最终在服务器端关闭gzip压缩，一切回归正常。视频正常播放。

![响应头部信息][3]

### 测试机型一

1. 华为安卓7.0
2. 微信6.5.7

通过测试安卓手机端的请求信息，安卓下微信内置浏览器的请求头部中 `Accept-Encoding` 字段参数信息为 `gzip，deflate` 与手机内自带浏览器相同，说明在请求时浏览器想服务器表明自己支持的压缩方式为此两种，不同的是微信内置浏览器不支持gzip压缩的视频文件， 而安卓自带浏览器只是gzip压缩后的视频

### 测试机型二

1. 三星
2. 微信6.5.7

通过测试安卓手机端的请求信息，安卓下微信内置浏览器的请求头部中 `Accept-Encoding` 字段参数信息为 `gzip，deflate` ， 手机内自带浏览器多一种`sdch`的压缩方式，此两种浏览器对于gzip压缩的视频文件都不能正常解析播放



华为内置浏览器

`
userAgent: Mozilla/5.0 (Linux; Android 7.0; VKY-AL00 Build/HUAWEIVKY-AL00) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30
`
`
Accept-Encoding: gzip, deflate
`

华为下微信内置浏览器

`
userAgent: Mozilla/5.0 (Linux; Android 7.0; VKY-AL00 Build/HUAWEIVKY-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.49 Mobile MQQBrowser/6.2 TBS/043220 Safari/537.36 MicroMessenger/6.5.7.1041 NetType/WIFI Language/zh_CN
`
`
Accept-Encoding: gzip, deflate
`


三星内置浏览器的请求信息

`
userAgent: Mozilla/5.0 (Linux; Android 6.0.1; SAMSUNG SM-G9280 Build/MMB29K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/4.0 Chrome/44.0.2403.133 Mobile Safari/537.36
`
`
Accept-Encoding: gzip, deflate, sdch
`

三星微信内置浏览器的请求信息

`
userAgent: Mozilla/5.0 (Linux; Android 6.0.1; SM-G9280 Build/MMB29K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.49 Mobile MQQBrowser/6.2 TBS/043220 Safari/537.36 MicroMessenger/6.5.7.1041 NetType/WIFI Language/zh_CN
`
`
Accept-Encoding: gzip, deflate
`



暂时还未有更好的解决方案，为了适应各手机，所以对于需要在移动端页面播放的视频文件还是不要在服务器端进行压缩。当然如果你的用户群体都是iphone党，也是可以的嘛，哈哈哈哈哈





  [1]: https://dclcats.github.io/2017/05/10/%E5%AE%89%E5%8D%93%E4%B8%8B%E5%BE%AE%E4%BF%A1%E5%86%85%E7%BD%AE%E6%B5%8F%E8%A7%88%E5%99%A8%E8%A7%86%E9%A2%91%E5%87%BA%E7%8E%B0%E8%A7%A3%E6%9E%90%E9%94%99%E8%AF%AF/
  [2]: http://bbs.mb.qq.com/thread-1456725-1-1.html
  [3]: ./images/1494408001029.jpg "响应头部信息"