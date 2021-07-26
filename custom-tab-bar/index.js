Component({
  data: {
    active: 0,
  },
  methods: {
    onChange(event) {
      switch (event.detail) {
        case 0:
          wx.switchTab({
            url: `/pages/testBank/index`,
          });
          break;
        case 1:
          wx.switchTab({
            url: `/pages/course/index`,
          });
          break;
        case 2:
          wx.switchTab({
            url: `/pages/customerService/index`,
          });
          break;
        case 3:
          wx.switchTab({
            url: `/pages/news/list/index`,
          });
          break;
        case 4:
            wx.switchTab({
              url: `/pages/user/index`,
            });
          break;
        default:
          break;
      }
    },
  },
});
