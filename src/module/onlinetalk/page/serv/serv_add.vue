<template>
  <div>
    <el-form  :model="servForm" label-width="80px"  ref="replyForm" >
      <el-form-item label="客服姓名" prop="agent_name">
        <el-input v-model="servForm.agent_name" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="用户姓名" prop="user_name">
        <el-input v-model="servForm.user_name" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="服务标题" prop="serv_title">
        <el-input v-model="servForm.serv_title" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="服务内容" prop="serv_content">
        <el-input v-model="servForm.serv_content" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="serv_time">
        <el-date-picker type="datetime" placeholder="创建时间" v-model="servForm.serv_time"></el-date-picker>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="go_back">返回</el-button>
      <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      <i style="margin-right: 500px"></i>
      <router-link tag="span" :to="{path:'/imServer'}">
        <el-button type="primary">返回至工作台</el-button>
      </router-link>
    </div>
  </div>
</template>
<script>
  import * as servApi from '../../api/onlinetalk'
  export default{
    data(){
      return {
        //模版列表
        templateList:[],
        addLoading: false,//加载效果标记
        //新增界面数据
        servForm: {
          serv_id:'',
          agent_id:'', //客服id
          agent_name:'', //客服姓名
          user_id:'',//用户id
          user_name:'',//用户姓名
          serv_title:'', //服务标题
          serv_content:'', //服务内容
          serv_time:new Date(),

        },

      }
    },
    methods:{
      go_back(){
        this.$router.push({
          path: '/serv/list', query: {
            page: this.$route.query.page,
          }
        })
      },
      addSubmit(){
        this.$refs.replyForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              servApi.serv_add(this.servForm).then((res) => {
                  console.log(res);
                if(res.success){
                  this.addLoading = false;
                  //NProgress.done();
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  this.$refs['replyForm'].resetFields();

                }else if(res.message){
                  this.addLoading = false;
                  this.$message.error(res.message);
                }else{
                  this.addLoading = false;
                  this.$message.error('提交失败');
                }
              });
            });
          }
        });
      }
    },
    created: function () {

    },
    mounted:function(){



    }
  }
</script>
<style>

</style>
