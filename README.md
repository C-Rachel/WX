# WX

### 关于开发微信小程序

`wepy`是官方维护的一套类似VUE的框架用来开发微信小程序（理念相似，具体细节不同）
<br />
`mpvue`是基于 Vue.js的小程序开发框架，从底层支持 Vue.js语法和构建工具体系

|  WX  |   WX   |  WX   |
| ---------- | -----------  | ----------- |
| [微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/index.html) | [wepy](https://tencent.github.io/wepy/) | [mpvue](https://github.com/Meituan-Dianping/mpvue) |

### 长按复制文本

```
<text selectable="true">555</text>
```
text标签加上selectable属性可实现长按复制文本的功能

### 小程序的data与vue的data
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

### 关于app.json
[app.json对应文档](https://developers.weixin.qq.com/miniprogram/dev/framework/config.html)
`app.json`文件用来对微信小程序进行全局配置，决定页面文件的路径、窗口表现、设置网络超时时间、设置多`tab`等。
一般项目开发目录如下（一般初始pages里有index和logs）：
```
├── app.js
├── app.json
├── app.wxss
├── pages
│   │── index
│   │   ├── index.wxml
│   │   ├── index.js
│   │   ├── index.json
│   │   └── index.wxss
│   │── about
│   │   ├── index.wxml
│   │   ├── index.js
│   │   ├── index.json
│   │   └── index.wxss
│   └── logs
│       ├── log.wxml
│       └── log.js
└── utils
```
对应开发目录来看app.json里的pages如下：
```
{
  "pages":[    
    "pages/index/index",
    "pages/about/index",
    "pages/logs/logs"
  ]
}
```
默认页面为app.json pages里的第一条，如若想默认页面为about把对应的`"pages/about/index"`写在最前即可（开发非首页相关页面看效果时可以用到）

#### 跳转页面
想要设置页面跳转，首先要在app.json的pages里配置对应跳转的url，否则就会获得一个报错 
```
navigateTo:fail page "pages/xxx" is not found
```
实现页面跳转可使用组件`navigator` [对应文档](https://developers.weixin.qq.com/miniprogram/dev/component/navigator.html)
<br />
`navigator`可包裹button使用
```
<navigator url='../index/index'>
  <button class='button-box'>返回主頁</button>
</navigator>
```

### 关于request不合法
在做request请求时，可能会遇到问题如下：
<br />
<br />
<img src="image/err.jpg" />
<br />
<br />
这时候在开发者工具导航找到 工具 => 项目详情
<br />
<br />
<img src="image/https.jpg" />
<br />
<br />
将最后一栏：``不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书``给勾上，再次做request请求即可解决这个问题。

#### 微信小程序读取本地数据
使用本地数据做测试，可以在``utils``文件下新建一个js文件，把本地数据写进去，即可在项目中读取本地数据。
<br />
新建 data.js ：
```
function data(){
	var res = {
		list: [
			{
				"name": "hhhh",
				"id": "6666"
			},
			{
				"name": "xxxx",
				"id": "7777"
			}
		]
	}
	return res
}

module.exports = {
  data: data
} 
```
然后在页面js中引入使用：
```
var getData = require('../../utils/data.js')  
Page({   
  data: {    
    showData: getData.data().list,   
  },  
}) 
```