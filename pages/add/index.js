import {addTopic} from '../../services/topic'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    title:'',
    loading:false,
  },
  onLoad: function (options) {
  },
  onChange(e){
    this.setData({
      content: e.detail.html
    })
    
  },
  back(){
    wx.navigateBack()
  },
  onChangeTitle(e){
    this.setData({
      title:e.detail
    })
  },
  submit(){
    if(!this.data.title || !this.data.content) {
      wx.showToast({
        title: '请输入标题和内容',
        icon:'none'
      })
    } else {
      this.setData({
        loading:true
      })
      wx.login({
        success: (lres) => {
          console.log(lres)
          addTopic({
            content:this.data.content,
            title:this.data.title,
            accessCode:lres.code
          }).then(res=>{
            wx.showToast({
              title: '发帖成功',
              icon:'none'
            })
            this.setData({
              loading:false
            })
            wx.navigateBack()
          }).catch(()=>{
            this.setData({
              loading:false
            }) 
          })
        },
      });
     
    }
  },
})