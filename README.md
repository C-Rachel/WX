# WX

#### 关于开发微信小程序

`wepy`是官方维护的一套类似VUE的框架用来开发微信小程序（理念相似，具体细节不同）
<br />
`mpvue`是基于 Vue.js的小程序开发框架，从底层支持 Vue.js语法和构建工具体系

|  WX  |   WX   |  WX   |
| ---------- | -----------  | ----------- |
| [微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/index.html) | [wepy](https://tencent.github.io/wepy/) | [mpvue](https://github.com/Meituan-Dianping/mpvue) |

#### 长按复制文本

```
<text selectable="true">555</text>
```
text标签加上selectable属性可实现长按复制文本的功能

#### 小程序的data与vue的data
二者的data都是用来初始化数据,但是在拿这些变量时又略有不同（原理了解不透彻，只能了解到可见的不同）
<br />
以下小程序打印`qqq变量`
```
Page({
  data: {
    qqq: '555'
  },
  onLoad: function () {
    console.log(this.data.qqq)
  },
})
```
以下是vue打印`qqq变量`
```
new Vue({
	el: '#appppp',
	data: {
		qqq: '333'
	},
	created: function(){
		console.log(this.qqq)
	}
})
```
但是在页面上使用`qqq`时都为`{{qqq}}`

#### 切换页面（分页）


