<template>
  <div>
    <el-form   :model="pageForm" label-width="80px"  :rules="pageFormRules" ref="pageForm">

      <el-form-item label="类型名" prop="courseTypeName">
        <el-input v-model="pageForm.courseTypeName" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="描述" prop="courseTypeDescribe">
        <el-input v-model="pageForm.courseTypeDescribe" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="适应人群" prop="courseTypeAdaptivePerson">
        <el-input v-model="pageForm.courseTypeAdaptivePerson" auto-complete="off" ></el-input>
      </el-form-item>

    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="go_back">返回</el-button>
      <el-button type="primary" @click.native="editSubmit" :loading="addLoading">提交</el-button>
    </div>
  </div>
</template>
<script>
    import * as trainApi from '../../api/informationmanage'
  export default{
    data(){
      return {
          pageForm: {
              courseTypeName: '',
              courseTypeDescribe: '',
              courseTypeAdaptivePerson: '',
          },
          //根据主键查询页面信息 的参数
          param:{
              courseTypeId:""
          },
          pageFormRules: {
              courseTypeName: [
                  {required: true, message: '请输入类型名', trigger: 'blur'}
              ],
              courseTypeDescribe:[
                  {required: true, message: '请选择描述信息', trigger: 'blur'}
              ],
              courseTypeAdaptivePerson:[
                  {required: true, message: '请选择适应人群', trigger: 'blur'}
              ],
          }
      }
    },
    methods:{
      go_back(){
        this.$router.push({
          path: '/informationmanage/page/courseType/list', query: {
                //page: this.$route.params.page,
          }
        })
      },
        //进行修改
      editSubmit(){
        this.$refs.pageForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              trainApi.update_courseType(this.param.courseTypeId,this.pageForm).then((res) => {

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
            })
          }
        });
      },

    },
      created: function () {
          this.param.courseTypeId=this.$route.params.courseTypeId;
          //根据主键查询页面信息
          trainApi.courseType_list(1,1,this.param).then((res) => {
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
