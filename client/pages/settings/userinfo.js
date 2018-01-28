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
    genderItems: [
      { key: 0, value: '保密' },
      { key: 1, value: '男'},
      { key: 2, value: '女' },
      { key: 3, value: '其它' }
    ],
    birthItems: [
      { key: 0, value: '保密' },
      { key: 1, value: '60前' },
      { key: 2, value: '60后' },
      { key: 3, value: '70后'},
      { key: 4, value: '80后'},
      { key: 5, value: '90后'},
      { key: 6, value: '00后'},
      { key: 7, value: '10后'}
    ],
    occupationItems: [
      { key: 0, value: '保密' },
      { key: 1, value: '办公室职员'},
      { key: 2, value: '工人' },
      { key: 3, value: '农民' },
      { key: 4, value: '公务员' },
      { key: 5, value: '学生' },
      { key: 6, value: '其它' }
    ],
    educationItems: [
      { key: 0, value: '保密' },
      { key: 1, value: '初中'},
      { key: 2, value: '高中或职专' },
      { key: 3, value: '大学本科' },
      { key: 4, value: '研究生' },
      { key: 5, value: '博士' }
    ],
    incomeItems: [
      { key: 0, value: '保密' },
      { key: 1, value: '5万以下'},
      { key: 2, value: '10万左右' },
      { key: 3, value: '50万左右' },
      { key: 4, value: '100万左右' },
      { key: 5, value: '超级大富豪' }
    ],
  },

  genderChange: function (e) {
    console.log(e);
    this.data.userInfo.gender = parseInt(e.detail.value);
  },

  birthChange: function (e) {
    this.data.userInfo.birthYear = parseInt(e.detail.value);
  },

  occupationChange: function (e) {
    this.data.userInfo.occupation = parseInt(e.detail.value);
  },

  educationChange: function (e) {
    this.data.userInfo.education = parseInt(e.detail.value);
  },

  incomeChange: function (e) {
    this.data.userInfo.income = parseInt(e.detail.value);
  },

  updateMenuItems: function (userInfo) {
    console.log(userInfo);
    if (userInfo.gender >= 0) {
      this.data.genderItems[userInfo.gender].checked = true;
    } else {
      this.data.genderItems[1].checked = true; // default to male
    }
    console.log('birthyear=' + userInfo.birthYear);
    if (userInfo.birthYear >= 0) {
      this.data.birthItems[userInfo.birthYear].checked = true;
    } else {
      this.data.birthItems[4].checked = true;
    }
    if (userInfo.occupation >= 0) {
      this.data.occupationItems[userInfo.occupation].checked = true;
    } else {
      this.data.occupationItems[1].checked = true;
    }
    if (userInfo.education >= 0) {
      this.data.educationItems[userInfo.education].checked = true;
    } else {
      this.data.educationItems[3].checked = true;
    }
    if (userInfo.education >= 0) {
      this.data.incomeItems[userInfo.income].checked = true;
    } else {
      this.data.incomeItems[1].checked = true;
    }
  },

  onLoad: function () {
    util.showBusy('检查中...');
    var that = this;
    var options = {
      url: config.service.requestUrl,
      login: true,
      success(result) {
        util.hideToast();
        console.log('request success', result);
        // update menu items
        that.updateMenuItems(result.data.data);
        that.setData({
          userInfo: result.data.data,
          genderItems: that.data.genderItems,
          birthItems: that.data.birthItems,
          occupationItems: that.data.occupationItems,
          educationItems: that.data.educationItems,
          incomeItems: that.data.incomeItems
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
    console.log(this.data.userInfo);
    var that = this;
    var options = {
      url: config.service.requestUrl,
      login: false,
      method: 'POST',
      data: this.data.userInfo,
      success(result) {
        console.log('request success', result)
        that.setData({
          userInfo: result.data.data
        })
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    };
    qcloud.request(options);
  }
})
