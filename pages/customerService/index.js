const app = getApp();
Page({
  data: {
    isIPX: false,
  },
  onLoad() {
    if (app.globalData.isIPX) {
      this.setData({
        isIPX: true,
      });
    }
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 2,
      });
    }
  },
  makPhoneCall: function () {
    wx.makePhoneCall({
      phoneNumber: '15139068517',
    });
  },
});
