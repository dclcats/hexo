---
title: threejs 学习总结
url: threejs-study
comments: true
reward: false
date: 2017-06-22 10:43:03
update:
description:
tags:
 - front-end
 - javascript
 - threejs
categories:
 - front-end
 - JavaScript
---

## 前言

<!--
近来， 因项目需求研究threejs。初入新领域都需要漫天的找资源， 教程讲解等等。却发现关于threejs的中文资源极度稀缺，看英文因为英语渣所以进度也是比较缓慢。这几天学习告一段落，想来总结一下。也为增强理解。（注意：本文不是教程）
-->



threejs 主要是对WebGL的一个封装升华， 而WebGL主要是引入一个OpenGL相关的API
在MDN上解释道：**WebGL (Web图形库) 是一种JavaScript API，用于在任何兼容的Web浏览器中呈现交互式3D和2D图形，而无需使用插件。WebGL通过引入一个与OpenGL ES 2.0紧密相符合的API，可以在HTML5 `<canvas>` 元素中使用。** 所以有图形学基础的话，对threejs的学习会更加顺手

<!--more-->

本文主要涉及： 基本概念简介、分组对象与合并对象、粒子动画、纹理操作（包括sprit map）


## 基本概念

学习threejs，入门先需了解三大山，场景（scene）、相机（camera）和渲染器（renderer）。同时网页视窗的坐标系也是我们需要了解的

threejs创建的世界满足右手坐标系：

1. 伸出右手，伸直拇指，让它与另外四指垂直
2. 弯曲中、无名、小指，让它们与食指垂直
3. 以拇指指向为X轴正向、食指指向为Y轴正向、其它手指指向为Z轴正向的坐标系，即右手系

![右手坐标系][1]

### 场景（scene）

场景是什么，就是一个容器，放东西的容器。容器里可以放各种各样的东西（对象）。你的卧室是个容器，你在里边放床、书桌、椅子、电脑等等。当你进入这个房间你就能看到你再卧室里放的东西。

在threejs里，场景里放着你需要操作或者“看到”的对象。而且，你只能“看到”被放在场景里的对象。

以下为创建场景和添加对象到场景里的方法

```stylus?linenums
var scene = new THREE.Scene(); //创建场景
var pointlight = new THREE.PointLight(0xffffff, 1, 200); //对象，（点光源）
var scene.add( pointlight ); //添加对象至场景
```

### 相机（camera）

相机，很好理解嘛，就是相机啊。不过，你也可以更直观的理解成眼睛。在threejs的世界里，场景里放着各种各样的物体对象，而通过相机我们可以“看”到这些物体。在官方文档上，相机分为立方体相机（CubeCamera）、正交相机（OrthographicCamera）、透视相机（PerspectiveCamera）和立体相机（StereoCamera）。就目前而言，我们通常用的是透视相机，我这里以透视相机为主介绍。

透视投影，这个是我们人眼观察世界的模式，透视相机示意图如下：

![透视相机示意图][2]

图中实线组成的立方体就是我们所能观察到的区域。由此我们可可知创建一个透视相机需要一些参数， 视角（fov）、视锥体（所观看区域）宽高比（aspect）、近平面距离（near）和远平面（far）。

fov: FOV垂直分量，镜头到视截锥近平面上下边之间的夹角（常设为45 or 75）
aspect: 视截锥的纵横比（作图区域的宽高比）
near: 近平面离镜头多远（通常设为0.1 or 1）
far: 远平面离镜头多远（通常设为1000 or 10000）

示例代码：
```stylus?linenums
var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
```

### 渲染器（renderer）

渲染器是干嘛的， 渲染器就是把你通过相机所能看到的东西渲染到HTML页面内的画布上，然你在页面上看到这些东西。此处以WebGLRenderer为主。

直接示例：

```stylus?linenums
// WebGL渲染器，使用显卡来渲染场景。尽管还存在其它渲染器实现，但是处于性能、特性的考虑，不推荐使用
var renderer = new THREE.WebGLRenderer();
// 设置背景色，第二参数为透明度
renderer.setClearColor( 0xEEEEEE, 1 );
// 设置场景的大小
renderer.setSize( window.innerWidth, window.innerHeight );
//添加渲染器到页面内
document.getElementById("canvas").appendChild( renderer.domElement );

//渲染，
function render() {
  requestAnimationFrame( render );
  renderer.render( scene, camera );
}
```

## 几何模型

