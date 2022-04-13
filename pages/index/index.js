//index.js
//获取应用实例
import { getList } from '../../services/user';
import { formatTime } from '../../utils/util.js';
const app = getApp();
const innerAudioContext = wx.createInnerAudioContext()

Page({
  data: {
    value:formatTime(new Date()).split(' ')[0],
    minDate: new Date(2021, 10, 10).getTime(),
    maxDate: new Date().getTime(),
    show: false,
    list:[],
    ldId:''
  },
  onShow(){
    getList().then(res=>{
      this.setData({
        list:res.map(i=>({...i,time:(i.time/1000).toFixed(0),createdDate:i.createdDate?i.createdDate.split(' ')[0]:''})),
        value:formatTime(new Date()).split(' ')[0],
      })
    })
  },
  close() {
    this.setData({
      show: !this.data.show
    })
  },
  play(e) {
   
    this.downloadFile('https://diary.becolorful.cn/diary/audio/'+e.currentTarget.dataset.id + '?authorization=' + wx.getStorageSync('Authorization'))
    this.setData({
      ldId:e.currentTarget.dataset.id
    })
  },
  stop(){
    this.setData({
      ldId:''
    })
  },
  changeTime(e){
    getList({
      date: formatTime(e.detail).split(' ')[0].replace(/\//g,"-")
    }).then(res=>{
      this.setData({
        list:res.map(i=>({...i,time:(i.time/1000).toFixed(0),createdDate:i.createdDate?i.createdDate.split(' ')[0]:''})),
        value:formatTime(e.detail).split(' ')[0],
        show:false
      })
    })
  },
  goMe() {
    wx.navigateTo({
      url: '/pages/me/index',
    })
  },
  goAdd(){
    wx.navigateTo({
      url: '/pages/add/index',
    })
  },
  onShareAppMessage: function () {
    return {
      title: '分享语音日记',
      path: `/pages/index/index`,
    };
  },

  // 小程序音频播放 api

// 下载音频文件
downloadFile(voiceUrl) {
  const FileSystemManager = wx.getFileSystemManager()
  wx.downloadFile({
    url: voiceUrl,
    header: { 'Content-type': 'audio/mp3', 'Authorization': wx.getStorageSync('Authorization') },
    success: res => {
      // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
      console.log(res)
      if (res.statusCode === 200) {
        FileSystemManager.saveFile({
          tempFilePath: res.tempFilePath,
          // 文件地址为手机本地
          filePath: `${wx.env.USER_DATA_PATH}/${new Date().getTime()}.mp3`,
          success: result => {
            console.log(result)
            if (result.errMsg == 'saveFile:ok') {
              this.registerAudioContext(result.savedFilePath)
            }
          }
        })
      }
    }
  })
},

// 注册音频控件
registerAudioContext(path) {
  innerAudioContext.src = path
  innerAudioContext.play()
  // 避开 IOS 端静音状态没法播放的问题

if (wx.setInnerAudioOption) {
  wx.setInnerAudioOption({
    obeyMuteSwitch: false,
  })
}else {
  innerAudioContext.obeyMuteSwitch = false;
}
  innerAudioContext.onEnded(res => {
    // isPlaying 记录是否在播放中
    this.setData({ ldId: '' })
    innerAudioContext.stop()
  })
  innerAudioContext.onError(res => {
    // 播放音频失败的回调
  })
  innerAudioContext.onPlay(res => {
    // 开始播放音频的回调
  })
  innerAudioContext.onStop(res => {
  
    // 播放音频停止的回调
  })
},
  onHide(){
    this.setData({ ldId: '' })
    innerAudioContext.stop()
  }
  
});
