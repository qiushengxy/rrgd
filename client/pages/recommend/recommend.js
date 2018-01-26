// pages/recommend/recommend.js
var list = [
  {
    headpic: "/images/hot.png",
    name: "这是一个根据用户的喜爱和偏好所推荐的投票话题",
    time: "2018/1/20"
  },
  {
    headpic: "/images/hot-on.png",
    name: "这是一个根据用户的喜爱和偏好所推荐的投票话题",
    time: "2018/1/20"
  },
  {
    headpic: "/images/recommend.png",
    name: "这是一个根据用户的喜爱和偏好所推荐的投票话题",
    time: "2018/1/20"
  },
  {
    headpic: "/images/footprint-on.png",
    name: "这是一个根据用户的喜爱和偏好所推荐的投票话题",
    time: "2018/1/20"
  },
  {
    headpic: "/images/settings.png",
    name: "这是一个根据用户的喜爱和偏好所推荐的投票话题",
    time: "2018/1/20"
  },
  {
    headpic: "/images/hot.png",
    name: "这是一个根据用户的喜爱和偏好所推荐的投票话题",
    time: "2018/1/20"
  },
  {
    headpic: "/images/hot.png",
    name: "这是一个根据用户的喜爱和偏好所推荐的投票话题",
    time: "2018/1/20"
  },
  {
    headpic: "/images/hot-on.png",
    name: "这是一个根据用户的喜爱和偏好所推荐的投票话题",
    time: "2018/1/20"
  },
  {
    headpic: "/images/hot.png",
    name: "这是一个根据用户的喜爱和偏好所推荐的投票话题",
    time: "2018/1/20"
  },
  {
    headpic: "/images/hot.png",
    name: "这是一个根据用户的喜爱和偏好所推荐的投票话题",
    time: "2018/1/20"
  },
  {
    headpic: "/images/hot.png",
    name: "这是一个根据用户的喜爱和偏好所推荐的投票话题",
    time: "2018/1/20"
  },
  {
    headpic: "/images/hot.png",
    name: "这是一个根据用户的喜爱和偏好所推荐的投票话题",
    time: "2018/1/20"
  },
  {
    headpic: "/images/hot.png",
    name: "这是一个根据用户的喜爱和偏好所推荐的投票话题",
    time: "2018/1/20"
  }
];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: list
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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


  openTopic: function () {
    wx.navigateTo({
      url: '/pages/topics/topic',
    });
  }
})