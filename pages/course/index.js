import { queryALl, queryLike, getShareId } from '../../services/course';
import { getBanners } from '../../services/dict';
const app = getApp();
Page({
  data: {
    isIPX: false,
    pageNumber: 0, // 当前页码
    hasNextPage: false, // 是否有下一页
    info: [[]],
    categoryId: '',
    likeList: [],
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
        active: 1,
      });
    }
    getBanners('Course').then((res) => {
      this.setData({
        bannerList: res,
      });
    });
  },
  goBanner: function (e) {
    wx.navigateTo({
      url: `/pages/banner/index?id=${e.currentTarget.dataset.id}`,
    });
  },
  searchMore: function () {
    if (this.data.hasNextPage) {
      queryALl({ page: this.data.pageNumber, size: 10 }).then((res) => {
        this.setData({
          [`info[${res.number + 1}]`]: res.content,
          pageNumber: res.number + 1,
          hasNextPage: res.number + 1 >= res.totalPages ? false : true,
          categoryId: this.data.categoryId,
        });
      });
    }
  },
  goDetail: function (e) {
    wx.navigateTo({
      url: `/pages/course/detail/index?id=${e.currentTarget.dataset.id}`,
    });
  },
  golookTest: function () {
    wx.navigateTo({
      url: `/pages/course/lookAndTest/index`,
    });
  },
  getTabItem: function (e) {
    getShareId({
      name: '课程',
      desc: '分享课程',
      linkedCode: e.detail.id,
    }).then((res) => {
      this.setData({
        shareId: res,
      });
    });
    app.globalData.subject = e.detail;
    queryALl({ page: 0, size: 10, categoryId: e.detail.id }).then((res) => {
      this.setData({
        ['info[0]']: res.content,
        pageNumber: res.number + 1,
        hasNextPage: res.number + 1 >= res.totalPages ? false : true,
        categoryId: e.detail.id,
      });
    });
    queryLike(e.detail.id).then((res) => {
      this.setData({
        likeList: res,
      });
    });
  },
  onShareAppMessage: function () {
    return {
      title: '分享课程',
      path: `/pages/index/index?id=${this.data.shareId}&redirectUrl=/pages/course/index`,
    };
  },
});
