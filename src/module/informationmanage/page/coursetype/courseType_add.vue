<template>
  <!--编写页面静态部分，即view部分-->
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
      ​
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="addSubmit" >提交</el-button>
      <el-button type="primary" @click="go_back" >返回</el-button>
    </div>

  </div>

</template>
<script>
    import * as trainApi from '../../api/informationmanage'
  export default {
    data() {
        return {
            pageForm: {
                courseTypeName: '',
                courseTypeDescribe: '',
                courseTypeAdaptivePerson: '',
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
        //添加课程类型信息
        addSubmit(){
            this.$refs['pageForm'].validate((valid) => {
                if (valid) {  //表单校验成功
                    this.$confirm('你确认提交吗?', '提示', {}).then(() => {
                        //调用page_add方法请求服务端的新增页面接口
                        trainApi.add_courseType(this.pageForm).then(res=>{
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
        //返回
        go_back(){
            this.$router.push({
                path:'/informationmanage/page/courseType/list',
                query:{
                    page: this.$route.query.page, //取出路由中的参数
                    courseTypeName:this.$route.query.courseTypeName,
                }
            })
        },

    },
    mounted(){

    }
  }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
