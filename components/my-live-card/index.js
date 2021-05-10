// components/my-live-card/index.js
Component({
  properties: {
    value: Array,
    showRecord:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
      checkIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    checkDay(e) {
      this.setData({
        checkIndex:e.currentTarget.dataset.index
      })
    },
    goRecord() {
      wx.navigateTo({
        url: `/pages/live/index`,
      });
    },
    goPlay(e) {
      wx.navigateTo({
        url: `/pages/live/liveRoom/index?id=${e.currentTarget.dataset.item.id}`,
      })
    }
  },
  lifetimes:{
    attached() {
      console.log(this.data)
    }
  }
})
