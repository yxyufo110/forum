// pages/topic/radio/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    radio: '1',
  },

  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },
});
