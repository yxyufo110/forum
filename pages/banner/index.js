// pages/banner/index.js
import { getOneBanner } from '../../services/dict';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bannerInfo: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getOneBanner(options.id).then((res) => {
      this.setData({
        bannerInfo: res.content,
      });
    });
  },
});
