// pages/topics/topic.js
var util = require('../../utils/util.js')
var wxCharts = require('../../vendor/wxcharts.js');

var allChart = null;
var genderChart = null;
var ageChart = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topic: {
      title: "李小璐疑似出轨PGone",
      question: "你相信李小璐真的出轨了吗？",
      answers: [{ key: 0, value: "肯定是真的，跟马蓉那个贱人一样"},
        { key: 1, value: "并没有，是有人羡慕嫉妒恨，故意造谣" },
        { key: 2, value: "情况并不明朗，会跟踪事件进展" },
        { key: 3, value: "关我屁事！" }
        ],
      text: "2017年12月29日晚，有媒体爆料李小璐在与友人约饭后夜宿pgone家中，第二天早上八点才缓缓离开。视频中，李小璐先是与一相貌俊朗、身形挺拔的男子从餐厅出来，然后一同坐上一辆白色私家车从餐厅开往南洋一号。令人震惊的是，车上的司机居然是红花会的pgone。随后三人一同回到了pgone的家中。第二天一早PG ONE与李小璐一同出门，两人快到李小璐家小区时突然换了正副驾驶座，随后PG ONE自行离开。 据悉，当晚李小璐的老公贾乃亮正在家中直播，在被问及李小璐的定位之时回复了网友“媳妇儿去做美美的头发了”，饭局喝酒也不被带着玩儿，还遭老婆敷衍，难怪贾乃亮曾自称“家中地位最低”。 对此，网友在震惊之余也表示心疼贾乃亮：“有点心疼，贾乃亮你可真得长点心了。”",
      images: ["http://img4.imgtn.bdimg.com/it/u=674321087,1405919225&fm=11&gp=0.jpg",
      "http://qimg.hxnews.com/2018/0106/1515224064326.jpeg",
      "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1454438483,4154146611&fm=11&gp=0.jpg"],
      link: "http://ent.sina.com.cn/s/m/2017-12-31/doc-ifyqcwaq6311983.shtml"
    },
    answer: undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    var that = this;
    allChart = new wxCharts({
      canvasId: 'allGraph',
      type: 'pie',
      series: [{
        name: that.data.topic.answers[0].value,
        data: 50,
        color: 'red'
      }, {
        name: that.data.topic.answers[1].value,
        data: 32,
        color: 'orange'
      }, {
        name: that.data.topic.answers[2].value,
        data: 2,
        color: 'blue'
      }, {
        name: that.data.topic.answers[3].value,
        data: 19,
        color: 'green'
      }],
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
        data: [15, 2, 5],
        color: 'red'
      }, {
        name: that.data.topic.answers[1].value,
        data: [3, 25, 6],
        color: 'orange'
      }, {
        name: that.data.topic.answers[2].value,
        data: [2, 7, 2],
        color: 'blue'
      }, {
        name: that.data.topic.answers[3].value,
        data: [9, 2, 3],
        color: 'green'
      }],
      yAxis: {
        min: 0,
        title: '人数',
        format: function (val) {
          return val + '万';
        }
      },
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
        data: [15, 2, 5, 4, 7, 19, 13],
        color: 'red'
      }, {
        name: that.data.topic.answers[1].value,
        data: [5, 20, 15, 14, 17, 9, 2],
        color: 'orange'
      }, {
        name: that.data.topic.answers[2].value,
        data: [35, 1, 1, 3, 2, 3, 3],
        color: 'blue'
      }, {
        name: that.data.topic.answers[3].value,
        data: [1, 5, 9, 24, 3, 39, 23],
        color: 'green'
      }],
      yAxis: {
        min: 0,
        title: '人数',
        format: function (val) {
          return val + '万';
        }
      },
      width: windowWidth,
      height: 400,
      dataLabel: false
    });
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
      util.showModel('提示', '请表明您的观点之后再查看投票结果')
    }
    var that = this;
    this.setData({
      answer: that.data.answer
    });
  },

})