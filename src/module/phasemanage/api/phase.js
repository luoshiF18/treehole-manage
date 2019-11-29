import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;


//新增期数
export const add_phase = (params) =>{
  return http.requestPost(apiUrl+'/train/phase/add',params);
}

//修改期数
export const update_phase = (phaseId,params) =>{
  return http.requestPut(apiUrl+'/train/phase/update/'+phaseId,params);
}

//查询期数
export const find_phase = (page,size,params) =>{
  return http.requestPost(apiUrl+'/train/phase/find/'+page+'/'+size,params);
}


//查询期数名称
export const find_phaseName = () =>{
  return http.requestGet(apiUrl+'/train/phase/findname');
}
