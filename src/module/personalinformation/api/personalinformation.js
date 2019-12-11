import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

//页面学生查询
export const student_list = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/student/find/'+page+'/'+size,params);
}

//查询班级信息
export const class_list = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/class/find/'+page+'/'+size,params);
}

//查询学生期数
export const student_Phase = (params) => {
  return http.requestPost(apiUrl+'/train/phase/find/1/0',params)
}
