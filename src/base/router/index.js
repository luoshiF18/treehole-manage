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
// 导入班级老师
import classInformation from '@/module/classInformation/router'
// 导入班级老师
import teacherInformation from '@/module/teacherinformation/router'
// 导入班级课程
import courseInformation from '@/module/courseInformation/router'
// 导入请假审核
import leaveAudit from '@/module/leaveaudit/router'
// 导入班级学生
import studentInformation from '@/module/studentinformation/router'
// 合并路由规则
concat(HomeRouter)  //加入home模块的路由
concat(classInformation)  //加入班级信息的路由
concat(studentInformation)  //加入班级学生的路由
concat(teacherInformation)  //加入班级老师的路由
concat(courseInformation)  //加入班级课程的路由
concat(leaveAudit)  //加入请假审核的路由


export default routes;
