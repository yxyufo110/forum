import { getBanners } from '../../services/dict';
import { statistics, getShareId } from '../../services/topic';
const app = getApp();
Page({
  data: {
    isIPX: false,
    bannerList: [],
    list: [],
    shareId: '',
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

    getBanners('Paper').then((res) => {
      this.setData({
        bannerList: res,
      });
    });
  },

  getTabItem: function (e) {
    getShareId({
      name: '主页',
      desc: '分享题库',
      linkedCode: e.detail.id,
    }).then((res) => {
      this.setData({
        shareId: res,
      });
    });
    app.globalData.subject = e.detail;
    statistics({
      categoryId: e.detail.id,
    }).then((res) => {
      this.setData({
        list: res,
      });
    });
  },
  goBanner: function (e) {
    wx.navigateTo({
      url: `/pages/banner/index?id=${e.currentTarget.dataset.id}`,
    });
  },
  gosubj: function (e) {
    wx.navigateTo({
      url: `/pages/topic/radio/index?subjectId=${e.currentTarget.dataset.id}`,
    });
  },
  onShareAppMessage: function () {
    return {
      title: '分享考粉驿站',
      path: `/pages/index/index?id=${this.data.shareId}&redirectUrl=/pages/testBank/index`,
    };
  },
});
