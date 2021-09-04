---
title: 回顾排序算法（javascript）
url: javascript-sort-algorithm
newsauthor: true
tags:
  - javascript
  - sort
categories:
  - javascript
comments: true
reward_settings:
  enable: true
date: 2018-03-27 14:18:20
description:
---

## 前言

作为前端er，持续的学习新技术才能立于不败之地，但同时及时的回顾基础，避免得此失彼也尤为重要。今天目的如标题，说到算法，根据工作性质对其的使用程度频度，会有不同，但作为一个基础性的东西，我们必须牢记于心，就像我们的身边不可能经常发生火灾，但消防知识我们仍需要牢记，以备那万一。

<!--more-->

注： 本文中代码，以ES6语法、伪代码为主，重点在于分析。
一些基础函数

```styl?linenums
function createArray(len = 15, min = 1, max = 100) {
    let array = [];
    for (let i = 0; i < len; i++) {
        array.push(Math.floor(Math.random() * max + min));
    }
    return [...new Set(array)];		//去重
}

function swap(array, m, n) {
    [array[m], array[n]] = [array[n], array[m]];
}
```

## 冒泡排序

初涉算法时，我们通常是由冒泡排序起步，因为它最简单，最易理解。当然从运行角度冒泡是最差的一个。因为其排序过程好像气泡从水底移至水面一样，冒泡排序因此得名。

冒泡排序就是就是简单的相邻元素对比+位置调整。我们以从小到大排序一个数组为例，就是第一个元素与第二个对比，如果第一个大则交换位置；否则，再对比第二第三元素以此类推；一轮对比便找出一个最大值放在最后一个位置，然后进行第二轮对比，一共进行`array.length - 1`轮对比，查看如下代码

```stylus?linenums
let array = createArray();		// 生成一个数组

function buttleSort(array) {
    let length = array.length;
	
    for(let i = 0; i < length; i ++) {
        for(let j = 0; j < length - 1 - i; j ++) {
            if(array[j] > array[j+1]) {
                swap(array, j, j+1);		// 交换array[j] 和 array[j+1]的位置
            }
        }
    }
	return array;
}

console.log(array);
console.time('buttle');
buttleSort(array);
console.timeEnd('buttle');
console.log(array);
```

在代码中对该排序算法进行了适当的优化，但是仍不能改变其O(n<sup>2</sup>)时间复杂度的事实。此排序算法通常不被推荐使用。

以下两张图展示冒泡排序的执行流程

基础冒泡排序算法执行流程：

![基础冒泡排序算法执行流程][1]

以上代码表达的冒泡排序算法执行流程：

![以上代码表达的冒泡排序算法执行流程][2]


## 选择排序

选择排序，如其名，就是通过选择来进行排序。选择其最大或者最小值，移至相应位置（链表首端或者末端），已达到其排序的目的。

看图

![选择排序][3]

没啥特别的代码体现

```stylus?linenums
function selectionSort(array)  {
    let length = array.length,
	    indexMin;
	for(let i = 0; i < length - 1; i++) {
	    indexMin = i;
		for(let j = i + 1; j < length; j++) {
		    if(array[indexMin] > array[j]) {
			    indexMin = j;
			}
		}
		if(indexMin !== i) {
		    swap(array, indexMin, i)
		}
	}
}
```

  [1]: ./images/1522139497371.jpg
  [2]: ./images/1522139447831.jpg
  [3]: ./images/1522140144925.jpg