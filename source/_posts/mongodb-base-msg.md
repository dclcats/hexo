---
title: mongodb常用命令及基础参数信息
url: mongodb-base-msg
layout: posts
tags:
  - 数据库
  - mongodb
categories:
  - 数据库
comments: true
reward: true
date: 2017-08-11 14:26:59
description:
update:
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


这里对mongodb的启动及基本概念信息进行了简略的描述，如有疑问欢迎交流。接下来就继续进行下一步，对数据库进行操作处理。

## mongodb的基础操作

在数据库服务开启后，然后就是连接数据库，之后在进行各种操作。

### 连接数据库

连接数据库语法：

```stylus
mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
```

这里简单介绍分析下，
`mongodb://`： 固定形式，必须的（记住就好了，就像 `http:// or https://` 一样（虽然我们在浏览器输地址的时候很多时候不加，但那是浏览器帮我们添加上去的））；
`username:password@`： 就是用户名和密码，如果数据库未设置用户名密码则该参数不用写；
`host`： 必须指定的，指定所要连接数据库的位置；
`post`： 端口号， 默认27017；
`/database`： 所要连接的数据库名称，如未指定默认打开 `test` 数据库

几个示例地址：

```stylus?linenums
'mongodb://localhost'  //本地mongodb的test数据库， 端口号为27017
'mongodb://admin:123456@127.0.0.1:27000/app'  //本地mongodb的app数据库， 端口号为27000，用户名admin 密码123456
```

### 创建数据库

显示当前所有数据库

```stylus
show dbs  	//显示当前所有数据库
db		//显示当前操作的数据库
```

创建数据库

```stylus
use DATABASE //如果DATABASE数据库存在则切换到该数据库，如果不存在则创建并切换到该数据库
```
注：如果创建了一个数据库但是未添加数据，使用 `show` 操作不会显示这个数据库，需要插入数据后数据库才能显示出来，

### 删除数据库

首先切换工作环境到需要删除的数据库下然后执行以下命令即可删除该数据库

```stylus
db.dropDatabase()	//删除当前数据库，清除该数据库内所有数据
```

注：执行以上命令后，当前数据库的数据都被清空，执行 `show dbs` 命令当前数据库已不存在，但是当前的数据库操作环境仍然是该数据库，即此时执行插入数据等操作，数据仍能被插入，而且该数据库会在执行 `show dbs` 时会重新输现在数据库列表里（个人理解：执行以上操作，是将数据全部清空。在切换数据库环境之前该数据库仍以某种形式存在，所以当再次插入数据后，有了数据该数据库就又存在，呼应以上创建数据库时的状态）。所以再删除数据库后，在进行下一步操作之前，需切换数据库环境。

删除数据库的一个集合，可以执行以下命令

```stylus
db.collection.drop()	//删除当前数据库的 collection 集合

show tables		//显示当前数据库的所有 collection 查看当前存在的集合
```

### 插入数据

命令：

```stylus
db.collection.insert()		//插入数据命令

db.collection.insert({
	name: 'Chris',
	url: 'https://dclcats.github.io'
});				//插入了一条数据，包含字段 name 和 url
```

### 更新数据

更新数据可以使用 `update()` 和 `save()`方法 以下简单介绍此两种方法

#### update()

```stylus
db.collection.update(
	<query>,		//update的查询条件，类似sql update查询内where后面的。
	<update>,		//update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的
	{
		upsert: <boolean>,	//可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
		multi: <boolean>,	//可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。
		writeConcern: <document>	//可选，抛出异常的级别。
	}
);

db.collection.update({'title':'ABC'},{$set:{'title':'Mongodb'}},{multi:true});	//更新集合collection下所有的title字段为‘ABC’ 的数据，修改其title字段为 ‘Mongodb’
```

#### save()

```stylus
db.collection.save(
   <document>,	//文档数据。
   {
     writeConcern: <document>	//可选，抛出异常的级别。
   }
);

db.collection.update({"_id" : ObjectId("56064f89ade2f21f36b03136"), 'title':'ABC'});	//存在_id字段则更新该数据为文档数据值

db.collection.update('title':'ABC'});	//不存在_id字段则添加该文档数据至集合

```

### 删除文档

```stylus
db.collection.remove(
   <query>,	//（可选）删除的文档的条件。
   {
     justOne: <boolean>,	//（可选）如果设为 true 或 1，则只删除一个文档。
     writeConcern: <document>	//（可选）抛出异常的级别。
   }
);
```

### 查询文档

```stylus
db.collection.find(query, projection) //query 可选，使用查询操作符指定查询条件； projection 可选，使用投影操作符指定返回的键。查询时返回文档中所有键值， 只需省略该参数即可（默认省略）。

db.col.find().pretty()  //pretty() 以格式化的形式显示所有文档
```


| 操作 | 格式 | 范例 | RDBMS中的类似语句 |
| --- | --- | --- | --- |
| 等于 | {key: value} | db.col.find({"by":"hello world"}).pretty() | where by = 'hello world' |
| 小于 | {key:{$lt:value}} | db.col.find({"likes":{$lt:50}}).pretty() | where likes < 50 |
| 小于或等于 | {key:{$lte:value}} | db.col.find({"likes":{$lte:50}}).pretty() | where likes <= 50 |
| 大于 | {key:{$gt:value}} | db.col.find({"likes":{$gt:50}}).pretty() | where likes > 50 |
| 大于或等于 | {key:{$gte:value}} | db.col.find({"likes":{$gte:50}}).pretty() | where likes >= 50 |
| 不等于 | {key:{$ne:value}} | db.col.find({"likes":{$ne:50}}).pretty() | where likes != 50 |

#### and 操作 和 or操作

```stylus
db.collection.find({likes: {$gte: 100}, $or: [{name: 'Chris'}, {name: 'Isaac'}]}) //查找likes大于等于100 而且 name为Chris或者Isaac
```

至此，基础操作增、删、改、查已初步了解，接下来就是应用，在应用中继续深入学习。持续更新中...