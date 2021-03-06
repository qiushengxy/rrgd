// pages/topics/topic.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var wxCharts = require('../../vendor/wxcharts.js');

var allChart = null;
var genderChart = null;
var ageChart = null;
var educationChart = null;
var incomeChart = null;
var provinceChart = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topic: {},
    answer: undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.showBusy('努力加载中...');
    var that = this;
    var options = {
      url: config.service.topicUrl + '?id=' + options.id,
      login: true,
      success(result) {
        util.hideToast();
        console.log('request success', result);
        var topic = result.data.data[0];
        var answers = [];
        topic.answers.split(';;;;;').forEach(function(item, index) {
          answers.push({
            key: index,
            value: item
          });
        });
        topic.answers = answers;
        topic.images = topic.images.split(';;;;;');
        topic.links = topic.links.split(';;;;;');
        console.log(topic);
        that.setData({
          topic: topic
        });
        var windowWidth = 320;
        try {
          var res = wx.getSystemInfoSync();
          windowWidth = res.windowWidth;
        } catch (e) {
          console.error('getSystemInfoSync failed!');
        }
        var yAxis = {
          min: 0,
          title: '人数',
          format: function (val) {
            return val + '万';
          }
        };
        allChart = new wxCharts({
          canvasId: 'allGraph',
          type: 'pie',
          series: [{
            name: that.data.topic.answers[0].value,
            data: Math.floor(Math.random() * 100),
            color: 'red'
            }, {
            name: that.data.topic.answers[1].value,
            data: Math.floor(Math.random() * 100),
            color: 'green'
            }, {
            name: that.data.topic.answers[2].value,
            data: Math.floor(Math.random() * 100),
            color: 'blue'
          }],
          yAxis: yAxis,
          width: windowWidth,
          height: 400,
          dataLabel: false
        });

        genderChart = new wxCharts({
          canvasId: 'genderGraph',
          type: 'column',
          categories: ['男', '女', '其它'],
          series: [{
            name: that.data.topic.answers[0].value,
            data: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)],
            color: 'red'
          }, {
            name: that.data.topic.answers[1].value,
            data: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)],
            color: 'green'
          }, {
            name: that.data.topic.answers[2].value,
            data: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)],
            color: 'blue'
          }],
          yAxis: yAxis,
          width: windowWidth,
          height: 400,
          dataLabel: false
        });
        ageChart = new wxCharts({
          canvasId: 'ageGraph',
          type: 'column',
          categories: ['60前', '60后', '70后', '80后', '90后', '00后', '10后'],
          series: [{
            name: that.data.topic.answers[0].value,
            data: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)],
            color: 'red'
          }, {
            name: that.data.topic.answers[1].value,
            data: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)],
            color: 'green'
          }, {
            name: that.data.topic.answers[2].value,
            data: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)],
            color: 'blue'
          }],
          yAxis: yAxis,
          width: windowWidth,
          height: 400,
          dataLabel: false
        });
        educationChart = new wxCharts({
          canvasId: 'educationGraph',
          type: 'column',
          categories: ['小学／初中', '高中/职专', '本科', '研究生', '博士'],
          series: [{
            name: that.data.topic.answers[0].value,
            data: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)],
            color: 'red'
          }, {
            name: that.data.topic.answers[1].value,
            data: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)],
            color: 'green'
          }, {
            name: that.data.topic.answers[2].value,
            data: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)],
            color: 'blue'
          }],
          yAxis: yAxis,
          width: windowWidth,
          height: 400,
          dataLabel: false
        });
        incomeChart = new wxCharts({
          canvasId: 'incomeGraph',
          type: 'column',
          categories: ['0-5万', '5-10万', '10-50万', '50-100万', '富豪'],
          series: [{
            name: that.data.topic.answers[0].value,
            data: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)],
            color: 'red'
          }, {
            name: that.data.topic.answers[1].value,
            data: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)],
            color: 'green'
          }, {
            name: that.data.topic.answers[2].value,
            data: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)],
            color: 'blue'
          }],
          yAxis: yAxis,
          width: windowWidth,
          height: 400,
          dataLabel: false
        });
        provinceChart = new wxCharts({
          canvasId: 'provinceGraph',
          type: 'column',
          categories: ['北京', '上海', '广东', '河南', '江苏', '四川', '其它省份'],
          series: [{
            name: that.data.topic.answers[0].value,
            data: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)],
            color: 'red'
          }, {
            name: that.data.topic.answers[1].value,
            data: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)],
            color: 'green'
          }, {
            name: that.data.topic.answers[2].value,
            data: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)],
            color: 'blue'
          }],
          yAxis: yAxis,
          width: windowWidth,
          height: 400,
          dataLabel: false
        });
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    };
    qcloud.request(options);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    
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


  answerChange: function (e) {
    this.data.answer = e.detail.value;
  },

  clickButton: function (e) {
    if (this.data.answer === undefined) {
      util.showModel('提示', '请表明您的观点之后再查看投票结果');
      return;
    }
    var that = this;
    this.setData({
      answer: that.data.answer
    });
    setTimeout(function () {


    var query = wx.createSelectorQuery();
    //选择id
    query.select('#vote-result-all').boundingClientRect();
    query.exec(function (res) {
      console.log(res);
      wx.pageScrollTo({
        scrollTop: res[0].top + 320
      });
    });
    }, 10);
  },

})