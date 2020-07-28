import { getShareId, errorCard } from '../../../services/topic';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cardInfo: [],
    subjectId: '',
    chapter: '',
    shareId: '',
    score: '',
    showScore: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    errorCard({
      subjectId: e.subjectId,
      chapter: e.chapter,
    }).then((res) => {
      this.setData({
        cardInfo: res,
        subjectId: e.subjectId,
        chapter: e.chapter,
      });
    });
    getShareId({
      name: '题库',
      desc: '分享题库',
      linkedCode: `subjectId=${e.subjectId}&chapter=${e.chapter}`,
    }).then((res) => {
      this.setData({
        shareId: res,
      });
    });
  },
  goTopic: function (e) {
    wx.redirectTo({
      url: `/pages/errorQuestion/radio/index?subjectId=${this.data.subjectId}&questionId=${e.currentTarget.dataset.id}&chapterName=${this.data.chapter}&showAnswer=true`,
    });
  },
  onShareAppMessage: function () {
    return {
      title: '分享题库',
      path: `/pages/index/index?id=${this.data.shareId}&redirectUrl=/pages/testBank/index`,
    };
  },
});
