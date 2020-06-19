// pages/checkDirection/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {},
  confirmDirection: function () {
    wx.navigateTo({
      url: '/pages/checkType/index',
    });
  },
});
