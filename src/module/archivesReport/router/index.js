import Home from '@/module/home/page/home.vue';
import archivesReport_list from '@/module/archivesReport/page/archivesReport_list.vue';
import archivesReport_detail from '@/module/archivesReport/page/archivesReport_detail.vue';


export default [{
    path: '/archivesReport',
    component: Home,
    name: '测评报告',  //菜单名称
    hidden: false,
    children:[
      {path:'/archivesReport/page/List',name:'个体报告',component: archivesReport_list,hidden:false},
      {path:'/archivesReport/page/detail',name:'个体报告详情',component: archivesReport_detail,hidden:true},
    ]
  }
]
