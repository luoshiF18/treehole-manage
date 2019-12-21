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
import coupon_page from "@/module/marketing/page/coupon_page";
import coupon_toFindCoupon from "@/module/marketing/page/coupon_toFindCoupon";
import activity_interactive from "@/module/marketing/page/activity/interactiveActivity/activity_interactive";

import test from "@/module/marketing/test";

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
      {path:'/marketing/coupon/page',name:'领取优惠券页面',component: coupon_page,hidden:false},
      {path:'/marketing/coupon/cdetail',name:'随便写的为了点进领取优惠券页面',component: coupon_toFindCoupon,hidden:false},
      {path:'/marketing/activity/interactive/list',name:'线上/线下活动',component: activity_interactive,hidden:false},
      {path:'/test',name:'test',component: test,hidden:false},

    ]
  }/*,
  {
    path: '/login',
    component: Login,
    name: 'Login',
    hidden: true
  }*/
]
