import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

//查询老师信息
export const teacher_list = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/teacher/find/'+page+'/'+size,params);
}

//查询课程类型
export const courseType_list = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/coursetype/find/'+page+'/'+size,params);
}

//查询学生课程
export const student_course = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/student/findstudntcourse/'+page+'/'+size,params);
}

//学生查询老师的资料
export const findTeacherData = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/document/findTeacherData/'+page+'/'+size,params);
}

