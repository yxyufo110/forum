import { geTopic, getAnswer, handIn } from '../../../services/examine';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    radio: '',
    topicInfo: null,
    examineId: '',
    questionId: '',
    analysis: '',
    isMultiple: false,
    fontSize: '15px',
    testTime: 0,
    pkId: '',
  },
  onLoad: function (e) {
    this.setData({
      examineId: e.examineId || '',
      questionId: e.questionId || '',
      pkId: e.pkId,
      testTime: app.globalData.testTime * 1000,
      paperId: e.paperId,
    });
    geTopic({
      examineId: e.examineId || '',
      questionId: e.questionId || '',
    }).then((res) => {
      if (res.restriction === 2 && res.subjectId) {
        wx.redirectTo({
          url: `/pages/needPhone/index?subjectId=${res.subjectId}`,
        });
      } else if (res.restriction === 4 && res.subjectId) {
        wx.redirectTo({
          url: `/pages/needPhone/index?subjectId=${res.subjectId}&pop=true`,
        });
      }
      this.setData({
        topicInfo: res,
        isMultiple: res.type === 'MultipleChoice' ? true : false,
        fontSize: app.globalData.fontSize,
      });
    });
  },
  // 单选
  onChange: function (e) {
    this.setData({
      radio: e.detail,
    });
  },
  // 多选
  onChangeCheckBox: function (e) {
    this.setData({
      radio: e.detail,
    });
  },
  next: function () {
    // 提交
    getAnswer({
      questionId: this.data.questionId,
      examineId: this.data.examineId,
      answers: this.data.isMultiple ? this.data.radio : [this.data.radio],
    }).then((res) => {
      app.globalData.testTime = res.timeRemaining;
      if (res.questionId) {
        wx.redirectTo({
          url: `/pages/pk/radio/index?examineId=${res.id}&questionId=${res.questionId}&pkId=${this.data.pkId}`,
        });
      } else {
        wx.navigateTo({
          url: `/pages/pk/final/index?examineId=${res.id}&pkId=${this.data.pkId}`,
        });
      }
    });
  },

  changeFont: function (e) {
    app.globalData.fontSize = e.detail;
    this.setData({
      fontSize: e.detail,
    });
  },
});
