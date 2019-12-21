import Home from '@/module/home/page/home.vue';
import class_list from '@/module/classestaught/page/class_list.vue';
import class_student from '@/module/classestaught/page/class_student.vue';


export default [{
    path: '/teacher',
    component: Home,
    name: '所带班级',  //菜单名称
    hidden: false,
    children:[
      {path:'/classestaught/page/class_list',name:'所带班级',component: class_list,hidden:false},
      {path:'/classestaught/page/class_student/:classId',name:'班级学生',component: class_student,hidden:true},

    ]
  }
]
