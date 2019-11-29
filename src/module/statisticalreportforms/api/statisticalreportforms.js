import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

//=====================================学生信息统计====================================================
//页面学生查询
export const student_list = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/student/find/'+page+'/'+size,params);
}


//查询学生课程
export const student_course = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/student/findstudntcourse/'+page+'/'+size,params);
}

//查询老师信息
export const teacher_list = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/teacher/find/'+page+'/'+size,params);
}

//查询课程类型
export const courseType_list = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/coursetype/find/'+page+'/'+size,params);
}

//查询学生期数
export const student_Phase = (params) => {
  return http.requestPost(apiUrl+'/train/phase/find/1/0',params)
}

//=====================================班级信息统计====================================================
//查询班级信息
export const class_list = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/class/find/'+page+'/'+size,params);
}

//班级学生统计信息
export const class_student = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/class/findclassstudent/'+page+'/'+size,params);
}

//班级课程统计信息
export const class_course = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/class/findclasscourse/'+page+'/'+size,params);
}

//班级老师统计信息
export const class_teacher = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/class/findclassteacher/'+page+'/'+size,params);
}
//=====================================请假信息统计====================================================
//班级老师统计信息
export const leaveAllInfo = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/leave/findAll/'+page+'/'+size,params);
}

//=====================================请假信息统计======================================

//交费记录
export const payment_record = (page,size,cost) =>{
  return http.requestPost(apiUrl+'/train/student/findPay/'+page+'/'+size,cost);
}
