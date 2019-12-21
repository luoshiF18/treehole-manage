import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;


//查询老师所带班级信息
export const teach_class_list = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/teacher/findTeacherClass/'+page+'/'+size,params);
}

//班主任所带的班级
export const headmaster_class = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/teacher/findClassOfHeadTeacher/'+page+'/'+size,params);
}


//查询学生期数
export const student_Phase = (params) => {
  return http.requestPost(apiUrl + '/train/phase/find/1/0', params)
}

//班级学生统计信息
export const class_student = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/class/findclassstudent/'+page+'/'+size,params);
}

//查询老师信息
export const teacher_list = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/teacher/find/'+page+'/'+size,params);
}
