// request.js
const app = getApp();
const baseUrl = 'https://xxxxxx';
// 接口地址
const request = (options) => {
  let newOptions = options;
  return new Promise((resolve, reject) => {
    const { data, method } = options;
    if (data && method !== 'get') {
      options.data = JSON.stringify(data);
    }
    const Authorization = wx.getStorageSync('Authorization');
    // wx.showLoading({
    //   title: '加载中',
    //   mask: true,
    // });
    wx.request({
      header: { 'Content-Type': 'application/json', Authorization: Authorization },
      ...options,
      url: `${baseUrl}${options.url}`,
      success: function (res) {
        if (res.statusCode === 401 || res.statusCode === 403) {
          // 自动续签
          wx.login({
            success: (lres) => {
              wx.request({
                url: `${baseUrl}/wechat/login/${lres.code}`,
                method: 'post',
                success: function (lres2) {
                  wx.setStorageSync('Authorization', lres2.data);
                  app.globalData.userInfo = lres2.data;
                  if (newOptions.data && newOptions.method !== 'get') {
                    newOptions.data = JSON.parse(newOptions.data);
                  }
                  request(newOptions)
                    .then((res) => {
                      resolve(res);
                    })
                    .catch((err) => {
                      reject(err);
                    });
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
          // wx.hideLoading();
        } else {
          // wx.hideLoading();
          if (res.header.Authorization) {
            wx.setStorageSync('Authorization', res.header.Authorization);
          }
          if (res.statusCode === 200) {
            resolve(res.data);
          } else {
            wx.showToast({
              title: res.data.title,
              icon: 'none',
              duration: 1500,
              mask: true,
            });
          }
        }
      },
      fail: function (res) {
        // wx.hideLoading();
        wx.showToast({
          title: res.data.title,
          icon: 'none',
          duration: 1500,
          mask: true,
        });
        reject(res.data);
      },
    });
  });
};
export default request;
