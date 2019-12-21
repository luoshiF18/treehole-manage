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
// 导入个人信息规则
import personalInformation from '@/module/personalinformation/router'
// 导入请假规则
import leaveRouter from '@/module/leave/router'
// 导入选课规则
import courseSelectionManage from '@/module/courseselectionmanage/router'
// 导入所教班级规则
import classesTaught from '@/module/classestaught/router'
// 导入所教课程规则
import coursesTaught from '@/module/coursestaught/router'
// 合并路由规则
concat(HomeRouter)  //加入home模块的路由

concat(personalInformation)  //加入个人信息模块的路由
concat(leaveRouter)  //加入请假模块的路由
concat(courseSelectionManage)  //加入选课模块的路由
concat(classesTaught)  //加入所教班级的路由
concat(coursesTaught)  //加入所教课程的路由
export default routes;
