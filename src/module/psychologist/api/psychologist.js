import http from './../../../base/api/public'
import querystring from 'querystring'

let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

//根据条件分页查询心理咨询师简介信息
export const profile_list = (page, size, params) => {
  //将params对象数据拼装成key/value串
  let queryString = querystring.stringify(params);
  //请求服务端的查询接口
  return http.requestQuickGet(apiUrl + '/psychologist/profile/find/all?' + queryString);
}

//添加心理咨询师简介信息
export const profile_add = params => {
  return http.requestPost(apiUrl + '/psychologist/profile/add', params)
}

//根据id查询心理咨询师简介信息
export const profile_get = id => {
  return http.requestQuickGet(apiUrl + '/psychologist/profile/find/' + id)
}

//修改提交
export const profile_edit = (params) => {
  return http.requestPut(apiUrl + '/psychologist/profile/update', params)
}

//根据id删除简介信息
export const profile_del = id => {
  return http.requestDelete(apiUrl + '/psychologist/profile/del/' + id)
}






