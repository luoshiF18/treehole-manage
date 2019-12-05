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
// 导入个人信息路由
import personalInformationRouter from '@/module/personalinformation/router'
// 导入课程信息路由
import courseInformationRouter from '@/module/courseinformation/router'
// 导入课程信息路由
import leave from '@/module/leave/router'
// 合并路由规则
concat(HomeRouter)  //加入home模块的路由
concat(CmsRouter)  //加入cms模块的路由
concat(personalInformationRouter)  //加入个人信息模块的路由
concat(courseInformationRouter)  //加入课程信息模块的路由
concat(leave)  //加入请假模块的路由
export default routes;
