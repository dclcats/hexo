---
layout: posts
title: nginx解析带中文的url问题
date: 2018-03-08 11:27:39
tags:
comments: true
reward: true
update:
description: nginx解析带中文的url问题
categories: nginx,解析,中文,url
---


### 前言

自己搭了服务器之后进行博客转移，发现文章详情页面一片的404，甚是困惑。因为自己的服务器是nginx配置的，遂从此入手，发现nginx默认是不支持中文url的，而nginx支持多种编码方式，遂从此入手有以下解决方案。

<!--more-->

### 解决方案

#### 思考尝试

nginx支持多种编码方式，默认不支持中文，那么我需要让它使用支持中文的编码方式，因为是url，所以应该是中英文通吃的编码方式，我想大家都想到了utf-8这个万能的编码方式，查找相关资料在nginx配置文件`nginx.conf`中添加了以下代码支持让nginx支持utf-8编码

```stylus
charset		utf-8;
```
保存文件，然后重新加载nginx，在浏览器输入地址，回车。呃，好像哪里不对仍然是404。

#### 查找资料

google关键字，果然有前辈遇到一样的问题，看了两个答案，因为是新手所以总是想改最少的东西达到想要的解决方案。

看了两个答案

[nginx解析带中文的url重定向之后404问题][1]
[Nginx下无法使用中文URL的解决方法][2]

虽然上面提到的方式我都没用但是一句话提醒我，“同时需要将FTP与shell工具的字符集设置为UTF-8。”

我的尝试未设置FTP字符集为utf-8。没错这次成功了，最小的改动达到所要的结果

#### 解决方案

需要修改两个地方的设置，

 1. 因为我是FTP上传文件至服务器，所以我这边设置FTP上传的字符集为UTF-8（FileZilla下的 强制UTF-8选项）
 2. 在`nginx.conf`文件里添加 `charset  utf-8`设置，保存重新加载nginx即可


思考，因为我是通过ftp上传的方式传输文件，可以在传输时设置编码的字符集，如果是在服务器上创建的中文目录的话，这个字符集如何设置，或者说默认即是utf-8(这里可能需要用到此[Nginx下无法使用中文URL的解决方法][2]文章的第二种方法)，此处留疑，待测试后补充



  [1]: https://www.cnblogs.com/blog-cq/p/nginx-urlencode.html
  [2]: http://blog.csdn.net/j_h_s/article/details/78222742