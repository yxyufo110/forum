import {
  getSchool
} from '../../services/topic';
import {
  updateUsr,
} from '../../services/user';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolList:[],
    activeKey:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getSchool().then(res=>{
      const map = res.reduce((result, item) => {
        result[item.province] = result[item.province] || []
        result[item.province].push(item)
        return result
    }, {})
    
    // result即为所求
    const result = Object.values(map)
      this.setData({
        schoolList:result
      })
    })
  },
  changeNav(e){
    this.setData({
      activeKey:e.detail
    })
  },
  updateSchool(e) {
    let params = {
      school:e.target.dataset.name
    };
    updateUsr(params).then((res) => {
      app.globalData.userInfo = res
      wx.navigateBack()
    });
  },
  back(){
    wx.navigateBack()
  },
  onShareAppMessage: function () {
    return {
      title: '分享',
      path: `/pages/index/me`,
    };
  }

})
