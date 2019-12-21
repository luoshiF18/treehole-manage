import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.thApiUrlPre;

//个人档案列表查询
export const archivesList_list = (page,size,params) =>{
  //将params对象数据拼装成key/value串
  let queryString = querystring.stringify(params);
  //请求服务端的页面查询接口
  return http.requestQuickGet(apiUrl+'/archives/person/list/'+page+'/'+size+'?'+queryString);
}

//个人档案详情查询
export const query_archivesExt = (params) =>{
  //将params对象数据拼装成key/value串
  let queryString = querystring.stringify(params);
  //请求服务端的页面查询接口
  return http.requestQuickGet(apiUrl+'/archives/person/detail'+'?'+queryString);
}


//用户档案列表查询
export const allUser_list = (page,size,params) =>{
  //将params对象数据拼装成key/value串
  let queryString = querystring.stringify(params);
  //请求服务端的页面查询接口
  return http.requestQuickGet(apiUrl+'/member/user/getAllUserVos/'+page+'/'+size+'?'+queryString);
}

//用户基本信息查询
export const user_basic = (params) =>{
  //将params对象数据拼装成key/value串
  // let queryString = querystring.stringify(params);
  //请求服务端的页面查询接口
  return http.requestQuickGet(apiUrl+'/member/user/find/userId/'+params);
}

//查询预约订单
export const page_list = (page,size,params) =>{
  //将params对象数据拼装成key/value串
  let queryString = querystring.stringify(params);
  //请求服务端的页面查询接口
  return http.requestQuickGet(apiUrl+'/appointment/order/list/'+page+'/'+size+'?'+queryString);
}

//咨询师咨询记录
export const psy_consultation_list = (params,userId) =>{
  //将params对象数据拼装成key/value串
  let queryString = querystring.stringify(params);
  //请求服务端的页面查询接口
  return http.requestQuickGet(apiUrl+'/psychologist/consultation/get/list/user/'+userId+'?'+queryString);
}

// 页面查询(用户  phone | nickName | userID)
export const user_list = (page,size,params) =>{
  // 将params对象数据拼装成key/value串  + queryString
  let queryString = querystring.stringify(params);
  // 请求服务端的页面查询接口 通过ajax调用接口来请求数据
  return http.requestQuickGet(apiUrl+'/member/user/getAllUserVos/'+page+'/'+size +'?'+ queryString);
}


//服务列表查询
export const serv_list = (params) => {
  //将params对象数据拼装成key/value串
  let queryString = querystring.stringify(params);
  //请求服务端的页面查询接口
  //return http.requestQuickGet(apiUrl+'/agent/getAllAgent/' + '?' + queryString);
  return http.requestQuickGet(apiUrl+'/online/serv/getAllServ/' + '?' + queryString);
};
