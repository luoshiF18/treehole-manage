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
//信息管理
import TnformationmanageRouter from '@/module/informationmanage/router'
//选课管理
import CourseselectionmanageRouter from '@/module/courseselectionmanage/router'
//交费
import pay from '@/module/pay/router'
//请假管理
import leave from '@/module/leave/router'
//期数学费
import phasemanage from '@/module/phasemanage/router'
//统计报表
import statisticalreportforms from '@/module/statisticalreportforms/router'



// 合并路由规则
concat(HomeRouter)  //加入home模块的路由
concat(TnformationmanageRouter)  //加入信息管理模块的路由
concat(CourseselectionmanageRouter)  //加入选课管理模块的路由
concat(pay)  //加入交费模块的路由
concat(leave)  //加入请假管理模块的路由
concat(phasemanage)  //加入期数学费模块的路由
concat(statisticalreportforms)  //加入请假管理模块的路由
export default routes;
