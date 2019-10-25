import Home from '@/module/home/page/home.vue';
import list from '@/module/gauge/page/list.vue';
import add from '@/module/gauge/page/add.vue';
import editDes from '@/module/gauge/page/editDes.vue';
import editOpt from '@/module/gauge/page/editOpt.vue';
import editInfo from '@/module/gauge/page/editInfo.vue';
export default [{
  path: '/gauge',
  component: Home,
  name: '量表管理',
  hidden: false,
  children:[
    {path:'/gauge/page/list',name:'量表管理页',component:list,hidden:false},
    {path:'/gauge/page/add',name:'新增量表页',component:add,hidden:false},
    {path:'/gauge/page/editDes',name:'更新评价页',component:editDes,hidden:true},
    {path:'/gauge/page/editOpt',name:'更新选项和问题页',component:editOpt,hidden:true},
    {path:'/gauge/page/editInfo',name:'更新详细信息页',component:editInfo,hidden:true},
  ]
}
]
