Component({
  methods: {
    goBack: function () {
      wx.navigateBack({
        delta: 1,
      });
    },
    goHome: function () {
      wx.switchTab({
        url: '/pages/testBank/index',
      });
    },
  },
  properties: {
    title: {
      // 属性名
      type: String,
      value: '',
    },
  },
});
