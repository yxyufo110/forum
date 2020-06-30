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
