import Home from '@/module/home/page/home.vue';
import profile_list from '@/module/psychologist/page/psychologist_list.vue';

export default [{
  path: '/profile',
  component: Home,
  name: '心理咨询师信息管理',  //菜单名称
  hidden: false,
  children: [
    {path: '/psychologist/page/list', name: '心理咨询师信息列表', component: profile_list, hidden: false}
  ]
}
]
