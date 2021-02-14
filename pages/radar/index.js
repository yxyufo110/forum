import { getRadar } from '../../services/user';
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getRadar({ categoryId: app.globalData.subject.id }).then((res) => {
        this.setData({
          list:res
        })
        console.log(this.data.list)
    });
  },
  goDetail:function(e){
    wx.navigateTo({
      url: '/pages/radar/detail/index?id=' + e.currentTarget.dataset.id,
    })
  },
  // getMothElectro: function (list) {
  //   var windowWidth = 320;
  //   try {
  //     var res = wx.getSystemInfoSync();
  //     windowWidth = res.windowWidth;
  //   } catch (e) {
  //     console.error('getSystemInfoSync failed!');
  //   }
  //   yuelineChart = new wxCharts({
  //     canvasId: 'radarCanvas',
  //     type: 'radar',
  //     categories: list.map((i) => i.subjectName),
  //     series: [
  //       {
  //         name: '正确率',
  //         data: list.map((i) => i.score * 100),
  //       },
  //     ],
  //     width: windowWidth,
  //     height: 300,
  //     extra: {
  //       radar: {
  //         max: 100,
  //       },
  //     },
  //   });
  // },
});
