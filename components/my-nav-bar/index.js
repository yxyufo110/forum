Component({
  options: {
    styleIsolation: 'shared',
  },
  properties: {
    title: {
      // 属性名
      type: String,
      value: '考粉驿站',
    },
    showLeft: {
      // 属性名
      type: Boolean,
      value: true,
    },
    showHome: {
      // 属性名
      type: Boolean,
      value: false,
    },
    showTabs: {
      // 属性名
      type: Boolean,
      value: true,
    },
  },
  methods: {},
});
