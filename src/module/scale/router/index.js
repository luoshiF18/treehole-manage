import Home from '@/module/home/page/home.vue';
import list from '@/module/scale/page/list.vue';
import add from '@/module/scale/page/add.vue';
import editDes from '@/module/scale/page/editDes.vue';
import editOpt from '@/module/scale/page/editOpt.vue';
import info from '@/module/scale/page/info.vue';
import alterInfo from '@/module/scale/page/alterInfo.vue';

export default [{
  path: '/scale',
  component: Home,
  name: '量表管理',
  hidden: false,
  children: [
    {path: '/scale/page/list', name: '量表列表', component: list, hidden: false},
    {path: '/scale/page/editOpt', name: '更新选项和问题页', component: editOpt, hidden: true},
    ////////////////////////////////////////////////////////////////////////////////
    {path: '/scale/page/alterInfo', name: '量表修改页', component: alterInfo, hidden: true},
    {path: '/scale/page/add', name: '新增量表页', component: add, hidden: true},
    {path: '/scale/page/editDes', name: '更新描述页', component: editDes, hidden: true},
    {path: '/scale/page/info', component: info, hidden: true},

  ]
}
]
