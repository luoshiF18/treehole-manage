import Home from '@/module/home/page/home.vue';
import list from '@/module/warn/page/warn_list.vue';
import preview from '@/module/warn/page/preview.vue';
import analyze from '@/module/warn/page/analyze.vue';
import intervene from '@/module/warn/page/intervene.vue';
import test from '@/module/warn/page/test.vue';
export default [{
  path: '/warn',
  component: Home,
  name: '预警管理',
  hidden: false,
  children:[
    {path:'/warn/page/list',name:'预警管理',component:list,hidden:false},
    {path:'/warn/page/test',name:'测试页面',component:test,hidden:false},
    {path:'/warn/page/analyze',name:'预警统计和分析',component:analyze,hidden:false},
    {path:'/warn/page/intervene',name:'预警人员心理干预管理',component:intervene,hidden:false},
    {path:'/warn/page/preview/:warningId',name:'查看页',component: preview,hidden:true},
  ]
}
]
