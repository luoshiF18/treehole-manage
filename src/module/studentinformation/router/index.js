import Home from '@/module/home/page/home.vue';
import class_student from '@/module/studentinformation/page/class_student.vue';

export default [{
    path: '/class',
    component: Home,
    name: '学生信息',  //菜单名称
    hidden: false,
    children:[
      {path:'/studentinformation/page/class_student',name:'学生信息',component: class_student,hidden:false},
    ]
  }
]
