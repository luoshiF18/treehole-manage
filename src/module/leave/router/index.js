import Home from '@/module/home/page/home.vue';
import leave_add from '@/module/leave/page/leave_add.vue';
import leave_list from '@/module/leave/page/leave_list.vue';
import leave_examine from '@/module/leave/page/leave_examine.vue';

export default [{
    path: '/train',
    component: Home,
    name: '请假管理',  //菜单名称
    hidden: false,
    children:[
       {path:'/leave/page/leave_add',        name:'请假',          component: leave_add,   hidden:false},
       {path:'/leave/page/leave_examine',       name:'请假审核',  component: leave_examine,   hidden:false},
       {path:'/leave/page/leave_list',       name:'消假',  component: leave_list,   hidden:false},

    ]
  }
]
