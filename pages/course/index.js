import { queryALl, queryLike, getShareId } from '../../services/course';
import { getBanners } from '../../services/dict';
import { weekLive } from '../../services/course';
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
    list:[]
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
    queryALl({ page: 0, size: 999, categoryId: e.detail.id }).then((res) => {
      this.setData({
        ['info[0]']: res.content,
        pageNumber: res.number + 1,
        hasNextPage: res.number + 1 >= res.totalPages ? false : true,
        categoryId: e.detail.id,
      });
    });
    weekLive({
      categoryId:e.detail.id 
    }).then(res=>{
          this.setData({
            list: res.map(i=>({
              ...i,
              date:i.date.split('-')[2]
            }))
          })
    })
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
  goRecord() {
    wx.navigateTo({
      url: `/pages/live/index?categoryId=${this.data.categoryId}`,
    });
  }
});
