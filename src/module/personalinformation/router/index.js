import Home from '@/module/home/page/home.vue';
import teacher_list from '@/module/personalinformation/page/teacher_list.vue';

export default [{
    path: '/teacher',
    component: Home,
    name: '个人信息',  //菜单名称
    hidden: false,
    children:[
      {path:'/personalinformation/page/teacher_list',name:'个人信息',component: teacher_list,hidden:false},
    ]
  }
]
