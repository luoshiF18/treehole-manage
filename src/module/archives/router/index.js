import Home from '@/module/home/page/home.vue';
import page_list from '@/module/archives/page/page_list.vue';
import archives_detail from '@/module/archives/page/archives_detail.vue';
import alluser_list from '@/module/archives/page/alluser_list.vue';


export default [{
    path: '/archives',
    component: Home,
    name: '档案管理',  //菜单名称
    hidden: false,
    children:[
      {path:'/archives/page/List',name:'个人档案',component: page_list,hidden:false},
      {path:'/archives/page/detail',name:'档案详情',component: archives_detail,hidden:true},
      {path:'/archives/page/UserList',name:'用户档案',component: alluser_list,hidden:false}
    ]
  }
]
