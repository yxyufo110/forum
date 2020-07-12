import { geTopic, getAnswer } from '../../../services/topic';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    radio: '',
    topicInfo: null,
    subjectId: '',
    questionId: '',
    chapter: '',
    analysis: '',
    showNext: false,
    nextId: '',
    isMultiple: false,
    fontSize: '15px',
  },
  onLoad: function (e) {
    console.log(e);
    geTopic({
      subjectId: e.subjectId || '',
      chapter: e.chapterName || '',
      questionId: e.questionId || '',
    }).then((res) => {
      this.setData({
        topicInfo: res,
        subjectId: e.subjectId || '',
        questionId: e.questionId || '',
        chapter: e.chapterName || '',
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
  submit: function () {
    // 提交
    getAnswer({
      questionId: this.data.topicInfo.id,
      answers: this.data.isMultiple ? this.data.radio : [this.data.radio],
    }).then((res) => {
      let newObj = this.data.topicInfo;
      newObj.answers.forEach((i) => {
        if (res.answers.find((x) => x.number === i.number)) {
          i.right = true;
        }
      });
      this.setData({
        topicInfo: newObj,
        analysis: res.analysis,
        showNext: true,
        nextId: res.next ? res.next.id : '',
      });
    });
  },
  next: function () {
    if (this.data.nextId) {
      wx.navigateTo({
        url: `/pages/topic/radio/index?subjectId=${this.data.subjectId}&questionId=${this.data.nextId}&chapterName=${this.data.chapter}`,
      });
    } else {
      wx.showToast({
        title: '已经是最后一题了',
        icon: 'none',
        duration: 1500,
        mask: true,
      });
    }
  },
  changeFont: function (e) {
    app.globalData.fontSize = e.detail;
    this.setData({
      fontSize: e.detail,
    });
  },
});
