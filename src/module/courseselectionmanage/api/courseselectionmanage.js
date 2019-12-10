import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;


//查询课程类型
export const courseType_list = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/coursetype/find/'+page+'/'+size,params);
}


//展示课程信息
export const showCourse = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/teachercourse/findTeacherCourse/'+page+'/'+size,params);
}

//查询期数
export const find_Phase = (params) => {
  return http.requestPost(apiUrl+'/train/phase/find/1/0',params)
}

//选课
export const select_course = (teacherId,params) => {
  return http.requestPost(apiUrl+'/train/teachercourse/teacherCourseSelection/'+teacherId,params)
}
