import Home from '@/module/home/page/home.vue';
import course_list from '@/module/coursestaught/page/course_list.vue';
import upload from '@/module/coursestaught/page/upload.vue';
import download from '@/module/coursestaught/page/download.vue';

export default [{
    path: '/teacher',
    component: Home,
    name: '所教课程',  //菜单名称
    hidden: false,
    children:[
      {path:'/coursestaught/page/course_list',name:'所教课程',component: course_list,hidden:false},
      {path:'/coursestaught/page/upload/:classCourseId',name:'文件上传',component: upload,hidden:true},
      {path:'/coursestaught/page/download/:classCourseId',name:'文件下载',component: download,hidden:true},
    ]
  }
]
