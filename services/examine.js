import request from '../utils/request';
export function isExamine(data) {
  return request({
    url: `/itembank/stu/examine/mine`,
    method: 'get',
    data: data,
  });
}
export function getRules(data) {
  return request({
    url: `/itembank/stu/mock-examine/rule`,
    method: 'get',
    data: data,
  });
}
export function getFinalRules(data) {
  return request({
    url: `/itembank/stu/paper`,
    method: 'get',
    data: data,
  });
}
export function start(data) {
  return request({
    url: `/itembank/stu/mock-examine?ruleId=${data.ruleId}`,
    method: 'post',
    data: data,
  });
}
export function startFinal(data) {
  return request({
    url: `/itembank/stu/final-examine?paperId=${data.paperId}`,
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

// pkId
export function startPk(data) {
  return request({
    url: `/student/stu/pk/${data.subjectId}/${data.paperId}`,
    method: 'post',
  });
}
export function finalPk(data) {
  return request({
    url: `/student/stu/pk/submit/${data.pkId}`,
    method: 'post',
  });
}
export function submitPk(data) {
  return request({
    url: `/student/stu/pk/start/${data.pkId}`,
    method: 'post',
  });
}
