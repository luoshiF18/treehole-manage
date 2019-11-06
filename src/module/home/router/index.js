import Home from '@/module/home/page/home.vue';
export default [{
    path: '/',
    component: Home,
    name: '系统管理首页',
    hidden: true
    // ,
    // redirect: '/home', // 重定向 重定向路径的path参数
    // children: [
    //   {path: 'home', component: Home}
    // ]
  }/*,
  {
    path: '/login',
    component: Login,
    name: 'Login',
    hidden: true
  }*/
]
