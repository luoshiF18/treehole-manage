<template>
  <div>
    <el-form   :model="agentForm" label-width="80px" :rules="pageFormRules" ref="pageForm" >


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
      <el-form-item label="性别">
        <el-radio-group v-model="agentForm.agent_sex">
          <el-radio class="radio" label="1">男</el-radio>
          <el-radio class="radio" label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker type="datetime" placeholder="创建时间" v-model="agentForm.create_time"></el-date-picker>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="go_back">返回</el-button>
      <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
    </div>
  </div>
</template>
<script>
  import * as agentApi from '../../api/onlinetalk'
  export default{
    data(){
      return {
        //模版列表
        templateList:[],
        addLoading: false,//加载效果标记
        //新增界面数据
        agentForm: {
          agent_name:'',
          create_time:new Date(),
          creater:'',
          agent_phone:'',
          agent_from:'',
          agent_sex:'',
        },
        pageFormRules: {
          siteId:[
            {required: true, message: '请选择站点', trigger: 'blur'}
          ],
          templateId:[
            {required: true, message: '请选择模版', trigger: 'blur'}
          ],
          pageName: [
            {required: true, message: '请输入页面名称', trigger: 'blur'}
          ],
          pageWebPath: [
            {required: true, message: '请输入访问路径', trigger: 'blur'}
          ],
          pagePhysicalPath: [
            {required: true, message: '请输入物理路径', trigger: 'blur'}
          ]
        },
        siteList:[],
        goback_params: {
          page: this.$route.query.page,
          siteId:this.$route.query.siteId,
        }
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
      addSubmit(){
        this.$refs.pageForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              agentApi.agent_add(this.agentForm).then((res) => {
                  console.log(res);
                if(res.success){
                  this.addLoading = false;
                  //NProgress.done();
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  this.$refs['agentForm'].resetFields();

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
