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
        <!--<el-form-item label="等级ID"     prop="freegrade_id" >
          <el-input v-model="pageForm.freegrade_id" clearable auto-complete="off" ></el-input>
        </el-form-item>-->
        <el-form-item label="等级名称" prop="freegrade_name">
          <el-input v-model="pageForm.freegrade_name" clearable auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="等级序号"  prop="rank">
          <el-input v-model="pageForm.rank" clearable auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="会员积分额" prop="points_judge">
          <el-input v-model="pageForm.points_judge" clearable auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="消费总金额" prop="consum_judge">
          <el-input v-model="pageForm.consum_judge" clearable auto-complete="off" ></el-input>
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
          freegrade_name: '',
          points_judge: '',
          consum_judge: '',
          rank: '',
        },
        pageFormRules: { // 添加界面必填选项+不填警告 rules
          freegrade_name:[{required: true, message: '请输入等级名称', trigger: 'blur'}],
          //freegrade_id: [ {required: true, message: '请输入会员卡类型', trigger: 'blur'}],
          rank: [ {required: true, message: '请输入等级序号', trigger: 'blur'}]
          /*points_judge: [ {required: true, message: '请输入会员总积分', trigger: 'blur'}],
          consum_judge: [ {required: true, message: '请输入消费总金额', trigger: 'blur' }],*/
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
              userApi.freegrade_add(this.pageForm).then(res=>{
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
          path:'/member/page/freegrade',
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
