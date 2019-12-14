import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

//查询班级信息
export const class_list = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/class/find/1/0',params);
}

//修改班级信息
export const update_class = (classId,params) =>{
  return http.requestPut(apiUrl+'/train/class/update/'+classId,params);
}

//查询老师信息
export const teacher_list = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/teacher/find/'+page+'/'+size,params);
}
