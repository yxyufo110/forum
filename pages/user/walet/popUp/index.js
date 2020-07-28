import { getPopList } from '../../../../services/pay';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageNumber: 0, // 当前页码
    hasNextPage: false, // 是否有下一页
    info: [[]],
    total: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getPopList({ page: 0, size: 10, orderType: 'TopUp', status: 'Payed' }).then((res) => {
      this.setData({
        total: options.total,
        ['info[0]']: res.content,
        pageNumber: res.number + 1,
        hasNextPage: res.number + 1 >= res.totalPages ? false : true,
      });
    });
  },
  searchMore: function () {
    if (this.data.hasNextPage) {
      getPopList({
        page: this.data.pageNumber,
        size: 10,
        orderType: 'TopUp',
        status: 'Payed',
      }).then((res) => {
        this.setData({
          [`info[${res.number + 1}]`]: res.content,
          pageNumber: res.number + 1,
          hasNextPage: res.number + 1 >= res.totalPages ? false : true,
        });
      });
    }
  },
});
