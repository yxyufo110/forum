import request from '../utils/request';
export function geTopic(data) {
  return request({
    url: `/itembank/stu/question`,
    method: 'get',
    data: data,
  });
}
export function geTopicOne(data) {
  return request({
    url: `/itembank/stu/question/${data.questionId}/detail`,
    method: 'get',
    data: {
      chapter: data.chapter,
    },
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
export function errorCard(data) {
  return request({
    url: `/itembank/stu/problem-book/work-card`,
    method: 'get',
    data: data,
  });
}

export function statistics(data) {
  return request({
    url: `/itembank/stu/question/practice/statistics`,
    method: 'get',
    data: data,
  });
}
export function repractice(data) {
  return request({
    url: `/itembank/stu/question/re-practice?subjectId=${data.subjectId}&chapter=${data.chapter}`,
    method: 'put',
    data: data,
  });
}
export function correction(data) {
  return request({
    url: `/student/stu/share/test-bank`,
    method: 'post',
    data: data,
  });
}
