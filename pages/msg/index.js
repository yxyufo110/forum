import {
  getMsg,
  putMsg
} from '../../services/topic';
Page({

  
  data: {
    list:[]
  },

  
  onLoad: function (options) {
    getMsg({
      size:9999
    }).then(res=>{
      this.setData({
        list:res.content
      })
    })
  },
  back(){
    wx.navigateBack()
  },
  goTopic(e){
    console.log(e)
    putMsg(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/detail/index?id='+e.currentTarget.dataset.topicid,
    })
  },

  onShareAppMessage: function () {
    return {
      title: '分享',
      path: `/pages/me/index`,
    };
  },
})