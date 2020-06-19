// pages/getLoaction/index.js
const QQMapWX = require('../../libs/qqmap-wx-jssdk.min');
let qqmapsdk;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    province: '',
    city: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    qqmapsdk = new QQMapWX({
      key: 'BW3BZ-J7L3P-YMXDJ-LARJE-XJLKT-2LFNB', // 必填
    });
    wx.getLocation({
      success: (res) => {
        //获取到经纬度
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude,
          },
          success: (location) => {
            //返回真实地理位置
            this.setData({
              province: location.result.address_component.province,
              city: location.result.address_component.city,
            });
          },
          fail: (error) => {
            wx.showToast({
              title: '获取定位失败，请手动选择',
              icon: 'none',
              duration: 1500,
              mask: true,
            });
          },
        });
      },
      fail: () => {
        wx.showToast({
          title: '获取定位失败，请手动选择',
          icon: 'none',
          duration: 1500,
          mask: true,
        });
      },
    });
  },
  openModal: function () {
    wx.navigateTo({
      url: '/pages/getLocation/checkCity',
      // url: '/pages/getLocation/index',
    });
  },
});
