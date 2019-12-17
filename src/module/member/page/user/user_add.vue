<template>
  <div>
    <el-button type="primary"
               size="medium"
               style="margin-left: 15px"
               icon="el-icon-arrow-left"
               @click="go_back">返回
    </el-button>
    <el-card class="card">
      <el-form :model="pageForm"
               label-width="80px"
               status-icon
               label-position="left"
               class="demo-ruleForm"
               :rules="pageFormRules"
               ref="pageForm">
        <el-form-item label="用户头像"  prop="user_image" >
          <el-upload class="avatar-uploader"
                     action="https://jsonplaceholder.typicode.com/posts/"
                     :show-file-list="false"
                     v-model="pageForm.user_image"
                     :on-success="handleAvatarSuccess"
                     :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户姓名" prop="user_name">
          <el-input v-model="pageForm.user_name" placeholder="请输入用户姓名" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="user_nickname">
          <el-input v-model="pageForm.user_nickname" placeholder="请输入用户昵称" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="用户性别" prop="gender">
          <el-radio-group v-model="pageForm.gender">
            <el-radio class="radio" label="0">男</el-radio>
            <el-radio class="radio" label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号"   prop="user_phone">
          <el-input v-model="pageForm.user_phone" placeholder="请输入用户手机号" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item v-if="visible" label="用户密码" prop="password">
          <el-input type="password"
                    v-model="pageForm.password"
                    placeholder="请输入用户密码"
                    auto-complete="off">
            <i slot="suffix" title="显示密码" @click="changePassword('show')"
               style="cursor:pointer;" class="el-icon-aliicon-test-copy"></i>
          </el-input>
        </el-form-item>
        <el-form-item v-else label="用户密码" prop="password">
          <el-input type="text"
                    v-model="pageForm.password"
                    auto-complete="off"
                    placeholder="请输入用户密码">
            <i slot="suffix" title="隐藏密码" @click="changePassword('hide')"
               style="cursor:pointer;" class="el-icon-aliicon-test1-copy"></i>
          </el-input>
        </el-form-item>
        <!--确认密码-->
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password"
                    v-model="pageForm.checkPass"
                    auto-complete="off"
                    placeholder="请输入确认密码">
          </el-input>
        </el-form-item>
        <el-form-item label="用户住址" prop="user_region">
          <el-input v-model="pageForm.user_region" placeholder="请输入用户住址" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="user_birth">
          <el-date-picker placeholder="出生日期" type="datetime" v-model="pageForm.user_birth"></el-date-picker>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button type="primary" @click="addSubmit" style="margin-left: 20px">提交</el-button>
        <el-button type="primary" @click="resetForm('pageForm')">重置</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  import * as userApi from '../../api/member'

  export default {
    data() {
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入用户手机号！'));
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          console.log(reg.test(value));
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入合法的手机号！'));
          }
        }
      };
      var validatePass  = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户密码！'));
        } else {
          if (this.pageForm.checkPass !== '') {
            this.$refs.pageForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('输入的确认密码不能为空！'));
        } else if (value !== this.pageForm.password) {
          callback(new Error('您输入的确认密码不合法! 请务必检查与输入的用户密码是否一致！'));
        } else {
          callback();
        }
      };
      return {
        imageUrl: '', // 上传头像
        visible: true, // 是否显示
        visiblePass: true,
        pageForm:{ // ruleForm
          user_image: '',
          user_nickname: '',
          user_name: '',
          password: '',
          checkPass: '',
          gender: '0',
          user_birth: new Date(),
          user_phone: '',
          user_region: '',
          role_id: 2,// 管理员
          user_type: 0, //个人
        },
        pageFormRules: { // 添加界面必填选项+不填警告 rules
          user_nickname: [{required: true, message: '（必填）请输入用户昵称',   trigger: 'blur'}],
          user_phone:[{required: true, validator: checkPhone ,   trigger: 'blur'}],
          password:  [{required: true, validator: validatePass , trigger: 'blur'}],
          checkPass: [{required: true, validator: validatePass2, trigger: 'blur' }],
        },
      };
    },
    methods:{
      //判断密码（password）渲染，true:暗文显示，false:明文显示
      changePassword(value) {
        this.visible = !(value === 'show');
      },
      // 重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 提交
      addSubmit:function () {
        this.$refs['pageForm'].validate((valid) => {
          if (valid) {  //表单校验成功
            this.$confirm('你确认提交吗?', '提示', {}).then(() => {
              //调用user_add方法请求服务端的新增页面接口
              userApi.user_add(this.pageForm).then(res=>{
                //解析服务端的响应内容
                if (res.success) {
                  this.$message.success('提交成功')
                  //将表单清空
                  this.$refs['pageForm'].resetFields();
                }else if(res.message){
                  this.$message.error(res.message)
                }else{
                  this.$message.error('提交失败')
                }
              });
            })
          }
        })
      },
      // 返回
      go_back:function () {
        // 获取当前路由
        this.$router.push({
          path:'/member/page/user',
          query:{
            page: this.$route.query.page, // 取出路由中的参数
          }
        })
      },
      //
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    },
    mounted() {}
  }

</script>
<style scoped>
  .card {
    width: 70%;
    margin-top: 10px;
    margin-left: 12%;
  }
  /*头像上传*/
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
