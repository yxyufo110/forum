// pages/add/index.js
import { unix } from 'moment';
import { add } from '../../services/user';
const recorderManager = wx.getRecorderManager()
let timer = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isStart:false,
    vodFile:'',
    time:0,
    xinList:'xin1',
    weList:'we1'
  },
  onLoad: function (options) {
  },
  submit(){
    recorderManager.stop()
    if(!this.data.xinList) {
      wx.showToast({
        title: '请选择心情',
        icon:'none'
      })
      return
    }
    if(!this.data.weList) {
      wx.showToast({
        title: '请选择天气',
        icon:'none'
      })
      return
    }
    if(!this.data.vodFile) {
      wx.showToast({
        title: '请录制语音',
        icon:'none'
      })
      return
    }
    wx.showLoading({
      title: '保存中',
    })
    wx.uploadFile({
      filePath: this.data.vodFile.tempFilePath,
      name: 'file',
      url: 'https://diary.mecyn.com/file',
      header: {
        'Authorization': wx.getStorageSync('Authorization')
      },
      success:(res)=>{
        add({
          feelings:[this.data.xinList],
          weathers:[this.data.weList],
          recordingId:res.data,
          time:this.data.vodFile.duration
        }).then(res=>{
          wx.hideLoading()
          wx.navigateBack({
            delta: 0,
          })
        }).catch(()=>{
          wx.hideLoading()
        })
      },
      fail:(res)=>{
        wx.hideLoading()
        console.log('fail',res)
      },
    })
    // add({
    //   feelings:this.data.xinList,
    //   weathers:this.data.weList,
    //   recordingId:this.data.vodFile.tempFilePath
    // })
  },
  checkXin(e) {
    this.setData({
      xinList:e.currentTarget.dataset.id
    })
  },
  checkWe(e) {
    this.setData({
      weList:e.currentTarget.dataset.id
    })
  },
  onUnload(){
    this.stop()
  },
  onHide(){
    this.stop()
  },
  countTime(){
    if(timer) {
      clearInterval(timer)
      this.setData({
        time:0
      })
    } 
   timer = setInterval(()=>{
      this.setData({
        time:this.data.time + 1
      })
    },1000)
  },
  onShareAppMessage: function () {
    return {
      title: '分享语音日记',
      path: `/pages/index/index`,
    };
  },

stop(){
 
  recorderManager.onStop((e) => {
    wx.showToast({
      title: '录音结束',
      icon:'none'
    })
  
    if(timer) {
      clearInterval(timer)
    }
    this.setData({
      isStart:false,
      vodFile:e,
      time:0
    })
  })
  recorderManager.stop()
},
  start(){
    const recorderManager = wx.getRecorderManager()
    recorderManager.onStart(() => {
      wx.showToast({
        title: '录音开始',
        icon:'none'
      })
      this.setData({
        isStart:true,
        time:0
      })
      this.countTime()
    })
    const options = {
      duration: 600000,
      sampleRate: 8000,
      numberOfChannels: 1,
      encodeBitRate: 16000,
      format: 'mp3',
    }
    recorderManager.start(options)
    
  }
})