这里包括了点线面多面体，threejs中有大量的关于此方面的方构造函数，根据实际情况调用相应的方法即可，也可以根据数学函数画出自己的图形。最常用的有平面模型， 球面模型， 盒子模型

PlaneGeometry(width, height, widthSegments, heightSegments)
width — 沿X轴宽度.
height — 沿Y轴高度
widthSegments — 可选参数，x方向的分段数，缺省为1。
heightSegments — 可选参数，y方向的分段数，缺省为1。

SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength)
radius — 球体半径. 默认值为50.
widthSegments — 水平分割面的数量. 最小值为3, 默认值为8.
heightSegments — 垂直分割面的数量. 最小值为2, 默认值为6.
phiStart — 指定水平起始角度. 默认值为0.
phiLength — 指定水平扫描角度大小. 默认值为 Math.PI * 2.
thetaStart — 指定垂直起始角度. 默认值为0.
thetaLength — 指定垂直扫描角度大小. 默认值为Math.PI.

BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments)

width — X轴上的面的宽度.
height — Y轴上的面的高度.
depth — Z轴上的面的深度.
widthSegments — 可选参数. 沿宽度面的分割面数量. 默认值为1.
heightSegments — 可选参数. 沿高度面的分割面数量. 默认值为1.
depthSegments — 可选参数. 沿深度面的分割面数量. 默认值为1.

## 材质

在threejs中也定义了大量的材质构造函数， 最常用的是基础网孔材质(MeshBasicMaterial)， 这种材质不反射光线， 对于需要光效果的对象，不建议使用。对于需要光线的可以使用Phong网孔材料(MeshPhongMaterial)

## 对象

对象就是一个实体，由几何模型和材质组成，我们在threejs里看到的操作的基本单位就是对象。常用的对象包括线条(Line)、网孔(Mesh)、点(Points)

## 纹理操作

纹理操作 texture； 对于纹理，通常来说就是对于建立的几何图形贴上纹理图， 纹理图可以是图片文件， 也可以是canvas做出的图形（一般来说是对图片文件的操作）。官方文档有提供几种纹理加载压缩纹理加载(CompressedTexture)、立方体纹理(CubeTexture)、数据纹理(DataTexture)、纹理(Texture)，其分别对应这四种纹理加载方式。

这里主要以立方体纹理加载和纹理加载为主分析。

### 立方体纹理

提出立方体因为它的特殊性和常用性，对于立方体（六面体），对于这样的对象加载需要六张图或者一张图重复六次对应于它的六个面。所以它的loder的第一参数为一个长度为六的数组

```stylus?linenums
var loader = new THREE.CubeTextureLoader();
loader.setPath( 'textures/cube/pisa/' );

var textureCube = loader.load( [
	'px.png', 'nx.png',
	'py.png', 'ny.png',
	'pz.png', 'nz.png'
] );

var material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );
```

### 纹理加载

对于普通纹理，先看个例子

```stylus?linenums
// instantiate a loader
var loader = new THREE.TextureLoader();

// load a resource
loader.load(
	// resource URL
	'textures/land_ocean_ice_cloud_2048.jpg',
	// onload函数
	function ( texture ) {
		//将纹理贴图加载材质上
		var material = new THREE.MeshBasicMaterial( {
			map: texture
		 } );
	},
	// onProgress 加载纹理过程中处理函数， 此处会在控制台打印出加载百分比信息
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},
	// 在抛出错误时的回调函数
	function ( xhr ) {
		console.log( 'An error happened' );
	}
);
```

可以看到TextureLoader 的一个load方法， 加载外部纹理文件， 其包含四个参数，一个纹理地址， 其余三个回调函数，分别为onLoad, onProgress, onError。

加载玩纹理图片之后即可对纹理图片进行操作，一般加载在材质上，然后随这材质与集合图形一起作为参数构造对象

以上为纹理的一些基础内容， 另外这里补充一点雪碧图的内容，算是比较常用的一点

这里要提到offset & repeat

.offset

在U和V方向上，纹理在模型表面上重复绘制时的偏移。通常范围是0.0 到 1.0。

.repeat

在U和V方向上，纹理在模型表面上的重复次数。如果数值在0.0 到1.0 之间则对图像进行切割处理




## 镜头控制

镜头控制包括： TrackballControls、FlyControls、FirstPersonControls、PointerLockControls、OrbitControl


## 点云

