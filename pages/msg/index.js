import {
  getMsg
} from '../../services/topic';
Page({

  
  data: {
    list:[]
  },

  
  onLoad: function (options) {

  },
  back(){
    wx.navigateBack()
  },

  onShareAppMessage: function () {
    return {
      title: '分享',
      path: `/pages/me/index`,
    };
  },
})