// 请求数据来源于网络 侵删
// pages/douban/index.js
var jsonData = require('../../utils/data.js')  //引入本地数据
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrs: '',
    showData: jsonData.data().list,
    inputValue: '',
    dataId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
  },

  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var self = this;
    wx.request({
      url: 'http://hide-api-hhhhhhhhh/weather?cityId=101280101',
      method: 'GET',
      header: {
        "Content-Type": "application/json",
      },
      success: function (res) {
        console.log(res);
        self.setData({
          arrs: res.data
        })
      }
    })
    console.log(self.data.showData);
  },

  getSearch: function(){
    wx.showLoading({
      title: '加载中',
    })
    var self = this;
    // console.log(self.data.inputValue);
    for (var index in self.data.showData){
      var cn = self.data.showData[index].City_CN;
      var value = self.data.inputValue;
      if(value == cn){
        var id = self.data.showData[index].City_ID.substring(2, 11);
        self.setData({
          dataId: id
        })
      }
      
    }
    wx.request({
      url: 'http://hide-api-hhhhhhhhh/wtr-v2/weather?cityId=' + self.data.dataId ,
      method: 'GET',
      header: {
        "Content-Type": "application/json",
      },
      success: function (res) {
        console.log(res);
        self.setData({
          arrs: res.data
        })
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 1500
        })
      }
    })
  }
})