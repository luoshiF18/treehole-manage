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
import UserRouter from '@/module/User/router'
import MarketingRouter from '@/module/Marketing/router'

// 合并路由规则
concat(HomeRouter)  //加入home模块的路由
concat(UserRouter)  //加入User模块的路由
concat(MarketingRouter) //加入Marketing模块的路由
export default routes;
