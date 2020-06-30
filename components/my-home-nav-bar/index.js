Component({
  methods: {
    goBack: function () {
      wx.navigateBack({
        delta: 1,
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
