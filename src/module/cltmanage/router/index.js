import Home from '@/module/home/page/home.vue';
import manage_add from '@/module/cltmanage/page/manage_add.vue';
import manage_list from '@/module/cltmanage/page/manage_list.vue';
import manage_edit from '@/module/cltmanage/page/manage_edit.vue';


export default [{
    path: '/appointment',
    component: Home,
    name: '咨询师预约管理',  //菜单名称
    hidden: false,
    children:[
      {path:'/appointment/cltmanage/list',name:'咨询师预约管理列表',component: manage_list,hidden:false},
      {path:'/appointment/cltmanage/add',name:'新增咨询师预约管理',component: manage_add,hidden:true},
      {path:'/appointment/cltmanage/edit/:cltManageId',name:'修改咨询师预约管理单',component:manage_edit,hidden:true}
    ]
  }
]
