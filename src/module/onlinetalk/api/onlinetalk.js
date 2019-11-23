import http from '@/base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
//let apiUrl = sysConfig.xcApiUrlPre;
let apiUrl = sysConfig.onlineApiUrl;
//let apiUrl = "localhost:31001";
//测试
/*export const page_test= id => {
  return http.requestQuickGet(apiUrl+'/cms/user/get/'+id)
}*/
/*页面列表*/
/*export const agent_list = (page,size) => {
  //params为json格式
  //使用querystring将json对象转成key/value串
  //let querys = querystring.stringify(params)
  return http.requestQuickGet(apiUrl+'/onlinetalk/getAllAgent'+'/'+page+'/'+size)
  //return http.requestQuickGet(apiUrl+'/onlinetalk/getAllAgent'+'?'+querys)
};*/
/!*客服列表查询*!/
export const agent_list = (params) => {
  //将params对象数据拼装成key/value串
  let queryString = querystring.stringify(params);
  //请求服务端的页面查询接口
  return http.requestQuickGet(apiUrl+'/agent/getAllAgent/' + '?' + queryString);
};
/!*客服添加*!/
export const agent_add = params => {
  return http.requestPost(apiUrl+'/agent/insert',params)
};

/!*客服修改*!/
export const agent_edit = params => {
  return http.requestPut(apiUrl+'/agent/update',params)
};

/!*客服查询*!/
export const agent_get = id => {
  return http.requestQuickGet(apiUrl+'/agent/find/id/'+id)
};
/!*页面删除*!/
export const agent_del = id => {
  return http.requestDelete(apiUrl+'/agent/delete/id/'+id)
};



/!*快捷回复查询*!/
export const reply_list = (params) => {
  //将params对象数据拼装成key/value串
  let queryString = querystring.stringify(params);
  //请求服务端的页面查询接口
  //return http.requestQuickGet(apiUrl+'/agent/getAllAgent/' + '?' + queryString);
  return http.requestQuickGet(apiUrl+'/reply/getAllReply/' + '?' + queryString);
};




/!*快捷回复添加*!/
export const reply_add = params => {
  return http.requestPost(apiUrl+'/reply/insert',params)
};

/!*快捷回复修改*!/
export const reply_edit = params => {
  return http.requestPut(apiUrl+'/reply/update',params)
};

/!*快捷回复按id查询*!/
export const reply_get = id => {
  return http.requestQuickGet(apiUrl+'/reply/find/id/'+id)
};
/!*快捷回复删除*!/
export const reply_del = id => {
  return http.requestDelete(apiUrl+'/reply/delete/id/'+id)
};




/!*分类查询*!/
export const category_list = (params) => {
  //将params对象数据拼装成key/value串
  let queryString = querystring.stringify(params);
  //请求服务端的页面查询接口
  //return http.requestQuickGet(apiUrl+'/agent/getAllAgent/' + '?' + queryString);
  return http.requestQuickGet(apiUrl+'/category/getAllCategory/' + '?' + queryString);
};


/!*分类添加*!/
export const category_add = params => {
  return http.requestPost(apiUrl+'/category/insert',params)
};

/!*分类修改*!/
export const category_edit = params => {
  return http.requestPut(apiUrl+'/category/update',params)
};

/!*分类按id查询*!/
export const category_get = id => {
  return http.requestQuickGet(apiUrl+'/category/find/id/'+id)
};
/!*分类删除*!/
export const category_del = id => {
  return http.requestDelete(apiUrl+'/category/delete/id/'+id)
};


/!*会话查询*!/
export const convers_list = (params) => {
  //将params对象数据拼装成key/value串
  let queryString = querystring.stringify(params);
  //请求服务端的页面查询接口
  //return http.requestQuickGet(apiUrl+'/agent/getAllAgent/' + '?' + queryString);
  return http.requestQuickGet(apiUrl+'/convers/getAllConvers/' + '?' + queryString);
};
/!*会话删除*!/
export const convers_del = id => {
  return http.requestDelete(apiUrl+'/convers/delete/convers_id/'+id)
};









/*/!*根据姓名查询客服*!/
export const queryByName = (page,size,agent_name) => {
  //params为json格式
  //使用querystring将json对象转成key/value串
  //let querys = querystring.stringify(params)
  return http.requestQuickGet(apiUrl+'/onlinetalk/find/'+page+'/'+size+'/'+agent_name)
  //return http.requestQuickGet(apiUrl+'/onlinetalk/getAllAgent'+'?'+querys)
};*/

/*
/!*生成静态文件 *!/
export const page_generateHtml= id => {queryByName
  return http.requestPost(apiUrl+'/cms/page/generateHtml/'+id)
};
/!*取出静态文件 *!/
export const page_getHtml= id => {
  return http.requestQuickGet(apiUrl+'/cms/page/getHtml/'+id)
};
/!*发布页面*!/
export const page_postPage= id => {
  return http.requestPost(apiUrl+'/cms/page/postPage/'+id)
};*/
