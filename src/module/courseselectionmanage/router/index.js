import Home from '@/module/home/page/home.vue';
import course_selection from '@/module/courseselectionmanage/page/course_selection.vue';

export default [{
    path: '/teacher',
    component: Home,
    name: '选课管理',  //菜单名称
    hidden: false,
    children:[
      {path:'/courseselectionmanage/page/course_selection.vue',name:'选课',component: course_selection,hidden:false},
    ]
  }
]
