import http from '../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;
/*=========================学生管理=====================================*/
//页面学生查询
export const student_list = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/student/find/'+page+'/'+size,params);
}

//添加学生
export const add_student = (params) =>{
  return http.requestPost(apiUrl+'/train/student/add',params);
}

//修改学生
export const update_student = (studentId,params) =>{
  return http.requestPut(apiUrl+'/train/student/update/'+studentId,params);
}

//删除学生信息
export const del_student = studentId => {
  return http.requestDelete(apiUrl+'/train/student/delete/'+studentId)
}

//查询学生期数
export const student_Phase = (params) => {
  return http.requestPost(apiUrl+'/train/phase/find/1/0',params)
}
//学生毕业（个人）
export const student_graduation = (studentId) => {
  return http.requestPut(apiUrl+'/train/student/graduation/'+studentId)
}

//学生毕业(全班)
export const student_graduation_all = (classId) => {
  return http.requestPut(apiUrl+'/train/student/graduationAll/'+classId)
}

/*=========================老师管理=====================================*/
//查询老师信息
export const teacher_list = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/teacher/find/'+page+'/'+size,params);
}

//添加老师
export const add_teacher = (params) =>{
  return http.requestPost(apiUrl+'/train/teacher/add',params);
}

//修改老师信息
export const update_teacher = (teacherId,params) =>{
  return http.requestPut(apiUrl+'/train/teacher/update/'+teacherId,params);
}

//删除学生信息
export const del_teacher = teacherId => {
  return http.requestDelete(apiUrl+'/train/teacher/delete/'+teacherId)
}
/*=========================班级管理=====================================*/

//查询班级信息
export const class_list = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/class/find/'+page+'/'+size,params);
}

//添加班级
export const add_class = (params) =>{
  return http.requestPost(apiUrl+'/train/class/add',params);
}

//修改班级信息
export const update_class = (classId,params) =>{
  return http.requestPut(apiUrl+'/train/class/update/'+classId,params);
}

//删除班级信息
export const del_class = classId => {
  return http.requestDelete(apiUrl+'/train/class/delete/'+classId)
}

/*=========================课程类型管理=====================================*/

//查询课程类型
export const courseType_list = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/coursetype/find/'+page+'/'+size,params);
}

//添加课程类型
export const add_courseType = (params) =>{
  return http.requestPost(apiUrl+'/train/coursetype/add',params);
}

//修改课程类型
export const update_courseType = (courseTypeId,params) =>{
  return http.requestPut(apiUrl+'/train/coursetype/update/'+courseTypeId,params);
}

//删除课程类型
export const del_courseType = courseTypeId => {
  return http.requestDelete(apiUrl+'/train/coursetype/delete/'+courseTypeId)
}

/*=========================课程管理=====================================*/

//查询课程
export const course_list = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/course/find/'+page+'/'+size,params);
}

//添加课程
export const add_course = (params) =>{
  return http.requestPost(apiUrl+'/train/course/add',params);
}

//修改课程
export const update_course = (courseId,params) =>{
  return http.requestPut(apiUrl+'/train/course/update/'+courseId,params);
}

//删除课程
export const del_course = courseId => {
  return http.requestDelete(apiUrl+'/train/course/delete/'+courseId)
}


