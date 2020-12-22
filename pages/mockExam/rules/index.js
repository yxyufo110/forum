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
    subjectId: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    let categoryId = app.globalData.userInfo && app.globalData.userInfo.categories && app.globalData.userInfo.categories[0] ? app.globalData.userInfo.categories[0].categoryDetail.parentId :''
    if (e.isFinalTest) {
      getFinalRules({
        categoryId:categoryId
      }).then((res) => {
        this.setData({
          ruleInfo: res,
          isFinalTest: e.isFinalTest,
          subjectId: res[0].subjectId || '',
        });
      });
    } else {
      getRules({ subjectId: e.subjectId }).then((res) => {
        this.setData({
          ruleInfo: res.content,
          subjectId: res.content[0].subjectId || '',
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
            url: `/pages/mockExam/radio/index?examineId=${res.id}&questionId=${res.questionId}&subjectId=${this.data.subjectId}`,
          });
        });
      } else {
        start({ ruleId: this.data.radio }).then((res) => {
          app.globalData.testTime = res.timeRemaining;
          wx.redirectTo({
            url: `/pages/mockExam/radio/index?examineId=${res.id}&questionId=${res.questionId}&subjectId=${this.data.subjectId}`,
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
