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

//查询量表详细信息
export const scale_detail2 = (scaleName) => {
  //请求服务端的页面查询接口
  return http.requestQuickGet(apiUrl + '/scale/select/detail?scaleName=' + scaleName)
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

//获取量表的所有问题和选项
export const scale_question = (scaleId) => {
  //请求服务端的页面查询接口
  return http.requestQuickGet(apiUrl + '/scale/select/up/question?scaleId=' + scaleId)
}

//添加问题
export const scale_addQuestion = (questions) => {
  //请求服务端的页面查询接口
  return http.requestPost(apiUrl + '/scale/insert/question/', questions)
}

//获取下一个序号，添加问题时候用到
export const scale_nextSort = (scaleId) => {
  //请求服务端的页面查询接口
  return http.requestQuickGet(apiUrl + '/scale/select/next/sort?scaleId=' + scaleId)
}

//处理跳题，把序号变为问题id
export const scale_handleSkip = (scaleId) => {
  //请求服务端的页面查询接口
  return http.requestPost(apiUrl + '/scale/insert/handle/skip?scaleId=' + scaleId)
}

//获取一个问题和选项
export const scale_editOneQuestion = (questionId) => {
  //请求服务端的页面查询接口
  return http.requestQuickGet(apiUrl + '/scale/select/find/question?questionId=' + questionId)
}

//更改单个问题和它的选项
export const scale_upOneQuestion = (questionDTO) => {
  //请求服务端的页面查询接口
  return http.requestPut(apiUrl + '/scale/update/question/', questionDTO)
}

//删除某个选项
export const scale_delOption = (optionId) => {
  //请求服务端的页面查询接口
  return http.requestDelete(apiUrl + '/scale/delete/option?optionId=' + optionId)
}

//删除某个问题
export const scale_delQuestion = (questionId) => {
  //请求服务端的页面查询接口
  return http.requestDelete(apiUrl + '/scale/delete/question?questionId=' + questionId)
}

//添加描述
export const scale_addDesc = (description) => {
  //请求服务端的页面查询接口
  return http.requestPost(apiUrl + '/scale/insert/description/', description)
}

//获取所有描述
export const scale_findDesc = (scaleId) => {
  //请求服务端的页面查询接口
  return http.requestQuickGet(apiUrl + '/scale/select/desc?scaleId=' + scaleId)
}

//删除一个描述
export const scale_delDesc = (descId) => {
  //请求服务端的页面查询接口
  return http.requestDelete(apiUrl + '/scale/delete/desc?descId=' + descId)
}

//获取一个得分描述
export const scale_oneDesc = (descId) => {
  //请求服务端的页面查询接口
  return http.requestQuickGet(apiUrl + '/scale/select/find/one/desc?descId=' + descId)
}

//更改一个得分描述
export const scale_editOneDesc = (description) => {
  //请求服务端的页面查询接口
  return http.requestPut(apiUrl + '/scale/update/desc/', description)
}


