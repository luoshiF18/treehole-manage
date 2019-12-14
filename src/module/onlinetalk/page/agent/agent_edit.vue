<template>
  <div>
    <el-form   :model="agentForm" label-width="80px"  ref="agentForm" >
      <el-form-item label="客服姓名" prop="agent_name">
        <el-input v-model="agentForm.agent_name" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="创建人" prop="creater">
        <el-input v-model="agentForm.creater" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="agent_phone">
        <el-input v-model="agentForm.agent_phone" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="地址" prop="agent_from">
        <el-input v-model="agentForm.agent_from" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="agent_sex">
        <el-radio-group v-model="agentForm.agent_sex">
          <el-radio class="radio" label="1">男</el-radio>
          <el-radio class="radio" label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="密码" prop="agent_password">
        <el-input v-model="agentForm.agent_password" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="create_time">
        <el-date-picker type="datetime" placeholder="创建时间" v-model="agentForm.create_time"></el-date-picker>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="go_back">返回</el-button>
      <el-button type="primary" @click.native="editSubmit" :loading="addLoading">提交</el-button>
    </div>
  </div>
</template>
<script>
  import * as agentApi from '../../api/onlinetalk'
  export default{
    data(){
      return {
        agentId:'',

        addLoading: false,//加载效果标记
        //新增界面数据
        agentForm: {
          agent_name:'',
          create_time:new Date(),
          creater:'',
          agent_phone:'',
          agent_from:'',
          agent_sex:'',
          agent_password:''
        },

      }
    },
    methods:{
      go_back(){
        this.$router.push({
          path: '/agent/list', query: {
            page: this.$route.query.page,
          }
        })
      },
      editSubmit(){
        this.$refs.agentForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              agentApi.agent_edit(this.agentForm).then((res) => {
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
                  this.$message.error('提交失败');
                }
              });
            });
          }
        });
      }
    },
    created: function () {
      this.agentId=this.$route.params.agentId;
      //根据主键查询页面信息
      agentApi.agent_get(this.agentId).then((res) => {
        console.log(res);
        if(res){
          this.agentForm = res;
        }
      });
    },
    mounted:function(){



    }
  }
</script>
<style>

</style>
