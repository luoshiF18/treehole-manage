import http from './../../../base/api/public'
import querystring from 'querystring'

let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

//根据条件分页查询简介信息
export const profile_list = (page, size, params) => {
  //将params对象数据拼装成key/value串
  let queryString = querystring.stringify(params);
  //请求服务端的查询接口
  return http.requestQuickGet(apiUrl + '/psychologist/profile/find/all?' + queryString);
}

//添加简介信息
export const profile_add = params => {
  return http.requestPost(apiUrl + '/psychologist/profile/add', params)
}

//根据id查询简介信息
export const profile_get = id => {
  return http.requestQuickGet(apiUrl + '/psychologist/profile/find/' + id)
}

//修改简介信息
export const profile_edit = (params) => {
  return http.requestPut(apiUrl + '/psychologist/profile/update', params)
}

//根据id删除简介信息
export const profile_del = id => {
  return http.requestDelete(apiUrl + '/psychologist/profile/del/' + id)
}

//分页查询状态信息
export const state_list = (page, size, params) => {
  let queryString = querystring.stringify(params);
  return http.requestQuickGet(apiUrl + '/psychologist/state/find/list?' + queryString)
}

//新增状态信息
export const state_add = (params) => {
  return http.requestPost(apiUrl + '/psychologist/state/add', params)
}

//根据id查询状态信息
export const state_get = id => {
  return http.requestQuickGet(apiUrl + '/psychologist/state/find/' + id)
}

//修改状态信息
export const state_edit = (params) => {
  return http.requestPut(apiUrl + '/psychologist/state/update', params)
}

//根据id删除状态信息
export const state_del = id => {
  return http.requestDelete(apiUrl + '/psychologist/state/del/' + id)
}

//按照id自增查询所有简介信息
export const profile_all = (page, size) => {
  return http.requestQuickGet(apiUrl + '/psychologist/profile/get/all?page=' + page + '&size=' + size);
}

//按照id自增查询所有状态信息
export const state_all = (page, size) => {
  return http.requestQuickGet(apiUrl + '/psychologist/state/get/all?page=' + page + '&size=' + size);
}

//根据条件分页查询详情信息
export const detail_list = (page, size, params) => {
  let queryString = querystring.stringify(params);
  return http.requestQuickGet(apiUrl + '/psychologist/detail/get/all?' + queryString);
}

//新增详情信息
export const detail_add = params => {
  return http.requestPost(apiUrl + '/psychologist/detail/add', params)
}

//根据id查询详情信息
export const detail_get = psychologist_id => {
  return http.requestQuickGet(apiUrl + '/psychologist/detail/get/' + psychologist_id)
}

//更新详情信息
export const detail_edit = (params) => {
  return http.requestPut(apiUrl + '/psychologist/detail/update', params)
}

//根据id删除详情信息
export const detail_del = psychologist_id => {
  return http.requestDelete(apiUrl + '/psychologist/detail/del/' + psychologist_id)
}

//按照id自增查询所有详情信息
export const detail_all = (page, size) => {
  return http.requestQuickGet(apiUrl + '/psychologist/detail/get/list?page=' + page + '&size=' + size);
}






