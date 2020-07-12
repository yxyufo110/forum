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
  },
  onLoad: function (e) {
    this.setData({
      examineId: e.examineId || '',
      questionId: e.questionId || '',
    });
    geTopic({
      examineId: e.examineId || '',
      questionId: e.questionId || '',
    }).then((res) => {
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
      if (res.questionId) {
        wx.navigateTo({
          url: `/pages/mockExam/radio/index?examineId=${res.id}&questionId=${res.questionId}`,
        });
      } else {
        wx.navigateTo({
          url: `/pages/mockExam/final/index?examineId=${res.id}`,
        });
        // this.setData({
        //   showNext: false,
        // });
        // wx.showToast({
        //   title: '已经是最后一题了',
        //   icon: 'none',
        //   duration: 1500,
        //   mask: true,
        // });
      }
    });
  },
  // submit: function () {
  //   handIn({ examineId: this.data.examineId }).then((res) => {
  //     console.log(res);
  //   });
  // },
  changeFont: function (e) {
    app.globalData.fontSize = e.detail;
    this.setData({
      fontSize: e.detail,
    });
  },
});
