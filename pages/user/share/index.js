import { getShareList, shareCount } from '../../../services/user';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activeNames: [],
    Course: [],
    Testbank: [],
    Tweets: [],
    effectiveHits: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getShareList().then((res) => {
      this.setData({
        Course: res.Course,
        Testbank: res.Testbank,
        Tweets: res.Tweets,
      });
    });
    shareCount().then((res) => {
      this.setData({
        effectiveHits: res.effectiveHits,
      });
    });
  },

  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
});
