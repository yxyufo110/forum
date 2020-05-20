Component({
  data: {
    active: 0,
  },
  methods: {
    onChange(event) {
      console.log(event.detail);
      switch (event.detail) {
        case 0:
          wx.switchTab({
            url: `/pages/index/index`,
          });
          break;
        case 1:
          wx.switchTab({
            url: `/pages/course/index`,
          });
          break;
        default:
          break;
      }
    },
  },
});
