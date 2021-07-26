import request from '../utils/request';
export function queryList(data) {
  return request({
    url: `/ops/stu/article/articles`,
    method: 'get',
    data: data,
  });
}
export function queryOne(id) {
  return request({
    url: `/ops/stu/article/${id}`,
    method: 'get',
  });
}
