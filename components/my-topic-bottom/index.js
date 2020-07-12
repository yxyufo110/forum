// components/my-topic-bottom/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    chapter: {
      type: String,
      value: '',
    },
    isTest: {
      type: Boolean,
      value: false,
    },
    examineId: {
      type: String,
      value: '',
    },
    subjectId: {
      type: String,
      value: '',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    showCard: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goDraw: function () {
      wx.navigateTo({
        url: '/pages/topic/draw/index',
      });
    },
    showMore: function () {
      this.setData({
        showCard: !this.data.showCard,
      });
    },
    goCard: function () {
      if (this.data.isTest) {
        wx.navigateTo({
          url: `/pages/mockExam/card/index?examineId=${this.data.examineId}`,
        });
      } else {
        wx.navigateTo({
          url: `/pages/topic/card/index?chapter=${this.data.chapter}&subjectId=${this.data.subjectId}`,
        });
      }
    },
    changeFont: function (e) {
      this.triggerEvent('changeFont', e.currentTarget.dataset.size);
    },
  },
});
