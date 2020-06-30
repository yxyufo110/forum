// pages/course/detail/index.js
import { queryOne } from '../../../services/course';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    data: {
      course: {},
      oneData: {},
      chapters: [],
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    queryOne('5eef62d8d2b59271aa5c4b52').then((res) => {
      this.setData({
        course: res,
        oneData: res.chapters[0],
        chapters: res.chapters,
      });
    });
  },
  onChange(event) {
    console.log(this.data.chapters);
    let chapters = this.data.chapters;
    let id = event.currentTarget.dataset.id;
    this.setData({
      oneData: chapters.find((i) => i.id === id),
    });
  },
});
