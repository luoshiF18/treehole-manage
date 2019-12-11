import Home from '@/module/home/page/home.vue';
import phase_list from '@/module/phasemanage/page/phase_list.vue';
import phase_edit from '@/module/phasemanage/page/phase_edit.vue';
import phase_add from '@/module/phasemanage/page/phase_add.vue';

export default [{
    path: '/train',
    component: Home,
    name: '期数学费管理',  //菜单名称
    hidden: false,
    children:[
       {path:'/phasemanage/page/phase_list',        name:'期数学费管理',          component: phase_list, hidden:false},
       {path:'/phasemanage/page/phase_edit/:phaseId',        name:'修改期数学费信息',          component: phase_edit, hidden:true},
      {path:'/phasemanage/page/phase_add',        name:'添加期数学费信息',          component: phase_add, hidden:true},
    ]
  }
]
