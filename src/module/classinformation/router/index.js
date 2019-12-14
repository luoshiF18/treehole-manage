import Home from '@/module/home/page/home.vue';
import class_info from '@/module/classinformation/page/class_info.vue';
import class_edit from '@/module/classinformation/page/class_edit.vue';

export default [{
    path: '/class',
    component: Home,
    name: '班级信息',  //菜单名称
    hidden: false,
    children:[
      {path:'/classinformation/page/class_info',name:'班级信息',component: class_info,hidden:false},
      {path:'/classinformation/page/class_edit/:classId',name:'班级信息',component: class_edit,hidden:true},
    ]
  }
]
