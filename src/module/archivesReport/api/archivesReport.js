import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.thApiUrlPre;

//个体报告列表查询
export const archivesReport_list = (page,size,params) =>{
  //将params对象数据拼装成key/value串
  let queryString = querystring.stringify(params);
  //请求服务端的页面查询接口
  return http.requestQuickGet(apiUrl+'/archives/ResultList/'+page+'/'+size + '?'+queryString);
}

//个体报告详情查询
export const query_archivesExt = (resultId) =>{
  //将params对象数据拼装成key/value串
  // let queryString = querystring.stringify(params);
  //请求服务端的页面查询接口
  return http.requestQuickGet(apiUrl+'/archives/resultExt/'+resultId);
}


