import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
// 定义路由配置
let routes = []
let concat = (router) => {
  routes = routes.concat(router)
}
// // 导入路由规则
import HomeRouter from '@/module/home/router'
import CmsRouter from '@/module/cms/router'
import AppOrderRouter from '@/module/appointment/router'
import CltManageRouter from '@/module/cltmanage/router'
// 合并路由规则
concat(HomeRouter)  //加入home模块的路由
concat(CmsRouter)  //加入cms模块的路由
concat(AppOrderRouter)  //加入预约模块的路由
concat(CltManageRouter)  //加入咨询师预约管理的路由
export default routes;
