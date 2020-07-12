import { getShareId } from '../../../services/topic';
import { getCardList } from '../../../services/examine';
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    getCardList(e.examineId).then((res) => {
      this.setData({
        cardInfo: res,
        examineId: e.examineId,
        score: e.score,
      });
    });
    getShareId({
      name: '题库',
      desc: '分享题库',
      linkedCode: `examineId=${e.examineId}`,
    }).then((res) => {
      this.setData({
        shareId: res,
      });
    });
  },
  goTopic: function (e) {
    wx.navigateTo({
      url: `/pages/mockExam/radio/index?examineId=${this.data.examineId}&questionId=${e.currentTarget.dataset.id}`,
    });
  },
  onShareAppMessage: function (e) {
    return {
      title: '分享题库',
      path: `/pages/index/index?id=${this.data.shareId}&redirectUrl=/pages/testBank/index`,
    };
  },
});
