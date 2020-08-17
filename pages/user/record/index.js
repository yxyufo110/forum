import { getCourseLog, getQuestionLog } from '../../../services/course';
import { getExamineList } from '../../../services/examine';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    courseList: [],
    questionList: [],
    pageNumber: 0, // 当前页码
    hasNextPage: false, // 是否有下一页
    info: [[]],
    active: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getQuestionLog().then((res) => {
      this.setData({
        questionList: res,
      });
    });
    getCourseLog().then((res) => {
      this.setData({
        courseList: res,
      });
    });
    getExamineList({ page: 0, size: 10 }).then((res) => {
      this.setData({
        ['info[0]']: res.content,
        pageNumber: res.number + 1,
        hasNextPage: res.number + 1 >= res.totalPages ? false : true,
      });
    });
  },
  onChange(event) {
    this.setData({
      active: event.detail.name,
    });
  },
  searchMore: function () {
    if (this.data.hasNextPage && this.data.active === 2) {
      getExamineList({ page: this.data.pageNumber, size: 10 }).then((res) => {
        this.setData({
          [`info[${res.number + 1}]`]: res.content,
          pageNumber: res.number + 1,
          hasNextPage: res.number + 1 >= res.totalPages ? false : true,
        });
      });
    }
  },
});
