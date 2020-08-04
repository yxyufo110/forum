// components/my-topic-bottom/index.js
import { topicIsCollect, cancelCollect } from '../../services/topic';
// pages/course/detail/index.js
import { collect } from '../../services/course';
var content = null;
var touchs = [];
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
    isErr: {
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
    pkId: {
      type: String,
      value: '',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    showCard: false,
    isLike: false,
    imgList: [],
    signImage: '',
    showDraw: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goDraw: function () {
      if (!this.data.showDraw) {
        content = wx.createCanvasContext('sign', this);
        //设置线的颜色
        content.setStrokeStyle('#000');
        //设置线的宽度
        content.setLineWidth(3);
        //设置线两端端点样式更加圆润
        content.setLineCap('round');
        //设置两条线连接处更加圆润
        content.setLineJoin('round');
      }
      this.setData({
        showDraw: true,
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
        wx.redirectTo({
          url: `/pages/mockExam/card/index?examineId=${this.data.examineId}`,
        });
      } else if (this.data.pkId) {
        wx.redirectTo({
          url: `/pages/mockExam/card/index?examineId=${this.data.examineId}&pkId=${this.data.pkId}`,
        });
      } else if (this.data.isErr) {
        wx.redirectTo({
          url: `/pages/errorQuestion/card/index?chapter=${this.data.chapter}&subjectId=${this.data.subjectId}`,
        });
      } else {
        wx.redirectTo({
          url: `/pages/topic/card/index?chapter=${this.data.chapter}&subjectId=${this.data.subjectId}`,
        });
      }
    },
    changeFont: function (e) {
      this.triggerEvent('changeFont', e.currentTarget.dataset.size);
    },
    //  绘画

    // 画布的触摸移动开始手势响应
    start: function (event) {
      //获取触摸开始的 x,y
      let point = { x: event.changedTouches[0].x, y: event.changedTouches[0].y };
      touchs.push(point);
    },
    // 画布的触摸移动手势响应
    move: function (e) {
      let point = { x: e.touches[0].x, y: e.touches[0].y };
      touchs.push(point);
      if (touchs.length >= 2) {
        this.draw(touchs);
      }
    },
    // 画布的触摸移动结束手势响应
    end: function (e) {
      //清空轨迹数组
      for (let i = 0; i < touchs.length; i++) {
        touchs.pop();
      }
    },
    // 画布的触摸取消响应
    cancel: function (e) {},
    // 画布的长按手势响应
    tap: function (e) {
      console.log('长按手势' + e);
    },
    error: function (e) {
      console.log('画布触摸错误' + e);
    },
    //绘制
    draw: function (touchs) {
      let point1 = touchs[0];
      let point2 = touchs[1];
      touchs.shift();
      content.moveTo(point1.x, point1.y);
      content.lineTo(point2.x, point2.y);
      content.stroke();
      content.draw(true);
    },
    //清除操作
    clearClick: function () {
      console.log(1231231);
      //清除画布
      content.clearRect(0, 0, 750, 700);
      content.draw(true);
    },
    close: function () {
      //清除画布
      content.clearRect(0, 0, 750, 700);
      content.draw(true);
      this.setData({
        showDraw: false,
      });
    },
  },
  pageLifetimes: {
    show: function () {
      content = wx.createCanvasContext('sign', this);
      //设置线的颜色
      content.setStrokeStyle('#000');
      //设置线的宽度
      content.setLineWidth(3);
      //设置线两端端点样式更加圆润
      content.setLineCap('round');
      //设置两条线连接处更加圆润
      content.setLineJoin('round');
    },
  },
});
