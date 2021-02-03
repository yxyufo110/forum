import moment from 'moment';
import { getShareList, shareCount } from '../../../services/user';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activeNames: [],
    Course: [],
    Testbank: [],
    Tweets: [],
    effectiveHits: 0,
    timerVis:false,
    minDate: new Date(2010, 10, 1).getTime(),
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getShareList().then((res) => {
      this.setData({
        Course: res.Course,
        Testbank: res.Testbank,
        Tweets: res.Tweets,
      });
    });
    shareCount().then((res) => {
      this.setData({
        effectiveHits: res.effectiveHits,
      });
    });
  },

  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  showTimer() {
    this.setData({
      timerVis:!this.data.timerVis
    })
  },
 
  onConfirm(e) {
    getShareList({
      beginShortDate:moment(e.detail[0]).format('YYYY-MM-DD'),
      endShortDate:moment(e.detail[1]).format('YYYY-MM-DD'),
    }).then((res) => {
      this.setData({
        Course: res.Course,
        Testbank: res.Testbank,
        Tweets: res.Tweets,
      });
      this.showTimer()
    })
  }
});
