import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;


//班级课程统计信息
export const class_course = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/class/findclasscourse/'+page+'/'+size,params);
}

//查询老师信息
export const teacher_list = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/teacher/find/'+page+'/'+size,params);
}

//查询课程类型
export const courseType_list = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/coursetype/find/'+page+'/'+size,params);
}
