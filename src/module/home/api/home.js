import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

//查询班级信息
export const class_list = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/class/find/1/0',params);
}

//修改密码
export const update_password = (userName,oldPwd,newPwd) =>{
  return http.requestGet(apiUrl+'/train/login/updatePassword/'+userName+'/'+oldPwd+'/'+newPwd);
}


