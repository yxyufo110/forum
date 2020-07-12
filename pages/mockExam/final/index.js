import { handIn } from '../../../services/examine';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    examineId: '',
    fontSize: '15px',
  },
  onLoad: function (e) {
    this.setData({
      examineId: e.examineId,
    });
  },

  submit: function () {
    handIn({ examineId: this.data.examineId }).then((res) => {
      wx.redirectTo({
        url: `/pages/mockExam/card/index?examineId=${this.data.examineId}&score=${res.score}`,
      });
    });
  },
  changeFont: function (e) {
    app.globalData.fontSize = e.detail;
    this.setData({
      fontSize: e.detail,
    });
  },
});
