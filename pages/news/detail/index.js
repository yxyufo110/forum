// pages/banner/index.js
import { queryOne } from '../../../services/news';
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
    queryOne(options.id).then((res) => {
      this.setData({
        bannerInfo: res.content.replace(/\<img/gi, '<img class="rich-img" '),
      });
    });
  },
});
