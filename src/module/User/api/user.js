import http from './../../../base/api/public'
import querystring from 'querystring'

let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.thApiUrlPre;

// 页面查询(签到)
export const user_sign = (params) =>{
  // 将params对象数据拼装成key/value串
  let queryString = querystring.stringify(params);
  // 请求服务端的页面查询接口 通过ajax调用接口来请求数据
  return http.requestQuickGet(apiUrl+'/checkin/getAllCheckin'+'?'+ queryString);
}
//--------------------------------------------------------
// 页面查询(用户)
export const page_list = (page,size,params) =>{
  // 将params对象数据拼装成key/value串  + queryString
  let queryString = querystring.stringify(params);
  // 请求服务端的页面查询接口 通过ajax调用接口来请求数据
  return http.requestQuickGet(apiUrl+'/user/getAllUserVos/'+page+'/'+size +'?'+ queryString);
}
// 页面查询(会员卡)
export const page_cardslist = (page,size,params) =>{
  let queryString = querystring.stringify(params);
  return http.requestQuickGet(apiUrl+'/card/getAllCards/'+page+'/'+size+'?'+ queryString);
}
// 页面查询(会员等级)
export const user_grade = (params) =>{
  // 将params对象数据拼装成key/value串
  let queryString = querystring.stringify(params);
  // 请求服务端的页面查询接口 通过ajax调用接口来请求数据
  return http.requestQuickGet(apiUrl+'/freegrade/find/all'+'?'+ queryString);
}
// 页面查询(VIP会员等级)
export const vip_user_grade = (params) =>{
  // 将params对象数据拼装成key/value串
  let queryString = querystring.stringify(params);
  // 请求服务端的页面查询接口 通过ajax调用接口来请求数据
  return http.requestQuickGet(apiUrl+'/paygrade/find/all'+'?'+ queryString);
}
//页面查询(会员积分)
export const user_integral = (params) =>{
  // 将params对象数据拼装成key/value串
  let queryString = querystring.stringify(params);
  // 请求服务端的页面查询接口 通过ajax调用接口来请求数据
  return http.requestQuickGet(apiUrl+'/point/getAllPoints'+'?'+ queryString);
}
//新增页面
export const  page_add = params =>{
  return http.requestPost(apiUrl+'/User/page/add',params);
}
//根据id查询页面(用户)
export const page_get= id =>{
  return http.requestQuickGet(apiUrl+'/user/getAllUserVos/'+id);
}
//修改页面提交
export const page_edit= (id,params) =>{
  return http.requestPut(apiUrl+'/User/page/edit/'+id,params);
}
//删除页面@
export const page_del= (id)=>{
  return http.requestDelete(apiUrl+'/user/delete/id/'+id);
}
//发布页面@
export const page_postPage= id => {
  return http.requestPost(apiUrl+'/User/page/postPage/'+id)
}
//页面模板查询(bewilder！）
export const page_template =() =>{
  //查询全部页面模板
  return http.requestQuickGet(apiUrl+'/User/template/list');
}




