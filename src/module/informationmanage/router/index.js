import Home from '@/module/home/page/home.vue';
import studentList from '@/module/informationmanage/page/student/student_list.vue';
import studentAdd from '@/module/informationmanage/page/student/student_add.vue';
import studentEdit from '@/module/informationmanage/page/student/student_edit.vue';
import teacherList from '@/module/informationmanage/page/teacher/teacher_list.vue';
import teacherAdd from '@/module/informationmanage/page/teacher/teacher_add.vue';
import teacherEdit from '@/module/informationmanage/page/teacher/teacher_edit.vue';
import classList from '@/module/informationmanage/page/class/class_list.vue';
import classAdd from '@/module/informationmanage/page/class/class_add.vue';
import classEdit from '@/module/informationmanage/page/class/class_edit.vue';
import courseTypeList from '@/module/informationmanage/page/coursetype/courseType_list.vue';
import courseTypeAdd from '@/module/informationmanage/page/coursetype/courseType_add.vue';
import courseTypeEdit from '@/module/informationmanage/page/coursetype/courseType_edit.vue';
import courseList from '@/module/informationmanage/page/course/course_list.vue';
import courseAdd from '@/module/informationmanage/page/course/course_add.vue';
import courseEdit from '@/module/informationmanage/page/course/course_edit.vue';
export default [{
    path: '/train',
    component: Home,
    name: '信息管理',  //菜单名称
    hidden: false,
  children:[
    {path:'/informationmanage/page/student/list',name:'学生信息管理',component: studentList,hidden:false},
    {path:'/informationmanage/page/student/add',name:'添加学生信息',component: studentAdd,hidden:true},
    {path:'/informationmanage/page/student/edit/:studentId',name:'修改学生信息',component: studentEdit,hidden:true},
    {path:'/informationmanage/page/teacher/list',name:'老师信息管理',component: teacherList,hidden:false},
    {path:'/informationmanage/page/teacher/add',name:'添加老师信息',component: teacherAdd,hidden:true},
    {path:'/informationmanage/page/teacher/edit/:teacherId',name:'修改老师信息',component: teacherEdit,hidden:true},
    {path:'/informationmanage/page/class/list',name:'班级信息管理',component: classList,hidden:false},
    {path:'/informationmanage/page/class/add',name:'添加班级信息',component:classAdd,hidden:true},
    {path:'/informationmanage/page/class/edit/:classId',name:'修改班级信息',component: classEdit,hidden:true},
    {path:'/informationmanage/page/courseType/list',name:'课程类型信息管理',component: courseTypeList,hidden:false},
    {path:'/informationmanage/page/courseType/add',name:'添加课程类型',component:courseTypeAdd,hidden:true},
    {path:'/informationmanage/page/courseType/edit/:courseTypeId',name:'修改课程类型',component: courseTypeEdit,hidden:true},
    {path:'/informationmanage/page/course/list',name:'课程信息管理',component: courseList,hidden:false},
    {path:'/informationmanage/page/course/add',name:'添加课程',component:courseAdd,hidden:true},
    {path:'/informationmanage/page/course/edit/:courseId',name:'修改课程',component: courseEdit,hidden:true},

  ]
  }
]
