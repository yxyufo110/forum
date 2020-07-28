// pages/user/walet/index.js
import { popUp, getMyCount } from '../../../services/pay';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    value: '',
    info: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getMyCount().then((res) => {
      this.setData({
        info: res,
      });
    });
  },

  recharge: function () {
    this.setData({
      show: true,
      value: '',
    });
  },
  onChange: function (e) {
    this.setData({
      value: e.detail,
    });
  },
  onClose: function () {
    this.setData({
      show: false,
      value: '',
    });
  },
  submit: function () {
    this.setData({
      show: false,
    });
    if (this.data.value) {
      popUp({
        price: this.data.value,
      }).then((res) => {
        wx.requestPayment({
          timeStamp: res.timeStamp,
          nonceStr: res.nonce_str,
          package: res.package,
          signType: res.signType,
          paySign: res.sign,
          success: function () {
            wx.showToast({
              title: '充值成功',
              icon: 'none',
              duration: 1500,
              mask: true,
              success: function () {
                getMyCount().then((res) => {
                  this.setData({
                    info: res,
                  });
                });
              },
            });
          },
        });
      });
    }
  },
});
