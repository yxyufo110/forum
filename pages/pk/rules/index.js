import { getRules, submitPk, startPk } from '../../../services/examine';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    radio: '',
    ruleInfo: {},
    pkId: '',
    subjectId: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    getRules({ subjectId: e.subjectId }).then((res) => {
      this.setData({
        ruleInfo: res.content,
        subjectId: e.subjectId,
        radio: res.content[0].id,
      });
      startPk({ subjectId: e.subjectId, paperId: res.content[0].id }).then((res) => {
        this.setData({
          pkId: res.id,
        });
      });
    });
  },
  onChange: function (event) {
    startPk({ subjectId: this.data.subjectId, paperId: event.detail }).then((res) => {
      this.setData({
        radio: event.detail,
        pkId: res.id,
      });
    });
  },
  onClickLeft: function () {
    wx.navigateBack({
      delta: 1,
    });
  },
  onShareAppMessage: function () {
    if (this.data.radio) {
      submitPk({ pkId: this.data.pkId }).then((res) => {
        app.globalData.testTime = res.exam.timeRemaining;
        wx.redirectTo({
          url: `/pages/pk/radio/index?examineId=${res.exam.id}&questionId=${res.exam.questionId}&pkId=${this.data.pkId}&subjectId=${this.data.subjectId}`,
        });
      });
    }
    return {
      title: '分享考试PK',
      path: `/pages/index/index?pkId=${this.data.pkId}`,
    };
  },
});
