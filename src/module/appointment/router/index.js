import Home from '@/module/home/page/home.vue';
import order_list from '@/module/appointment/page/app_list.vue';
import order_edit from '@/module/appointment/page/app_edit.vue';

export default [{
    path: '/appointment',
    component: Home,
    name: '预约管理中心',  //菜单名称
    hidden: false,
    children:[
      {path:'/appointment/order/list',name:'预约订单列表',component: order_list,hidden:false},
      {path:'/appointment/order/edit/:appointmentId',name:'修改预约订单',component: order_edit,hidden:true}
    ]
  }
]
