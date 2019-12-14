<template>
  <div>
    <el-form   :model="pageForm" label-width="80px"  :rules="pageFormRules" ref="pageForm">

      <el-form-item label="班级名" prop="className">
        <el-input v-model="pageForm.className" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="计划" prop="classPlan">
        <el-input v-model="pageForm.classPlan" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="计划人数" prop="classPlannedNumber">
        <el-input v-model="pageForm.classPlannedNumber"   auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="备注" prop="classOther">
        <el-input v-model="pageForm.classOther" auto-complete="off" ></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="go_back">返回</el-button>
      <el-button type="primary" @click.native="editSubmit" :loading="addLoading">提交</el-button>
    </div>
  </div>
</template>
<script>
    import * as classApi from '../api/classinformation'
  export default{
    data(){
      return {
          classHeadmasterList: [],
          pageForm: {
              className: '',
              classPlan: '',
              classHeadmaster: '',
              classHeadmaster:"",
              classOther: '',
          },
          //根据主键查询页面信息 的参数
          param:{
              classId:""
          },
          pageFormRules: {
              className: [
                  {required: true, message: '请输入姓名', trigger: 'blur'}
              ],
              classHeadmaster: [
                  {required: true, message: '请选择班主任', trigger: 'blur'}
              ],
          }
      }
    },
    methods:{

      go_back(){
        this.$router.push({
          path: '/classinformation/page/class_info'
        })
      },

        //进行修改
      editSubmit(){
        this.$refs.pageForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
                classApi.update_class(this.param.classId,this.pageForm).then((res) => {

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
        //查询班主任
        queryclassHeadmaster:function(){
            classApi.teacher_list(1,0,this.condition).then((res)=>{
                //将res结果数据赋值给模型对象
                this.classHeadmasterList = res.queryResult.list;
                console.log(this.classHeadmasterList)
            })
        },

    },
      created: function () {
          this.param.classId=this.$route.params.classId;
          //根据主键查询页面信息
          classApi.class_list(1,0,this.param).then((res) => {
              if(res){
                  console.log(res.queryResult.list[0])
                  this.pageForm = res.queryResult.list[0];
              }
          });
      },
      mounted(){
          //当dom元素全部渲染完成后,调用query
          this.queryclassHeadmaster();
      }
  }
</script>
<style>

</style>
