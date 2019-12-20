import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.thApiUrlPre;

//页面初始化，查询全部
export const page_list = (page,size) =>{
  return http.requestQuickGet(apiUrl+'/warning/findAll/'+page+'/'+size);
}
//删除一条预警记录
export const page_del= (id) =>{
  return http.requestDelete(apiUrl+'/warning/delWarning?warningId='+id);
}
//批量删除预警记录
export const page_delMore= (params) =>{
  return http.requestDelete(apiUrl+'/warning/delMoreWarning?ids[]='+params);
}
//根据id查看详细预警信息
export const page_get= id =>{
  return http.requestQuickGet(apiUrl+'/warning/lookWarning/'+id);
}
//根据条件查询预警记录
export const condition_list = (page,size,params) =>{
  let queryString = querystring.stringify(params);
  return http.requestQuickGet(apiUrl+'/warning/getWarningCondition/'+page+'/'+size+'?'+queryString);
}
//获取饼状图数据
export const pieData = (userNickName) =>{
  return http.requestQuickGet(apiUrl+'/warning/getPieDate?userNickName='+userNickName);
}

export const pieScaleData = (scaleName) =>{

  return http.requestQuickGet(apiUrl+'/warning/getPieScaData?scaleName='+scaleName);
}
export const pieUser = (userNickName) =>{
  return http.requestQuickGet(apiUrl+'/warning/getUserPieData?userNickName='+userNickName);
}
export const getScaleDetail = (scaleName) =>{
  return http.requestQuickGet(apiUrl + '/scale/select/detail?scaleName=' + scaleName)
}
export const getIntevene = (page,size,params) =>{
  let queryString = querystring.stringify(params);
  return http.requestQuickGet(apiUrl + '/intervene/getAllByCondition/'+page+'/'+size+'?'+queryString);
}
//查看详情
export const getDetailIntevene = (interveneId) =>{
  return http.requestQuickGet(apiUrl + '/intervene/getInterveneById?interveneId='+interveneId);
}
//添加一条干预表记录
export const addIntervene = (intervene) => {
  return http.requestPost(apiUrl + '/intervene/addRecord/', intervene)
}
//删除一个干预记录
export const interveneDel= (interveneId) =>{
  return http.requestDelete(apiUrl+'/intervene/delIntervene?interveneId='+interveneId);
}
//查询高危人群
export const getWarnUser = (page,size,userNickName) =>{
  return http.requestQuickGet(apiUrl+'/warning/findHighRisk/'+page+'/'+size+'?userNickName='+userNickName);
}
//高危人群详情
export const warnHresult = (warnHUserid) =>{

  return http.requestQuickGet(apiUrl+'/warning/lookDetailHWarn?warnHUserid='+warnHUserid);
}
//发送预警信息
export const sendMessage = (warnMsg) =>{
  let queryString = querystring.stringify(warnMsg);
  return http.requestQuickGet(apiUrl+'/warnMsg/sendMeg?'+queryString);
}
//查找用户邮箱
export const emilFormat = (warnMsg) =>{
  let queryString = querystring.stringify(warnMsg);
  return http.requestQuickGet(apiUrl+'/warnMsg/emilFormat?'+queryString);
}
//发送邮件
export const sendEmail = (warnMsg) =>{
  let queryString = querystring.stringify(warnMsg);
  return http.requestQuickGet(apiUrl+'/warnMsg/sendEamil?'+queryString);
}
