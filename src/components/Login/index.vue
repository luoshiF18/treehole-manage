<template>
    <div class="dv-login">
        <el-card header="登录" class="login-card">
            <!--native监听el-form表单中的原生事件-->
            <el-form>
                <el-form-item label="用户名">
                    <el-input v-model="username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="password" type="password"></el-input>
                </el-form-item>
<!--                <el-form-item label="验证码">-->
<!--                    <el-input v-model="verifyImg" type="text"></el-input>-->
<!--                    <img @click="handleToVerifyImg" src="/api2/users/verifyImg">-->
<!--                </el-form-item>-->
                <el-form-item class="btn">
                    <el-button type="primary" @click="handleToLogin">登录</el-button>
<!--                    <el-button type="primary" @click="handleToRegister">注册</el-button>-->
<!--                    <el-button type="primary" @click="handleToFindPassword">忘记密码</el-button>-->
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
    export default {
        name: 'login',
        data() {
            return {
                username: '',
                password: '',

                // verifyImg : ''
            }
        },
        methods: {
            handleToLogin() {
             /*   this.axios.post('/api2/users/login', {
                    username: this.username,
                    password: this.password,
                    verifyImg : this.verifyImg
                }).then((res) => {
                    var status = res.data.status;
                    if (status === 0) {
                        this.$alert('登录成功', '登录', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/users');
                            }
                        })
                    } else {
                        this.$alert(res.data.msg, '登录', {
                            confirmButtonText: '确定'
                        })
                    }
                });*/
               this.$router.push('/scale/page/list');
            },
            // handleToRegister() {
            //     this.$router.push('/register');
            // },
            // handleToFindPassword() {
            //     this.$router.push('/findPassword');
            // },
            // handleToVerifyImg(ev){
            //     ev.target.src = '/api2/users/verifyImg?'+Math.random();
            // }
        }
    }
</script>
<style scoped>
    .login-card {
        width: 25rem;
        margin: 8rem auto;

    }
    .btn {
        text-align: center;
    }
</style>
