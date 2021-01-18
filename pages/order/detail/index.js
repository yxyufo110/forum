import { getOrderDetail,rePay } from '../../../services/pay';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oneOrder:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getOrderDetail(options.id).then((res) => {
      this.setData({
        oneOrder:res
      });
    });
  },
  submit:function() {
    rePay({
      id:this.data.oneOrder.id,
      linkedCode: this.data.oneOrder.subjectId,
      payType: this.data.oneOrder.payType,
    }).then((res) => {
      if (this.data.payType === 'Wechat') {
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
})