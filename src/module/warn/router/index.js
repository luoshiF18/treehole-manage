import Home from '@/module/home/page/home.vue';
import list from '@/module/warn/page/warn_list.vue';
import preview from '@/module/warn/page/preview.vue';
export default [{
  path: '/warn',
  component: Home,
  name: '预警管理',
  hidden: false,
  children:[
    {path:'/warn/page/list',name:'预警管理页',component:list,hidden:false},
    {path:'/warn/page/preview/:warningId',name:'查看页',component: preview,hidden:true},
  ]
}
]
