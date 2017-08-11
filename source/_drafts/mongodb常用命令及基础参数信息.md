---
title: mongodb常用命令及基础参数信息
comments: true
reward: false
date: 2017-08-11 14:26:59
update:
description:
tags:
 - 数据库
 - mongodb
categories:
 - 数据库
 - mongodb
---

## 概述

记录windows下mongodb的安装和简单使用

mongodb下载地址： https://www.mongodb.com/download-center#community

<!--more-->

根据自己的系统下载对应版本，然后正常安装

安装好之后，就开始启动，由于数据mongodb的安装程序不会自动创建数据存储路径，所以需要我们自行创建，定位到自己希望存储数据的位置创建路径 `data\db`，例如我希望数据存在D盘根目录我创建的路径为 `d:\data\db`，

然后是正式启动，打开安装地址的`bin`目录，  在此文件夹下打开命令窗口，可使用快捷键 `shift + （鼠标右键）` 选择在此处打开命令窗口，然后运行代码  `mongod --dbpath d:\data\db` ,

注： 执行 `mongod` 命令默认数据库路径为 `c:\data\db`，如果设置数据库存储路径为此路径则可以不加 `--dbpath`参数。

另注：如果 `--dbpath` 参数路径中存在空格 则使用双引号将路径包括，如以下示例命令

再注： 可以将mongodb安装路径的bin路径添加到环境变量，这样可以便于使用 `mongod` 命令（不用每次定位到bin目录，在任何目录下都可以使用 `mongod`命令）

运行成功返回以下信息

```stylus?linenums
C:\Users\Administrator\Desktop
$ mongod --dbpath "D:\data\db"
2017-08-11T14:54:35.032+0800 I CONTROL  [initandlisten] MongoDB starting : pid=8968 port=27017 dbpath=D:\data\db 64-bit host=PC-20160621HJOE
2017-08-11T14:54:35.033+0800 I CONTROL  [initandlisten] targetMinOS: Windows 7/Windows Server 2008 R2
2017-08-11T14:54:35.033+0800 I CONTROL  [initandlisten] db version v3.4.6
2017-08-11T14:54:35.033+0800 I CONTROL  [initandlisten] git version: c55eb86ef46ee7aede3b1e2a5d184a7df4bfb5b5
2017-08-11T14:54:35.033+0800 I CONTROL  [initandlisten] OpenSSL version: OpenSSL 1.0.1u-fips  22 Sep 2016

2017-08-11T14:54:35.034+0800 I CONTROL  [initandlisten] allocator: tcmalloc
2017-08-11T14:54:35.034+0800 I CONTROL  [initandlisten] modules: none
2017-08-11T14:54:35.034+0800 I CONTROL  [initandlisten] build environment:
2017-08-11T14:54:35.034+0800 I CONTROL  [initandlisten]     distmod: 2008plus-ssl
2017-08-11T14:54:35.034+0800 I CONTROL  [initandlisten]     distarch: x86_64
2017-08-11T14:54:35.034+0800 I CONTROL  [initandlisten]     target_arch: x86_64
2017-08-11T14:54:35.034+0800 I CONTROL  [initandlisten] options: { storage: { dbPath: "D:\data\db" } }
2017-08-11T14:54:35.035+0800 I -        [initandlisten] Detected data files in D:\data\db created by the 'wiredTiger' storage engine, so setting the active storage engine to 'wiredTiger'.
2017-08-11T14:54:35.035+0800 I STORAGE  [initandlisten] wiredtiger_open config: create,cache_size=3546M,session_max=20000,eviction=(threads_min=4,threads_max=4),config_base=false,statistics=(fast),log=(enabled=true,archive=true,path=journal,compressor=snappy),file_manager=(close_idle_time=100000),checkpoint=(wait=60,log_size=2GB),statistics_log=(wait=0),
2017-08-11T14:54:35.773+0800 I CONTROL  [initandlisten]
2017-08-11T14:54:35.773+0800 I CONTROL  [initandlisten] ** WARNING: Access control is not enabled for the database.
2017-08-11T14:54:35.774+0800 I CONTROL  [initandlisten] **          Read and write access to data and configuration is unrestricted.
2017-08-11T14:54:35.775+0800 I CONTROL  [initandlisten]
2017-08-11T14:54:35.775+0800 I CONTROL  [initandlisten] Hotfix KB2731284 or later update is not installed, will zero-out data files.
2017-08-11T14:54:35.776+0800 I CONTROL  [initandlisten]
2017-08-11T14:54:36.897+0800 I FTDC     [initandlisten] Initializing full-time diagnostic data capture with directory 'D:/data/db/diagnostic.data'
2017-08-11T14:54:36.901+0800 I NETWORK  [thread1] waiting for connections on port 27017
```

## 概念说明

### 启动参数及其说明

mongodb 在windows下启动服务可以添加以下参数

```syules
mongod.exe --bind_ip yourIPadress --logpath "C:\data\dbConf\mongodb.log" --logappend --dbpath "C:\data\db" --port yourPortNumber --serviceName "YourServiceName" --serviceDisplayName "YourServiceName" --install
```

 | 参数 |	描述 |
 | --- | --- |
| --bind_ip | 绑定服务IP，若绑定127.0.0.1，则只能本机访问，不指定默认本地所有IP |
| --logpath | 定MongoDB日志文件，注意是指定文件不是目录 |
| --logappend | 使用追加的方式写日志 |
| --dbpath | 指定数据库路径 |
| --port | 指定服务端口号，默认端口27017 |
| --serviceName | 指定服务名称 |
| --serviceDisplayName | 指定服务名称，有多个mongodb服务时执行。 |
| --install | 指定作为一个Windows服务安装。 |


### mongodb基础概念与sql术语概念对比


| SQL术语/概念 | MongoDB术语/概念 | 解释/说明 |
| --- | --- | --- |
| database | database | 数据库 |
| table | collection | 数据库表/集合 |
| row | document | 数据记录行/文档 |
| column | field | 数据字段/域 |
| index | index | 索引 |
| table joins |  | 表连接,MongoDB不支持 |
| primary key | primary key | 主键,MongoDB自动将\_id字段设置为主键 |

### 数据类型


| 数据类型 | 描述 |
| --- | --- |
| String | 字符串。存储数据常用的数据类型。在 MongoDB 中，UTF-8 编码的字符串才是合法的。 |
| Integer | 整型数值。用于存储数值。根据你所采用的服务器，可分为 32 位或 64 位。 |
| Boolean | 布尔值。用于存储布尔值（真/假）。 |
| Double | 双精度浮点值。用于存储浮点值。 |
| Min/Max keys | 将一个值与 BSON（二进制的 JSON）元素的最低值和最高值相对比。 |
| Arrays | 用于将数组或列表或多个值存储为一个键。 |
| Timestamp | 时间戳。记录文档修改或添加的具体时间。 |
| Object | 用于内嵌文档。 |
| Null | 用于创建空值。 |
| Symbol | 符号。该数据类型基本上等同于字符串类型，但不同的是，它一般用于采用特殊符号类型的语言。 |
| Date | 日期时间。用 UNIX 时间格式来存储当前日期或时间。你可以指定自己的日期时间：创建 Date 对象，传入年月日信息。 |
| Object ID | 对象 ID。用于创建文档的 ID。 |
| Binary Data | 二进制数据。用于存储二进制数据。 |
| Code | 代码类型。用于在文档中存储 JavaScript 代码。 |
| Regular expression | 正则表达式类型。用于存储正则表达式。 |