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
    subjectId: '',
  },
  onLoad: function (e) {
    this.setData({
      examineId: e.examineId || '',
      questionId: e.questionId || '',
      subjectId: e.subjectId,
      pkId: e.pkId,
      testTime: app.globalData.testTime * 1000,
    });
    geTopic({
      examineId: e.examineId || '',
      questionId: e.questionId || '',
    }).then((res) => {
      this.setData({
        topicInfo: res,
        isMultiple: res.type === 'MultipleChoice' || res.type === 'ShortAnswer' ? true : false,
        radio:
          res.type === 'MultipleChoice' || res.type === 'ShortAnswer'
            ? res.latestAnswers
            : res.latestAnswers[0],
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
      answers: this.data.isMultiple
        ? this.data.radio
          ? this.data.radio
          : ['']
        : [this.data.radio],
    }).then((res) => {
      app.globalData.testTime = res.timeRemaining;
      if (res.questionId) {
        wx.redirectTo({
          url: `/pages/pk/radio/index?examineId=${res.id}&questionId=${res.questionId}&pkId=${this.data.pkId}&subjectId=${res.subjectId}`,
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
