// pages/professionRadio/index.js
Page({
  data: {
    radio: '1',
  },
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },
});
