import http from './../../../base/api/public'
import querystring from 'querystring'

import moment from 'moment'




let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.thApiUrlPre;

export const coupon_list = (pagination) => {
  //将params对象数据拼装成key/value串
  let queryString = querystring.stringify(pagination);
  //请求服务端的页面查询接口
  return http.requestQuickGet(apiUrl+'/marketing/coupon/page?'+queryString);
}

export const coupon_detail = (id) => {
  return http.requestQuickGet(apiUrl + "/marketing/coupon/" + id);
}

export const coupon_del = (id) => {
  return http.requestDelete(apiUrl + "/marketing/coupon/" + id);
}

export const coupon_add = (coupon) => {
  return http.requestPost(apiUrl+"/marketing/coupon",coupon);
}

export const coupon_update = (coupon) => {
  return http.requestPut(apiUrl+"/marketing/coupon", coupon);
}
//修改优惠券状态为结束
export const coupon_updateStatus = (id) => {
  return http.requestPut(apiUrl + "/marketing/coupon/status/" +id);
}

//查询优惠券类型
export const couponType_all = () => {
  return http.requestQuickGet(apiUrl + "/marketing/coupon_type/all")
}

export const extension_add = (extension) => {
  return http.requestPost(apiUrl + "/marketing/extension", extension);
}


export const activity_list = (pagination) => {
  //将params对象数据拼装成key/value串
  let queryString = querystring.stringify(pagination);
  //请求服务端的页面查询接口
  return http.requestQuickGet(apiUrl+'/marketing/activity/page?'+queryString);
}

export const activity_del = (id) => {
  return http.requestDelete(apiUrl + "/marketing/activity/" + id);
}

export const activity_detail = (id) => {
  return http.requestQuickGet(apiUrl + "/marketing/activity/" + id);
}

export const activity_rule = (id) => {
  return http.requestQuickGet(apiUrl + "/marketing/activity/info/rule/" + id);
}
export const activity_goods = (id) => {
  return http.requestQuickGet(apiUrl + "/marketing/activity/info/goods/" + id);
}

export const activity_all = (id) => {
  return http.requestQuickGet(apiUrl + "/marketing/activity/all/" + id);
}

export const activity_add = (activityRequest) => {
  return http.requestPost(apiUrl + "/marketing/activity/", activityRequest);
}

export const activity_update = (activityRequest) => {
  return http.requestPut(apiUrl + "/marketing/activity/", activityRequest);
}

//活动下线
export const activity_updateStatus = (id) =>{
  return http.requestPut(apiUrl + "/marketing/activity/status/" +id);
}

//推广
export const extension_list = (pagination) => {
  //将params对象数据拼装成key/value串
  let queryString = querystring.stringify(pagination);
  //请求服务端的页面查询接口
  return http.requestQuickGet(apiUrl+'/marketing/extension/all?'+queryString);
}

export const extension_del = (id) => {
  return http.requestDelete(apiUrl + "/marketing/extension/" + id);
}
//OtherService
//查询量表
export const queryScaleType =() => {
  return http.requestQuickGet(apiUrl + "/marketing/other/scale/type/all");
}
export const queryScaleByTypeId =(pagination) => {
  let queryString = querystring.stringify(pagination);
  return http.requestQuickGet(apiUrl + "/marketing/other/scale/type?" + queryString)
}
//查询用户信息
export const searchUserInfo =(beforeTime,afterTime) => {
  //let queryString = querystring.stringify(searchUser);
//  console.log("beforeTime///"+ searchUser.beforeTime);
//  console.log("queryString: "+ queryString);
 /* return http.requestQuickGet(apiUrl + "/marketing/other/member/user/getUserByTime?" + queryString);*/
  beforeTime = moment(beforeTime).format("YYYY-MM-DD HH:mm:ss");
  afterTime = moment(afterTime).format("YYYY-MM-DD HH:mm:ss");
 // console.log(beforeTime);
 // console.log(afterTime);

  return http.requestQuickGet(apiUrl + "/marketing/other/member/user/getUserByTime?beforeTime="+beforeTime+"&afterTime=" + afterTime);
}
/*export const activity_add = (activityRequest) => {
  return http.requestPost(apiUrl + "/marketing/activity/", activityRequest);
}

export const activity_update = (activityRequest) => {
  return http.requestPut(apiUrl + "/marketing/activity/", activityRequest);
}

//推广
export const extension_list = (pagination) => {
  //将params对象数据拼装成key/value串
  let queryString = querystring.stringify(pagination);
  //请求服务端的页面查询接口
  return http.requestQuickGet(apiUrl+'/marketing/extension/all?'+queryString);
}

export const extension_del = (id) => {
  return http.requestDelete(apiUrl + "/marketing/extension/" + id);
}*/

//交互活动

export const interactiveactivity_list =  (pagination) => {
  let queryString = querystring.stringify(pagination);
  return http.requestQuickGet(apiUrl + "/marketing/interaction/list?"+queryString)
}

export const interactiveactivity_del = (id) => {
  return http.requestDelete(apiUrl + "/marketing/interaction/"+id)
}

export const interactiveActivity_updateStatus = (id) => {
  return http.requestPut(apiUrl + "/marketing/interaction/status/" +id);
}

export const interactiveActivity_add = (interactiveActivity) => {
 return http.requestPost(apiUrl + "/marketing/interaction" , interactiveActivity)
}

export const interactiveActivity_update = (interactiveActivity) => {
  return http.requestPut(apiUrl + "/marketing/interaction" , interactiveActivity)
}

export const interactiveActivity_info = (id) => {
  return http.requestQuickGet(apiUrl + "/marketing/interaction/info/" + id)
}

//优惠券类型管理

export const coupontype_all = () => {
  return http.requestQuickGet(apiUrl + "/marketing/coupon_type/all")
}

export const coupontype_del = (id) => {
  return http.requestDelete(apiUrl +"/marketing/coupon_type/" +id);
}

export const coupontype_add = (type) => {
  return http.requestPost(apiUrl +"/marketing/coupon_type", type);
}

export const coupontype_update = (type) => {
  return http.requestPut(apiUrl +"/marketing/coupon_type", type);
}

export const coupontype_info = (id) => {
  return http.requestQuickGet(apiUrl + "/marketing/coupon_type/" +id)
}
//门户中需要使用到的方法


export const receive_coupon = (userCouponRequest) => {
  return http.requestPost(apiUrl + "/coupon/my_coupon" , userCouponRequest);
}

export const coupon_cdetail = (id) => {
  return http.requestQuickGet(apiUrl + "/marketing/coupon/cdetail/" + id)
}

//统计数据

export const coupon_statistics = (id) => {
  return http.requestQuickGet(apiUrl + "/marketing/coupon/statistics/" +id)
}

export const coupon_used_statistics = (id) =>{
  return http.requestQuickGet( apiUrl + "/marketing/coupon/user/used/statistics/" + id)
}
