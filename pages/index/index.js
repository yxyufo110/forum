//index.js
import { backShare, backPk } from '../../services/user';
//获取应用实例
const app = getApp();

Page({
  onLoad: function (e) {
    // 登录
    wx.login({
      success: (res) => {
        wx.request({
          url: `https://gateway.yuandong-edu.com/student/stu/student/login/${res.code}`,
          method: 'post',
          success: function (res2) {
            wx.setStorageSync('Authorization', res2.header.Authorization);
            app.globalData.userInfo = res2.data;
            if (e.id) {
              backShare({ shareId: e.id });
            }
            if (e.pkId) {
              backPk({
                pkId: e.pkId,
              }).then((x) => {
                app.globalData.testTime = x.exam.timeRemaining;
                wx.redirectTo({
                  url: `/pages/pk/radio/index?examineId=${x.exam.id}&questionId=${x.exam.questionId}&pkId=${e.pkId}`,
                });
              });
            } else if (!res2.data.area) {
              wx.redirectTo({
                url: '/pages/getLocation/index',
              });
            } else if (!res2.data.categories || !res2.data.categories[0]) {
              wx.redirectTo({
                url: '/pages/checkDirection/index',
              });
            } else {
              wx.switchTab({
                url: '/pages/testBank/index',
              });
            }
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
  },
});
