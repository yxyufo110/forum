import lodash from '../../utils/lodash.js';
import { searchCategory } from '../../services/dict';
import { updateSubject } from '../../services/user';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    grandpaId: '',
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    this.setData({
      grandpaId: params.grandpaId,
    });
  },
  onChange: lodash.debounce(function (e) {
    searchCategory({
      grandpaId: this.data.grandpaId,
      name: e.detail,
    }).then((res) => {
      this.setData({
        list: res,
      });
    });
  }),
  checkList: function (e) {
    updateSubject(e.target.dataset.id).then((res) => {
      wx.switchTab({
        url: `/pages/testBank/index`,
      });
    });
  },
  onClickLeft: function () {
    wx.navigateBack({
      delta: 1,
    });
  },
});
