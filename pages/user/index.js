//index.js
//获取应用实例
import { updateUsr, getUserInfo } from '../../services/user';
const app = getApp();

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    isIPX: false,
  },
  onLoad: function () {
    getUserInfo().then((res) => {
      this.setData({
        userInfo: res,
        hasUserInfo: res.username && res.avatarUrl ? true : false,
      });
      app.globalData.userInfo = res;
    });

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
      console.log(e.detail.userInfo);
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
  goNotice: function () {
    wx.navigateTo({
      url: '/pages/user/notice/index',
    });
  },
});
