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
  return http.requestQuickGet(apiUrl+'/online/agent/getAllAgent/' + '?' + queryString);
};
/!*客服添加*!/
export const agent_add = params => {
  return http.requestPost(apiUrl+'/online/agent/insert',params)
};

/!*客服修改*!/
export const agent_edit = params => {
  return http.requestPut(apiUrl+'/online/agent/update',params)
};

/!*客服查询*!/
export const agent_get = id => {
  return http.requestQuickGet(apiUrl+'/online/agent/find/id/'+id)
};
/!*页面删除*!/
export const agent_del = id => {
  return http.requestDelete(apiUrl+'/online/agent/delete/id/'+id)
};



/!*快捷回复查询*!/
export const reply_list = (params) => {
  //将params对象数据拼装成key/value串
  let queryString = querystring.stringify(params);
  //请求服务端的页面查询接口
  //return http.requestQuickGet(apiUrl+'/agent/getAllAgent/' + '?' + queryString);
  return http.requestQuickGet(apiUrl+'/online/reply/getAllReply/' + '?' + queryString);
};




/!*快捷回复添加*!/
export const reply_add = params => {
  return http.requestPost(apiUrl+'/online/reply/insert',params)
};

/!*快捷回复修改*!/
export const reply_edit = params => {
  return http.requestPut(apiUrl+'/online/reply/update',params)
};

/!*快捷回复按id查询*!/
export const reply_get = id => {
  return http.requestQuickGet(apiUrl+'/online/reply/find/id/'+id)
};
/!*快捷回复删除*!/
export const reply_del = id => {
  return http.requestDelete(apiUrl+'/online/reply/delete/id/'+id)
};




/!*分类查询*!/
export const category_list = (params) => {
  //将params对象数据拼装成key/value串
  let queryString = querystring.stringify(params);
  //请求服务端的页面查询接口
  //return http.requestQuickGet(apiUrl+'/agent/getAllAgent/' + '?' + queryString);
  return http.requestQuickGet(apiUrl+'/online/category/getAllCategory/' + '?' + queryString);
};


/!*分类添加*!/
export const category_add = params => {
  return http.requestPost(apiUrl+'/online/category/insert',params)
};

/!*分类修改*!/
export const category_edit = params => {
  return http.requestPut(apiUrl+'/online/category/update',params)
};

/!*分类按id查询*!/
export const category_get = id => {
  return http.requestQuickGet(apiUrl+'/online/category/find/id/'+id)
};
/!*分类删除*!/
export const category_del = id => {
  return http.requestDelete(apiUrl+'/online/category/delete/id/'+id)
};


/!*会话查询*!/
export const convers_list = (params) => {
  //将params对象数据拼装成key/value串
  let queryString = querystring.stringify(params);
  //请求服务端的页面查询接口
  //return http.requestQuickGet(apiUrl+'/agent/getAllAgent/' + '?' + queryString);
  return http.requestQuickGet(apiUrl+'/online/convers/getAllConvers/' + '?' + queryString);
};
/!*会话删除*!/
export const convers_del = id => {
  return http.requestDelete(apiUrl+'/online/convers/delete/convers_id/'+id)
};
/!*会话记录添加*!/
export const convers_add = params => {
  return http.requestPost(apiUrl+'/online/convers/insert',params)
};


/!*聊天记录添加*!/
export const message_add = params => {
  return http.requestPost(apiUrl+'/online/message/insert',params)
};
/!*聊天记录查询*!/
export const message_list = params => {
  let queryString = querystring.stringify(params);
  return http.requestQuickGet(apiUrl+'/online/message/find/convers_id/'+'?'+queryString)
};
/!*留言添加*!/
export const leave_add = params => {
  return http.requestPost(apiUrl+'/online/leave/insert',params)
};
/!*留言查询*!/
export const leave_list = (params) => {
  //将params对象数据拼装成key/value串
  let queryString = querystring.stringify(params);
  //请求服务端的页面查询接口
  return http.requestQuickGet(apiUrl+'/online/leave/getAllLeave/' + '?' + queryString);
};



/!*服务列表查询*!/
export const serv_list = (params) => {
  //将params对象数据拼装成key/value串
  let queryString = querystring.stringify(params);
  //请求服务端的页面查询接口
  //return http.requestQuickGet(apiUrl+'/agent/getAllAgent/' + '?' + queryString);
  return http.requestQuickGet(apiUrl+'/online/serv/getAllServ/' + '?' + queryString);
};

/!*服务添加*!/
export const serv_add = params => {
  return http.requestPost(apiUrl+'/online/serv/insert',params)
};
/!*服务删除*!/
export const serv_del = id => {
  return http.requestDelete(apiUrl+'/online/serv/delete/id/'+id)
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
