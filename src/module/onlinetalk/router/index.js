import Home from '@/module/home/page/home.vue';

/*import desk from 'http://localhost:8080/#/imServer';*/
/*import chat from '@/module/onlinetalk/page/convers/common_chat.vue';*/
import message from '@/module/onlinetalk/page/convers/message.vue';

import leave_list from '@/module/onlinetalk/page/leave/leave_list.vue';

import agent_list from '@/module/onlinetalk/page/agent/agent_list.vue';
import agent_add from '@/module/onlinetalk/page/agent/agent_add.vue';
import agent_edit from '@/module/onlinetalk/page/agent/agent_edit.vue';

import reply_list from '@/module/onlinetalk/page/reply/reply_list.vue';
import reply_add from '@/module/onlinetalk/page/reply/reply_add.vue';
import reply_edit from '@/module/onlinetalk/page/reply/reply_edit.vue';

import category_list from '@/module/onlinetalk/page/category/category_list.vue';
import category_add from '@/module/onlinetalk/page/category/category_add.vue';
import category_edit from '@/module/onlinetalk/page/category/category_edit.vue';

import convers_list from '@/module/onlinetalk/page/convers/convers_list.vue';
/*import page_html from '@/module/cms/page/page_html.vue';*/

import imServer from '@/module/onlinetalk/page/work/imServer/imServer.vue'
/*import reply_list from '@/components/imServer/reply_list'*/
/*import imClient from '@/components/imClient/imClient'*/
import imClient from '@/module/onlinetalk/page/work/imClient/imClient.vue'

import serv_list from '@/module/onlinetalk/page/serv/serv_list.vue'
import serv_add from '@/module/onlinetalk/page/serv/serv_add.vue'

export default [{
    path: '/onlinetalk',
    component: Home,
    name: '客服管理',
    hidden: false,
    children: [
      { path: '/imServer', name: 'imServer', component: imServer },
     /* { path: '/imClient', name: 'imClient', component: imClient },*/
      //聊天记录模块
      { path: '/convers/message/:conversId', name:'聊天记录',component: message,hidden:false},
      //客服模块
      { path: '/agent/list', name:'客服列表',component: agent_list,hidden:false},
      { path: '/agent/add', name:'添加客服',component: agent_add,hidden:false},
      { path: '/agent/edit/:agentId', name:'修改客服',component: agent_edit,hidden:false},
      //快捷回复模块
      { path: '/reply/list', name:'快捷回复列表',component: reply_list,hidden:false},
      { path: '/reply/add', name:'添加快捷回复',component: reply_add,hidden:false},
      { path: '/reply/edit/:replyId', name:'修改快捷回复',component: reply_edit,hidden:false},
      //分类模块
      { path: '/category/list', name:'分类列表',component: category_list,hidden:false},
      { path: '/category/add', name:'添加分类',component: category_add,hidden:false},
      { path: '/category/edit/:categoryId', name:'修改分类信息',component: category_edit,hidden:false},
      //会话模块
      { path: '/convers/list', name:'会话列表',component: convers_list,hidden:false},
      //留言模块
      { path: '/leave/list', name:'留言列表',component: leave_list,hidden:false},
      //服务模块
      { path: '/serv/list', name:'服务列表',component: serv_list,hidden:false},
      { path: '/serv/add', name:'添加服务小结',component: serv_add,hidden:false},
     /* { path: '/category/edit/:categoryId', name:'修改分类信息',component: category_edit,hidden:false},*/

     /* { path: '/imClient2', name: 'imClient2',redirect:'', component: imClient },*/
     /* { path: '/cms/page/html/:pageId', name:'生成html',component: page_html,hidden:false},*/
    ],

  /*routes: [
    { path: '/', redirect: 'imServer' },
    /!*  { path: '/reply_list', name: 'reply_list', component: reply_list },*!/
    { path: '/imServer', name: 'imServer', component: imServer },
    { path: '/imClient', name: 'imClient', component: imClient },
  ]*/
    // ,
    // redirect: '/home',
    // children: [
    //   {path: 'home', component: Home}
    // ]
  },
  {
    path: '/imClient',
    component: imClient,
    name: 'imClient',
    redirect:'',
    hidden: false
  }
]

