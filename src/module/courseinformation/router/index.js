import Home from '@/module/home/page/home.vue';
import student_course_list from '@/module/courseinformation/page/student_course_list.vue';
import download from '@/module/courseinformation/page/download.vue';
import upload from '@/module/courseinformation/page/upload.vue';

export default [{
    path: '/student',
    component: Home,
    name: '课程信息',  //菜单名称
    hidden: false,
    children:[
      {path: '/courseinformation/page/student_course_list',name:'学生课程信息',component: student_course_list,hidden:false},
      {path: '/courseinformation/page/download/:classCourseId',name:'文件上传',component: download,hidden:true},
      {path: '/courseinformation/page/upload/:classCourseId',name:'文件下载',component: upload,hidden:true},
    ]
  }
]
