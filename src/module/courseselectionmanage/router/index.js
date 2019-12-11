import Home from '@/module/home/page/home.vue';
import course_selection from '@/module/courseselectionmanage/page/course_selection.vue';
import phase_list from '@/module/courseselectionmanage/page/phase_list.vue';
import phase_course_list from '@/module/courseselectionmanage/page/phase_course_list.vue';
import examine_teacher_course from '@/module/courseselectionmanage/page/examine_teacher_course.vue';
export default [{
    path: '/train',
    component: Home,
    name: '选课管理',  //菜单名称
    hidden: false,
    children:[
       {path:'/courseselectionmanage/page/phase_list',        name:'期数选课',          component: phase_list,hidden:false},
       {path:'/courseselectionmanage/page/course_selection/:phaseId',  name:'选课1',         component: course_selection,hidden:true},
       {path:'/courseselectionmanage/page/phase_course_list/:phaseId', name:'查看期数课程',  component: phase_course_list,hidden:true},
       {path:'/courseselectionmanage/page/examine_teacher_course', name:'审核老师选课',  component: examine_teacher_course,hidden:false},
    ]
  }
]
