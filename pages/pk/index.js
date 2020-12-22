// pages/pk/index.js
import { getPkList } from '../../services/user';
import { isExamine, submitPk } from '../../services/examine';
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
    isExamine({
      type: 'PK',
      pkId: e.pkId || '',
    }).then((res) => {
      if (!res) {
        // if (e.pkId) {
        // submitPk({ pkId: e.pkId }).then((res) => {
        //   app.globalData.testTime = res.exam.timeRemaining;
        //   wx.redirectTo({
        //     url: `/pages/pk/radio/index?examineId=${res.exam.id}&questionId=${res.exam.questionId}&pkId=${e.pkId}`,
        //   });
        // });
        // } else {
        getPkList().then((res) => {
          this.setData({
            list: res,
          });
        });
        // }
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
            url: `/pages/pk/radio/index?examineId=${res.id}&questionId=${res.questionId}&pkId=${
              e.pkId || res.pkId
            }&subjectId=${res.subjectId}`,
          });
        } else {
          wx.redirectTo({
            url: `/pages/pk/final/index?examineId=${res.id}&pkId=${e.pkId || res.pkId}&subjectId=${
              res.subjectId
            }`,
          });
        }
      }
    });
  },
  goPk: function () {
    wx.navigateTo({
      url: `/pages/pk/sbuject/index`,
    });
  },
});
