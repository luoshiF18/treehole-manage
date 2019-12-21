import Home from '@/module/home/page/home.vue';
import leave_add from '@/module/leave/page/leave_add.vue';
import leave_list from '@/module/leave/page/leave_list.vue';

export default [{
    path: '/student',
    component: Home,
    name: '请假',  //菜单名称
    hidden: false,
    children:[
      {path: '/leave/page/leave_add',name:'请假',component: leave_add,hidden:false},
      {path: '/leave/page/leave_list',name:'查看审核情况',component: leave_list,hidden:false},
    ]
  }
]
