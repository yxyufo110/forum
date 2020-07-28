import request from '../utils/request';
export function queryOne(data) {
  return request({
    url: `/course/stu/course/${data}`,
    method: 'get',
  });
}
export function queryALl(data) {
  return request({
    url: `/course/stu/course/page`,
    method: 'get',
    data: data,
  });
}
export function queryLike(data) {
  return request({
    url: `/course/stu/course/recommend/${data}`,
    method: 'get',
  });
}
export function updateTime(data) {
  return request({
    url: `/course/stu/course/log`,
    method: 'put',
    data: data,
  });
}
export function queryChapter(data) {
  return request({
    url: `/course/stu/course/chapter/${data}`,
    method: 'get',
  });
}
export function collect(data) {
  return request({
    url: `/student/stu/collect/${data.type || 'Course'}`,
    method: 'post',
    data: data,
  });
}
export function cancelCollect(data) {
  return request({
    url: `/student/stu/collect/${data}/Course`,
    method: 'delete',
  });
}
export function getShareId(data) {
  return request({
    url: `/student/stu/share/course`,
    method: 'post',
    data: data,
  });
}
export function getCourseLog(data) {
  return request({
    url: `/course/stu/course/log/list`,
    method: 'get',
    data: data,
  });
}
export function getQuestionLog(data) {
  return request({
    url: `/itembank/stu/question/practice/statistics/category`,
    method: 'get',
    data: data,
  });
}
