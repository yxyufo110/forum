import request from '../utils/request';
export function getList(data) {
  return request({
    url: `/diary/diaries`,
    method: 'get',
    data: data,
  });
}
export function add(data) {
  return request({
    url: `/diary`,
    method: 'post',
    data: data,
  });
}
export function getUser(data) {
  return request({
    url: `/wechat/current`,
    method: 'post',
    data: data,
  });
}
export function updateUsr(data) {
  return request({
    url: `/wechat/user`,
    method: 'put',
    data: data,
  });
}
export function statistics(data) {
  return request({
    url: `/diary/statistics`,
    method: 'get',
    data: data,
  });
}

