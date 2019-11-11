import Home from '@/module/home/page/home.vue';
import profile_list from '@/module/psychologist/page/profile_list.vue';
import profile_add from '@/module/psychologist/page/profile_add.vue';
import profile_edit from '@/module/psychologist/page/profile_edit.vue';
import state_list from '@/module/psychologist/page/state_list.vue';
import state_add from '@/module/psychologist/page/state_add.vue';
import state_edit from '@/module/psychologist/page/state_edit.vue';

export default [{
  path: '/',
  component: Home,
  name: '心理咨询师信息管理',  //菜单名称
  hidden: false,
  children: [
    {path: '/psychologist/profile/list', name: '简介信息列表', component: profile_list, hidden: false},
    {path: '/psychologist/profile/add', name: '新增简介信息', component: profile_add, hidden: true},
    {path: '/psychologist/profile/edit/:id', name: '修改简介信息', component: profile_edit, hidden: true},
    {path: '/psychologist/state/list', name: '状态信息列表', component: state_list, hidden: false},
    {path: '/psychologist/state/add', name: '新增状态信息', component: state_add, hidden: true},
    {path: '/psychologist/state/edit/:id', name: '修改状态信息', component: state_edit, hidden: true},
  ]
}
]
