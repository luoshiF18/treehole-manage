import Home from '@/module/home/page/home.vue';
import course_selection from '@/module/courseselectionmanage/page/course_selection.vue';
import class_list from '@/module/courseselectionmanage/page/class_list.vue';
import class_course_list from '@/module/courseselectionmanage/page/class_course_list.vue';
export default [{
    path: '/train',
    component: Home,
    name: '选课管理',  //菜单名称
    hidden: false,
    children:[
       {path:'/courseselectionmanage/page/class_list',        name:'选课',          component: class_list,hidden:false},
       {path:'/courseselectionmanage/page/course_selection/:classId',  name:'选课1',         component: course_selection,hidden:true},
       {path:'/courseselectionmanage/page/class_course_list/:classId', name:'查看班级课程',  component: class_course_list,hidden:true},
    ]
  }
]
