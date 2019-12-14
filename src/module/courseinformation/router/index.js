import Home from '@/module/home/page/home.vue';
import class_course from '@/module/courseinformation/page/class_course.vue';

export default [{
    path: '/class',
    component: Home,
    name: '课程信息',  //菜单名称
    hidden: false,
    children:[
      {path:'/courseinformation/page/class_course',name:'课程信息',component: class_course,hidden:false},
    ]
  }
]
