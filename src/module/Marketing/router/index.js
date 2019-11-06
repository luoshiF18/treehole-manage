import Home from '@/module/home/page/home.vue';
import page_coupon from '../page/page_coupon.vue';
import page_add from '../page/page_add.vue';
import page_edit from '../page/page_edit.vue';
import page_market from '../page/page_market';
import page_activity from '../page/page_activity';
import page_specification from '../page/page_specification';

export default [{
    path: '/',
    component: Home, // 路由要引用的组件
    name: '营销管理',  //菜单列表名
    hidden: false,
    children:[
      {path:'/Marketing/page/coupon',name:'优惠券信息管理',component: page_coupon,hidden:false},
      {path:'/Marketing/page/market',name:'活动内容信息管理',component: page_market,hidden:false},
      {path:'/Marketing/page/activity',name:'推广内容信息管理',component: page_activity,hidden:false},
      {path:'/Marketing/page/specification',name:'规格参数信息管理',component: page_specification,hidden:false},
      {path:'/Marketing/page/add',name:'新增页面',componyonghuent: page_add,hidden:true},
      // 通过 router 来传参 ":pageId"
      {path:'/Marketing/page/edit/:pageId',name:'修改页面',component: page_edit,hidden:true}
    ]
  }
]
