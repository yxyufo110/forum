import request from '../utils/request';

export function collect(data) {
  return request({
    url: `/student/stu/collect/${data.type || 'Course'}`,
    method: 'post',
    data: data,
  });
}
