import request from '../utils/request';
export function geTopic(data) {
  return request({
    url: `/itembank/stu/question`,
    method: 'get',
    data: data,
  });
}
export function getAnswer(data) {
  return request({
    url: `/itembank/stu/question/practice`,
    method: 'post',
    data: data,
  });
}
export function getCardList(data) {
  return request({
    url: `/itembank/stu/question/work-card`,
    method: 'get',
    data: data,
  });
}
export function getShareId(data) {
  return request({
    url: `/student/stu/share/test-bank`,
    method: 'post',
    data: data,
  });
}
export function topicIsCollect(data) {
  return request({
    url: `/student/stu/collect/judge/question/${data}`,
    method: 'get',
  });
}
export function cancelCollect(data) {
  return request({
    url: `/student/stu/collect/${data}/Question`,
    method: 'delete',
  });
}
