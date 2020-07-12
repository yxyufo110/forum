import { getBanners } from '../../services/dict';
const app = getApp();
Page({
  data: {
    isIPX: false,
    bannerList: [],
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
    getBanners().then((res) => {
      this.setData({
        bannerList: res,
      });
    });
  },
  onshowShareMenu: function (res) {
    return {
      title: '分享',
      desc: '远东教育小程序!',
      path: '/page/course?id=123',
    };
  },
  getTabItem: function (e) {
    app.globalData.subject = e.detail;
  },
  goBanner: function (e) {
    wx.navigateTo({
      url: `/pages/banner/index?id=${e.currentTarget.dataset.id}`,
    });
  },
});
