<template>
  <div>
    <h1 class="top">树洞心理培训管理系统(学生入口)</h1>
    <div class="dowebok">



      <div class="logo"></div>

      <form>
      <div class="form-item">
        <input  id="username"  @keyup.enter="login" v-model="name" type="text" autocomplete="off" placeholder="账号"  onfocus="this.placeholder=''" onblur="this.placeholder='账号'">
      </div>
      <div class="form-item">
        <input  id="password"  @keyup.enter="login" v-model="password" type="password" autocomplete="off" placeholder="登录密码"  onfocus="this.placeholder=''" onblur="this.placeholder='登录密码'">
      </div>
      </form>
      <div class="form-item"><button id="submit"  @click="login">登 录</button></div>
    </div>
  </div>
</template>

<script>
  import * as loginApi from '../api/loginform'
  export default {
    name: "login",
    data() {
      return {
        placeholder1:"账号",
        placeholder2:"登录密码",
        name: "",
        password: "",
        type:"1",
      };
    },

    methods: {
      login() {
        //验证姓名和密码是否与locastorage一致
        loginApi.login(this.name,this.password,this.type).then(res=>{
          //解析服务端的响应内容
          if (res.success) {
            sessionStorage.setItem("login",this.name);
            this.$router.push("home");
          }else{
            this.$message.error('用户名或密码不正确')
          }
        })
      },
    }
  };
</script>

<style>
  * { margin: 0; padding: 0; }
  html { height: 100%; }
  body { height: 100%; background: #fff url(../../../static/images/backgroud.png) 50% 50% no-repeat; background-size: cover;}
  .top{margin: 30px 10px 0 10px;text-align:center;}
  .dowebok { position: absolute; left: 50%; top: 50%; width: 430px; height: 550px; margin: -260px 0 0 -215px; border: 1px solid #fff; border-radius: 20px; overflow: hidden;}
  .logo { width: 270px; height: 104px; margin: 50px auto 80px; background: url(../../../static/images/shudong.jpg) 0 0 no-repeat; }
  .form-item { position: relative; width: 360px; margin: 0 auto; padding-bottom: 30px;}
  .form-item input { width: 288px; height: 48px; padding-left: 70px; border: 1px solid #fff; border-radius: 25px; font-size: 18px; color: #fff; background-color: transparent; outline: none;}
  .form-item button { width: 360px; height: 50px; border: 0; border-radius: 25px; font-size: 18px; color: #1f6f4a; outline: none; cursor: pointer; background-color: #fff; }
  #username { background: url(../../../static/images/account.png) 20px 14px no-repeat; }
  #password { background: url(../../../static/images/password.png) 23px 11px no-repeat; }
  .tip { display: none; position: absolute; left: 20px; top: 52px; font-size: 14px; color: #f50; }
  .reg-bar { width: 360px; margin: 20px auto 0; font-size: 14px; overflow: hidden;}
  .reg-bar a { color: #fff; text-decoration: none; }
  .reg-bar a:hover { text-decoration: underline; }
  .reg-bar .reg { float: left; }
  .reg-bar .forget { float: right; }
  .dowebok ::-webkit-input-placeholder { font-size: 18px; line-height: 1.4; color: #fff;}
  .dowebok :-moz-placeholder { font-size: 18px; line-height: 1.4; color: #fff;}
  .dowebok ::-moz-placeholder { font-size: 18px; line-height: 1.4; color: #fff;}
  .dowebok :-ms-input-placeholder { font-size: 18px; line-height: 1.4; color: #fff;}

  @media screen and (max-width: 500px) {
    * { box-sizing: border-box; }
    .dowebok { position: static; width: auto; height: auto; margin: 0 30px; border: 0; border-radius: 0; }
    .logo { margin: 50px auto; }
    .form-item { width: auto; }
    .form-item input, .form-item button, .reg-bar { width: 100%; }
  }
</style>
