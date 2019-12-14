import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.thApiUrlPre;

//查询咨询师预约管理单
export const manage_list = (page,size,params) =>{
  //将params对象数据拼装成key/value串
  let queryString = querystring.stringify(params);
  //请求服务端的页面查询接口
  return http.requestQuickGet(apiUrl+'/appointment/cltmanage/list/'+page+'/'+size+'?'+queryString);
}
//新增咨询师预约管理单
export const cltmanage_add = params =>{
  return http.requestPost(apiUrl+'/appointment/cltmanage/add',params);
}
//删除咨询师预约管理单
export const cltmanage_del= (id) =>{
  return http.requestDelete(apiUrl+'/appointment/cltmanage/del/'+id);
}
//根据id查询咨询师预约管理单
export const cltmanage_get= id =>{
  return http.requestQuickGet(apiUrl+'/appointment/cltmanage/get/'+id);
}
//修改咨询师预约管理单
export const cltmanage_edit= (id,params) =>{
  return http.requestPut(apiUrl+'/appointment/cltmanage/edit/'+id,params);
}



