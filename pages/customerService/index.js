import { getTeacher } from '../../services/user';
const app = getApp();

Page({
  data: {
    isIPX: false,
    teacherInfo: {},
  },
  onLoad() {
    getTeacher().then((res) => {
      this.setData({
        teacherInfo: res[0],
      });
    });
    if (app.globalData.isIPX) {
      this.setData({
        isIPX: true,
      });
    }
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 2,
      });
    }
  },
  makPhoneCall: function () {
    if (this.data.teacherInfo.cellphone) {
      wx.makePhoneCall({
        phoneNumber: this.data.teacherInfo.cellphone,
      });
    }
  },
});
