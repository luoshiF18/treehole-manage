import Home from '@/module/home/page/home.vue';
import page_user from '@/module/member/page/user/page_user.vue';

import page_point from '@/module/member/page/point/page_point.vue';
import page_freegrade from '@/module/member/page/freegrade/page_freegrade.vue';
import page_paygrade from "@/module/member/page/paygrade/page_paygrade.vue";
import page_cards from "@/module/member/page/cards/page_cards.vue";
import page_checkin from '@/module/member/page/checkin/page_checkin.vue';

import user_add from '@/module/member/page/user/user_add.vue';
import freegrade_add from '@/module/member/page/freegrade/freegrade_add.vue';
import paygrade_add from '@/module/member/page/paygrade/paygrade_add.vue';
import point_add from '@/module/member/page/point/point_add.vue';
import checkin_add from '@/module/member/page/checkin/checkin_add.vue';
import card_add from '@/module/member/page/user/user_add.vue';

import user_edit from '@/module/member/page/user/user_edit.vue';
import card_edit from '@/module/member/page/cards/card_edit.vue';
import paygrade_edit from '@/module/member/page/paygrade/paygrade_edit.vue';
import freegrade_edit from '@/module/member/page/freegrade/freegrade_edit.vue';

import page_add from '@/module/member/page/page_add.vue';
import page_edit from '@/module/member/page/page_edit.vue';
import menu from '@/module/member/page/menu/menu.vue';
import menuAdd from '@/module/member/page/menu/menu_add.vue';
import menuEdit from '@/module/member/page/menu/menu_edit.vue';
import menuPortion from '@/module/member/page/menu/menu_portion.vue';


import role from '@/module/member/page/role/role.vue';
import roleAdd from '@/module/member/page/role/role_add.vue';
import roleEdit from '@/module/member/page/role/role_edit.vue';

import permiss from '@/module/member/page/permission/permission.vue';

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
      {path:'/member/page/paygrade',name:'VIP会员等级',component:page_paygrade,hidden:true},
      {path:'/member/page/cards', name:'会员卡信息管理', component: page_cards, hidden:false},
      {path:'/member/page/checkin',name:'签到信息管理',component: page_checkin,hidden:false},


      {path:'/member/page/user/user_edit/:user_id',name:'用户编辑页面',component: user_edit,hidden:false},
      {path:'/member/page/cards/card_edit/:card_id',name:'会员卡编辑页面',component: card_edit,hidden:false},
      {path:'/member/page/paygrade/page_paygrade/:paygrade_id',name:'VIP会员等级编辑页面',component: paygrade_edit,hidden:false},
      {path:'/member/page/freegrade/page_freegrade/:freegrade_id',name:'注册会员等级编辑页面',component: freegrade_edit,hidden:false},
      {path:'/member/page/cards/card_edit/:card_id',name:'会员卡编辑页面',component: card_edit,hidden:false},

      {path:'/member/page/user/user_add',name:'管理员新增页面',component: user_add,hidden:false},
      {path:'/member/page/freegrade/freegrade_add',name:'注册会员等级新增页面',component: freegrade_add,hidden:true},
      {path:'/member/page/paygrade/paygrade_add',name:'VIP会员等级新增页面',component: paygrade_add,hidden:true},
      {path:'/member/page/add',name:'会员卡新增页面',component: card_add,hidden:true},
      {path:'/member/page/point/point_add',name:'积分新增页面',component: point_add,hidden:true},
      {path:'/member/page/checkin/checkin_add',name:'签到新增页面',component: checkin_add,hidden:true},
      {path:'/member/page/add',name:'新增页面',component: page_add,hidden:true},

      {path:'/member/page/menu/menuList',name:'权限列表',component: menu,hidden:false},
      {path:'/member/page/menu/add',name:'新增权限',component:menuAdd,hidden:false},
      {path:'/member/page/menu/edit/:id',name:'修改权限',component:menuEdit,hidden:false},
      {path:'/member/page/menu/menuPortion',name:'权限分配',component:menuPortion,hidden:false},

      {path:'/member/page/role/List',name:'角色列表',component: role,hidden:false},
      {path:'/member/page/role/add',name:'新增角色',component:roleAdd,hidden:false},
      {path:'/member/page/role/edit/:id',name:'修改角色',component:roleEdit,hidden:false},

      {path:'/member/page/permiss/list/:id',name:'角色权限列表',component: permiss,hidden:false},
    ]
  }
]
