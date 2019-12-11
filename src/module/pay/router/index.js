import Home from '@/module/home/page/home.vue';
import pay from '@/module/pay/page/pay.vue';

export default [{
    path: '/train',
    component: Home,
    name: '交费',  //菜单名称
    hidden: false,
    children:[
       {path:'/pay/page/pay',        name:'交费',          component: pay,hidden:false},
    ]
  }
]
