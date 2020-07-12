import request from '../utils/request';
export function updateUsr(data) {
  return request({
    url: `/student/stu/student/update`,
    method: 'post',
    data: data,
  });
}
export function updateSubject(data) {
  return request({
    url: `/student/stu/student/category/${data}`,
    method: 'post',
  });
}
export function getUserInfo() {
  return request({
    url: `/student/stu/student/current`,
    method: 'get',
  });
}
export function getNotice(data) {
  return request({
    url: `/student/stu/notice/page`,
    method: 'get',
    data: data,
  });
}
export function red(id) {
  return request({
    url: `/student/stu/notice/read/${id}`,
    method: 'put',
  });
}
export function getNoticeOne(id) {
  return request({
    url: `/student/stu/notice/${id}`,
    method: 'get',
  });
}

export function getNav() {
  return request({
    url: `/itembank/stu/navigation`,
    method: 'get',
  });
}
