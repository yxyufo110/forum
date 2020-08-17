// pages/user/edit/index.js
const app = getApp();
import moment from 'moment';
import { updateUsr } from '../../../services/user';
moment.locale('zh-cn');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    show: false,
    showSex: false,
    showEdu: false,
    nowDate: new Date().getTime(),
    columns: ['男', '女'],
    columns2: [
      {
        key: 'JuniorHighSchool',
        value: '初中及以下',
      },
      {
        key: 'HighSchool',
        value: '高中',
      },
      {
        key: 'TechnicalSecondarySchool',
        value: '中专',
      },
      {
        key: 'VocationalHighSchool',
        value: '职高',
      },
      {
        key: 'TechnicalSchool',
        value: '技校',
      },
      {
        key: 'JuniorCollege',
        value: '大专',
      },
      {
        key: 'Undergraduate',
        value: '本科',
      },
      {
        key: 'Postgraduate',
        value: '研究生',
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let edu = this.data.columns2.find((i) => i.key === app.globalData.userInfo.currentEducation);
    this.setData({
      userInfo: {
        ...app.globalData.userInfo,
        sex: app.globalData.userInfo.sex === 'Man' ? '男' : '女',
        currentEducation: edu ? edu.value : '',
      },
    });
  },

  showCalendar: function () {
    this.setData({
      show: true,
      nowDate: moment(this.data.userInfo.birthday || new Date()).valueOf(),
    });
  },
  onClose: function () {
    this.setData({
      show: false,
    });
  },
  onCloseSex: function () {
    this.setData({
      showSex: false,
    });
  },
  onCloseEdu: function () {
    this.setData({
      showEdu: false,
    });
  },
  confirm: function (e) {
    this.setData({
      userInfo: { ...this.data.userInfo, birthday: moment(e.detail).format('YYYY-MM-DD') },
      show: false,
    });
  },
  cancel: function () {
    this.setData({
      show: false,
    });
  },
  onChange: function (e) {
    this.setData({
      userInfo: { ...this.data.userInfo, [e.currentTarget.dataset.key]: e.detail },
    });
  },

  showSexModal: function () {
    this.setData({
      showSex: true,
    });
  },
  confirmSex: function (e) {
    this.setData({
      userInfo: { ...this.data.userInfo, sex: e.detail.value },
      showSex: false,
    });
  },
  cancelSex: function () {
    this.setData({
      showSex: false,
    });
  },

  showEduModal: function () {
    this.setData({
      showEdu: true,
    });
  },
  confirmEdu: function (e) {
    this.setData({
      userInfo: { ...this.data.userInfo, currentEducation: e.detail.value.value },
      showEdu: false,
    });
  },
  cancelEdu: function () {
    this.setData({
      showEdu: false,
    });
  },

  submit: function () {
    const {
      name,
      sex,
      birthday,
      currentEducation,
      graduatedSchool,
      graduationMajor,
      profile,
    } = this.data.userInfo;
    let edu = this.data.columns2.find((i) => i.value === currentEducation);
    updateUsr({
      name,
      sex: sex === '男' ? 'Man' : 'Woman',
      birthday,
      currentEducation: edu ? edu.key : '',
      graduatedSchool,
      graduationMajor,
      profile,
    }).then((res) => {
      app.globalData.userInfo = res;
      wx.switchTab({
        url: `/pages/user/index`,
      });
    });
  },
});
