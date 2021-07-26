import { weekLive ,replay} from '../../services/course';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[],
      pageNumber: 0, // 当前页码
      hasNextPage: false, // 是否有下一页
      info: [[]],
      categoryId: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    weekLive({
      categoryId:e.categoryId 
    }).then(res=>{
          this.setData({
            list: res.map(i=>({
              ...i,
              date:i.date.split('-')[2]
            }))
          })
    })
    replay({
      categoryId:e.categoryId 
    }).then(res=>{
      this.setData({
        ['info[0]']: res.content,
        pageNumber: res.number + 1,
        hasNextPage: res.number + 1 >= res.totalPages ? false : true,
        categoryId: e.categoryId,
      });
    })
  },
  searchMore: function () {
    if (this.data.hasNextPage) {
      replay({ page: this.data.pageNumber, size: 10,categoryId:this.data.categoryId }).then((res) => {
        this.setData({
          [`info[${res.number + 1}]`]: res.content,
          pageNumber: res.number + 1,
          hasNextPage: res.number + 1 >= res.totalPages ? false : true,
          categoryId: this.data.categoryId,
        });
      });
    }
  },
})