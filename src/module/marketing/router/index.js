import Home from '@/module/home/page/home.vue';
import coupon_list from "@/module/marketing/page/coupon_list";
import activity_list from "@/module/marketing/page/activity/activity_list";
import activity_update from "@/module/marketing/page/activity/activity_update";
import activity_info  from "@/module/marketing/page/activity/activity_info";
import activity_add from "@/module/marketing/page/activity/activity_add";
import activity_point_list from "@/module/marketing/page/activity/point/activity_point_list";
import activity_point_add from "@/module/marketing/page/activity/point/activity_point_add";
import activity_point_update from "@/module/marketing/page/activity/point/activity_point_update";
import extension_list from "@/module/marketing/page/extension/extension_list";
import extension_add from "@/module/marketing/page/extension/extension_add";
import activity_interactive from "@/module/marketing/page/activity/interactiveActivity/activity_interactive";
import activity_interactive_add from "@/module/marketing/page/activity/interactiveActivity/activity_interactive_add";
import activity_interactice_info from "@/module/marketing/page/activity/interactiveActivity/activity_interactice_info";
import activity_interactive_update from "@/module/marketing/page/activity/interactiveActivity/activity_interactive_update";
import coupontype from "@/module/marketing/page/coupon/type/coupontype";

export default [{
    path: '/',
    component: Home,
    name: '营销活动管理',
    hidden: false,
    // redirect: '/home',
    children: [
      //{path:'/marketing/coupon/page/list3',name:'优惠券列表3',component: coupon_list3,hidden:false},
      {path:'/marketing/coupon/page/list',name:'优惠券列表',component: coupon_list,hidden:false},
      {path:'/marketing/activity/page/list',name:'优惠活动列表',component: activity_list,hidden:false},
      {path:'/marketing/activity/update',name:'',component: activity_update,hidden:true},
      {path:'/marketing/activity/info',name:'',component: activity_info,hidden:true},
      {path:'/marketing/activity/add',name:'',component: activity_add,hidden:true},
      {path:'/marketing/activity/point/list',name:'积分活动',component: activity_point_list,hidden:false},
      {path:'/marketing/activity/point/add',name:'添加签到活动',component: activity_point_add,hidden:true},
      {path:'/marketing/activity/point/update',name:'修改签到活动',component: activity_point_update,hidden:true},
      {path:'/marketing/extension/list',name:'推广列表',component: extension_list,hidden:false},
      {path:'/marketing/extension/add',name:'推广添加',component: extension_add,hidden:true},
      {path:'/marketing/activity/interactive/list',name:'线上/线下活动',component: activity_interactive,hidden:false},
      {path:'/marketing/activity/interactive/add',name:'添加线上/线下活动',component: activity_interactive_add,hidden:true},
      {path:'/marketing/activity/interactive/info',name:'线上/线下活动详情',component: activity_interactice_info,hidden:true},
      {path:'/marketing/activity/interactive/update',name:'修改线上/线下活动',component: activity_interactive_update,hidden:true},
      {path:'/marketing/coupon/type',name:'优惠券类型',component: coupontype,hidden:false},

    ]
  }/*,
  {
    path: '/login',
    component: Login,
    name: 'Login',
    hidden: true
  }*/
]
