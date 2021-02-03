// pages/needPhone/index.js
import { updateUsr } from '../../services/user';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pop: false,
    subjectId: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.pop) {
      this.setData({
        pop: true,
        subjectId: options.subjectId,
      });
    } else {
      this.setData({
        pop: false,
        subjectId: options.subjectId,
      });
      wx.login({
        success: (res) => {
          wx.request({
            url: `http://139.186.36.207:8443/student/stu/student/login/${res.code}`,
            method: 'post',
            success: function (res2) {
              wx.setStorageSync('Authorization', res2.header.Authorization);
              app.globalData.userInfo = res2.data;
            },
            fail: function (err) {
              wx.showToast({
                title: '登录失败',
                icon: 'none',
                duration: 1500,
                mask: true,
              });
            },
          });
        },
      });
    }
  },

  getPhone: function (e) {
    if (e.detail.iv) {
      updateUsr({ iv: e.detail.iv, phoneNum: e.detail.encryptedData }).then((res) => {
        app.globalData.userInfo = res;
        wx.navigateBack({
          delta: 1,
        });
      });
    }
  },
  goPay: function () {
    wx.redirectTo({
      url: `/pages/pay/index?subjectId=${this.data.subjectId}`,
    });
  },
});
