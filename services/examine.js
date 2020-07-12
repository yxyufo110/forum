import request from '../utils/request';
export function isExamine() {
  return request({
    url: `/itembank/stu/examine/mine`,
    method: 'get',
  });
}
export function getRules(data) {
  return request({
    url: `/itembank/stu/mock-examine/rule`,
    method: 'get',
    data: data,
  });
}
export function start(data) {
  return request({
    url: `/itembank/stu/mock-examine?ruleId=${data}`,
    method: 'post',
    data: data,
  });
}
export function geTopic(data) {
  return request({
    url: `/itembank/stu/examine/${data.examineId}/question/${data.questionId}`,
    method: 'get',
  });
}
export function getAnswer(data) {
  return request({
    url: `/itembank/stu/examine/answer`,
    method: 'put',
    data: data,
  });
}
export function handIn(data) {
  return request({
    url: `/itembank/stu/examine/handIn?examineId=${data.examineId}`,
    method: 'post',
    data: data,
  });
}
export function getCardList(data) {
  return request({
    url: `/itembank/stu/examine/${data}/answer-sheet`,
    method: 'get',
  });
}
