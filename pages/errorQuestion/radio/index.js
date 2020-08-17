import { getQuestion, getAnswer, remove } from '../../../services/problem';
import { getShareId, geTopicOne } from '../../../services/topic';
import { collect } from '../../../services/course';
const app = getApp();
var touchDot = 0; //触摸时的原点
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
    analysis: '',
    showNext: false,
    nextId: '',
    isMultiple: false,
    fontSize: '15px',
    shareId: '',
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
  async onLoad(e) {
    let res = '';
    if (e.questionId) {
      res = await geTopicOne({
        subjectId: e.subjectId || '',
        questionId: e.questionId || '',
      });
    } else {
      res = await getQuestion({
        subjectId: e.subjectId || '',
      });
    }
    if (!res) {
      getShareId({
        name: '题库',
        desc: '分享题库',
        linkedCode: `subjectId=${e.subjectId}&questionId=${e.questionId}`,
      }).then((res) => {
        this.setData({
          shareId: res,
        });
      });
    }
    this.setData({
      topicInfo: res,
      subjectId: e.subjectId || res.subjectId || '',
      questionId: res.id || '',
      isMultiple: res.type === 'MultipleChoice' || res.type === 'ShortAnswer' ? true : false,
      fontSize: app.globalData.fontSize,
    });
  },

  // 单选
  onChange: function (e) {
    if (this.data.showNext) {
      return;
    }
    this.setData({
      radio: e.detail,
    });
  },
  // 多选
  onChangeCheckBox: function (e) {
    if (this.data.showNext) {
      return;
    }
    this.setData({
      radio: e.detail,
    });
  },
  deleteQuestion: function (e) {
    remove(this.data.questionId).then((res) => {
      wx.showToast({
        title: '移出成功',
        icon: 'none',
        duration: 1500,
        mask: true,
      });
    });
  },
  submit: function () {
    // 提交
    getAnswer({
      questionId: this.data.topicInfo.id,
      answers: this.data.isMultiple
        ? this.data.radio
          ? this.data.radio
          : ['']
        : [this.data.radio],
    }).then((res) => {
      let newObj = this.data.topicInfo;
      newObj.answers = this.dealAnswers(res.answers, res.rightAnswers, this.data.topicInfo.answers);

      this.setData({
        topicInfo: newObj,
        analysis: res.analysis,
        showNext: true,
        nextId: res.next ? res.next.id : '',
      });
    });
  },
  next: function () {
    if (this.data.nextId) {
      wx.redirectTo({
        url: `/pages/errorQuestion/radio/index?subjectId=${this.data.subjectId}&questionId=${this.data.nextId}`,
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
  },
  // 触摸结束事件
  touchEnd: function (e) {
    var touchMove = e.changedTouches[0].pageX;
    // 向左滑动 下一题
    if (touchMove - touchDot <= -80) {
      //执行切换页面的方法
      getQuestion({
        subjectId: this.data.subjectId || '',
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
            isMultiple: res.type === 'MultipleChoice' || res.type === 'ShortAnswer' ? true : false,
            fontSize: app.globalData.fontSize,
            radio: '',
            analysis: '',
            showNext: false,
          });
        }
      });
    }
    // 向右滑动 上一题
    if (touchMove - touchDot >= 80) {
      //执行切换页面的方法
      getQuestion({
        subjectId: this.data.subjectId || '',
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
            isMultiple: res.type === 'MultipleChoice' || res.type === 'ShortAnswer' ? true : false,
            fontSize: app.globalData.fontSize,
            radio: '',
            analysis: '',
            showNext: false,
          });
        }
      });
    }
  },
  // 处理滑动结束
});
