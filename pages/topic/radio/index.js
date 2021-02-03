import { geTopic, geTopicOne, getAnswer, getShareId, repractice,correction } from '../../../services/topic';
import { collect } from '../../../services/course';
const app = getApp();
var touchDot = 0; //触摸时的原点

Page({
  /**
   * 页面的初始数据
   */
  data: {
    errorShow:false,
    radio: '',
    errorRadio:0,
    topicInfo: {},
    subjectId: '',
    questionId: '',
    chapter: '',
    nextId: '',
    isMultiple: false,
    fontSize: '15px',
    shareId: '',
    answers: [],
    query: {},
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
  async onShow() {
    let res = '';
    if (this.data.query.questionId) {
      res = await geTopicOne({
        questionId: this.data.query.questionId,
        chapter: this.data.query.chapterName || '',
      });
    } else {
      res = await geTopic({
        subjectId: this.data.query.subjectId || '',
        chapter: this.data.query.chapterName || '',
      });
    }
    if (!res) {
      getShareId({
        name: '题库',
        desc: '分享题库',
        linkedCode: `subjectId=${this.data.query.subjectId}&chapter=${this.data.query.chapterName}`,
      }).then((res) => {
        this.setData({
          shareId: res,
        });
      });
    }

    this.setData({
      topicInfo: res,
      subjectId: this.data.query.subjectId || res.subjectId || '',
      questionId: this.data.query.questionId || res.id || '',
      chapter: this.data.query.chapterName || '',
      isMultiple: res.type === 'MultipleChoice' || res.type === 'ShortAnswer' ? true : false,
      fontSize: app.globalData.fontSize,
      radio: res.latestAnswers,
      answers: this.dealAnswers(res.latestAnswers, res.rightAnswers, res.answers),
    });
  },

  // 初始化，获取题目
  async onLoad(e) {
    this.setData({
      query: e,
    });
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
      answers: this.data.isMultiple
        ? this.data.radio
          ? this.data.radio
          : ['']
        : [this.data.radio],
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
            isMultiple:
              res.next.type === 'MultipleChoice' || res.next.type === 'ShortAnswer' ? true : false,
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
          isMultiple:
            newObj.type === 'MultipleChoice' || newObj.type === 'ShortAnswer' ? true : false,
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
  reTest: function () {
    repractice({
      subjectId: this.data.subjectId || '',
      chapter: this.data.chapter || '',
    }).then((res) => {
      wx.navigateTo({
        url: `/pages/topic/radio/index?subjectId=${this.data.subjectId}&chapterName=${this.data.chapter}`,
      });
    });
  },
  // 处理滑动开始
  // 触摸开始事件
  touchStart: function (e) {
    touchDot = e.touches[0].pageX; // 获取触摸时的原点
  },
  // 触摸结束事件
  touchEnd: function (e) {
    var touchMove = e.changedTouches[0].pageX;

    // 向左滑动 下一题
    if (touchMove - touchDot <= -80) {
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
            isMultiple: res.type === 'MultipleChoice' || res.type === 'ShortAnswer' ? true : false,
            fontSize: app.globalData.fontSize,
            radio: res.latestAnswers,
            answers: this.dealAnswers(res.latestAnswers, res.rightAnswers, res.answers),
          });
        }
      });
    }
    // 向右滑动 上一题
    if (touchMove - touchDot >= 80) {
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
            isMultiple: res.type === 'MultipleChoice' || res.type === 'ShortAnswer' ? true : false,
            fontSize: app.globalData.fontSize,
            radio: res.latestAnswers,
            answers: this.dealAnswers(res.latestAnswers, res.rightAnswers, res.answers),
          });
        }
      });
    }
  },
  // 处理滑动结束
  // 显示纠错功能
  showError:function(){
    this.setData({
      errorShow:!this.data.errorShow
    })
  },
  changeError:function(event){
    this.setData({
      errorRadio: event.detail,
    });
  },
  submitError:function(){
    correction({
      questionId:this.data.topicInfo.id,
      type:this.data.errorRadio
    }).then(res=>{
      wx.showToast({
        title: '提交成功',
        icon: 'none',
        duration: 1500,
        mask: true,
      });
      this.setData({
        errorShow:!this.data.errorShow
      })
    }).catch(()=>{
      wx.showToast({
        title: '请稍后再试',
        icon: 'none',
        duration: 1500,
        mask: true,
      });
      this.setData({
        errorShow:!this.data.errorShow
      })
    })
  
  }
});
