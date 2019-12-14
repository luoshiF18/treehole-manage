<template>
  <div>
    <el-form   :model="userForm" label-width="80px"  ref="userForm" >
      <el-form-item label="昵称" prop="user_nickname">
      <el-input v-model="userForm.user_nickname" auto-complete="off" :disabled="true"></el-input>
    </el-form-item>
      <el-form-item label="角色" prop="role_name">
      <el-input v-model="userForm.role_name" auto-complete="off" :disabled="true"></el-input>
    </el-form-item>

      <el-form-item label="手机号" prop="user_phone">
      <el-input  v-model="userForm.user_phone" auto-complete="off" :disabled="true"></el-input>
    </el-form-item>
      <el-form-item label="姓名" prop="user_name">
        <el-input v-model="userForm.user_name" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="userForm.gender">
          <el-radio class="radio" label="男">男</el-radio>
          <el-radio class="radio" label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期" prop="user_birth">
        <el-date-picker type="datetime" placeholder="出生日期" v-model="userForm.user_birth"></el-date-picker>
      </el-form-item>
      <el-form-item label="用户状态" prop="user_status">
      <el-radio-group v-model="userForm.user_status">
        <el-radio class="radio" label="正常">正常</el-radio>
        <el-radio class="radio" label="异常">异常</el-radio>
      </el-radio-group>
    </el-form-item>
      <el-form-item label="用户类型" prop="user_type">
        <el-radio-group v-model="userForm.user_type">
          <el-radio class="radio" label="个人">个人</el-radio>
          <el-radio class="radio" label="企业">企业</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="邮箱" prop="user_email">
        <el-input v-model="userForm.user_email" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="QQ号" prop="user_qq">
        <el-input  v-model="userForm.user_qq" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="微信" prop="user_wechat">
        <el-input  v-model="userForm.user_wechat" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="地区" prop="user_region">
        <el-input  v-model="userForm.user_region" auto-complete="off" ></el-input>
      </el-form-item>


      <el-form-item label="企业公司" prop="company_id">
        <el-input  v-model="userForm.company_id" auto-complete="off" ></el-input>
      </el-form-item>


    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="go_back">返回</el-button>
      <el-button type="primary" @click.native="editSubmit" :loading="addLoading">提交</el-button>
    </div>
  </div>
</template>
<script>
  import * as userApi from '../../api/member'
  export default{
    data(){
      return {
        //user_id:'',
        prepage: 1,
        addLoading: false,//加载效果标记
        //新增界面数据
        params: {  //  数据对象 这里和上面的查询表单做了双向绑定
          page: 1, //  当前页
          size: 6, //  每页显示数据的条数
          user_id: '',

        },
        userForm: {
          user_id:'',
          user_nickname:'',
          role_name:'',
          user_phone:'',
          user_name:'',
          gender:'',
          user_birth:'',
          user_status:'',
          user_email:'',
          user_qq:'',
          user_wechat:'',
          user_region:'',
          company_id:'',
          user_type:''
        },

      }
    },
    methods:{
      go_back(){
        this.$router.push({
          path: '/member/page/user', query: {
            prepage: this.$route.query.page,
          }
        })
      },
      editSubmit(){
        this.$refs.userForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              userApi.user_edit(this.userForm).then((res) => {
                console.log(res);
                if(res.success){
                  this.addLoading = false;
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  //返回
                  this.go_back();

                }else{
                  this.addLoading = false;
                  this.$message.error('提交失败!' + res.message);
                }
              });
            });
          }
        });
      }
    },
    created: function () {
      this.user_id=this.$route.params.user_id;
      //this.prepage = this.$route.query.page || '';

      //根据主键查询页面信息
      userApi.user_get(this.user_id).then((res) => {
        console.log(res);
        if(res){
          this.userForm = res;
        }
      });
    },
    mounted:function(){
    }
  }
</script>
<style>

</style>
