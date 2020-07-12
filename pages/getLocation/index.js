// pages/getLoaction/index.js
const QQMapWX = require('../../libs/qqmap-wx-jssdk.min');
import { citiesList } from '../../services/dict';
import { updateUsr } from '../../services/user';
const app = getApp();
let qqmapsdk;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    province: '',
    city: '',
    district: '',
    show: false,
    areaList: {},
    check: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    qqmapsdk = new QQMapWX({
      key: 'BW3BZ-J7L3P-YMXDJ-LARJE-XJLKT-2LFNB', // 必填
    });
    citiesList().then((res) => {
      this.setData({
        areaList: {
          province_list: res.provinces,
          city_list: res.cities,
          county_list: res.areas,
        },
      });
      this.getWxLocation(res);
    });
  },
  openModal: function () {
    this.setData({
      show: true,
    });
  },
  onClose: function () {
    this.setData({
      show: false,
    });
  },
  changeCity: function (e) {
    this.setData({
      check: e.detail.values,
      show: false,
    });
  },
  submit: function () {
    let params = {
      province: this.data.check[0].name,
      city: this.data.check[1].name,
      addr: this.data.check[2].name,
    };
    updateUsr(params).then((res) => {
      app.globalData.userInfo = res;
      wx.navigateTo({
        url: '/pages/checkDirection/index',
      });
    });
  },
  getWxLocation: function (cList) {
    wx.getLocation({
      success: (res) => {
        //获取到经纬度
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude,
          },
          success: (location) => {
            let l = location.result.address_component;

            //返回真实地理位置
            let pIndex = Object.keys(cList.provinces).find(
              (i) => cList.provinces[i] === l.province,
            );
            let cIndex = Object.keys(cList.cities).find(
              (i) => i.toString().indexOf(pIndex) >= 0 && cList.cities[i] === l.city,
            );
            let aIndex = Object.keys(cList.areas).find(
              (i) => i.toString().indexOf(cIndex) >= 0 && cList.areas[i] === l.district,
            );
            this.setData({
              province: l.province,
              city: l.city,
              district: l.district,
              check: [
                {
                  code: pIndex,
                  name: cList.provinces[pIndex],
                },
                {
                  code: cIndex,
                  name: cList.cities[cIndex],
                },
                {
                  code: aIndex,
                  name: cList.areas[aIndex],
                },
              ],
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
});
