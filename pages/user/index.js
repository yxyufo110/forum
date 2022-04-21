import {
  getUser,
} from '../../services/user';
import {
  getMsg
} from '../../services/topic';

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    nums:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    getUser().then(res => {
        app.globalData.userInfo = res
        this.setData({
          userInfo:app.globalData.userInfo
        })
    })
    getMsg().then(res=>{
      this.setData({
        nums:res.totalElements
      })
    })
  },
  changeTab(e){
    console.log(e)
    if(e.detail == 0) {
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }
  },
  onShareAppMessage: function () {
    return {
      title: '分享',
      path: `/pages/me/index`,
    };
  },
})