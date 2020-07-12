//index.js
//获取应用实例
const app = getApp();

Page({
  onLoad: function () {
    // 登录
    wx.login({
      success: (res) => {
        wx.request({
          url: `http://129.28.204.69/student/stu/student/login/${res.code}`,
          method: 'post',
          success: function (res2) {
            wx.setStorageSync('Authorization', res2.header.Authorization);
            app.globalData.userInfo = res2.data;
            if (!res2.data.addr) {
              wx.redirectTo({
                url: '/pages/getLocation/index',
              });
            } else if (!res2.data.categories) {
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
