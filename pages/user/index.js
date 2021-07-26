//index.js
//获取应用实例
import {
  updateUsr,
  getUserInfos,
  getQrCode
} from '../../services/user';
const app = getApp();

Page({
  data: {
    userInfo: {},
    hasUserInfo: true,
    isIPX: false,
    imgUrl: '',
    show: false
  },
  onShow: function () {
    getUserInfos().then((res) => {
      this.setData({
        userInfo: res,
        hasUserInfo: res.username && res.avatarUrl ? true : false,
      });
      app.globalData.userInfo = res;
    });
  },
  onLoad: function () {
    if (app.globalData.isIPX) {
      this.setData({
        isIPX: true,
      });
    }
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 4,
      });
    }
    getQrCode().then(res => {
      this.setData({
        imgUrl: res.qrCodeUrl
      })
    })
  },
  getUserInfo: function (e) {
    if (e.detail.userInfo) {
      // 获取用户授权成功
      // this.setData
      let params = {
        username: e.detail.userInfo.nickName,
        avatarUrl: e.detail.userInfo.avatarUrl,
      };
      updateUsr(params).then((res) => {
        app.globalData.userInfo = res;
        this.setData({
          userInfo: res,
          hasUserInfo: true,
        });
      });
    }
  },
  goEdit: function () {
    wx.navigateTo({
      url: '/pages/user/edit/index',
    });
  },
  goRecord: function () {
    wx.navigateTo({
      url: '/pages/user/record/index',
    });
  },
  goNotice: function () {
    wx.navigateTo({
      url: '/pages/user/notice/index',
    });
  },
  goShare: function () {
    wx.navigateTo({
      url: '/pages/user/share/index',
    });
  },
  goOrder: function () {
    wx.navigateTo({
      url: '/pages/order/index',
    });
  },
  goWalet: function () {
    wx.navigateTo({
      url: '/pages/user/walet/index',
    });
  },
  goCollect: function () {
    wx.navigateTo({
      url: '/pages/user/collect/index',
    });
  },
  getPhone: function (e) {
    if (e.detail.iv) {
      updateUsr({
        iv: e.detail.iv,
        phoneNum: e.detail.encryptedData
      }).then((res) => {
        app.globalData.userInfo = res;
        wx.navigateBack({
          delta: 1,
        });
      });
    }
  },
  onShareAppMessage: function () {
    return {
      title: '分享考粉驿站',
      path: `/pages/index/index`,
      imageUrl: this.data.imgUrl
    };
  },
  onShareTimeline: function () {
    return {
      title: '分享考粉驿站',
      path: `/pages/index/index`,
      imageUrl: this.data.imgUrl
    };
  },
  share: function () {
    this.setData({
      show: true
    })
  },
  onClose: function () {
    this.setData({
      show: false
    })
  },
  onConfirm: function () {
    /**
     * 下载图标到相册
     */
    //获取相册授权
    let imgSrc = this.data.imgUrl //要保存的图片url
    wx.showLoading({
      title: '保存中...'
    })
    wx.downloadFile({ //下载文件资源到本地
      url: imgSrc,
      success: function (res) {
        console.log(res);
        //图片保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            wx.hideLoading()
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
            this.setData({
              show: false
            })
          },
          fail: function (err) {
            console.log(err);
            // $yjpToast.show({
            //   text: `保存失败`
            // })
            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail:auth denied") {
              console.log("当初用户拒绝，再次发起授权")
              wx.showModal({
                title: '提示',
                content: '需要您授权保存相册',
                showCancel: false,
                success: modalSuccess => {
                  wx.openSetting({
                    success(settingdata) {
                      console.log("settingdata", settingdata)
                      if (settingdata.authSetting['scope.writePhotosAlbum']) {
                        wx.showModal({
                          title: '提示',
                          content: '获取权限成功,再次点击图片即可保存',
                          showCancel: false,
                        })
                      } else {
                        wx.showModal({
                          title: '提示',
                          content: '获取权限失败，将无法保存到相册哦~',
                          showCancel: false,
                        })
                      }
                    },
                    fail(failData) {
                      console.log("failData", failData)
                    },
                    complete(finishData) {
                      console.log("finishData", finishData)
                    }
                  })
                }
              })
            }
          },
          complete(res) {
            console.log(res);
            wx.hideLoading()
          }
        })


      }

    })
  }
});
