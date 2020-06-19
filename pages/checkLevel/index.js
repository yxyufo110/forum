// pages/checkLevel/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {},
  confirmLevel: function () {
    wx.switchTab({
      url: '/pages/testBank/index',
    });
  },
});
