// pages/recommend/recommend.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: {}
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },


  openTopic: function (event) {
    console.log(event);
    wx.navigateTo({
      url: '/pages/topics/topic?id=' + event.currentTarget.dataset.id
    });
  },

  onLoad: function () {
    // 页面渲染后 执行
    var that = this;
    var options = {
      url: config.service.topicsUrl,
      login: false,
      success(result) {
        util.hideToast();
        console.log('request success', result);
        var data = result.data.data;
        data.forEach(function (item) {
          item.creation = item.creation.substring(0, 10);
          item.votes = item.votes > 9999 ? (Math.floor(item.votes / 1000) / 10) + '万' : item.votes;
        });
        that.setData({
          list: data
        });
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    };
    qcloud.request(options);

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  }
})