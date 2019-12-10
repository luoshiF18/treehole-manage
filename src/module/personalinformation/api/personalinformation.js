import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

//查询老师信息
export const teacher_list = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/teacher/find/'+page+'/'+size,params);
}


