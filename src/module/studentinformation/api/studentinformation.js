import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;


//班级学生统计信息
export const class_student = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/class/findclassstudent/'+page+'/'+size,params);
}

//查询学生期数
export const student_Phase = (params) => {
  return http.requestPost(apiUrl+'/train/phase/find/1/0',params)
}
