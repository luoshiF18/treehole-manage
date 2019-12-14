import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.thApiUrlPre;

//页面初始化，查询全部
export const page_list = (page,size) =>{

  return http.requestQuickGet(apiUrl+'/warning/findAll/'+page+'/'+size);
}
//删除一条预警记录
export const page_del= (id) =>{
  return http.requestDelete(apiUrl+'/warning/delWarning?warningId='+id);
}
//批量删除预警记录
export const page_delMore= (params) =>{
  return http.requestDelete(apiUrl+'/warning/delMoreWarning?ids[]='+params);
}
//根据id查看详细预警信息
export const page_get= id =>{
  return http.requestQuickGet(apiUrl+'/warning/lookWarning/'+id);
}


export const condition_list = (page,size,params) =>{
  //将params对象数据拼装成key/value串
  let queryString = querystring.stringify(params);
  //请求服务端的页面查询接口
  return http.requestQuickGet(apiUrl+'/warning/getWarningCondition/'+page+'/'+size+'?'+queryString);
}

