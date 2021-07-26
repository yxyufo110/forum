import { queryList } from '../../../services/news';
import { getBanners } from '../../../services/dict';

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    info: [],
    bannerList:[],
    showHot:true,
    info1:[]
  },

  goBanner: function (e) {
    wx.navigateTo({
      url: `/pages/banner/index?id=${e.currentTarget.dataset.id}`,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 3,
      });
    }
    getBanners('Banner').then((res) => {
      this.setData({
        bannerList: res,
      });
    });
    queryList({ page: 0, size: 10,type:'New' }).then((res) => {
      this.setData({
        info: res.content,
      });
    });
    queryList({ page: 0, size: 2,classification:'学历提升' }).then((res) => {
      this.setData({
        info1: res.content,
      });
    });
    queryList({ page: 0, size: 2,classification:'职业技能' }).then((res) => {
      this.setData({
        info2: res.content,
      });
    });
    queryList({ page: 0, size: 2,classification:'考级考证' }).then((res) => {
      this.setData({
        info3: res.content,
      });
    });
  },
  change(e){
    if(e.detail.index == '0') {
      queryList({ page: 0, size: 10,type:'New' }).then((res) => {
        this.setData({
          info: res.content,
          showHot: true,
        });
      });
    } else if(e.detail.index == '1') {
      queryList({ page: 0, size: 10,type:'Hot' }).then((res) => {
        this.setData({
          info: res.content,
          showHot: true,
        });
      });
    } else if(e.detail.index == '2'){
      this.setData({
        showHot: false,
      });
    }
  },
  goMore:function(e){
    wx.navigateTo({
      url: `/pages/news/index?name=${e.currentTarget.dataset.name}`,
    });
  },
  gonews: function (e) {
    wx.navigateTo({
      url: `/pages/news/detail/index?id=${e.currentTarget.dataset.id}`,
    });
  },
})