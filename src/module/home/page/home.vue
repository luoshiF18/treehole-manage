<template>

  <el-row class="container">
    <p-head></p-head>
    <el-col :span="24" class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!--导航菜单-->
        <!--<el-menu :default-active="$route.path"
                 class="el-menu-vertical-demo"
                 @open="handleopen"
                 @close="handleclose"
                 @select="handleselect"
                 unique-opened
                 router
                 v-show="!collapsed"
                 background-color="#EFEFF4">-->
        <el-menu router unique-opened default-active="1">

          <el-submenu index="1">
            <template slot="title">量表管理</template>
            <el-menu-item-group>
              <el-menu-item index="/scale/page/list">量表列表</el-menu-item>
<!--              <el-menu-item index="/scale/page/add">新增量表页</el-menu-item>-->
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">预警管理</template>
            <el-menu-item-group>
              <el-menu-item index="/warn/page/list">预警管理页</el-menu-item>
              <el-menu-item index="/warn/page/analyze">预警统计和分析</el-menu-item>
              <el-menu-item index="/warn/page/intervene">预警人员心理干预管理</el-menu-item>
              <el-menu-item index="/warn/page/test">测试页面</el-menu-item>
            </el-menu-item-group>
          </el-submenu>



          <el-submenu index="4">
            <template slot="title"><span>用户管理</span></template>
            <el-menu-item-group>
              <el-menu-item index="/member/page/user" >用户信息</el-menu-item>
              <el-menu-item index="/member/page/cards">会员卡信息</el-menu-item>
              <el-submenu index="4-1">
                <template slot="title">会员等级</template>
                <el-menu-item index="/member/page/freegrade">普通会员等级</el-menu-item>
                <el-menu-item index="/member/page/paygrade">VIP会员等级</el-menu-item>
              </el-submenu>

              <el-menu-item index="/member/page/point">会员积分</el-menu-item>
              <el-menu-item index="/member/page/checkin">会员签到</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title"><span>档案管理</span></template>
            <el-menu-item-group>
              <el-menu-item index="/archives/page/List">个人档案</el-menu-item>
              <el-menu-item index="/archives/page/UserList">用户档案</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="6">
            <template slot="title"><span>测评报告</span></template>
            <el-menu-item-group>
              <el-menu-item index="/archivesReport/page/List">个体报告</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="7">
            <template slot="title"><span>客服管理</span></template>
            <el-submenu index="7-1">
             <template slot="title">客服工作台</template>
              <el-menu-item index="/imServer" >客服工作台</el-menu-item>
            </el-submenu>
            <el-submenu index="7-2">
              <template slot="title">客服管理</template>
              <el-menu-item index="/agent/list">客服列表</el-menu-item>
              <el-menu-item index="/agent/add">添加客服</el-menu-item>
              <el-menu-item index="/agent/edit/:agentId">修改客服</el-menu-item>
            </el-submenu>
            <el-submenu index="7-3">
              <template slot="title">快捷回复管理</template>
              <el-menu-item index="/reply/list">快捷回复列表</el-menu-item>
              <el-menu-item index="/reply/add">添加快捷回复</el-menu-item>
              <el-menu-item index="/reply/edit/:replyId">修改快捷回复</el-menu-item>
            </el-submenu>
            <el-submenu index="7-4">
              <template slot="title">回复分类管理</template>
              <el-menu-item index="/category/list">分类列表</el-menu-item>
              <el-menu-item index="/category/add">添加分类</el-menu-item>
              <el-menu-item index="/category/edit/:categoryId">修改分类信息</el-menu-item>
            </el-submenu>
          <el-submenu index="7-5">
            <template slot="title">会话管理</template>
            <el-menu-item index="/convers/list">会话列表</el-menu-item>
          </el-submenu>
            <el-submenu index="7-6">
              <template slot="title">留言管理</template>
              <el-menu-item index="/leave/list">留言列表</el-menu-item>
            </el-submenu>
            <el-submenu index="7-7">
              <template slot="title">服务管理</template>
              <el-menu-item index="/serv/list">服务列表</el-menu-item>
              <el-menu-item index="/serv/add">新增服务小结</el-menu-item>
            </el-submenu>
          </el-submenu>

          <el-submenu index="8">
            <template slot="title"><span>心理咨询师管理</span></template>
            <el-submenu index="8-1">
              <template slot="title">信息列表</template>
              <el-menu-item index="/psychologist/profile/list">简介信息列表</el-menu-item>
              <el-menu-item index="/psychologist/state/list">状态信息列表</el-menu-item>
              <el-menu-item index="/psychologist/detail/list" >详情信息列表</el-menu-item>
            </el-submenu>
            <el-submenu index="8-2">
              <template slot="title">服务列表</template>
              <el-menu-item index="/psychologist/consultation/list" >咨询记录列表</el-menu-item>
              <el-menu-item index="/psychologist/suggestion/list" >建议信息列表</el-menu-item>
              <el-menu-item index="/psychologist/comment/list" >评价信息列表</el-menu-item>
            </el-submenu>
            <el-submenu index="8-3">
              <template slot="title">统计图表</template>
              <el-menu-item index="/psychologist/total/list" >统计图表</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="9">
            <template slot="title"><span>预约订单管理</span></template>
            <el-menu-item-group>
              <el-menu-item index="/appointment/order/list">预约订单列表</el-menu-item>
              <el-menu-item index="/appointment/cltmanage/list">咨询师预约时间列表</el-menu-item>
              <el-menu-item index="/appointment/cltmanage/add">新增咨询师预约时间</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="10">
            <template slot="title"><span>营销活动管理</span></template>
            <el-menu-item-group>
              <el-menu-item index="/marketing/coupon/page/list">优惠券列表</el-menu-item>
              <el-menu-item index="/marketing/activity/page/list">优惠活动列表</el-menu-item>
              <el-menu-item index="/marketing/activity/point/list">积分活动</el-menu-item>
              <el-menu-item index="/marketing/extension/list">推广列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>


        </el-menu>

        <!--导航菜单-折叠后-->

