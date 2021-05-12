// pages/pay/index.js
import { getSubjPayInfo, payOrder,payLive } from '../../services/pay';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    radio: 'Wechat',
    payInfo: '',
    subjectId: '',
    liveId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    
    getSubjPayInfo(e.subjectId).then((res) => {
      if(e.liveId) {
        res.yuan = e.price
      }
      this.setData({
        subjectId: e.subjectId,
        payInfo: res,
        liveId:e.liveId
      });
    });
  },

  submit: function () {
    if(this.data.liveId) {
      payLive({
        liveId: this.data.liveId,
        payType: this.data.radio,
      }).then((res) => {
        if (this.data.radio === 'Wechat') {
          wx.requestPayment({
            timeStamp: res.timeStamp,
            nonceStr: res.nonce_str,
            package: res.package,
            signType: res.signType,
            paySign: res.sign,
            success: function () {
              wx.showToast({
                title: '支付成功',
                icon: 'none',
                duration: 1500,
                mask: true,
              });
              wx.navigateBack({
                delta: 1,
              });
            },
          });
        } else {
          if (res.code === '1') {
            wx.showToast({
              title: '支付成功',
              icon: 'none',
              duration: 1500,
              mask: true,
            });
            wx.navigateBack({
              delta: 1,
            });
          } else {
            wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 1500,
              mask: true,
            });
          }
        }
      });
    } else {
      payOrder({
        linkedCode: this.data.subjectId,
        payType: this.data.radio,
      }).then((res) => {
        if (this.data.radio === 'Wechat') {
          wx.requestPayment({
            timeStamp: res.timeStamp,
            nonceStr: res.nonce_str,
            package: res.package,
            signType: res.signType,
            paySign: res.sign,
            success: function () {
              wx.showToast({
                title: '支付成功',
                icon: 'none',
                duration: 1500,
                mask: true,
              });
              wx.navigateBack({
                delta: 1,
              });
            },
          });
        } else {
          if (res.code === '1') {
            wx.showToast({
              title: '支付成功',
              icon: 'none',
              duration: 1500,
              mask: true,
            });
            wx.navigateBack({
              delta: 1,
            });
          } else {
            wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 1500,
              mask: true,
            });
          }
        }
      });
    }
  
  },

  onChange: function (event) {
    this.setData({
      radio: event.detail,
    });
  },
});
