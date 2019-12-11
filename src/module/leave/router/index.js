import Home from '@/module/home/page/home.vue';
import leave_add from '@/module/leave/page/leave_add.vue';

export default [{
    path: '/teacher',
    component: Home,
    name: '请假',  //菜单名称
    hidden: false,
    children:[
      {path:'/leave/page/leave_add',name:'请假',component: leave_add,hidden:false},
    ]
  }
]
