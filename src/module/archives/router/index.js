import Home from '@/module/home/page/home.vue';
import page_list from '@/module/archives/page/page_list.vue';


export default [{
    path: '/archives',
    component: Home,
    name: '档案管理',  //菜单名称
    hidden: false,
    children:[
      {path:'/archives/page/list',name:'测评档案',component: page_list,hidden:false}
    ]
  }
]
