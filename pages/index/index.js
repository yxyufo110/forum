//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    isIPX: false,
  },
  onLoad() {
    wx.getSystemInfo({
      success: (res) => {
        if (res.model.search('iPhone X') != -1) {
          this.setData({
            isIPX: true,
          });
        }
      },
    });
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 0,
      });
    }
  },
});
