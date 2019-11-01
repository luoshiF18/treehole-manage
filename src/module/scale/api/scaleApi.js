import http from './../../../base/api/public'
import querystring from 'querystring'

let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.thApiUrlPre;


//查询所有量表
//页面查询
export const page_list = (params) => {
  //将params对象数据拼装成key/value串
  let queryString = querystring.stringify(params);
  //请求服务端的页面查询接口
  return http.requestQuickGet(apiUrl + '/scale/select/search' + '?' + queryString);
}

//查询所有分类
export const type_list = () => {
  //请求服务端的页面查询接口
  return http.requestQuickGet(apiUrl + '/scale/select/type/all');
}

//删除
export const scale_del = (id) => {
  //请求服务端的页面查询接口
  return http.requestDelete(apiUrl + '/scale/delete/scale?scaleId=' + id)
}

//查询量表详细信息
export const scale_detail = (id) => {
  //请求服务端的页面查询接口
  return http.requestQuickGet(apiUrl + '/scale/select/detail?scaleId=' + id)
}

//创建量表
export const scale_create = (params) => {
  //请求服务端的页面查询接口
  return http.requestPost(apiUrl + '/scale/insert/scale/', params)
}

//修改量表信息
export const scale_alterInfo = (params) => {
  //请求服务端的页面查询接口
  return http.requestPut(apiUrl + '/scale/update/Info/', params)
}

//查看量表分数描述
export const scale_desc = (scaleId) => {
  //请求服务端的页面查询接口
  return http.requestQuickGet(apiUrl + '/scale/select/desc?scaleId=' + scaleId)
}

//获取所有问题和选项
export const scale_question = (scaleId) => {
  //请求服务端的页面查询接口
  return http.requestQuickGet(apiUrl + '/scale/select/up/question?scaleId=' + scaleId)
}



