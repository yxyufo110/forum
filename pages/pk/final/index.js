import { handIn, finalPk } from '../../../services/examine';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    examineId: '',
    fontSize: '15px',
    pkId: '',
  },
  onLoad: function (e) {
    this.setData({
      examineId: e.examineId,
      pkId: e.pkId,
    });
  },

  submit: function () {
    handIn({ examineId: this.data.examineId }).then((res) => {
      if (this.data.pkId) {
        finalPk({ pkId: this.data.pkId });
      }
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
