// pages/checkType/index.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    subjectInfo: {},
    type: '',
  },
  onLoad: function (params) {
    this.setData({
      subjectInfo: app.globalData.subject,
      type: params.type,
    });
  },
  confirmType: function (e) {
    if (this.data.type === 'chapter') {
      wx.navigateTo({
        url: `/pages/topic/checkChapter/index?subjectId=${e.currentTarget.dataset.id}`,
      });
    } else {
      wx.navigateTo({
        url: `/pages/topic/radio/index?subjectId=${e.currentTarget.dataset.id}`,
      });
    }
  },
  onClickLeft: function () {
    wx.navigateBack({
      delta: 1,
    });
  },
});
