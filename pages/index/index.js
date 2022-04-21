//index.js
import {getTopic} from '../../services/topic'
const app = getApp();
//获取应用实例
Page({
  data: {
    active:0,
    pageNumber: 0, // 当前页码
    hasNextPage: false, // 是否有下一页
    info: [[]],
    userInfo:{}
  },
  onShow(){
    this.setData({
      userInfo:app.globalData.userInfo
    })
    getTopic({ page: 0, size: 10 }).then((res) => {
      this.setData({
        ['info[0]']: res.content,
        pageNumber: res.number + 1,
        hasNextPage: res.number + 1 >= res.totalPages ? false : true,
      });
    });
  },
  showMore: function () {
    if (this.data.hasNextPage) {
      getTopic({ page: this.data.pageNumber, size: 10 }).then((res) => {
        this.setData({
          [`info[${res.number + 1}]`]: res.content,
          pageNumber: res.number + 1,
          hasNextPage: res.number + 1 >= res.totalPages ? false : true,
        });
      });
    }
  },
  changeTab(event) {
    // this.setData({ active: event.detail });
    console.log(event.detail)
    if(event.detail == 1) {
      wx.redirectTo({
        url: '/pages/user/index',
      })
    }
  },
  add(){
    wx.navigateTo({
      url: '/pages/add/index',
    })
  },
  onShareAppMessage: function () {
    return {
      title: '分享',
      path: `/pages/me/index`,
    };
  },
  goDetail(e){
    wx.navigateTo({
      url: '/pages/detail/index?id=' + e.currentTarget.dataset.id,
    })
  },
  onClickLeft(){
    wx.navigateTo({
      url: '/pages/school/index',
    })
  },
});
