import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

//查询期数
export const find_phase = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/phase/find/'+page+'/'+size,params);
}


//查询需要进行选择的课程
export const selectCourse_list = (page,size,phaseId,params) =>{
  return http.requestPost(apiUrl+'/train/phasecourse/find/'+page+'/'+size+'/'+phaseId,params);
}

//查询课程类型
export const courseType_list = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/coursetype/find/'+page+'/'+size,params);
}


//添加选课
export const add_phaseCourse = (phaseId,courseList) =>{
  return http.requestPost(apiUrl+'/train/phasecourse/add/'+phaseId,courseList);
}


//查询老师信息
export const teacher_list = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/teacher/find/'+page+'/'+size,params);
}

//查询期数课程
export const phaseCourse_list = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/phase/findPhaseCourse/'+page+'/'+size,params);
}

//退课
export const retireCourse = (phaseId,courseId) =>{
  return http.requestDelete(apiUrl+'/train/phasecourse/delete/'+phaseId+'/'+courseId);
}

//===============================老师选课审核 ==========================
//审核的课程
export const examineTeacherCourselist = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/teachercourse/findExamineTeacherCourse/'+page+'/'+size,params);
}

//查询所以期数
export const find_all_phase = (params) => {
  return http.requestPost(apiUrl+'/train/phase/find/1/0',params)
}

//审核通过
export const pass = (id) => {
  return http.requestGet(apiUrl+'/train/teachercourse/examinePass/'+id)
}

//审核不通过
export const noPass = (id) => {
  return http.requestGet(apiUrl+'/train/teachercourse/examineNoPass/'+id)
}
