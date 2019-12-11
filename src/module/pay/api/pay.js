import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;


//查询需要进行选择的课程
export const add_cost = (params) =>{
  return http.requestPost(apiUrl+'/train/cost/pay',params);
}

//查询应收金额 和 优惠金额
export const findTuition = (studentId) =>{
  return http.requestGet(apiUrl+'/train/cost/find/'+studentId);
}


