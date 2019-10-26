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
