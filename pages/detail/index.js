import {getOne,getOneReplay,addReplay} from '../../services/topic'
Page({
  data: {
    replayList:[],
    //评论数据
    comment_list: [{
        comment_id: 1, //评论id
        comment_pr_id: 1, //评论文章所属id
        comment_user_avatar: '/images/assemblyNumber/discoveryDetails/per1.png', //评论用户头像(路径替换为你的图片路径)
        comment_user_name: '高飞', //评论人昵称
        comment_text: '去办理优待证是挺难的，但是办理了优待证之后福利特别好', //评论内容
        comment_time: '2020年8月18日', //评论时间
        reply_id: 0, //回复谁的评论，默认为0
        parent_id: 0, //评论所属评论id，默认为0
        reply_name: '' //回复评论用户的昵称 默认为''
      },
      {
        comment_id: 2,
        comment_pr_id: 1,
        comment_user_avatar: '/images/assemblyNumber/discoveryDetails/per2.png',
        comment_user_name: '张维默',
        comment_text: '去办理优待证是挺难的，但是办理了优待证之后福利特别好',
        comment_time: '2020年8月18日',
        reply_id: 0,
        parent_id: 0,
        reply_name: ''
      },
      {
        comment_id: 3,
        comment_pr_id: 1,
        comment_user_avatar: '/images/assemblyNumber/discoveryDetails/per3.png',
        comment_user_name: '张剑锋',
        comment_text: '去办理优待证是挺难的，但是办理了优待证之后福利特别好',
        comment_time: '2020年8月18日',
        reply_id: 0,
        parent_id: 0,
        reply_name: ''
      }
    ],

    //回复数据
    comment_list2: [{
        comment_id: 4,
        comment_pr_id: 1,
        comment_user_name: '张剑锋',
        comment_user_avatar: '/images/assemblyNumber/discoveryDetails/per3.png',
        comment_text: "大家快去办理吧!!!",
        comment_time: '2020年8月18日',
        reply_id: 3,
        parent_id: 3,
        reply_name: ''
      },
      {
        comment_id: 5,
        comment_pr_id: 1,
        comment_user_name: '沈非隆',
        comment_user_avatar: '/images/assemblyNumber/discoveryDetails/per4.png',
        comment_text: "办理优待证大概需要多长时间呢会不会需要特别长时间",
        comment_time: '2020年8月18日',
        reply_id: 3,
        parent_id: 3,
        reply_name: '张剑锋'
      }
    ],

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
    userinfo: {
      nickName: '马飞', //用户昵称
      avatarUrl: '/images/assemblyNumber/discoveryDetails/per5.png' //用户头像
    },
    topicDetail:{},
    topicId:''
  },
  onLoad() {
    let params ={
      id:'625ffc0fdb645b468fa666bf'
    }
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
    console.log(pid)
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
    console.log(e)
    wx.login({
      success:(lres)=>{
        addReplay({
          topicId:this.data.topicId,
          accessCode:lres.code,
          content:e.detail.value,
          parentId:this.data.now_reply
        }).then(res=>{
          wx.showToast({
            title: '回复成功',
            icon:'none'
          })
          this.init()
        })
      }
    })
  }
})