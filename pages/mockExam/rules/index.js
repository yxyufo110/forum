import { getRules, start } from '../../../services/examine';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    radio: '',
    ruleInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    getRules({ subjectId: e.subjectId }).then((res) => {
      this.setData({
        ruleInfo: res.content,
      });
    });
  },
  onChange: function (event) {
    this.setData({
      radio: event.detail,
    });
  },
  submit: function () {
    if (this.data.radio) {
      start(this.data.radio).then((res) => {
        wx.navigateTo({
          url: `/pages/mockExam/radio/index?examineId=${res.id}&questionId=${res.questionId}`,
        });
      });
    }
  },
  onClickLeft: function () {
    wx.navigateBack({
      delta: 1,
    });
  },
});
