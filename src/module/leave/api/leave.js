import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

//请假
export const add_leave = (leave) =>{
  return http.requestPost(apiUrl+'/train/leave/add',leave);
}

//根据Id得到请假人信息
export const findInfo = (id) =>{
  return http.requestGet(apiUrl+'/train/leave/findInfo/'+id);
}

