import { getNav, updateNav } from '../../services/user';
import QQMapWX from '../../libs/qqmap-wx-jssdk.min';
const app = getApp();
Component({
  options: {
    styleIsolation: 'shared',
  },
  data: {
    tabsList: [],
    active: '',
  },
  properties: {
    title: {
      type: String,
      value: '考粉驿站',
    },
    showLeft: {
      type: Boolean,
      value: true,
    },
    showHome: {
      type: Boolean,
      value: false,
    },
    showTabs: {
      type: Boolean,
      value: false,
    },
  },
  pageLifetimes: {
    show: function () {
      if (!app.globalData.userInfo) {
        wx.login({
          success: (lres) => {
            wx.request({
              url: `https://gateway.yuandong-edu.com/student/stu/student/login/${lres.code}`,
              method: 'post',
              success: function (lres2) {
                wx.setStorageSync('Authorization', lres2.header.Authorization);
                app.globalData.userInfo = lres2.data;
              },
              fail: function (err) {
                wx.showToast({
                  title: '登录失败',
                  icon: 'none',
                  duration: 1500,
                  mask: true,
                });
              },
            });
          },
        });
      }
     if (app.globalData.userInfo && !app.globalData.userInfo.area) {
        wx.redirectTo({
          url: '/pages/getLocation/index',
        });
      } else if (
        app.globalData.userInfo &&
        (!app.globalData.userInfo.categories || !app.globalData.userInfo.categories[0])
      ) {
        wx.redirectTo({
          url: '/pages/checkDirection/index',
        });
      } else {
        if (this.data.showTabs) {
          getNav().then((res) => {
            this.setData({
              tabsList: res,
              active: app.globalData.userInfo.categories[0].categoryDetail.parentId,
            });
            this.triggerEvent(
              'getTabItem',
              res.find(
                (i) => i.id === app.globalData.userInfo.categories[0].categoryDetail.parentId,
              ),
            );
          });
        }
      }
    },
  },
  methods: {
    onClick: function (e) {
      this.triggerEvent(
        'getTabItem',
        this.data.tabsList.find((i) => i.id === e.detail.name),
      );

      this.setData({
        active: e.detail.name,
      });
      updateNav(e.detail.name).then((res) => {
        app.globalData.userInfo = res;
      });
    },
    check: function (e) {
      wx.redirectTo({
        url: `/pages/getLocation/index`,
      });
    },
  },
});
