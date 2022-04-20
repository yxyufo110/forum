import {
  getUser,
  updateUsr,
} from '../../services/user';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: true,
    cData: {},
    show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getUser().then(res => {
      if(res.userName && res.avatar){
        app.globalData.userInfo = res
        wx.navigateTo({
          url: '/pages/index/index',
        })
      } else {
        this.setData({
          hasUserInfo:false
        })
      }
      // this.setData({
      //   userInfo: res,
      //   hasUserInfo: res.userName && res.avatar ? true : false,
      // });
      // if (res.userName && res.avatar) {
      //   this.showText()
      // }
    })


  },
  
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        if (res.userInfo) {
          // 获取用户授权成功
          // this.setData
          let params = {
            userName: res.userInfo.nickName,
            avatar: res.userInfo.avatarUrl,
            sex: res.userInfo.gender
          };
          updateUsr(params).then((res) => {
            app.globalData.userInfo = res
            wx.navigateTo({
              url: '/pages/index/index',
            })
          });
        }

      }
    })
  },

  pinkMe() {
    this.setData({
      show: !this.data.show
    })
  },
  onShareAppMessage: function () {
    return {
      title: '分享语音日记',
      path: `/pages/index/index`,
    };
  }

})
