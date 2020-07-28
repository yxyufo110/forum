const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    subjectInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      subjectInfo: app.globalData.subject,
    });
  },
  confirmType: function (e) {
    wx.redirectTo({
      url: `/pages/pk/rules/index?subjectId=${e.currentTarget.dataset.id}`,
    });
  },
});
