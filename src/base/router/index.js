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
/*import CmsRouter from '@/module/cms/router'*/
import ArchivesRouter from '@/module/archives/router'
import ArchivesReportRouter from '@/module/archivesReport/router'
import ScaleRouter from '@/module/scale/router'
import WarnRouter from '@/module/warn/router'
import onlinetalkRouter from '@/module/onlinetalk/router'
import MemberRouter from '@/module/member/router'
import AppOrderRouter from '@/module/appointment/router'
import CltManageRouter from '@/module/cltmanage/router'
import PsychologistRouter from '@/module/psychologist/router'
import MarketingRouter from '@/module/marketing/router'
import CourseOnlineRouter from '@/module/course/router'
import MediaRouter from '@/module/media/router'
// import UserRouter from '@/module/user/router'
// 合并路由规则
concat(HomeRouter)  //加入home模块的路由
concat(ScaleRouter)  //加入Scale模块的路由//加入cms模块的路由
concat(WarnRouter)  //加入cms模块的路由
concat(ArchivesRouter)  //加入档案模块的路由 //加入gauge模块的路由
concat(ArchivesReportRouter)  //加入测评报告
concat(onlinetalkRouter)//加入agent模块的路由
concat(MemberRouter) //加入会员管理模块的路由
concat(AppOrderRouter)  //加入预约模块的路由
concat(CltManageRouter)  //加入咨询师预约管理的路由
concat(PsychologistRouter)  //加入psychologist模块的路由
concat(MarketingRouter)//营销
concat(CourseOnlineRouter)  //加入在线课程模块路由
concat(MediaRouter)//加入媒资模块路由
export default routes;
