---
title: 阻止移动端浏览器下拉橡皮筋效果（下拉滚动露底）
url: prevent-wechat-rubber-banding
newsauthor: true
tags:
  - 橡皮筋效果
  - 移动端浏览器
categories:
  - front-end
comments: true
reward_settings:
  enable: true
date: 2018-04-25 17:27:25
description:
---


## 前言

最近项目有个需求：需要移动端浏览器下的橡皮筋效果，但是页面内部的存在`div`框需要存在滚动。由此，遇到的问题与解决过程，记录如下。

<!--more-->

声明：此处只讨论js控制部分，css的设置（例：`overflow`的设置等）

## 第一步阻止橡皮筋效果

简单粗暴的解决法，阻止浏览器滑动的默认行为

```stylus?linenums
document.body.addEventListener('touchmove', (e) => {
  e.preventDefault();
});
```
这里需要说明下，在IOS11.3下此写法不能达到预期效果，需要如下代码

```stylus?linenums
document.body.addEventListener('touchmove', (e) => {
  e.preventDefault();
}, { passive: false });
```

关于 `passive: false` 参考文章 [passive 的事件监听器][1]，关于IOS11.3下解释参考文章[ios11.3 橡皮筋效果][2]

至此解决了阻止移动端浏览器的橡皮筋效果

## 保证内部盒子的滚动效果

声明：这里主要讨论垂直滑动

**讨论**：
 1. 需要某个盒子（`div`）可以滑动，那么就不能阻止该盒子以及该盒子后代元素的默认行为（`touchmove`的滚动行为），所以我们需要识别盒子元素及其后代元素，不执行阻止其默认行为的操作
 2. 当滚动元素到达顶部时继续向上滑时，同样需要阻止其默认事件。滚动到底部时，继续向下滚动也许阻止其默认行为。

综上讨论，首先判断`touch`事件触发元素是否为滚动元素及其后代元素，若是则阻止默认事件，若否判断为顶部且向上滑或者为底部且向下滑。上代码

```styl?linenums
let startY = 0;
const scrollBox = document.querySelector('.scroll-box');

document.body.addEventListener('touchstart', (e) => {
  startY = e.touches[0].pageY;
}, { passive: false });

document.body.addEventListener('touchmove', (e) => {
  const moveY = e.touches[0].pageY;
  const top = scrollBox.scrollTop;
  const ch = scrollBox.clientHeight;
  const sh = scrollBox.scrollHeight;
  if (!isChildTarget(e.target, scrollBox)) {
    e.preventDefault();
  } else if ((top === 0 && moveY > startY) || (top + ch === sh && moveY < startY)) {
    e.preventDefault();
  }
}, { passive: false });
```

到这里就差不多结束了，对于函数 `isChildTarget` 如下：

```styl?linenums
function isChildOf(child, parent, justChild = flase) { 
  // justChild为true则只判断是否为子元素，若为false则判断是否为本身或者子元素 默认为false
  let parentNode;
  if (justChild) {
    parentNode = child.parentNode;
  } else {
    parentNode = child;
  }
  
  if (child && parent) {
    while (parentNode) {
      if (parent === parentNode) {
        return true;
      }
      parentNode = parentNode.parentNode;
    }
  }
  return false;
}
```
这下真的结束了。

如有问题， 欢迎交流学习。
如需转载请注明出处 [本文地址][3]


  [1]: https://www.cnblogs.com/ziyunfei/p/5545439.html
  [2]: https://segmentfault.com/a/1190000014134234
  [3]: http://blog.chriz.site/2018/04/25/prevent-wechat-rubber-banding/