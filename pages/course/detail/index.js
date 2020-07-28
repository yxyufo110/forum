// pages/course/detail/index.js
import {
  queryOne,
  updateTime,
  queryChapter,
  cancelCollect,
  collect,
  getShareId,
} from '../../../services/course';
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    course: {},
    oneData: {},
    chapters: [],
    timer: 0,
    shareId: '',
    subjectId: '',
    query: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.setData({
      query: e,
    });
  },
  onShow: function () {
    queryOne(this.data.query.id).then((res) => {
      this.setData({
        course: res,
        chapters: res.chapters,
        subjectId: res.subjectId,
      });
      if (res.chapters && res.chapters[0]) {
        queryChapter(res.chapters[0].id).then((res2) => {
          if (!res2.bought) {
            Dialog.confirm({
              title: '购买课程',
              message: '购买课程以观看完整视频',
            }).then(() => {
              wx.navigateTo({
                url: `/pages/pay/index?subjectId=${res.subjectId}`,
              });
            });
          }
          this.setData({
            oneData: res2,
          });
          getShareId({
            name: res2.chapter,
            desc: res2.name,
            linkedCode: this.data.course.id,
          }).then((sid) => {
            this.setData({
              shareId: sid,
            });
          });
        });
      }
    });
  },
  onHide: function () {
    if (this.data.timer > 1) {
      updateTime({ chapterId: this.data.oneData.id, time: this.data.timer });
    }
  },
  onUnload: function () {
    if (this.data.timer > 1) {
      updateTime({ chapterId: this.data.oneData.id, time: this.data.timer });
    }
  },
  onChange: function (event) {
    let id = event.currentTarget.dataset.id;
    if (this.data.timer > 1) {
      updateTime({ chapterId: this.data.oneData.id, time: this.data.timer });
    }
    queryChapter(id).then((res) => {
      if (!res.bought) {
        Dialog.confirm({
          title: '购买课程',
          message: '购买课程以观看完整视频',
        }).then(() => {
          wx.navigateTo({
            url: `/pages/pay/index?subjectId=${this.data.subjectId}`,
          });
        });
      }
      this.setData({
        oneData: res,
      });
    });
  },
  timeChange: function (e) {
    this.setData({
      timer: e.detail.currentTime,
    });
  },
  videoEnd: function (e) {
    Dialog.confirm({
      title: '学习完成',
      message: '本章课程已看完，去练习？',
    })
      .then(() => {
        wx.navigateTo({
          url: `/pages/topic/radio/index?subjectId=${this.data.course.subjectId}&chapterName=${this.data.oneData.chapter}`,
        });
      })
      .catch(() => {
        // on cancel
      });
  },
  like: function () {
    collect({
      linkedCode: this.data.course.id,
      name: this.data.course.name,
      subject: this.data.course.subjectId,
      type: 'Course',
    }).then((res) => {
      this.setData({
        course: {
          ...this.data.course,
          hasCollected: true,
        },
      });
    });
  },
  nolike: function () {
    cancelCollect(this.data.course.id).then((res) => {
      this.setData({
        course: {
          ...this.data.course,
          hasCollected: false,
        },
      });
    });
  },
  onShareAppMessage: function () {
    return {
      title: '分享课程',
      path: `/pages/index/index?id=${this.data.shareId}&redirectUrl=/pages/course/index`,
    };
  },
});
