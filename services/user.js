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
export function getUserInfos() {
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

export function getShareList() {
  return request({
    url: `/student/stu/share/list`,
    method: 'get',
  });
}
export function backShare(data) {
  return request({
    url: `/student/stu/share/callback/${data.shareId}`,
    method: 'post',
    data: data,
  });
}
export function backPk(data) {
  return request({
    url: `/student/stu/pk/click/${data.pkId}`,
    method: 'post',
    data: data,
  });
}

export function shareCount() {
  return request({
    url: `/student/stu/share/statistics`,
    method: 'get',
  });
}
export function getPkList() {
  return request({
    url: `/student/stu/pk/list`,
    method: 'get',
  });
}
export function getTeacher() {
  return request({
    url: `/itembank/stu/grade/teachers`,
    method: 'get',
  });
}
export function lyOut() {
  return request({
    url: `/student/stu/login/log`,
    method: 'post',
  });
}

export function updateNav(data) {
  return request({
    url: `/student/stu/student/category/self/${data}`,
    method: 'post',
  });
}
export function getRadar(data) {
  return request({
    url: `/itembank/stu/question/practice/statistics/radar`,
    method: 'get',
    data: data,
  });
}
