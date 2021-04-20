import { queryList } from '../../services/news';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    isIPX: false,
    pageNumber: 0, // 当前页码
    hasNextPage: false, // 是否有下一页
    info: [[]],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.isIPX) {
      this.setData({
        isIPX: true,
      });
    }
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 3,
      });
    }
    queryList({ page: this.data.pageNumber, size: 10 }).then((res) => {
      this.setData({
        [`info[0]`]: res.content,
        pageNumber: res.number + 1,
        hasNextPage: res.number + 1 >= res.totalPages ? false : true,
        categoryId: this.data.categoryId,
      });
    });
  },

  searchMore: function () {
    if (this.data.hasNextPage) {
      queryList({ page: this.data.pageNumber, size: 10 }).then((res) => {
        this.setData({
          [`info[${res.number + 1}]`]: res.content,
          pageNumber: res.number + 1,
          hasNextPage: res.number + 1 >= res.totalPages ? false : true,
          categoryId: this.data.categoryId,
        });
      });
    }
  },
  gonews: function (e) {
    wx.navigateTo({
      url: `/pages/news/detail/index?id=${e.currentTarget.dataset.id}`,
    });
  },
})