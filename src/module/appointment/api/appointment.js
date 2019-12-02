import http from '../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

//查询预约订单
export const page_list = (page,size,params) =>{
  //将params对象数据拼装成key/value串
  let queryString = querystring.stringify(params);
  //请求服务端的页面查询接口
  return http.requestQuickGet(apiUrl+'/appointment/order/list/'+page+'/'+size+'?'+queryString);
}
//删除预约订单
export const page_del= (id) =>{
  return http.requestDelete(apiUrl+'/appointment/order/del/'+id);
}
//根据id查询页面
export const page_get= id =>{
  return http.requestQuickGet(apiUrl+'/appointment/order/get/'+id);
}
//修改页面提交
export const page_edit= (id,params) =>{
  return http.requestPut(apiUrl+'/appointment/order/edit/'+id,params);
}



