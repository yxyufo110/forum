Component({
  options: {
    styleIsolation: 'shared',
  },
  methods: {
    onClickLeft() {
      wx.showToast({ title: '点击返回', icon: 'none' });
    },
    onClickRight() {
      wx.showToast({ title: '点击按钮', icon: 'none' });
    },
  },
});
