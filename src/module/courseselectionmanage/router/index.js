import Home from '@/module/home/page/home.vue';
import course_selection from '@/module/courseselectionmanage/page/course_selection.vue';
import view_audit_status from '@/module/courseselectionmanage/page/view_audit_status.vue';

export default [{
    path: '/teacher',
    component: Home,
    name: '选课管理',  //菜单名称
    hidden: false,
    children:[
      {path:'/courseselectionmanage/page/course_selection',name:'选课',component: course_selection,hidden:false},
      {path:'/courseselectionmanage/page/view_audit_status',name:'查看审核情况',component: view_audit_status,hidden:false},
    ]
  }
]
