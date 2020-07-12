// pages/checkType/index.js
import { categoryList } from '../../services/dict';
import { updateSubject } from '../../services/user';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    queryOne: {},
    isSearch: false,
    isLeaf: false,
    radio: '',
    parentId: '',
  },
  onLoad: function (params) {
    categoryList({
      parentId: params.parentId,
    }).then((res) => {
      if (res.categories && res.categories.length > 0) {
        this.setData({
          queryOne: res,
          isSearch: res.searchable,
          isLeaf: res.categories[0].isLeaf,
          parentId: params.parentId,
        });
      }
    });
  },
  confirmType: function (e) {
    wx.navigateTo({
      url: `/pages/checkType/index?parentId=${e.currentTarget.dataset.id}`,
    });
  },
  onClickLeft: function () {
    wx.navigateBack({
      delta: 1,
    });
  },
  onChange: function (event) {
    this.setData({
      radio: event.detail,
    });
  },
  submit: function () {
    if (this.data.radio) {
      updateSubject(this.data.radio).then((res) => {
        wx.switchTab({
          url: `/pages/testBank/index`,
        });
      });
    }
  },
  goSearch: function () {
    wx.navigateTo({
      url: `/pages/searchProfession/index?grandpaId=${this.data.parentId}`,
    });
  },
});
