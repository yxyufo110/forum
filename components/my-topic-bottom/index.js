// components/my-topic-bottom/index.js
import { topicIsCollect, cancelCollect } from '../../services/topic';
// pages/course/detail/index.js
import { collect } from '../../services/course';
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
    questionId: {
      type: String,
      value: '',
    },
    name: {
      type: String,
      value: '',
    },
    haveShare: {
      type: Boolean,
      value: true,
    },
    haveCard: {
      type: Boolean,
      value: true,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    showCard: false,
    isLike: false,
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
      if (this.data.questionId) {
        topicIsCollect(this.data.questionId).then((res) => {
          this.setData({
            isLike: res,
          });
        });
      }
    },
    goLike: function () {
      collect({
        linkedCode: this.data.questionId,
        name: this.data.name,
        subject: this.data.subjectId,
        type: 'Question',
      }).then((res) => {
        this.setData({
          isLike: true,
        });
      });
    },
    noLike: function () {
      cancelCollect(this.data.questionId).then((res) => {
        this.setData({
          isLike: false,
        });
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
