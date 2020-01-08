<template>
  <div>
    <el-form   :model="roleForm" label-width="80px" :rules="pageFormRules" ref="pageForm" >


      <el-form-item label="角色名称" prop="role_name">
        <el-input v-model="roleForm.role_name" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="description">
        <el-input v-model="roleForm.description" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="创建时间">
        <el-date-picker type="datetime" placeholder="创建时间" v-model="roleForm.create_time"></el-date-picker>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="go_back">返回</el-button>
      <el-button type="primary" @click.native="editSubmit" :loading="addLoading">提交</el-button>
    </div>
  </div>
</template>
<script>
  import * as Api from '../../api/member'
  export default{
    data(){
      return {
        //模版列表
        templateList:[],
        addLoading: false,//加载效果标记
        //新增界面数据
        roleForm: {
          role_id:'',
          role_name:'',
          role_code:'',
          description:'',
          create_time:new Date(),
          status:0,
        },
        goback_params: {
          page: this.$route.query.page,
          //siteId:this.$route.query.siteId,
        }
      }
    },
    methods:{
      go_back(){
        this.$router.push({
          path: '/member/page/role/List', query: {
            page: this.$route.query.page,
          }
        })
      },
     editSubmit(){
        this.$refs.pageForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              Api.role_edit(this.roleForm).then((res) => {
                  console.log(res);
                if(res.success){
                  this.addLoading = false;
                  //NProgress.done();
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  //this.$refs['agentForm'].resetFields();

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
      this.roleForm.role_id=this.$route.params.id;
      //根据主键查询页面信息
      Api.findRoleById(this.roleForm.role_id).then((res) => {
        console.log(res);
       // if(res){
          this.roleForm = res;
       // }
      });
    },
    mounted:function(){



    }
  }
</script>
<style>

</style>
