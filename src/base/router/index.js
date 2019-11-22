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
import ArchivesRouter from '@/module/archives/router'
import ArchivesReportRouter from '@/module/archivesReport/router'
import ScaleRouter from '@/module/scale/router'
import WarnRouter from '@/module/warn/router'
import onlinetalkRouter from '@/module/onlinetalk/router'
// import UserRouter from '@/module/user/router'
// 合并路由规则
concat(HomeRouter)  //加入home模块的路由
concat(CmsRouter)  //加入cms模块的路由
concat(ScaleRouter)  //加入Scale模块的路由//加入cms模块的路由
concat(WarnRouter)  //加入cms模块的路由
concat(ArchivesRouter)  //加入档案模块的路由 //加入gauge模块的路由
concat(ArchivesReportRouter)  //加入测评报告
concat(onlinetalkRouter)//加入agent模块的路由
// concat(UserRouter)  //加入用户模块的路由
export default routes;
