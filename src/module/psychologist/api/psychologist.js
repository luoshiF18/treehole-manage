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

//查询所有评价信息
export const comment_all = (page, size) => {
  return http.requestQuickGet(apiUrl + '/psychologist/comment/get/list/?page=' + page + '&size=' + size);
}

//根据评价id查询评价信息
export const comment_find = comment_id => {
  return http.requestQuickGet(apiUrl + '/psychologist/comment/get/comment/' + comment_id)
}

//根据咨询师id查询其评价信息
export const comment_get = (page, size, psychologist_id) => {
  return http.requestQuickGet(apiUrl + '/psychologist/comment/get/psy/' + psychologist_id + '?page=' + page + '&size=' + size);
}

//根据评价id删除评价信息
export const comment_del = comment_id => {
  return http.requestDelete(apiUrl + '/psychologist/comment/del/' + comment_id)
}

//更新评价信息
export const comment_edit = (params) => {
  return http.requestPut(apiUrl + '/psychologist/comment/update', params)
}

//新增评价信息
export const comment_add = params => {
  return http.requestPost(apiUrl + '/psychologist/comment/add', params)
}

//查询所有咨询记录
export const consultation_all = (page, size) => {
  return http.requestQuickGet(apiUrl + '/psychologist/consultation/get/all?page=' + page + '&size=' + size);
}

//根据咨询师id查询其咨询信息
export const consultation_get = (page, size, psychologist_id) => {
  return http.requestQuickGet(apiUrl + '/psychologist/consultation/get/list/psy/' + psychologist_id + '?page=' + page + '&size=' + size);
}

//根据咨询记录id删除该条咨询记录
export const consultation_del = consultation_id => {
  return http.requestDelete(apiUrl + '/psychologist/consultation/del/' + consultation_id)
}

//新增一条咨询记录
export const consultation_add = params => {
  return http.requestPost(apiUrl + '/psychologist/consultation/add', params)
}

//查询所有建议信息
export const suggestion_all = (page, size) => {
  return http.requestQuickGet(apiUrl + '/psychologist/suggestion/get/all?page=' + page + '&size=' + size);
}

//根据建议id查询一条建议信息
export const suggestion_get = (page, size, suggestion_id) => {
  return http.requestQuickGet(apiUrl + '/psychologist/suggestion/get/' + suggestion_id + '?page=' + page + '&size=' + size)
}

//根据建议id删除该条建议
export const suggestion_del = suggestion_id => {
  return http.requestDelete(apiUrl + '/psychologist/suggestion/del/' + suggestion_id)
}

//修改建议信息
export const suggestion_edit = (params) => {
  return http.requestPut(apiUrl + '/psychologist/suggestion/update', params)
}

//根据主键查询建议信息
export const suggestion_find = suggestion_id => {
  return http.requestQuickGet(apiUrl + '/psychologist/suggestion/find/' + suggestion_id)
}

//新增建议信息
export const suggestion_add = params => {
  return http.requestPost(apiUrl + '/psychologist/suggestion/add', params)
}






