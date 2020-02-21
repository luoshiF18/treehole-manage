<template>
  <!--登录界面组件-->
  <div class="dv-login">
    <!--登录区域-->
    <el-card header="树洞心理服务后台登录" class="login-card">
      <!--native监听el-form表单中的原生事件-->
      <div id="body">
        <div class="g-center login-page" @keyup.enter="login">
          <el-form :model="loginForm" label-width="80px" :rules="loginRules" ref="loginForm" class="login-form">
            <el-form-item label="账号" prop="userNickName">
              <el-input v-model="loginForm.userNickName" placeholder="请输入账号" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="loginForm.password" placeholder="请输入密码" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click.native="login" :loading="editLoading">登陆</el-button>
              <el-button type="primary" @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
    <!--风车-->
    <div class="wmd1">
      <div class="blades">
        <div class="blade2"></div>
        <div class="blade1"></div>
        <div class="vane1"></div>
        <div class="blade3"></div>
        <div class="blade4"></div>
        <div class="vane2"></div>
      </div>
      <div class="base">
        <div class="bottom_base">
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
      <div class="wmd1">
        <div class="blades">
          <div class="blade2"></div>
          <div class="blade1"></div>
          <div class="vane1"></div>
          <div class="blade3"></div>
          <div class="blade4"></div>
          <div class="vane2"></div>
        </div>
        <div class="base">
          <div class="bottom_base">
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
        <div class="wmd1">
          <div class="blades">
            <div class="blade2"></div>
            <div class="blade1"></div>
            <div class="vane1"></div>
            <div class="blade3"></div>
            <div class="blade4"></div>
            <div class="vane2"></div>
          </div>
          <div class="base">
            <div class="bottom_base">
              <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>
          <div class="wmd1">
            <div class="blades">
              <div class="blade2"></div>
              <div class="blade1"></div>
              <div class="vane1"></div>
              <div class="blade3"></div>
              <div class="blade4"></div>
              <div class="vane2"></div>
            </div>
            <div class="base">
              <div class="bottom_base">
                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import utilApi from '../../common/utils';
  import * as loginApi from '../api/login';

  export default {
    data() {
      return {
        LoginFormVisible: false,
        activeName: 'login',
        editLoading: false,
        loginForm: {
          userNickName: '',
          password: ''
        },
        loginRules: {
          userNickName: [
            {required: true, message: '请输入账号', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        },
        user: {
          userid: '',
          userNickName: '',
          userimg: ''
        },
        logined: false,
        returnUrl: ''
      }
    },
    methods: {
      login: function () {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.editLoading = true;
            let para = Object.assign({}, this.loginForm);
            loginApi.login(para).then((res) => {
                this.editLoading = false;
                if (res.success) {
                  this.$message('登陆成功');
                  //刷新 当前页面
                  console.log(this.returnUrl)
                  if (this.returnUrl != 'undefined' && this.returnUrl != ''
                    && !this.returnUrl.includes("/userlogout")
                    && !this.returnUrl.includes("/userlogin")) {
                    window.location.href = this.returnUrl;
                  }
                  else {
                    this.$router.push('/scale/page/list');
                  }
                } else {
                  if (res.message) {
                    this.$message.error(res.message);
                  } else {
                    this.$message.error('登陆失败');
                  }
                }
              },
              (res) => {
                this.editLoading = false;
              });
          }
        });
      },
      resetForm: function (formName) {
        this.$refs[formName].resetFields();
      },
      refresh_user: function () {
        let activeUser = utilApi.getActiveUser();
        if (activeUser) {
          this.logined = true
          this.user = activeUser;
        } else {
          this.showlogin()
        }
      },
      showlogin: function () {
        this.LoginFormVisible = true;
      }
    },
    created() {
    },
    mounted() {
      if (this.$route.query && this.$route.query.returnUrl) {
        let returnUrl = Base64.decode(this.$route.query.returnUrl)
        this.returnUrl = returnUrl;
      }
    }
  }
