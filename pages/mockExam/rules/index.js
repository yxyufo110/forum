import { getRules, start, getFinalRules, startFinal } from '../../../services/examine';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    radio: '',
    ruleInfo: {},
    isFinalTest: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    if (e.isFinalTest) {
      getFinalRules().then((res) => {
        this.setData({
          ruleInfo: res,
          isFinalTest: e.isFinalTest,
        });
      });
    } else {
      getRules({ subjectId: e.subjectId }).then((res) => {
        this.setData({
          ruleInfo: res.content,
        });
      });
    }
  },
  onChange: function (event) {
    this.setData({
      radio: event.detail,
    });
  },
  submit: function () {
    if (this.data.radio) {
      if (this.data.isFinalTest) {
        startFinal({ paperId: this.data.radio }).then((res) => {
          app.globalData.testTime = res.timeRemaining;
          wx.redirectTo({
            url: `/pages/mockExam/radio/index?examineId=${res.id}&questionId=${res.questionId}`,
          });
        });
      } else {
        start({ ruleId: this.data.radio }).then((res) => {
          app.globalData.testTime = res.timeRemaining;
          wx.redirectTo({
            url: `/pages/mockExam/radio/index?examineId=${res.id}&questionId=${res.questionId}`,
          });
        });
      }
    }
  },
  onClickLeft: function () {
    wx.navigateBack({
      delta: 1,
    });
  },
});
