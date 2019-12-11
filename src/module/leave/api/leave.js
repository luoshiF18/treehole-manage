import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;


//请假
export const add_leave = (leave) =>{
  return http.requestPost(apiUrl+'/train/leave/add',leave);
}

//查询请假信息
export const leave_list = (page,size,leave) =>{
  return http.requestPost(apiUrl+'/train/leave/find/'+page+'/'+size,leave);
}

//消假
export const del_leave = (leaveId) =>{
  return http.requestPut(apiUrl+'/train/leave/remove/'+leaveId);
}

//根据Id得到请假人信息
export const findInfo = (id) =>{
  return http.requestGet(apiUrl+'/train/leave/findInfo/'+id);
}
