import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;


//查询老师信息
export const teacher_list = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/teacher/find/1/0',params);
}

//修改密码
export const

  update_password = (userName,oldPwd,newPwd) =>{
  return http.requestGet(apiUrl+'/train/login/updatePassword/'+userName+'/'+oldPwd+'/'+newPwd);
}