</script>
<style scoped>
  .dv-login {
    background-color: #407bbf;
    height: 100%;
  }

  .login-card {
    width: 420px;
    height: 300px;
    background-color: #e9eef3;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 25%;
    text-align: center;
  }

  .wmd1 {
    -webkit-transform: scale(.6);
    position: absolute;
    top: 120px;
    left: 200px;
    perspective: 1000px;
  }

  .base {
  }

  .blades {
    width: 350px;
    height: 350px;
    left: 10%;
    top: 10%;
    z-index: 2;
    border-radius: 50%;
    position: absolute;
    margin-top: -30px;
    margin-left: 50px;
    animation: spin 6s linear infinite;
  }

  .blade1 {
    background: white;
    position: absolute;
    width: 41px;
    height: 139px;
    top: -10px;
    left: 150.5px;
    transform: rotate(0deg);
    display: inline-block;
    background: linear-gradient(135deg, transparent 20px, white 0), linear-gradient(225deg, transparent 20px, white 0), linear-gradient(315deg, transparent 20px, white 0), linear-gradient(45deg, transparent 20px, white 0);
    background-position: top left, top right, bottom right, bottom left;
    background-size: 50% 50%;
    background-repeat: no-repeat;
  }

  .blade2 {
    background: white;
    position: absolute;
    width: 41px;
    height: 139px;
    top: 105.5px;
    left: 41px;
    transform: rotate(-90deg);
    display: inline-block;
    background: linear-gradient(135deg, transparent 20px, white 0), linear-gradient(225deg, transparent 20px, white 0), linear-gradient(315deg, transparent 20px, white 0), linear-gradient(45deg, transparent 20px, white 0);
    background-position: top left, top right, bottom right, bottom left;
    background-size: 50% 50%;
    background-repeat: no-repeat;
  }

  .blade3 {
    background: white;
    position: absolute;
    width: 41px;
    height: 139px;
    top: 105.5px;
    right: 41px;
    transform: rotate(-270deg);
    display: inline-block;
    background: linear-gradient(135deg, transparent 20px, white 0), linear-gradient(225deg, transparent 20px, white 0), linear-gradient(315deg, transparent 20px, white 0), linear-gradient(45deg, transparent 20px, white 0);
    background-position: top left, top right, bottom right, bottom left;
    background-size: 50% 50%;
    background-repeat: no-repeat;
  }

  .blade4 {
    background: white;
    position: absolute;
    width: 41px;
    height: 139px;
    bottom: -10px;
    left: 150.5px;
    transform: rotate(180deg);
    display: inline-block;
    background: linear-gradient(135deg, transparent 20px, white 0), linear-gradient(225deg, transparent 20px, white 0), linear-gradient(315deg, transparent 20px, white 0), linear-gradient(45deg, transparent 20px, white 0);
    background-position: top left, top right, bottom right, bottom left;
    background-size: 50% 50%;
    background-repeat: no-repeat;
  }

  .vane1 {
    width: 1px;
    height: 350px;
    left: 175px;
    background: white;
    position: absolute;
    transform: rotate(90deg);
  }

  .vane2 {
    width: 1px;
    height: 350px;
    left: 171.5px;
    background: white;
    position: absolute;
    transform: rotate(180deg);
  }

  .base .bottom_base {
    position: absolute;
    width: 90px;
    height: 100px;
    left: 162px;
    border-right: 16px solid transparent;
    border-left: 16px solid transparent;
    border-bottom: 380px solid white;
    opacity: .8;
    z-index: -1;
    top: 42.5px;
  }

  ul {
    position: absolute;
    top: 180px;
    left: -30px;
  }

  li {
    width: 10px;
    height: 10px;
    background: white;
    padding: 2px;
    display: block;
    margin: 30px;
    box-shadow: inset 0px -2px 0px lightgray;
  }

  li:nth-child(2) {
    position: absolute;
    top: -45px;
    left: 20px;
  }

  li:nth-child(1) {
    position: absolute;
    top: 35px;
    left: 50px;
  }

  li:nth-child(3) {
    position: absolute;
    top: 75px;
    left: 50px;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }

</style>
