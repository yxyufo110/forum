import { geTopic, getAnswer, handIn } from '../../../services/examine';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    radio: '',
    topicInfo: {},
    examineId: '',
    questionId: '',
    analysis: '',
    isMultiple: false,
    fontSize: '15px',
    testTime: 0,
    subjectId: '',
  },
  dealAnswers: function (a, b, c) {
    // a -> radio
    //  b-> right
    //  c->all
    if (a && b && c) {
      return c.map((i) => ({
        ...i,
        status:
          a.indexOf(i.number) < 0
            ? b.find((x) => x.number === i.number)
              ? 'right'
              : ''
            : b.find((x) => x.number === i.number)
            ? 'right'
            : 'error',
      }));
    } else {
      return c;
    }
  },
  onLoad: function (e) {
    this.setData({
      examineId: e.examineId || '',
      questionId: e.questionId || '',
      testTime: app.globalData.testTime * 1000,
      subjectId: e.subjectId,
    });
    geTopic({
      examineId: e.examineId || '',
      questionId: e.questionId || '',
    }).then((res) => {
      res.answers =   this.dealAnswers(res.latestAnswers, res.rightAnswers, res.answers),
      console.log(res)
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
    this.next();
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
          url: `/pages/mockExam/radio/index?examineId=${res.id}&questionId=${res.questionId}&subjectId=${res.subjectId}`,
        });
      } else {
        wx.navigateTo({
          url: `/pages/mockExam/final/index?examineId=${res.id}`,
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
