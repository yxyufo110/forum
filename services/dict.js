import request from '../utils/request';
export function citiesList() {
  return request({
    url: `/itembank/stu/cities`,
    method: 'get',
  });
}
export function categoryList(data) {
  return request({
    url: `/itembank/stu/category`,
    method: 'get',
    data: data,
  });
}
export function searchCategory(data) {
  return request({
    url: `/itembank/stu/category/search`,
    method: 'get',
    data: data,
  });
}
export function getBanners() {
  return request({
    url: `/ops/stu/banner/list`,
    method: 'get',
  });
}
export function getOneBanner(data) {
  return request({
    url: `/ops/stu/banner/${data}`,
    method: 'get',
  });
}
export function getCollect(data) {
  return request({
    url: `/student/stu/collect/page/${data.type}`,
    method: 'get',
    data: data,
  });
}
export function getQuestion() {
  return request({
    url: `/student/stu/collect/list/question`,
    method: 'get',
  });
}
