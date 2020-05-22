Component({
  options: {
    styleIsolation: 'shared',
  },
  properties: {
    title: { // 属性名
      type: String,
      value: '考粉驿站'
    },
    showLeft: { // 属性名
      type: Boolean,
      value: true
    },
    showTabs: { // 属性名
      type: Boolean,
      value: true
    },
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
