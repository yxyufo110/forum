//index.js
//获取应用实例
import { updateUsr, getUserInfos } from '../../services/user';
const app = getApp();

Page({
  data: {
    userInfo: {},
    hasUserInfo: true,
    isIPX: false,
  },
  onShow:function(){
    getUserInfos().then((res) => {
      this.setData({
        userInfo: res,
        hasUserInfo: res.username && res.avatarUrl ? true : false,
      });
      app.globalData.userInfo = res;
    });
  },
  onLoad: function () {
    if (app.globalData.isIPX) {
      this.setData({
        isIPX: true,
      });
    }
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 3,
      });
    }
  },
  getUserInfo: function (e) {
    if (e.detail.userInfo) {
      // 获取用户授权成功
      // this.setData
      let params = {
        username: e.detail.userInfo.nickName,
        avatarUrl: e.detail.userInfo.avatarUrl,
      };
      updateUsr(params).then((res) => {
        app.globalData.userInfo = res;
        this.setData({
          userInfo: res,
          hasUserInfo: true,
        });
      });
    }
  },
  goEdit: function () {
    wx.navigateTo({
      url: '/pages/user/edit/index',
    });
  },
  goRecord: function () {
    wx.navigateTo({
      url: '/pages/user/record/index',
    });
  },
  goNotice: function () {
    wx.navigateTo({
      url: '/pages/user/notice/index',
    });
  },
  goShare: function () {
    wx.navigateTo({
      url: '/pages/user/share/index',
    });
  },
  goOrder: function () {
    wx.navigateTo({
      url: '/pages/order/index',
    });
  },
  goWalet: function () {
    wx.navigateTo({
      url: '/pages/user/walet/index',
    });
  },
  goCollect: function () {
    wx.navigateTo({
      url: '/pages/user/collect/index',
    });
  },
  getPhone: function (e) {
    if (e.detail.iv) {
      updateUsr({ iv: e.detail.iv, phoneNum: e.detail.encryptedData }).then((res) => {
        app.globalData.userInfo = res;
        wx.navigateBack({
          delta: 1,
        });
      });
    }
  },
});
