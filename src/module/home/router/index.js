import Home from '@/module/home/page/home.vue';
import Login from '@/base/components/loginform.vue';
export default [{
    path: '/',
    component: Home,
    name: '系统管理首页',
    hidden: true,
    redirect: '/login',
    children: [
      {path: 'home', component: Home}
    ]
  },
  {
    path: '/login',
    component: Login,
    name: 'Login',
    hidden: true
  }
]
