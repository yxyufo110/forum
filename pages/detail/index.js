import {getOne,getOneReplay,addReplay} from '../../services/topic'
Page({
  data: {
    replayList:[],
    /*定义一些数据*/
    focus: false, //输入框是否聚焦
    placeholder: '说点什么...', //底部输入框占字符
    placeholder2: '说点什么，让ta也认识看笔记的你', //顶部输入框占字符
    value: null, //顶部输入框内容
    comment_text: null, //底部评论框内容

    /*
     *以下初始化数据是用户点击任意一条评论或回复时需要设置的数据
     *然后将设置好的数据传递给评论时新创建的评论数据对象
     */
    now_reply_name: null, //当前点击的评论或回复评论的用户昵称
    now_reply_type: 0, //当前回复类型 默认为0 1为回复评论 2为回复回复
    now_parent_id: 0, //当前点击的评论或回复评论的所属评论id
    now_reply: 0, //当前点击的评论或回复评论的id

    //模拟用户信息
   
    topicDetail:{},
    topicId:''
  },
  onLoad(params) {
    this.setData({
      topicId:params.id
    })
    this.init()
  },
  init(){
    getOne(this.data.topicId).then(res=>{
      this.setData({
        topicDetail:res
      })
    })
    getOneReplay(this.data.topicId).then(res=>{
      this.setData({
        replayList:res.content
      })
    })
  },
  back(){
    wx.navigateBack()
  },
  // 顶部输入框
  bindconfirm(e){
    wx.login({
      success:(lres)=>{
        addReplay({
          topicId:this.data.topicId,
          accessCode:lres.code,
          content:e.detail.value,
          parentId:0
        }).then(res=>{
          if(res && res.code == 500) {
            wx.showToast({
              title: '请检查敏感词汇！',
              icon:'none'
            })
            return
          }
          wx.showToast({
            title: '回复成功',
            icon:'none'
          })
          this.init()
        })
      }
    })
   
  },
  //点击用户评论或回复时触发
  replyComment(e) {
    var cid = e.currentTarget.dataset.cid; //当前点击的评论id
    var name = e.currentTarget.dataset.name; //当前点击的评论昵称
    var pid = e.currentTarget.dataset.pid; //当前点击的评论所属评论id
    var type = e.currentTarget.dataset.type; //当前回复类型
    this.setData({
      focus: true, //输入框获取焦点
      placeholder: '回复' + name + '：', //更改底部输入框占字符
      now_reply: cid, //当前点击的评论或回复评论id
      now_reply_name: name, //当前点击的评论或回复评论的用户名
      now_parent_id: pid, //当前点击的评论或回复评论所属id
      now_reply_type: type, //获取类型(1回复评论/2回复-回复评论)
    })
  },

  //底部输入框提交内容时触发
  confirm(e) {
    wx.login({
      success:(lres)=>{
        addReplay({
          topicId:this.data.topicId,
          accessCode:lres.code,
          content:e.detail.value,
          parentId:this.data.now_reply
        }).then(res=>{
          if(res && res.code == 500) {
            wx.showToast({
              title: '请检查敏感词汇！',
              icon:'none'
            })
            return
          }
          wx.showToast({
            title: '回复成功',
            icon:'none'
          })
          this.init()
        })
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '分享',
      path: `/pages/me/index`,
    };
  },
})