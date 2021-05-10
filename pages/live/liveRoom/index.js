import { playRoom } from '../../../services/course';
var socketOpen = false
var socketMsgQueue = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
      value:{},
      time: '',
      active: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    playRoom(options.id || '609950ad54245548d97d6416').then(res=>{
      this.setData({
        value:res,
        time: res.beginTime.split(' ')[0]
      })
    })
  },
  onShow() {
    var that = this
    wx.showToast({
      title: remindTitle,
      icon: 'loading',
      duration: 10000
    })
    if (!socketOpen) {
      //创建一个 WebSocket 连接；
      //一个微信小程序同时只能有一个 WebSocket 连接，如果当前已存在一个 WebSocket 连接，会自动关闭该连接，并重新创建一个 WebSocket 连接。
      wx.connectSocket({
        url: 'ws://域名'
      })
      //监听WebSocket错误
      wx.onSocketError(function (res) {
        socketOpen = false
        console.log('WebSocket连接打开失败，请检查！')
        wx.hideToast()
      })
      //监听WebSocket连接打开事件。
      wx.onSocketOpen(function (res) {
        console.log('WebSocket连接已打开！')
        wx.hideToast()
        socketOpen = true
        for (var i = 0; i < socketMsgQueue.length; i++) {
          that.sendSocketMessage(socketMsgQueue[i])
        }
        socketMsgQueue = []
      })
      //监听WebSocket接受到服务器的消息事件
      wx.onSocketMessage(function (res) {
        console.log('收到服务器内容：' + res.data)
      })
      //监听WebSocket关闭
      wx.onSocketClose(function (res) {
        socketOpen = false
        wx.hideToast()
      })
    } else {
      //关闭WebSocket连接。
      wx.closeSocket()
    }
  },
  error(e) {
    console.log(e)
  },
  change(e) {
    this.setData({
      active:e.currentTarget.dataset.index
    })
  },
  sendSocketMessage: function (msg) {
    if (socketOpen) {
      //通过 WebSocket 连接发送数据，需要先 wx.connectSocket，并在 wx.onSocketOpen 回调之后才能发送。
      wx.sendSocketMessage({
        data: msg
      })
    } else {
      socketMsgQueue.push(msg)
    }
  },
})