//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      // 此前已授权
      wx.switchTab({
        url: `/pages/testBank/index`,
      });
    } else if (this.data.canIUse) {
      // 按钮调起可用，未获得用户信息
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = (res) => {
        wx.switchTab({
          url: `/pages/testBank/index`,
        });
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: (res) => {
          app.globalData.userInfo = res.userInfo;
          wx.switchTab({
            url: `/pages/testBank/index`,
          });
        },
      });
    }
  },
  getUserInfo: function (e) {
    console.log(e);
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      wx.switchTab({
        url: `/pages/testBank/index`,
      });
    }
  },
});
