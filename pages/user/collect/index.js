import { getQuestion, getCollect } from '../../../services/dict';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 'Question',

    infoQ: [],
    pageNumber: 0, // 当前页码
    hasNextPage: false, // 是否有下一页
    info: [[]],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getQuestion().then((res) => {
      this.setData({
        infoQ: res,
      });
    });
    getCollect({ page: 0, size: 10, type: 'Course' }).then((res) => {
      this.setData({
        ['info[0]']: res.content,
        pageNumber: res.number + 1,
        hasNextPage: res.number + 1 >= res.totalPages ? false : true,
      });
    });
  },
  searchMore: function () {
    if (this.data.active !== 'Question') {
      if (this.data.hasNextPage) {
        getCollect({ page: this.data.pageNumber, size: 10, type: 'Course' }).then((res) => {
          this.setData({
            [`info[${res.number + 1}]`]: res.content,
            pageNumber: res.number + 1,
            hasNextPage: res.number + 1 >= res.totalPages ? false : true,
          });
        });
      }
    }
  },
  onChange: function (e) {
    this.setData({
      active: e.detail.name,
    });
  },
});