</aside>

      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <strong class="title">{{$route.name}}</strong>
            <el-breadcrumb separator="/" class="breadcrumb-inner">

            </el-breadcrumb>
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
  import PHead from '@/base/components/head.vue';
  import utilApi from '../../../common/utils';

  export default {
    components: {
      PHead
    },
    data() {
      return {
        collapsed: false,
        sysUserName: '',
        sysUserAvatar: '/static/images/small.jpg',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleopen() {
        //console.log('handleopen');
      },
      handleclose() {
        //console.log('handleclose');
      },
      handleselect: function (a, b) {
      },
      //折叠导航栏
      collapse: function () {
        this.collapsed = !this.collapsed;
      },
      showMenu(i, status) {
        this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
      }

    },
    created() {
      console.log(this.$router.options.routes)
    }
  }

</script>

<style scoped lang="scss">
  @import '~scss_vars';
  /*.a {text-decoration：none}*/
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;

  .header {
    height: 60px;
    line-height: 60px;
    background: $color-primary;
    color: #fff;

  .userinfo {
    text-align: right;
    padding-right: 35px;
    float: right;

  .userinfo-inner {
    cursor: pointer;
    color: #fff;

  img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin: 10px 0px 10px 10px;
    float: right;
  }

  }
  }
  .logo {
    /* width: 230 px;*/
    height: 60px;
    font-size: 22px;
    padding-left: 20px;
    padding-right: 20px;
    border-color: rgba(238, 241, 146, 0.3);
    border-right-width: 1px;
    border-right-style: solid;

  img {
    width: 40px;
    float: left;
    margin: 10px 10px 10px 18px;
  }

  .txt {
    color: #fff;
  }

  }
  .logo-width {
    width: 250px;
  }

  .logo-collapse-width {
    width: 60px
  }

  .tools {
    padding: 0px 23px;
    width: 14px;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
  }

  }
  .main {
    display: flex;
    /*background: #324057;*/
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;

  aside {
    flex: 0 0 230px;
    width: 230px;

  /*/ / position: absolute;
  / / top: 0 px;
  / / bottom: 0 px;*/

  .el-menu {
    height: 100%;
  }

  .collapsed {
    width: 60px;

  .item {
    position: relative;
  }

  .submenu {
    position: absolute;
    top: 0px;
    left: 60px;
    z-index: 99999;
    height: auto;
    display: none;
  }

  }
  }
  .menu-collapsed {
    flex: 0 0 60px;
    width: 60px;
  }

  .menu-expanded {
    flex: 0 0 230px;
    width: 230px;
  }

  .content-container {
    background: #fff;
    flex: 1;
    /*
      / / position: absolute;
      / / right: 0 px;
      / / top: 0 px;
      / / bottom: 0 px;
    */
    /*  / / left: 230 px;*/
    overflow-y: scroll;
    padding: 20px;

  .breadcrumb-container {

  /*  / / margin-bottom: 15 px;*/

  .title {
    width: 200px;
    float: left;
    color: #475669;
  }

  .breadcrumb-inner {
    float: right;
  }

  }
  .content-wrapper {
    background-color: #fff;
    box-sizing: border-box;
  }

  }
  }
  }
</style>
