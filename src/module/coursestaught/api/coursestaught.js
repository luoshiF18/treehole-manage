import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

//查询老师所教课程
export const teacherCourseOfTeaching = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/teacher/findTeacherCourseOfTeaching/'+page+'/'+size,params);
}

//查询课程类型
export const courseType_list = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/coursetype/find/'+page+'/'+size,params);
}

//查询课程类型
export const upload = (describe,folderId,userId,params) =>{
  return http.requestPost(apiUrl+'/document/123'+describe+'/'+folderId+'/'+userId,params);
}

//下载
export const down = (d,a) =>{
  return http.requestGet(apiUrl+'/train/document/downloadDoc/'+d+'/'+a);
}

//查询学生上传的作业
export const findStudentTask = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/document/findStudentTask/'+page+'/'+size,params);
}
