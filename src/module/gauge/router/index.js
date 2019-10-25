import Home from '@/module/home/page/home.vue';
import list from '@/module/gauge/page/list.vue';
export default [{
  path: '/gauge',
  component: Home,
  name: '量表管理',
  hidden: false,
  children:[
    {path:'/gauge/page/list',name:'量表管理页',component:list,hidden:false},
  ]
}
]
