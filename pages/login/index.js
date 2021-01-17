// pages/login/index.js
import { updateUsr } from '../../services/user';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getPhone: function (e) {
    if (e.detail.iv) {
      updateUsr({ iv: e.detail.iv, phoneNum: e.detail.encryptedData }).then((res) => {
        app.globalData.userInfo = res;
        if(!res.importDataCategory) {
          wx.redirectTo({
            url: '/pages/index/index',
          })
        }
      });
    }
  },
  backHome:function(e) {
    wx.redirectTo({
      url: '/pages/getLocation/index',
    });
  }
})