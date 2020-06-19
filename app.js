//app.js
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
    console.log('关闭');
  },
  onShow: function () {
    console.log('进入');
  },
  globalData: {
    userInfo: null,
    isIPX: false,
  },
});
