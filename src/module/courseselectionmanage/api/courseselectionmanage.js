import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;


//查询需要进行选择的课程
export const selectCourse_list = (page,size,classId,params) =>{
  return http.requestPost(apiUrl+'/train/classcourse/find/'+page+'/'+size+'/'+classId,params);
}

//查询课程类型
export const courseType_list = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/coursetype/find/'+page+'/'+size,params);
}

//查询班级信息
export const class_list = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/class/find/'+page+'/'+size,params);
}

//添加选课
export const add_classCourse = (classId,courseList) =>{
  return http.requestPost(apiUrl+'/train/classcourse/add/'+classId,courseList);
}


//查询老师信息
export const teacher_list = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/teacher/find/'+page+'/'+size,params);
}

//查询班级课程
export const classCourse_list = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/class/findclasscourse/'+page+'/'+size,params);
}

//退课
export const retireCourse = (classId,courseId) =>{
  return http.requestDelete(apiUrl+'/train/classcourse/delete/'+classId+'/'+courseId);
}
