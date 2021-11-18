import { getUser,updateUsr,statistics } from '../../services/user';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show1:false,
    show2:false,
    show3:false,
    show4:false,
    show5:false,
    userInfo:{},
    hasUserInfo:true,
    cData:{},
    show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getUser().then(res=>{
      this.setData({
        userInfo: res,
        hasUserInfo: res.userName && res.avatar ? true : false,
      });
      if(res.userName && res.avatar){
        this.showText()
      }
    })
    statistics().then(res=>{
      this.setData({
        cData:res
      })
    })
 
  },
  showText(){
  setTimeout(()=>{
    this.setData({
      show1:true
    })
   },800)
   setTimeout(()=>{
    this.setData({
      show2:true
    })
   },1600)
   setTimeout(()=>{
    this.setData({
      show3:true
    })
   },2400)
   setTimeout(()=>{
    this.setData({
      show4:true
    })
   },3200)
   setTimeout(()=>{
    this.setData({
      show5:true
    })
   },4000)
  },
  getUserInfo(e){
    if (e.detail.userInfo) {
      // 获取用户授权成功
      // this.setData
      let params = {
        userName: e.detail.userInfo.nickName,
        avatar: e.detail.userInfo.avatarUrl,
        sex:e.detail.userInfo.gender
      };
      updateUsr(params).then((res) => {
        this.setData({
          userInfo: res,
          hasUserInfo: true,
        });
        if(res.userName && res.avatar){
          this.showText()
        }
      });
    }
  },
  pinkMe(){
    this.setData({
      show:!this.data.show
    })
  }
})