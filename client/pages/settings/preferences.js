//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    userInfo: {},
    categories: [
      { key: 0, value: '本地' },
      { key: 1, value: '娱乐' },
      { key: 2, value: '体育' },
      { key: 3, value: '财经' },
      { key: 4, value: '科技' },
      { key: 5, value: '历史' },
      { key: 6, value: '房产' }
    ],
    allowPush: false,
    choices: [],
    allowPushChanged: false,
    choicesChanged: false
  },

  pushCheckboxChange: function(e) {
    console.log(e);
    this.data.allowPush = e.detail.value.length === 1;
    this.data.allowPushChanged = true;
  },

  categoryCheckboxChange: function(e) {
    console.log(e);
    this.data.choices = e.detail.value;
    this.data.choicesChanged = true;
  },

  updateUserPreferences: function(data) {
    if (data.local) {
      this.data.categories[0].checked = true;
    }
    if (data.ent) {
      this.data.categories[1].checked = true;
    }
    if (data.sport) {
      this.data.categories[2].checked = true;
    }
    if (data.economy) {
      this.data.categories[3].checked = true;
    }
    if (data.tech) {
      this.data.categories[4].checked = true;
    }
    if (data.history) {
      this.data.categories[5].checked = true;
    }
    if (data.house) {
      this.data.categories[6].checked = true;
    }
  },

  onLoad: function () {
    // Get current preferences from the network
    util.showBusy('检查中...');
    var that = this;
    var options = {
      url: config.service.preferencesUrl,
      login: true,
      success(result) {
        util.hideToast();
        console.log('request success', result);
        // update menu items
        that.updateUserPreferences(result.data.data);
        that.setData({
          userInfo: result.data.data,
          allowPush: result.data.data.allowPush,
          categories: that.data.categories
        });
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    };
    qcloud.request(options);
  },

  onUnload: function () {
    console.log('allowPush: ' + this.data.allowPush);
    console.log('choices: ' + this.data.choices);
    if (this.data.allowPushChanged) {
      this.data.userInfo.allowPush = this.data.allowPush ? 1 : 0;
    }
    if (this.data.choicesChanged) {
      this.data.userInfo.local = this.data.choices.includes('0') ? 1 : 0;
      this.data.userInfo.ent = this.data.choices.includes('1') ? 1 : 0;
      this.data.userInfo.sport = this.data.choices.includes('2') ? 1 : 0;
      this.data.userInfo.economy = this.data.choices.includes('3') ? 1 : 0;
      this.data.userInfo.tech = this.data.choices.includes('4') ? 1 : 0;
      this.data.userInfo.history = this.data.choices.includes('5') ? 1 : 0;
      this.data.userInfo.house = this.data.choices.includes('6') ? 1 : 0
    }
    var that = this;
    var options = {
      url: config.service.preferencesUrl,
      login: true,
      method: 'POST',
      data: this.data.userInfo,
      success(result) {
        console.log('request success', result);
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    };
    qcloud.request(options);
  }
})
