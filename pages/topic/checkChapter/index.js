// pages/checkType/index.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    subjectId: '',
    list: [],
  },
  onLoad: function (params) {
    let arr = app.globalData.subject.subjects.find((x) => x.id === params.subjectId).chapters;
    this.setData({
      subjectId: params.subjectId,
      list: arr,
    });
  },
  confirmType: function (e) {
    wx.navigateTo({
      url: `/pages/topic/radio/index?subjectId=${this.data.subjectId}&chapterName=${e.currentTarget.dataset.id}`,
    });
  },
  onClickLeft: function () {
    wx.navigateBack({
      delta: 1,
    });
  },
});
