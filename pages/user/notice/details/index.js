import { getNoticeOne } from '../../../../services/user';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    noticeInfo: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getNoticeOne(options.id).then((res) => {
      this.setData({
        noticeInfo: res.content,
      });
    });
  },
});
