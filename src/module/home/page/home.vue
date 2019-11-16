<template>
  <el-row class="container">
    <p-head></p-head>
    <el-col :span="24" class="main">
      <!-- 侧边栏容器 -->
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!--导航菜单【导航】-->
        <el-menu router unique-opened default-active="1">
            <!--用户管理-->
            <el-submenu index="4">
              <template slot="title"><span>用户管理</span></template>
              <el-menu-item-group>
                <el-menu-item index="/User/page/user" >用户信息</el-menu-item>
                <el-submenu index="4-1">
                    <template slot="title">会员等级</template>
                    <el-menu-item index="/User/page/userGrade">普通会员等级</el-menu-item>
                    <el-menu-item index="/User/page/userGradeVip">付费会员等级</el-menu-item>
                </el-submenu>
                <el-menu-item index="/User/page/cards">会员卡信息</el-menu-item>
                <el-menu-item index="/User/page/userIntegral">会员积分</el-menu-item>
                <el-menu-item index="/User/page/userSign">会员签到</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="5">
              <template slot="title"><span>营销活动管理</span></template>
              <el-menu-item-group>
                <el-menu-item index="/Marketing/page/coupon">优惠券管理</el-menu-item>
                <el-menu-item index="/Marketing/page/userIntegral">活动管理</el-menu-item>
                <el-menu-item index="/Marketing/page/userSign">推广管理</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="4-1">
                <template slot="title">规格参数管理</template>
                <!--<el-menu-item index="/user/page/userGrade">规格1</el-menu-item>
                <el-menu-item index="/user/page/userGradeVip">规格2</el-menu-item>-->
              </el-submenu>
            </el-submenu>
          </el-menu>
      </aside>
      <!--导航栏对应页面顶部文字显示-->
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <strong class="title">{{$route.name}}</strong>
            <el-breadcrumb separator="/" class="breadcrumb-inner"></el-breadcrumb>
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


  export default {
    components: {PHead},
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
        //width:230px;
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
      // background: #324057;
      position: absolute;
      top: 60px;
      bottom: 0px;
      overflow: hidden;
      aside {
        flex: 0 0 230px;
        width: 230px;
        // position: absolute;
        // top: 0px;
        // bottom: 0px;
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
        // position: absolute;
        // right: 0px;
        // top: 0px;
        // bottom: 0px;
        // left: 230px;
        overflow-y: scroll;
        padding: 20px;
        .breadcrumb-container {
          //margin-bottom: 15px;
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
© 2019 GitHub, Inc.
