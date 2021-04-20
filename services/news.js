import request from '../utils/request';
export function queryList() {
  return request({
    url: `/ops/stu/article/articles`,
    method: 'get',
  });
}
export function queryOne(id) {
  return request({
    url: `/ops/stu/article/${id}`,
    method: 'get',
  });
}
