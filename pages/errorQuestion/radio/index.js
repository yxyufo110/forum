import { getQuestion, getAnswer, remove } from '../../../services/problem';
import { getShareId } from '../../../services/topic';
import { collect } from '../../../services/course';
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
    shareId: '',
  },
  onLoad: function (e) {
    getQuestion({
      subjectId: e.subjectId || '',
      questionId: e.questionId || '',
    }).then((res) => {
      if (!res) {
        getShareId({
          name: '题库',
          desc: '分享题库',
          linkedCode: `subjectId=${e.subjectId}&questionId=${e.questionId}`,
        }).then((res) => {
          this.setData({
            shareId: res,
          });
        });
      }
      this.setData({
        topicInfo: res,
        subjectId: e.subjectId || '',
        questionId: res.id || '',
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
  deleteQuestion: function (e) {
    remove(this.data.questionId).then((res) => {
      wx.showToast({
        title: '移出成功',
        icon: 'none',
        duration: 1500,
        mask: true,
      });
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
      wx.redirectTo({
        url: `/pages/errorQuestion/radio/index?subjectId=${this.data.subjectId}&questionId=${this.data.nextId}`,
      });
    } else {
      this.setData({
        topicInfo: null,
      });
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
  goHome: function () {
    wx.switchTab({
      url: '/pages/testBank/index',
    });
  },
  collage: function () {
    collect({
      linkedCode: `subjectId=${this.data.subjectId}&chapterName=${this.data.chapter}&questionId=${this.data.questionId}`,
      name: '题库',
      subject: this.data.subjectId,
      type: 'Question',
    }).then((res) => {
      wx.showToast({
        title: '收藏成功',
        icon: 'none',
        duration: 1500,
        mask: true,
      });
    });
  },
  onShareAppMessage: function (e) {
    return {
      title: '分享题库',
      path: `/pages/index/index?id=${this.data.shareId}&redirectUrl=/pages/testBank/index`,
    };
  },
});
