import request from '../utils/request';

export function addTopic(data) {
  return request({
    url: `/topics`,
    method: 'post',
    data: data,
  });
}
export function getTopic(data) {
  return request({
    url: `/topics`,
    method: 'get',
    data: data,
  });
}
export function getSchool(data) {
  return request({
    url: `/school`,
    method: 'get',
    data: data,
  });
}
export function getOne(data) {
  return request({
    url: `/topics/${data}`,
    method: 'get',
  });
}
// 回复
export function getOneReplay(data) {
  return request({
    url: `/reply/${data}?size=9999`,
    method: 'get',
  });
}
// 新增回复
export function addReplay(data) {
  return request({
    url: `/reply`,
    method: 'post',
    data: data,
  });
}
// 我的消息
export function getMsg() {
  return request({
    url: `/msg`,
    method: 'get',
  });
}