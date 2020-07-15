// pages/checkType/index.js
import { statistics } from '../../../services/problem';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },
  onLoad: function (params) {
    statistics().then((res) => {
      this.setData({
        list: res,
      });
    });
  },
  confirmType: function (e) {
    wx.redirectTo({
      url: `/pages/errorQuestion/radio/index?subjectId=${e.currentTarget.dataset.id}`,
    });
  },
  onClickLeft: function () {
    wx.navigateBack({
      delta: 1,
    });
  },
});
