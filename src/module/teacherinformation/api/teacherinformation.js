import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;


//班级老师统计信息
export const class_teacher = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/class/findclassteacher/'+page+'/'+size,params);
}
