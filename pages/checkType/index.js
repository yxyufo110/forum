// pages/checkType/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  confirmType: function () {
    wx.navigateTo({
      url: '/pages/checkLevel/index',
    });
  },
});
