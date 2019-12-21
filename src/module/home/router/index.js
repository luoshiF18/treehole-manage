import Home from '@/module/home/page/home.vue';
import Login from '@/base/components/loginform.vue';
export default [{
  path: '/',
  meta:{
    requireAuth: true,  //添加这个字段表示进入这个路由是需要登录的
  },
  component: Home,
  name: '系统管理首页',
  hidden: true,
  redirect: '/login',
  children: [
    {path: 'home'}
  ]
},
  {
    path: '/login',
    component: Login,
    name: 'Login',
    hidden: true
  }
]


