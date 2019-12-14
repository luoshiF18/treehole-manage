import Home from '@/module/home/page/home.vue';
import class_teacher from '@/module/teacherinformation/page/class_teacher.vue';
export default [{
    path: '/class',
    component: Home,
    name: '老师信息',  //菜单名称
    hidden: false,
    children:[
      {path:'/teacherinformation/page/class_teacher',name:'老师信息',component: class_teacher,hidden:false},
    ]
  }
]
