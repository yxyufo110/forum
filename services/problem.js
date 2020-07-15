import request from '../utils/request';
export function statistics() {
  return request({
    url: `/itembank/stu/problem-book/statistics`,
    method: 'get',
  });
}
export function getQuestion(data) {
  return request({
    url: `/itembank/stu/problem-book/question`,
    method: 'get',
    data: data,
  });
}
export function getAnswer(data) {
  return request({
    url: `/itembank/stu/problem-book/practice`,
    method: 'post',
    data: data,
  });
}
export function remove(data) {
  return request({
    url: `/itembank/stu/problem-book/${data}`,
    method: 'delete',
  });
}
