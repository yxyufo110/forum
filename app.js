//app.js
import { lyOut } from './services/user';
App({
  onLaunch: function () {
    // 判断设备是不是ipx
    wx.getSystemInfo({
      success: (res) => {
        if (res.model.search('iPhone X') != -1) {
          this.globalData.isIPX = true;
        }
      },
    });
  },
  onHide: function () {
    lyOut();
  },
  globalData: {
    userInfo: null,
    isIPX: false,
    subject: null,
    fontSize: '15px',
    testTime: 0,
  },
});
