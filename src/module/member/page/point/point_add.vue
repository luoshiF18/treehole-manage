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
               label-width="100px"
               status-icon
               label-position="left"
               class="demo-ruleForm"
               :rules="pageFormRules"
               ref="pageForm">
        <!--<el-form-item label="记录积分ID"     prop="points_id" >
          <el-input v-model="pageForm.points_id" auto-complete="off" ></el-input>
        </el-form-item>-->
        <el-form-item label="用户ID" prop="user_id">
        <el-input v-model="pageForm.user_id" clearable auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="本次积分"   prop="points_num">
          <el-input v-model="pageForm.points_num" clearable auto-complete="off" ></el-input>
        </el-form-item>

        <el-form-item label="计算前积分"   prop="points_before">
          <el-input v-model="pageForm.points_before" clearable auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="计算后积分"   prop="points_later">
          <el-input v-model="pageForm.points_later" clearable auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="活动ID" prop="act_id">
          <el-input v-model="pageForm.act_id" clearable auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="积分描述" prop="description">
          <el-input v-model="pageForm.description" clearable auto-complete="off" ></el-input>
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
      return {
        prepage: 1,
        pageForm:{ // ruleForm
          points_id:'',
          user_id:'',
          points_time:'',
          points_before:'',
          points_num:'',
          points_later:'',
          description:'',
          act_id:'',
        },
        pageFormRules: { // 添加界面必填选项+不填警告
          user_id:[{required: true, message: '请输入用户ID', trigger: 'blur'}],
          /*paygrade_id:[{required: true, message: '请输入会员等级ID', trigger: 'blur'}],
          rank:[{required: true, message: '请输入会员总积分', trigger: 'blur'}],*/
        },
      };
    },
    methods:{
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
              userApi.point_add(this.pageForm).then(res=>{
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
          path:'/member/page/point',
          query:{
            prepage: this.$route.query.page, // 取出路由中的参数
          }
        })
      },
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
</style>
