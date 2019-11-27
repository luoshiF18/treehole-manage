<template>
    <div class="dv-login">
        <el-card header="树洞心理服务后台登录" class="login-card">
            <!--native监听el-form表单中的原生事件-->
          <div id="body">
            <div class="g-center login-page" @keyup.enter="login">
<!--              <el-tabs v-model="activeName" >
                <el-tab-pane label="用户登陆" name="login">-->
                  <el-form :model="loginForm" label-width="80px" :rules="loginRules" ref="loginForm" class="login-form">
                    <el-form-item label="账号" prop="userNickName">
                      <el-input v-model="loginForm.userNickName" auto-complete="off" ></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                      <el-input v-model="loginForm.password" auto-complete="off" ></el-input>
                    </el-form-item>
                    <el-form-item >
                      <el-button type="primary"  @click.native="login" :loading="editLoading">登陆</el-button>
                      <el-button type="primary"  @click="resetForm('loginForm')">重置</el-button>
                    </el-form-item>
                  </el-form>
<!--                </el-tab-pane>
              </el-tabs>-->
            </div>

          </div>
        </el-card>
    </div>
</template>
<script>
  import utilApi from '../../common/utils';
  import * as loginApi from '../api/login';
    export default {
        data() {
          return {
            LoginFormVisible:false,
            activeName: 'login',
            editLoading: false,
            loginForm: {
              userNickName:'',
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
            user:{
              userid:'',
              userNickName: '',
              userimg: ''
            },
            logined:false,
            returnUrl:''
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
                    if(res.success){
                      this.$message('登陆成功');
                      //刷新 当前页面
                      // alert(this.returnUrl)
                      // console.log(this.returnUrl)
                      // if(this.returnUrl!='undefined' && this.returnUrl!=''
                      //   && !this.returnUrl.includes("/userlogout")
                      //   && !this.returnUrl.includes("/userlogin")){
                      //
                      //   window.location.href = this.returnUrl;
                      // }else{
                      //   //跳转到首页
                      //   window.location.href = 'http://www.xuecheng.com/'
                      // }
                      this.$router.push('/scale/page/list');

                    }else{
                      if(res.message){
                        this.$message.error(res.message);
                      }else{
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

          resetForm:function(formName){
            this.$refs[formName].resetFields();
          },
          refresh_user:function(){
            let activeUser= utilApi.getActiveUser();

            if(activeUser){
              this.logined = true
              this.user = activeUser;
            }else{
              this.showlogin()
            }
          },
          showlogin:function(){
            this.LoginFormVisible = true;
          }
        },
      created() {
        // var this_ = this;
        //bus.$on('childa-message', this.showlogin(this_));


      },
      mounted() {

        //this.refresh_user()
//    Vue.prototype.loginwin = this;
        if( this.$route.query &&  this.$route.query.returnUrl){

          let returnUrl =  Base64.decode(this.$route.query.returnUrl)
          //alert(returnUrl)
          this.returnUrl = returnUrl;
          //alert(this.returnUrl)
        }
        /*bus.$on('childa-message', function(data) {
          console.log("aaaaaaaaaaaaa"+data)
          alert(this.LoginFormVisible)
          this.LoginFormVisible = true
          alert(this.LoginFormVisible)
        });*/



      }
    }
</script>
<style scoped>
    .login-card {
        width: 25rem;
        margin: 8rem auto;
        text-align: center;

    }
    .btn {
        text-align: center;
    }
</style>
