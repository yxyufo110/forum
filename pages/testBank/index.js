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
        active: 0,
      });
    }
    // 显示分享按钮
    wx.showShareMenu({
      withShareTicket: true,
    });
  },
  onshowShareMenu: function (res) {
    console.log('分享');
    return {
      title: '分享',
      desc: '远东教育小程序!',
      path: '/page/course?id=123',
    };
  },
});
