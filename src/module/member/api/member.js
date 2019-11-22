import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.thApiUrlPre;

// 页面查询(用户  phone | nickName | userID)
export const user_list = (page,size,params) =>{
  // 将params对象数据拼装成key/value串  + queryString
  let queryString = querystring.stringify(params);
  // 请求服务端的页面查询接口 通过ajax调用接口来请求数据
  return http.requestQuickGet(apiUrl+'/member/user/getAllUserVos/'+page+'/'+size +'?'+ queryString);
}
// 页面查询(会员等级)
export const user_grade = (page,size,params) =>{
  // 将params对象数据拼装成key/value串
  let queryString = querystring.stringify(params);
  // 请求服务端的页面查询接口 通过ajax调用接口来请求数据
  return http.requestQuickGet(apiUrl+'/member/freegrade/find/all/'+page+'/'+size+'?'+ queryString);
}
// 页面查询(VIP会员等级)
export const vip_user_grade = (page,size,params) =>{
  // 将params对象数据拼装成key/value串
  let queryString = querystring.stringify(params);
  // 请求服务端的页面查询接口 通过ajax调用接口来请求数据
  return http.requestQuickGet(apiUrl+'/member/paygrade/find/all/'+page+'/'+size+'?'+ queryString);
}
// 页面查询(会员卡信息)
export const page_cardslist = (page,size,params) =>{
  let queryString = querystring.stringify(params);
  return http.requestQuickGet(apiUrl+'/member/card/getAllCards/'+page+'/'+size+'?'+ queryString);
}
//页面查询(会员积分)
export const user_integral = (params) =>{
  // 将params对象数据拼装成key/value串
  let queryString = querystring.stringify(params);
  // 请求服务端的页面查询接口 通过ajax调用接口来请求数据
  return http.requestQuickGet(apiUrl+'/member/point/getAllPoints/'+page+'/'+size+'?'+ queryString);
}
// 页面查询(签到)
export const user_sign = (params) =>{
  // 将params对象数据拼装成key/value串
  let queryString = querystring.stringify(params);
  // 请求服务端的页面查询接口 通过ajax调用接口来请求数据
  return http.requestQuickGet(apiUrl+'/member/checkin/getAllCheckin'+page+'/'+size+'?'+ queryString);
}
//*------------------------------------------------------------*/
//删除页面（用户)  -->  DELETE /user/delete/id/{user_id}
export const user_del= (id)=>{
  return http.requestDelete(apiUrl+'/member/user/delete/'+ id);
}

//删除页面（注册会员）
export const freegrade_del= (id)=>{
  return http.requestDelete(apiUrl+'/member/freegrade/delete/'+id);
}
//删除页面（付费会员）
export const paygrade_del= (id)=>{
  return http.requestDelete(apiUrl+'/member/paygrade/delete/'+id);
}

//删除页面（）
export const page_del= (id)=>{
  return http.requestDelete(apiUrl+'/member/paygrade/delete/'+id);
}



//新增页面
export const page_add = params =>{
  return http.requestPost(apiUrl+'/member/page/add',params);
}
//根据id查询页面(用户)
export const page_get= id =>{
  return http.requestQuickGet(apiUrl+'/member/user/getAllUserVos/'+id);
}
//修改页面提交
export const page_edit= (id,params) =>{
  return http.requestPut(apiUrl+'/member/page/edit/'+id,params);
}
//发布页面@
export const page_postPage= id => {
  return http.requestPost(apiUrl+'/member/page/postPage/'+id)
}
//页面模板查询(bewilder！）
export const page_template =() =>{
  //查询全部页面模板
  return http.requestQuickGet(apiUrl+'/member/template/list');
}




