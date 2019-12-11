<template>
  <div>
    <el-form   :model="pageForm" label-width="80px"  :rules="pageFormRules" ref="pageForm">

      <el-form-item label="名称" prop="phaseName" >
        <el-input v-model="pageForm.phaseName" auto-complete="off" readonly=“readonly”></el-input>
      </el-form-item>

      <el-form-item label="学费" prop="phaseTuition" >
        <el-input v-model="pageForm.phaseTuition" auto-complete="off"  readonly=“readonly”></el-input>
      </el-form-item>

      <el-form-item label="优惠金额" prop="phasePreferentialAmount">
        <el-input v-model="pageForm.phasePreferentialAmount" auto-complete="off" ></el-input>
       </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="go_back">返回</el-button>
      <el-button type="primary" @click.native="editSubmit" :loading="addLoading">提交</el-button>
    </div>

  </div>
</template>
<script>
    import * as trainApi from '../api/phase'
  export default{
    data(){
      return {
          addLoading: false,//加载效果标记
          pageForm: {
              phaseName: '',
              phaseTuition: '',
              phasePreferentialAmount: '',
          },
          //根据主键查询页面信息 的参数
          param: {
              phaseId:"",
          },

          pageFormRules: {

              phaseName: [
                  {required: true, message: '请输入名称', trigger: 'blur'}
              ],
              phaseTuition: [
                  {required: true, message: '请输入学费', trigger: 'blur'}
              ],
          }
      }
    },

    methods:{
      go_back(){
        this.$router.push({
          path: '/phasemanage/page/phase_list', query: {
          }
        })
      },
        //进行修改
      editSubmit(){
        this.$refs.pageForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              trainApi.update_phase(this.param.phaseId,this.pageForm).then((res) => {
                if(res.success){
                  this.addLoading = false;
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                }else{
                  this.addLoading = false;
                  this.$message.error('提交失败');
                }
              });
            })
          }
        });
      },


    },
      created: function () {
          this.param.phaseId=this.$route.params.phaseId;
          //根据主键查询页面信息
          trainApi.find_phase(1,1,this.param).then((res) => {
              if(res){
                  this.pageForm = res.queryResult.list[0];
              }
          });
      },
    mounted:function(){

    }
  }
</script>
<style>

</style>
