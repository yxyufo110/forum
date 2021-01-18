// pages/login/confirm/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    confirmInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      confirmInfo:app.globalData.userInfo
    })
  },
  onClickLeft:function(){
    wx.navigateBack()
  },
  submit:function(){
    wx.redirectTo({
      url: '/pages/index/index',
    })
  }
})