import { getNotice, red } from '../../../services/user';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageNumber: 0, // 当前页码
    hasNextPage: false, // 是否有下一页
    info: [[]],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    getNotice({ page: 0, size: 10 }).then((res) => {
      this.setData({
        ['info[0]']: res.content,
        pageNumber: res.number + 1,
        hasNextPage: res.number + 1 >= res.totalPages ? false : true,
      });
    });
  },
  searchMore: function () {
    if (this.data.hasNextPage) {
      getNotice({ page: this.data.pageNumber, size: 10 }).then((res) => {
        this.setData({
          [`info[${res.number + 1}]`]: res.content,
          pageNumber: res.number + 1,
          hasNextPage: res.number + 1 >= res.totalPages ? false : true,
        });
      });
    }
  },
  goDetails: function (e) {
    if (!e.currentTarget.dataset.status) {
      red(e.currentTarget.dataset.id);
    }
    wx.navigateTo({
      url: `/pages/user/notice/details/index?id=${e.currentTarget.dataset.id}`,
    });
  },
});
