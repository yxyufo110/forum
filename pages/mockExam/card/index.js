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
    showScore: false,
    pkId: false,
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
        showScore: e.score || e.score == '0' ? true : false,
        pkId: e.pkId,
      });
    });
    getShareId({
      name: '考试',
      desc: '分享考试',
      linkedCode: `examineId=${e.examineId}`,
    }).then((res) => {
      this.setData({
        shareId: res,
      });
    });
  },
  goTopic: function (e) {
    if (this.data.pkId) {
      wx.redirectTo({
        url: `/pages/pk/radio/index?examineId=${this.data.examineId}&questionId=${e.currentTarget.dataset.id}&pkId=${this.data.pkId}`,
      });
    } else {
      wx.redirectTo({
        url: `/pages/mockExam/radio/index?examineId=${this.data.examineId}&questionId=${e.currentTarget.dataset.id}`,
      });
    }
  },
  goError:function(e) {
    if (!this.data.pkId) {
      wx.navigateTo({
        url: `/pages/mockExam/error/index?examineId=${this.data.examineId}&questionId=${e.currentTarget.dataset.id}`,
      });
    } 
  },
  onShareAppMessage: function () {
    return {
      title: '分享考试',
      path: `/pages/index/index?id=${this.data.shareId}&redirectUrl=/pages/testBank/index`,
    };
  },
});
