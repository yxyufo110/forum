import { geTopic, geTopicOne, getAnswer, getShareId } from '../../../services/topic';
import { collect } from '../../../services/course';
const app = getApp();
var time = 0;
var touchDot = 0; //触摸时的原点
var interval = '';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    radio: '',
    topicInfo: {},
    subjectId: '',
    questionId: '',
    chapter: '',
    nextId: '',
    isMultiple: false,
    fontSize: '15px',
    shareId: '',
    answers: [],
  },
  dealAnswers: function (a, b, c) {
    // a -> radio
    //  b-> right
    //  c->all
    if (a && b && c) {
      return c.map((i) => ({
        ...i,
        status:
          a.indexOf(i.number) < 0
            ? b.find((x) => x.number === i.number)
              ? 'right'
              : ''
            : b.find((x) => x.number === i.number)
            ? 'right'
            : 'error',
      }));
    } else {
      return c;
    }
  },
  // 初始化，获取题目
  async onLoad(e) {
    let res = '';
    if (e.questionId) {
      res = await geTopicOne({ questionId: e.questionId });
    } else {
      res = await geTopic({
        subjectId: e.subjectId || '',
        chapter: e.chapterName || '',
      });
    }
    if (!res) {
      getShareId({
        name: '题库',
        desc: '分享题库',
        linkedCode: `subjectId=${e.subjectId}&chapter=${e.chapterName}`,
      }).then((res) => {
        this.setData({
          shareId: res,
        });
      });
    }

    this.setData({
      topicInfo: res,
      subjectId: e.subjectId || res.subjectId || '',
      questionId: e.questionId || res.id || '',
      chapter: e.chapterName || '',
      isMultiple: res.type === 'MultipleChoice' ? true : false,
      fontSize: app.globalData.fontSize,
      radio: res.latestAnswers,
      answers: this.dealAnswers(res.latestAnswers, res.rightAnswers, res.answers),
    });
  },
  onShow: function () {
    clearInterval(interval); // 清除setInterval
    time = 0;
  },
  // 单选
  onChange: function (e) {
    if (this.data.topicInfo.latestAnswers) {
      return;
    }
    this.setData({
      radio: e.detail,
    });
    this.submit();
  },
  // 多选
  onChangeCheckBox: function (e) {
    if (this.data.topicInfo.latestAnswers) {
      return;
    }
    this.setData({
      radio: e.detail,
    });
  },
  submit: function () {
    if (this.data.topicInfo.latestAnswers) {
      return;
    }
    // 提交
    getAnswer({
      questionId: this.data.topicInfo.id,
      chapter: this.data.chapter || '',
      answers: this.data.isMultiple ? this.data.radio : [this.data.radio],
    }).then((res) => {
      let newObj = this.data.topicInfo;
      this.setData({
        topicInfo: newObj,
        nextId: res.next ? res.next.id : '',
      });

      if (res.valid) {
        if (this.data.nextId) {
          this.setData({
            topicInfo: res.next,
            subjectId: res.next.subjectId || '',
            questionId: res.next.id || '',
            chapter: this.data.chapter || '',
            isMultiple: res.next.type === 'MultipleChoice' ? true : false,
            fontSize: app.globalData.fontSize,
            radio: res.next.latestAnswers,
            answers: this.dealAnswers(
              res.next.latestAnswers,
              res.next.rightAnswers,
              res.next.answers,
            ),
          });
        } else {
          this.setData({
            topicInfo: null,
          });
          wx.showToast({
            title: '已经是最后一题了',
            icon: 'none',
            duration: 1500,
            mask: true,
          });
        }
      } else {
        newObj.latestAnswers = res.answers;
        this.setData({
          topicInfo: newObj,
          subjectId: newObj.subjectId || '',
          questionId: newObj.id,
          chapter: this.data.chapter || '',
          isMultiple: newObj.type === 'MultipleChoice' ? true : false,
          fontSize: app.globalData.fontSize,
          radio: res.answers,
          answers: this.dealAnswers(res.answers, res.rightAnswers, newObj.answers),
        });
      }
    });
  },

  changeFont: function (e) {
    app.globalData.fontSize = e.detail;
    this.setData({
      fontSize: e.detail,
    });
  },
  goHome: function () {
    wx.switchTab({
      url: '/pages/testBank/index',
    });
  },
  collage: function () {
    collect({
      linkedCode: `subjectId=${this.data.subjectId}&chapterName=${this.data.chapter}&questionId=${this.data.questionId}`,
      name: '题库',
      subject: this.data.subjectId,
      type: 'Question',
    }).then((res) => {
      wx.showToast({
        title: '收藏成功',
        icon: 'none',
        duration: 1500,
        mask: true,
      });
    });
  },
  onShareAppMessage: function () {
    return {
      title: '分享题库',
      path: `/pages/index/index?id=${this.data.shareId}&redirectUrl=/pages/testBank/index`,
    };
  },

  // 处理滑动开始
  // 触摸开始事件
  touchStart: function (e) {
    touchDot = e.touches[0].pageX; // 获取触摸时的原点
    // 使用js计时器记录时间
    interval = setInterval(function () {
      time++;
    }, 100);
  },
  // 触摸结束事件
  touchEnd: function (e) {
    var touchMove = e.changedTouches[0].pageX;
    // 向左滑动 下一题
    if (touchMove - touchDot <= -80 && time < 10) {
      //执行切换页面的方法
      geTopic({
        subjectId: this.data.subjectId || '',
        chapter: this.data.chapter || '',
        questionId: this.data.questionId || '',
        forward: true,
      }).then((res) => {
        if (!res) {
          this.setData({
            topicInfo: null,
          });
          wx.showToast({
            title: '已经是最后一题了',
            icon: 'none',
            duration: 1500,
            mask: true,
          });
        } else {
          this.setData({
            topicInfo: res,
            subjectId: res.subjectId || '',
            questionId: res.id || '',
            chapter: this.data.chapter || '',
            isMultiple: res.type === 'MultipleChoice' ? true : false,
            fontSize: app.globalData.fontSize,
            radio: res.latestAnswers,
            answers: this.dealAnswers(res.latestAnswers, res.rightAnswers, res.answers),
          });
        }
      });
    }
    // 向右滑动 上一题
    if (touchMove - touchDot >= 80 && time < 10) {
      //执行切换页面的方法
      geTopic({
        subjectId: this.data.subjectId || '',
        chapter: this.data.chapter || '',
        questionId: this.data.questionId || '',
        forward: false,
      }).then((res) => {
        if (!res) {
          wx.showToast({
            title: '当前为第一题',
            icon: 'none',
            duration: 1500,
            mask: true,
          });
        } else {
          this.setData({
            topicInfo: res,
            subjectId: res.subjectId || '',
            questionId: res.id || '',
            chapter: this.data.chapter || '',
            isMultiple: res.type === 'MultipleChoice' ? true : false,
            fontSize: app.globalData.fontSize,
            radio: res.latestAnswers,
            answers: this.dealAnswers(res.latestAnswers, res.rightAnswers, res.answers),
          });
        }
      });
    }
    clearInterval(interval); // 清除setInterval
    time = 0;
  },
  // 处理滑动结束
});
