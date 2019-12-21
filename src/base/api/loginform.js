import http from './public'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;



//登录
export const login= (userName,userPassword,userType) => {
  return http.requestGet(apiUrl+'/train/login/login/'+userName+'/'+userPassword+'/'+userType);
}
