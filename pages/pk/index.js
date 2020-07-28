// pages/pk/index.js
import { getPkList } from '../../services/user';
import { isExamine, start } from '../../services/examine';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    if (e.pkId) {
      start({ ruleId: e.paperId }).then((res) => {
        app.globalData.testTime = res.timeRemaining;
        wx.redirectTo({
          url: `/pages/pk/radio/index?examineId=${res.id}&questionId=${res.questionId}&pkId=${e.pkId}`,
        });
      });
    } else {
      isExamine({
        type: 'PK',
      }).then((res) => {
        if (!res) {
          getPkList().then((res) => {
            this.setData({
              list: res,
            });
          });
        } else {
          wx.showToast({
            title: '请先完成正在进行的考试',
            icon: 'none',
            duration: 1500,
            mask: true,
          });
          app.globalData.testTime = res.timeRemaining;
          if (res.questionId) {
            wx.redirectTo({
              url: `/pages/mockExam/radio/index?examineId=${res.id}&questionId=${res.questionId}`,
            });
          } else {
            wx.redirectTo({
              url: `/pages/mockExam/final/index?examineId=${res.id}`,
            });
          }
        }
      });
    }
  },
  goPk: function () {
    wx.navigateTo({
      url: `/pages/pk/sbuject/index`,
    });
  },
});
