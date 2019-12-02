import Home from '@/module/home/page/home.vue';
import profile_list from '@/module/psychologist/page/profile_list.vue';
import profile_add from '@/module/psychologist/page/profile_add.vue';
import profile_edit from '@/module/psychologist/page/profile_edit.vue';
import state_list from '@/module/psychologist/page/state_list.vue';
import state_add from '@/module/psychologist/page/state_add.vue';
import state_edit from '@/module/psychologist/page/state_edit.vue';
import detail_list from '@/module/psychologist/page/detail_list.vue';
import detail_add from '@/module/psychologist/page/detail_add.vue';
import detail_edit from '@/module/psychologist/page/detail_edit.vue';
import consultation_list from '@/module/psychologist/page/consultation_list.vue';
import suggestion_list from '@/module/psychologist/page/suggestion_list.vue';
import suggestion_edit from '@/module/psychologist/page/suggestion_edit.vue';
import suggestion_open from '@/module/psychologist/page/suggestion_open.vue';
import suggestion_add from '@/module/psychologist/page/suggestion_add.vue';
import comment_list from '@/module/psychologist/page/comment_list.vue';
import comment_edit from '@/module/psychologist/page/comment_edit.vue';
import comment_add from '@/module/psychologist/page/comment_add.vue';


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
    {path: '/psychologist/detail/list', name: '详情信息列表', component: detail_list, hidden: false},
    {path: '/psychologist/detail/add', name: '新增详情信息', component: detail_add, hidden: true},
    {path: '/psychologist/detail/edit/:psychologist_id', name: '修改详情信息', component: detail_edit, hidden: true},
    {path: '/psychologist/consultation/list', name: '咨询记录列表', component: consultation_list, hidden: false},
    {path: '/psychologist/suggestion/list', name: '建议信息列表', component: suggestion_list, hidden: false},
    {path: '/psychologist/suggestion/edit/:suggestion_id', name: '修改建议信息', component: suggestion_edit, hidden: true},
    {path: '/psychologist/suggestion/open/:suggestion_id', name: '打开建议信息', component: suggestion_open, hidden: true},
    {path: '/psychologist/suggestion/add', name: '新增建议信息', component: suggestion_add, hidden: true},
    {path: '/psychologist/comment/list', name: '评价信息列表', component: comment_list, hidden: false},
    {path: '/psychologist/comment/edit/:comment_id', name: '修改评价信息', component: comment_edit, hidden: true},
    {path: '/psychologist/comment/add', name: '新增评价信息', component: comment_add, hidden: true},
  ]
}
]
