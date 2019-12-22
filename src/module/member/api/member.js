import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.thApiUrlPre;

// 页面查询(用户  phone | nickName | userID)
export const user_list = (page,size,params) =>{
  // 将params对象数据拼装成key/value串  + queryString
  let queryString = querystring.stringify(params);
  // 请求服务端的页面查询接口 通过ajax调用接口来请求数据
  return http.requestQuickGet(apiUrl+'/member/user/getAllUserVos/'+page+'/'+size +'?'+ queryString);
}

// 页面查询(会员等级)
export const user_grade = (page,size,params) =>{
  // 将params对象数据拼装成key/value串
  let queryString = querystring.stringify(params);
  // 请求服务端的页面查询接口 通过ajax调用接口来请求数据
  return http.requestQuickGet(apiUrl+'/member/freegrade/find/all/'+page+'/'+size+'?'+ queryString);
}
// 页面查询(VIP会员等级)
export const vip_user_grade = (page,size,params) =>{
  // 将params对象数据拼装成key/value串
  let queryString = querystring.stringify(params);
  // 请求服务端的页面查询接口 通过ajax调用接口来请求数据
  return http.requestQuickGet(apiUrl+'/member/paygrade/find/all/'+page+'/'+size+'?'+ queryString);
}
// 页面查询(会员卡信息)
export const page_cardslist = (page,size,params) =>{
  let queryString = querystring.stringify(params);
  return http.requestQuickGet(apiUrl+'/member/card/getAllCards/'+page+'/'+size+'?'+ queryString);
}
export const card_viplist = () =>{
  return http.requestQuickGet(apiUrl+ '/member/paygrade/find/all');
}
export const card_freelist = () =>{
  return http.requestQuickGet(apiUrl+ '/member/freegrade/find/all');
}
//页面查询(会员积分)
export const user_point = (page,size,params) =>{
  // 将params对象数据拼装成key/value串
  let queryString = querystring.stringify(params);
  // 请求服务端的页面查询接口 通过ajax调用接口来请求数据
  return http.requestQuickGet(apiUrl+'/member/point/getAllPoints/'+page+'/'+size+'?'+ queryString);
}
// 页面查询(签到)
export const user_checkin = (page,size,params) =>{
  let queryString = querystring.stringify(params);
  //alert(queryString)
  // 请求服务端的页面查询接口 通过ajax调用接口来请求数据
  //return http.requestQuickGet(apiUrl+'/member/checkin/getAllCheckin/'+page+'/'+size+'?'+ 'nickname='+nickname);
  return http.requestQuickGet(apiUrl+'/member/checkin/getAllCheckin/'+page+'/'+size+'?'+ queryString);

}

//*------------------------------------------------------------*/
//删除页面（用户)  -->  DELETE /user/delete/id/{user_id}
export const user_del= (id)=>{
  return http.requestDelete(apiUrl+'/member/user/delete/'+ id);
}

//删除页面（注册会员）
export const freegrade_del= (id)=>{
  return http.requestDelete(apiUrl+'/member/freegrade/delete/'+id);
}
//删除页面（付费会员）
export const paygrade_del= (id)=>{
  return http.requestDelete(apiUrl+'/member/paygrade/delete/'+id);
}
//删除页面（积分 point_id）
export const point_del= (id)=>{
  return http.requestDelete(apiUrl+'/member/point/deleteByPointId/'+id);
}
//删除页面（签到信息）
export const checkin_del= (id)=>{
  return http.requestDelete(apiUrl+'/member/checkin/deleteByCheckId/'+id);
}
//删除页面（）
export const card_del= (id)=>{
  return http.requestDelete(apiUrl+'/member/card/delete/userId/'+id);
}

//新增页面
export const user_add = params =>{
  return http.requestPost(apiUrl+'/member/user/insert',params);
}
export const freegrade_add = params =>{
  return http.requestPost(apiUrl+'/member/freegrade/insert',params);
}
export const paygrade_add = params =>{
  return http.requestPost(apiUrl+'/member/paygrade/insert',params);
}
export const point_add = params =>{
  return http.requestPost(apiUrl+'/member/point/insert',params);
}
export const checkin_add = params =>{
  return http.requestPost(apiUrl+'/member/checkin/insert',params);
}
export const card_add = id =>{
  return http.requestPost(apiUrl+'/member/card/insert/id/'+ id);
}

export const page_add = params =>{
  return http.requestPost(apiUrl+'/member/user/insert',params);
}


//根据id查询页面(用户)
export const user_get= id =>{
  return http.requestQuickGet(apiUrl+'/member/user/find/userId/'+id);
}

//根据id查询页面(卡)
export const card_get= id =>{
  return http.requestQuickGet(apiUrl+'/member/card/getCardById/'+id);
}
//根据id查询页面(注册会员等级)
export const freegrade_get= id =>{
  return http.requestQuickGet(apiUrl+'/member/freegrade/getGradeById/'+id);
}
//根据id查询页面(付费会员等级)
export const paygrade_get= id =>{
  return http.requestQuickGet(apiUrl+'/member/paygrade/getGradeById/'+id);
}
//根据id查询页面(用户)
export const page_get= id =>{
  return http.requestQuickGet(apiUrl+'/member/user/getUserById/'+id);
}
//修改页面提交
export const page_edit= (id,params) =>{
  return http.requestPut(apiUrl+'/member/page/edit/'+id,params);
}

export const user_edit= (params) =>{
  return http.requestPut(apiUrl+'/member/user/update',params);
}
export const card_edit= (params) =>{
  return http.requestPut(apiUrl+'/member/card/update',params);
}
export const freegrade_edit= (params) =>{
  return http.requestPut(apiUrl+'/member/freegrade/update',params);
}
export const paygrade_edit= (params) =>{
  return http.requestPut(apiUrl+'/member/paygrade/update',params);
}
//发布页面@
export const page_postPage= id => {
  return http.requestPost(apiUrl+'/member/page/postPage/'+id)
}
//页面模板查询(bewilder！）
export const page_template =() =>{
  //查询全部页面模板
  return http.requestQuickGet(apiUrl+'/member/template/list');
}




