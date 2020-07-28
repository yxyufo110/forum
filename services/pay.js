import request from '../utils/request';
export function getSubjPayInfo(data) {
  return request({
    url: `/student/stu/order/subject/price/${data}`,
    method: 'get',
  });
}
export function payOrder(data) {
  return request({
    url: `/student/stu/order`,
    method: 'post',
    data: data,
  });
}
export function getOrderList(data) {
  return request({
    url: `/student/stu/order/page`,
    method: 'get',
    data: data,
  });
}
export function popUp(data) {
  return request({
    url: `/student/stu/order/top-up`,
    method: 'post',
    data: data,
  });
}
export function getMyCount() {
  return request({
    url: `/student/stu/integral`,
    method: 'get',
  });
}
export function getPopList(data) {
  return request({
    url: `/student/stu/order/top-up/page`,
    method: 'get',
    data: data,
  });
}
export function getUsedList(data) {
  return request({
    url: `/student/stu/integral/consumption/page`,
    method: 'get',
    data: data,
  });
}
export function getRewardList(data) {
  return request({
    url: `/student/stu/integral/reward/page`,
    method: 'get',
    data: data,
  });
}
