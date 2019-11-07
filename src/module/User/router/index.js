import Home from '@/module/home/page/home.vue';
import page_user from '@/module/User/page/page_user.vue';
import page_userIntegral from '@/module/User/page/page_userIntegral';
import page_userGrade from '@/module/User/page/page_userGrade';
import page_userSign from '@/module/User/page/page_userSign';
import page_userGradeVip from "../page/page_userGradeVip";
import page_add from '@/module/User/page/page_add.vue';
import page_edit from '@/module/User/page/page_edit.vue';

export default [{
    path: '/',
    component: Home, // 路由要引用的组件
    name: '会员管理',  //菜单列表名
    hidden: false,
    children:[
      {path:'/User/page/user',name:'用户信息管理',component: page_user,hidden:false},
      {path:'/User/page/userIntegral',name:'积分信息管理',component: page_userIntegral,hidden:false},
      {path:'/User/page', name:'等级信息管理级', component: page_userGrade, hidden:false},
      {path:'/User/page/userSign',name:'签到信息管理',component: page_userSign,hidden:false},
      {path:'/User/page/userGrade',name:'普通会员等级',component:page_userGrade,hidden:true},
      {path:'/User/page/userGradeVip',name:'付费会员等级',component:page_userGradeVip,hidden:true},
      {path:'/User/page/add',name:'新增页面',component: page_add,hidden:true},
      // 通过 router 来传参 ":pageId"
      {path:'/User/page/edit/:pageId',name:'修改页面',component: page_edit,hidden:true}
    ]
  }
]
