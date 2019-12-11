import Home from '@/module/home/page/home.vue';
import student_list from '@/module/personalinformation/page/student_list.vue';

export default [{
    path: '/student',
    component: Home,
    name: '个人信息',  //菜单名称
    hidden: false,
    children:[
      {path: '/personalinformation/page/list',name:'基本信息',component: student_list,hidden:false},
    ]
  }
]
