import Home from '@/module/home/page/home.vue';
import list from '@/module/warn/page/warn_list.vue';
export default [{
  path: '/warn',
  component: Home,
  name: '预警管理',
  hidden: false,
  children:[
    {path:'/warn/page/list',name:'预警管理页',component:list,hidden:false},
  ]
}
]
