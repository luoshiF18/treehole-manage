import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;


//查询审核请假信息
export const leave_list = (page,size,leave) =>{
  return http.requestPost(apiUrl+'/train/leave/findLeaveStudentExamine/'+page+'/'+size,leave);
}




//消假
export const del_leave = (leaveId) =>{
  return http.requestPut(apiUrl+'/train/leave/remove/'+leaveId);
}

//审核通过
export const pass_leave = (leaveId) =>{
  return http.requestPut(apiUrl+'/train/leave/examine/'+leaveId);
}

//审核未通过
export const no_pass_leave = (leaveId) =>{
  return http.requestPut(apiUrl+'/train/leave/examineNoPass/'+leaveId);
}

//请假信息统计
export const leaveAllInfo = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/leave/findAll/'+page+'/'+size,params);
}

//查询学生期数
export const student_Phase = (params) => {
  return http.requestPost(apiUrl+'/train/phase/find/1/0',params)
}