对于粒子动画， 由于需要很多的粒子来组成，对每个粒子进行操作显然不现实，然后有PointCloud， 将所有的粒子放在一个组里，粒子的排列按照函数或者随机，总之按照你的设想通过一定的方式设定每个粒子的 x、y、z的值，按招某种方式修改这些坐标值，实现粒子的运动

![粒子运动][3]

## 运动

对于镜头运动， 可以是场景内物体运动， 也可以是相机运动

对于场景内对象的运动，如果我们场景内有多个对象，然而多个对象存在一些同步的运动（运动轨迹），如果对每个对象单独控制这将会很麻烦，也会影响性能， 当然threejs也知道这个问题

### 分组多个mesh

对于多个mesh，threejs有方法THREE.Group()作为容器，可以通过add() 方法添加mesh，对于所有添加至Group中的mesh将作为一个整体，就像你在盒子里放入手机、耳机、钱夹。当你移动盒子的时候，盒子内的物体也会随着盒子运动。让你打开盒子移动手机的时候其他物体不移动，这样的话就是每个对象都是独立的对象，然而在Group内它们又是一个统一整体。

```stylus?linenums
sphere = createMesh(new THREE.SphereGeometry(5, 10, 10));
cube = createMesh(new THREE.BoxGeometry(6, 6, 6));
 
// 任何3D对象可以作为组的容器，Object3D是Mesh、Scene的超类
group = new THREE.Object3D();   // 最近版本的Three.js引入THREE.Group，专门用作组容器
// 向容器中添加其它Mesh
group.add(sphere);
group.add(cube);
 
scene.add(group); 
```

### 合并多个Geometry

大部分情况下，使用分组可以让你方便的操控大量的Mesh。但是性能问题也可能出现，因为使用分组时，每个对象依然需要被单独的处理、渲染。
使用 THREE.Geometry.merge() 你可以合并多个几何图形（此时的几何图形是由多个几何图形组成，每个小图形是不独立的，就像由砖块盖成的大楼，此时的砖块不具有独立性），然后创建单个Mesh：

```stylus?linenums
var geometry = new THREE.Geometry();
for ( var i = 0; i < controls.numberOfObjects; i++ ) {
    var cubeMesh = createCube();
    cubeMesh.updateMatrix();
    // 提供被合并geometry的转换矩阵，确保geometry被正确的置位、旋转
    geometry.merge( cubeMesh.geometry, cubeMesh.matrix );
}
scene.add( new THREE.Mesh( geometry, cubeMaterial ) );
```

## 加载外部对象


支持的格式


|格式|说明|
| --- | --- |
|JSON|Three.js自定义的、基于JSON的格式。可以声明式的定义一个Geometry或者Scene利用该格式，你可以方便的重用复杂的Geometry或Scene|
|OBJ / MTL|OBJ是Wavefront开发的一种简单3D格式，此格式被广泛的支持，用于定义GeometryMTL用于配合OBJ，它指定OBJ使用的材质Three.js提供了OBJExporter.js，使用它可以把Three.js模型导出为OBJ格式Collada	基于XML的格式，被大量3D应用程序、渲染引擎支持|
|STL|STereoLithography的简写，在快速原型领域被广泛使用。3D打印模型通常使用该格式定义Three.js提供了STLExporter.js，使用它可以把Three.js模型导出为STL格式|
|CTM|openCTM定义的格式，以紧凑的格式存储基于三角形的Mesh|
|VTK|Visualization Toolkit定义的格式，用于声明顶点和面。此格式有二进制/ASCII两种变体，Three.js仅支持ASCII变体|
|AWD|3D场景的二进制格式，主要被away3d引擎使用，Three.js不支持AWD压缩格式|
|Assimp|开放资产导入库（Open asset import library）是导入多种3D模型的标准方式。使用该Loader你可以导入多种多样的3D模型格式|
|VRML|虚拟现实建模语言（Virtual Reality Modeling Language）是一种基于文本的格式，现已经被X3D格式取代尽管Three.js不直接支持X3D，但是后者很容易被转换为其它格式|
|Babylon|游戏引擎Babylon的私有格式|
|PLY|常用于存储来自3D扫描仪的信息|


## 基于Tween.js的动画

Tween.js是一个简单的JS库，可以基于给定的初值、终值自动计算所有中间值。这个中间值计算过程一般叫做tweening。[github地址][4]



  [1]: ./images/1498102792516.jpg
  [2]: ./images/1498102217775.jpg
  [3]: ./images/rain1.gif "rain"
  [4]: https://github.com/tweenjs/tween.js