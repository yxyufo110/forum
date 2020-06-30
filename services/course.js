import request from '../utils/request';
export function queryOne(data) {
  return request({
    url: `/course/stu/course/${data}`,
    method: 'get',
  });
}
