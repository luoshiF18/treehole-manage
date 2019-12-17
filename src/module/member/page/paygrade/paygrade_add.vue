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

        <el-form-item label="等级名称" prop="paygrade_name">
          <el-input v-model="pageForm.paygrade_name" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="等级序号"   prop="rank">
          <el-input v-model="pageForm.rank" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="售卡金额"   prop="card_price">
          <el-input v-model="pageForm.card_price" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="有效天数"   prop="card_legality">
          <el-input v-model="pageForm.card_legality" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="会员折扣" prop="discount">
          <el-input v-model="pageForm.discount" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="权益描述"   prop="card_desc">
          <el-input v-model="pageForm.card_desc" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="初始储值" prop="initial_money">
          <el-input v-model="pageForm.initial_money" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="初始积分" prop="initial_points">
          <el-input v-model="pageForm.initial_points" auto-complete="off" ></el-input>
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
          //freegrade_id: '',
          paygrade_name: '',
          points_judge: '',
          consum_judge: '',
          rank: '',
          card_price:'',
          card_legality:'',
          card_desc:'',
          initial_points:'',
          initial_money:'',
        },
        pageFormRules: { // 添加界面必填选项+不填警告
          paygrade_name:[{required: true, message: '请输入等级名称', trigger: 'blur'}],
          //paygrade_id:[{required: true, message: '请输入会员等级ID', trigger: 'blur'}],
          rank:[{required: true, message: '请输入会员等级', trigger: 'blur'}]
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
              userApi.paygrade_add(this.pageForm).then(res=>{
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
          path:'/member/page/paygrade',
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
