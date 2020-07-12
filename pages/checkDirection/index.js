import { categoryList } from '../../services/dict';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    queryOne: {},
  },
  confirmDirection: function (e) {
    wx.navigateTo({
      url: `/pages/checkType/index?parentId=${e.currentTarget.dataset.id}`,
    });
  },
  onLoad: function () {
    categoryList().then((res) => {
      this.setData({
        queryOne: res,
      });
    });
  },
  onClickLeft: function () {
    wx.navigateBack({
      delta: 1,
    });
  },
});
