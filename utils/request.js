// request.js
const baseUrl = 'http://139.186.36.207/student';
const request = (options) => {
  return new Promise((resolve, reject) => {
    const { data, method } = options;
    if (data && method !== 'get') {
      options.data = JSON.stringify(data);
    }
    const Authorization = wx.getStorageSync('key');
    if (Authorization) {
      wx.request({
        header: { 'Content-Type': 'application/json', Authorization: Authorization },
        ...options,
        url: `${baseUrl}${options.url}`,
        success: function (res) {
          resolve(res.data);
        },
        fail: function (res) {
          reject(res.data);
        },
      });
    }
  });
};
export default request;
