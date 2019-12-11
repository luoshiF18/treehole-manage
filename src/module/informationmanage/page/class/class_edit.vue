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
        <el-input v-model="pageForm.classPlannedNumber" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="班主任" prop="classHeadmaster">
        <el-select v-model="pageForm.classHeadmaster" placeholder="请选择班主任">
          <el-option
            v-for="item in classHeadmasterList"
            :key="item.teacherId"
            :label="item.teacherName"
            :value="item.teacherId">
          </el-option>
        </el-select>
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
    import * as trainApi from '../../api/informationmanage'
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
          //查询班主任的参数
          condition: {
              teacherType: 2,
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
          path: '/informationmanage/page/class/list', query: {
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
              trainApi.update_class(this.param.classId,this.pageForm).then((res) => {

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
            trainApi.teacher_list(1,0,this.condition).then((res)=>{
                //将res结果数据赋值给模型对象
                this.classHeadmasterList = res.queryResult.list;
                console.log(this.classHeadmasterList)
            })
        },

    },
      created: function () {
          this.param.classId=this.$route.params.classId;
          //根据主键查询页面信息
          trainApi.class_list(1,1,this.param).then((res) => {
              if(res){
                  this.pageForm = res.queryResult.list[0];
              }
          });
      },
    mounted:function(){
        //查询班主任
        this.queryclassHeadmaster();
    }
  }
</script>
<style>

</style>
