// pages/checkType/index.js
import { isExamine } from '../../services/examine';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    subjectInfo: {},
    isTest: false,
  },
  onLoad: function (e) {
    isExamine().then((res) => {
      if (!res) {
        app.globalData.testTime = 0;
        // 没有正在进行的考试，进行科目选择
        if (e.isFinalTest) {
          wx.redirectTo({
            url: `/pages/mockExam/rules/index?isFinalTest=true`,
          });
        } else {
          this.setData({
            subjectInfo: app.globalData.subject,
            isTest: false,
          });
        }
      } else {
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
  },
  confirmType: function (e) {
    wx.redirectTo({
      url: `/pages/mockExam/rules/index?subjectId=${e.currentTarget.dataset.id}`,
    });
  },
  onClickLeft: function () {
    wx.navigateBack({
      delta: 1,
    });
  },
});
