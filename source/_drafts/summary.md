---
title: 近期问题回顾与分析
url: summary
comments: true
reward_settings:
  enable: false
date: 2017-09-30 13:24:09
update:
description:
tags:
categories:
---



### js选择器选择伪类

document.styleSheets[0].addRule('.sdate::after', "display: block");

### 复制文件之剪切板

clipboard.js

兼容性处理

使用方法

element.setSelectionRange(start, end)  //选中 start 至 end 间的所有字符

### 整理类 IOS 日期选择（多段条件选择框）


### 总结日期区间处理

计算n天前/后的日期 （setTime()）

计算任意年的任意月份一共有几天（setFullYear(year, month) 得到当月的一月一日setFullYear(year, month+1)为下一月的一日，再减一天即为当前月份的最后一天）；