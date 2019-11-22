import Home from '@/module/home/page/home.vue';
import page_user from '@/module/member/page/user/page_user.vue';

import page_point from '@/module/member/page/point/page_point.vue';
import page_freegrade from '@/module/member/page/freegrade/page_freegrade.vue';
import page_paygrade from "@/module/member/page/paygrade/page_paygrade.vue";
import page_cards from "@/module/member/page/cards/page_cards.vue";
import page_checkin from '@/module/member/page/checkin/page_checkin.vue';
import page_add from '@/module/member/page/page_add.vue';
import page_edit from '@/module/member/page/page_edit.vue';


export default [{
    path: '/',
    component: Home, // 路由要引用的组件
    name: '会员管理',  //菜单列表名
    hidden: false,
    children:[
      {path:'/member/page/user',name:'用户信息管理',component: page_user,hidden:false},
      {path:'/member/page/point',name:'积分信息管理',component: page_point,hidden:false},
      {path:'/member/page', name:'等级信息管理', component: page_freegrade, hidden:false},
      {path:'/member/page/freegrade',name:'普通会员等级',component:page_freegrade,hidden:true},
      {path:'/member/page/paygrade',name:'付费会员等级',component:page_paygrade,hidden:true},
      {path:'/member/page/cards', name:'会员卡信息管理', component: page_cards, hidden:false},
      {path:'/member/page/checkin',name:'签到信息管理',component: page_checkin,hidden:false},
      {path:'/member/page/add',name:'新增页面',component: page_add,hidden:true},
      // 通过 router 来传参 ":pageId"
      {path:'/member/page/edit/:pageId',name:'修改页面',component: page_edit,hidden:true}
    ]
  }
]
