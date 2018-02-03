//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
    data: {
        userInfo: {},
        logged: false,
        takeSession: false,
        requestResult: '',
        currentTab: 0,
        winWidth: 0,
        winHeight: 0
    },

    // 用户登录示例
    login: function() {
        if (this.data.logged) return

        util.showBusy('正在登录')
        var that = this

        // 调用登录接口
        qcloud.login({
            success(result) {
                if (result) {
                    util.showSuccess('登录成功')
                    that.setData({
                        userInfo: result,
                        logged: true,
                        userInfoStr: JSON.stringify(result)
                    })
                } else {
                    // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
                    qcloud.request({
                        url: config.service.requestUrl,
                        login: true,
                        success(result) {
                            util.showSuccess('登录成功')
                            that.setData({
                                userInfo: result.data.data,
                                logged: true,
                                userInfoStr: JSON.stringify(result.data.data)
                            })
                        },

                        fail(error) {
                            util.showModel('请求失败', error)
                            console.log('request fail', error)
                        }
                    })
                }
            },

            fail(error) {
                util.showModel('登录失败', error)
                console.log('登录失败', error)
            }
        })
    },

    /** 
         * 滑动切换tab 
         */
    bindChange: function (e) {

      var that = this;
      that.setData({ currentTab: e.detail.current });

    },
    /** 
     * 点击tab切换 
     */
    swichNav: function (e) {

      var that = this;

      if (this.data.currentTab === e.target.dataset.current) {
        return false;
      } else {
        that.setData({
          currentTab: e.target.dataset.current
        })
      }
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
      this.login();

      var that = this;
      var options = {
        url: config.service.topicsUrl,
        login: false,
        success(result) {
          util.hideToast();
          console.log('request success', result);
          var data = result.data.data;
          data.forEach(function(item) {
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
