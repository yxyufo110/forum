import { playRoom,rePlayRoom,getUrl } from '../../../services/course';
var socketOpen = false
var socketMsgQueue = []
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      value:{},
      time: '',
      active: 0,
      roomId:'',
      message: '',
      messageList: [],
      introduction:'',
      type:'',
      rePalyValue:{},
      vodUrl:'',
      vodId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      roomId:options.id,
      type:options.type
    })
  },
  onShow:function() {
      // 获取当前小程序的页面栈
    let pages = getCurrentPages();
    // 数组中索引最大的页面--当前页面
    let currentPage = pages[pages.length-1];
      if(currentPage.options.type) {
        rePlayRoom(currentPage.options.id).then(res=>{
          getUrl(res.chapters[0].id).then(xx=>{
            this.setData({
              vodUrl:xx.vodUrl,
              vodId:res.chapters[0].id
            })
          })
          this.setData({
            value:res.live,
            rePalyValue:res,
            roomId: currentPage.options.id,
            time: res.live.beginTime.split(' ')[0],
            introduction:res.live.introduction ? res.live.introduction.replace(/\<img/gi, '<img class="rich-img" ') : ''
          })
        })
      } else {
        this.init(currentPage.options.id)
      }
  },
  init(e) {
    playRoom(e).then(res=>{
      this.setData({
        value:res,
        roomId: e,
        time: res.beginTime.split(' ')[0],
        introduction:res.introduction ? res.introduction.replace(/\<img/gi, '<img class="rich-img" ') : ''
      })
      if (!res.bought) {
        Dialog.confirm({
          title: '购买课程',
          message: '购买课程以观看完整直播',
        }).then(() => {
          wx.navigateTo({
            url: `/pages/pay/index?subjectId=${res.subjectId}${res.mode.indexOf('Toll')>=0?`&liveId=${res.id}&price=${res.price}`:''}`,
          });
        });
      }
      this.openWs()
    })
  },
  openWs() {
    var that = this
    wx.showToast({
      title: '',
      icon: 'loading',
      duration: 10000
    })
    if (!socketOpen) {
      //创建一个 WebSocket 连接；
      //一个微信小程序同时只能有一个 WebSocket 连接，如果当前已存在一个 WebSocket 连接，会自动关闭该连接，并重新创建一个 WebSocket 连接。
      wx.connectSocket({
        url: `wss://manager.yuandong-edu.com/ws/${this.data.roomId}/${wx.getStorageSync('Authorization')}`
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
        let nm = that.data.messageList
        nm.push(JSON.parse(res.data))
        that.setData({
          messageList:nm
        })
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
  
  change(e) {
    this.setData({
      active:e.currentTarget.dataset.index
    })
  },
  onChangeChapter(e) {
    getUrl(e.currentTarget.dataset.id).then(res=>{
      this.setData({
        vodUrl:res.vodUrl,
        vodId:e.currentTarget.dataset.id
      })
    })
    
  },
  changeMessage(e) {
    this.setData({
      message:e.detail
    })
  },
  error(e){
    console.error('live-player error:', e.detail.errMsg)
  },
  statechange(e) {
    console.log('live-player code:', e.detail.code)
  },
  submit(e) {
    this.sendSocketMessage(this.data.message)
    this.setData({
      message:''
    })
  },
  sendSocketMessage: function (msg) {
    if (socketOpen) {
      //通过 WebSocket 连接发送数据，需要先 wx.connectSocket，并在 wx.onSocketOpen 回调之后才能发送。
      wx.sendSocketMessage({
        data: `{"liveId":"${this.data.roomId}","msg":"${msg}"}`
      })
    } else {
      socketMsgQueue.push(msg)
    }
  },
  // 离开时关闭连接
  onUnload() {
    wx.closeSocket()
  },
  onShareAppMessage: function () {
    return {
      title: '分享考粉驿站',
      path: `/pages/index/index`,
    };
  },
})