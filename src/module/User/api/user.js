import http from './../../../base/api/public'
import querystring from 'querystring'

let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.thApiUrlPre;


// 页面查询方法(定义方法，
export const page_list = (page,size,params) =>{
  // 将params对象数据拼装成key/value串  +'?'+ queryString
  let queryString = querystring.stringify(params);
  // 请求服务端的页面查询接口 通过ajax调用接口来请求数据/User/page/user/
  return http.requestQuickGet(apiUrl+'/user/getAllUserVos/'+page+'/'+size +queryString);
}
//新增页面
export const  page_add = params =>{
  return http.requestPost(apiUrl+'/User/page/add',params);
}
//根据id查询页面
export const page_get= id =>{
  // return http.requestQuickGet(apiUrl+'/User/page/get/'+id);
  return http.requestQuickGet(apiUrl+'GET /uservo/find/userId/'+id);
}
//修改页面提交
export const page_edit= (id,params) =>{
  return http.requestPut(apiUrl+'/User/page/edit/'+id,params);
}
//删除页面
export const page_del= (id) =>{
  return http.requestDelete(apiUrl+'/User/page/del/'+id);
}
/*发布页面*/
export const page_postPage= id => {
  return http.requestPost(apiUrl+'/User/page/postPage/'+id)
}
//站点查询
export const page_site =() =>{
  //查询全部站点
  return http.requestQuickGet(apiUrl+'/User/site/list');
}
//页面模板查询
export const page_template =() =>{
  //查询全部页面模板
  return http.requestQuickGet(apiUrl+'/User/template/list');
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Your Methods!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/*查询 用户详细信息*/ //根据user_id,user_nickname,user_phone
export const userInfo_query = (user_id,user_nickname,user_phone,params) =>{
  // 请求服务端的页面查询接口 通过ajax调用接口来请求数据
  return http.requestQuickGet(apiUrl+'/user/getAllUserVos/'+page+'/'+size+'?'+queryString);
}
/*创建 用户信息*/
export const userInfo_create = (user_id,user_nickname,user_phone,params) =>{
  // 请求服务端的页面查询接口 通过ajax调用接口来请求数据
  return http.requestQuickGet(apiUrl+'/User/page/user/'+page+'/'+size+'?'+queryString);
}
/*修改 用户信息*/
export const userInfo_alter = (user_id,user_nickname,user_phone,params) =>{
  // 请求服务端的页面查询接口 通过ajax调用接口来请求数据
  return http.requestQuickGet(apiUrl+'/User/page/user/'+page+'/'+size+'?'+queryString);
}
/*删除 用户信息*/
export const userInfo_delete = (user_id,user_nickname,user_phone,params) =>{
  // 请求服务端的页面查询接口 通过ajax调用接口来请求数据
  return http.requestQuickGet(apiUrl+'/User/page/user/'+page+'/'+size+'?'+queryString);
}




