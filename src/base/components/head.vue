<template>
  <div>

    <el-col :span="24" class="header">
      <el-col :span="14" class="logo" >
        <img src="/static/images/shudong.jpg" width="500px" height="40" alt="">{{collapsed ? '' : sysName}}
      </el-col>
      <!--<el-col :span="10">
        <div class="tools" @click.prevent="collapse">
          <i class="fa fa-align-justify"></i>
        </div>
      </el-col>-->
      <el-col :span="10" class="userinfo" v-if="this.logined">
        <!--<el-dropdown trigger="hover">
         <span class="el-dropdown-link userinfo-inner"><img :src="this.user.sysUserImg!=null?this.user.sysUserImg:'/static/images/small.jpg'"/> {{user.username}}</span>

          <el-dropdown-menu slot="dropdown">
           <el-dropdown-item>我的消息</el-dropdown-item>
           <el-dropdown-item>设置</el-dropdown-item>
           <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
         </el-dropdown-menu>
       </el-dropdown>-->

        <div class="nav">
          <div class="usermenu" >
            <!--              <span class="el-dropdown-link userinfo-inner">-->
            <!--                <img :src="this.user.sysUserImg!=null?this.user.sysUserImg:'/static/images/small.jpg'"/>-->
            <!--              </span>-->
            欢迎您：{{user.username}}
            <!--            <a href="http://www.xuecheng.com" target="_blank"><i class="el-icon-star-on"></i>首页</a>-->
            <a @click="open"><i class="el-icon-setting"></i>修改密码</a>
            <a href="javascript:;" @click="logout" :loading="editLoading">
              <i class="el-icon-circle-close"></i>退出
            </a>

          </div>


          <el-dialog title="修改密码" :visible.sync="dialogFormVisible"  style="">

            <el-form   :model="updatePwd" label-width="80px"  :rules="updatePwd" ref="updatePwd">
              <el-form-item  label="原密码"  :label-width="formLabelWidth">
                <el-input  type="password"  v-model="updatePwd.oldPassword" autocomplete="off"></el-input>
              </el-form-item>
              <div @mouseleave="leave">
                <el-form-item   label="新密码" :label-width="formLabelWidth">
                  <el-input type="password" v-model="updatePwd.newPassword1" autocomplete="off"></el-input>
                </el-form-item>
              </div>
              <div @mouseleave="leave1">
                <el-form-item    label="新密码" :label-width="formLabelWidth" >
                  <el-input  type="password" v-model="updatePwd.newPassword2" autocomplete="off"></el-input>
                </el-form-item>
              </div>
            </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="updatePassword"  v-bind:disabled="flag">提交</el-button>
            </div>
          </el-dialog>
        </div>
      </el-col>
    </el-col>
    <!-- 1.0 利用mint-ui中的header组件实现整个系统的头部 -->
    <!-- <mt-header fixed title="传智播客.黑马程序员Vue商城系统">
       <router-link to="/" slot="left">
         <mt-button icon="back">首页</mt-button>
       </router-link>
       <mt-button icon="more" slot="right">
         <router-link to="/login">登录</router-link>|
         <router-link to="/register">注册</router-link>
       </mt-button>
     </mt-header>-->
  </div>
</template>
<script type="text/javascript">
  import jwtDecode from 'jwt-decode'
  import utilApi from '../../common/utils'
  import * as loginApi from '../../module/home/api/home'
  export default {
    data() {
      return {
        dialogVisible: false,
        dialogFormVisible: false,
        editLoading:false,
        sysName: '系统管理中心',
        flag:"true",
        user:{
          userid:'',
          username: '',
          userimg: ''
        },
        logined:true,
        collapsed: false,

        params:{
          condition:{
            adminId:"",
          }
        },
        updatePwd:{
          oldPassword:"",
          newPassword1:"",
          newPassword2:"",
        },
        Tips:{
          tip1:"",
          tip2:"",
        },
      }
    },
    methods: {

      //退出登录
      logout: function () {
        this.$confirm('确认退出吗?', '提示', {
        }).then(() => {
          sessionStorage.setItem("login",null);
          this.$router.push("/login");
        })
      },
      //点击取消 触动的方法
      open(){
        this.updatePwd={brand_right:0};
        this.Tips.tip1="",
          this.Tips.tip2="",
          this.dialogFormVisible = true;
      },
      //判断老密码和新密码是不是一样
      leave() {
        if (this.updatePwd.newPassword1 != "" && this.updatePwd.oldPassword != "") {
          if (this.updatePwd.newPassword1 != null && this.updatePwd.oldPassword != null) {
            if (this.updatePwd.newPassword1 == this.updatePwd.oldPassword) {

              this.$alert('新旧密码一样', '错误', {

              });
              this.updatePwd.newPassword1='';
            }else {
              this.Tips.tip1 = "";
            }
          }
        }

      },
      //判断两次密码是不是一样
      leave1(){
        if(this.updatePwd.newPassword2 != "" && this.updatePwd.newPassword1 != "") {
          if (this.updatePwd.newPassword2 != null && this.updatePwd.newPassword1 != null) {
            if (this.updatePwd.newPassword2 == this.updatePwd.newPassword1) {
              this.flag = false;
              this.Tips.tip2 = "";
            } else {
              this.$alert('两次密码不一样', '错误', {
                //dangerouslyUseHTMLString: true
              });
              this.updatePwd.newPassword2='';
            }
          }
        }
      },
      //修改密码
      updatePassword(){
        this.$confirm('确认提交吗？', '提示', {}).then(() => {
          loginApi.update_password(this.params.condition.adminId,this.updatePwd.oldPassword,this.updatePwd.newPassword2).then((res) => {
            if(res.success){
              this.$message({
                message: '密码修改成功,请重新登录',
                type: 'success'
              });
              this.updatePwd={brand_right:0};
              this.flag=true;
              this.dialogFormVisible = false;
              //返回登录页面
              sessionStorage.setItem("login",null);
              this.$router.push("/login");
            }else{
              this.$message.error(res.message);
            }
          });
        })

      },

      //查询管理员信息
      query: function () {
        this.params.condition.adminId = window.sessionStorage.getItem('login');
        this.user.username=this.params.condition.adminId;
      },

      refresh_user:function(){
        let activeUser= utilApi.getActiveUser();

        if(activeUser){
          this.logined = true
          this.user = activeUser;
        }
      }
    },
    mounted() {
      this.refresh_user()
      //查询登录名
      this.query();
    }
  }
</script>
<style scoped lang="scss">
  @import '~scss_vars';
  .nav {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }
  .usermenu {
    float: right;
    padding: 0 2em;
    color:#fff;
  }
  .usermenu a {
    text-decoration: none;
    margin: 0 0.2em 0 1em;
    color:inherit;
  }
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
        padding-right: 15px;
        float: right;
        .userinfo-inner {
          cursor: pointer;
          color: #fff;
          img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            margin: 10px 8px 10px 10px;
            float: left;
          }
        }
      }
      .logo {
        //width:230px;
        height: 60px;
        font-size: 20px;
        padding-left: 0px;
        padding-right: 20px;
        border-color: rgba(238, 241, 146, 0.3);
        border-right-width: 1px;

        img {
          width: 200px;
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
