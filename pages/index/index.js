//index.js
//获取应用实例
const app = getApp();

Page({
  onLoad: function () {
    // 登录
    wx.login({
      success: (res) => {
        console.log(res);
        wx.request({
          url: `http://139.186.36.207/student/stu/student/login/${res.code}`,
          method: 'post',
          success: function (res2) {
            wx.setStorageSync('Authorization', res2.header.Authorization);
            app.globalData.userInfo = res2.data;
            wx.switchTab({
              // url: '/pages/course/detail/index',
              url: '/pages/user/index',
            });
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
