import { queryALl, getShareId } from '../../../services/course';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageNumber: 0, // 当前页码
    hasNextPage: false, // 是否有下一页
    info: [[]],
    categoryId: '',
    shareId: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let x = app.globalData.subject;
    getShareId({
      name: '课程',
      desc: '分享课程',
      linkedCode: x.id,
    }).then((res) => {
      this.setData({
        shareId: res,
      });
    });
    queryALl({ page: 0, size: 10, categoryId: x.id }).then((res) => {
      this.setData({
        ['info[0]']: res.content,
        pageNumber: res.number + 1,
        hasNextPage: res.number + 1 >= res.totalPages ? false : true,
        categoryId: x.id,
      });
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
      url: `/pages/course/detail/index?id=${e.currentTarget.dataset.id}&test=true`,
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '分享课程',
      path: `/pages/index/index?id=${this.data.shareId}&redirectUrl=/pages/course/index`,
    };
  },
});
