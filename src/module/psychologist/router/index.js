import Home from '@/module/home/page/home.vue';
import profile_list from '@/module/psychologist/page/profile_list.vue';
import profile_add from '@/module/psychologist/page/profile_add.vue';
import profile_edit from '@/module/psychologist/page/profile_edit.vue';

export default [{
  path: '/profile',
  component: Home,
  name: '心理咨询师信息管理',  //菜单名称
  hidden: false,
  children: [
    {path: '/psychologist/profile/list', name: '心理咨询师简介列表', component: profile_list, hidden: false},
    {path: '/psychologist/profile/add', name: '新增心理咨询师简介信息', component: profile_add, hidden: true},
    {path: '/psychologist/profile/edit/:id', name: '修改心理咨询师简介信息', component: profile_edit, hidden: true}
  ]
}
]
