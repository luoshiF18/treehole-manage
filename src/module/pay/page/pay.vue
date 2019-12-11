<template>
  <!--编写页面静态部分，即view部分-->
  <div>
    <el-form   :model="pageForm" label-width="80px"  :rules="pageFormRules" ref="pageForm">

      <div @mouseleave="findTuition">
      <el-form-item label="学生Id" prop="costStudentId"  >
        <el-input v-model="pageForm.costStudentId" auto-complete="off"   ></el-input>
      </el-form-item>
      </div>

      <el-form-item label="姓名" prop="costStudentName">
        <el-input v-model="pageForm.costStudentName" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="应付金额" prop="costAmountPayable">
        <el-input v-model="pageForm.costAmountPayable" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="优惠金额" prop="costPreferentialAmount">
        <el-input v-model="pageForm.costPreferentialAmount" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="实收金额" prop="costAmountReceived">
        <el-input v-model="pageForm.costAmountReceived" auto-complete="off" ></el-input>
      </el-form-item>


      <el-form-item label="备注" prop="costOther">
        <el-input v-model="pageForm.costOther" auto-complete="off" ></el-input>
      </el-form-item>
      ​
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="addSubmit" >提交</el-button>
    </div>

  </div>

</template>
<script>
    import * as trainApi from '../api/pay'
  export default {
    data() {
        return {
            classHeadmasterList:[],
            pageForm: {
                costStudentId: '',
                costStudentName: '',
                costAmountPayable: '',
                costPreferentialAmount: '',
                costAmountReceived: '',
                costTime:"",
                costOther:"",
            },
            pageFormRules: {
                costStudentId: [
                    {required: true, message: '请输入学生Id', trigger: 'blur'}
                ],

                costAmountPayable:[
                    {required: true, message: '请输入应付金额', trigger: 'blur'}
                ],
                costPreferentialAmount:[
                    {required: true, message: '请输入优惠金额', trigger: 'blur'}
                ],
                costAmountReceived:[
                    {required: true, message: '请输入实收金额', trigger: 'blur'}
                ],
                costTime:[
                    {required: true, message: '请选择交费时间', trigger: 'blur'}
                ],
            }
        }
    },
    methods:{
        //添加学生信息
        addSubmit(){
            this.$refs['pageForm'].validate((valid) => {
                if (valid) {  //表单校验成功
                    this.$confirm('你确认提交吗?', '提示', {}).then(() => {
                        //调用page_add方法请求服务端的新增页面接口
                        trainApi.add_cost(this.pageForm).then(res=>{
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
        //查询应付金额
        findTuition(){
            trainApi.findTuition( this.pageForm.costStudentId).then(res=>{
                this.pageForm.costStudentName = res.costStudentName
                //应付金额                         欠费金额
                this.pageForm.costAmountPayable = res.costArrears
                //优惠金额
                this.pageForm.costPreferentialAmount = res.costPreferentialAmount
            })
        },
    },
    mounted(){
        //查询应付金额
      //  this.findTuition();
    }
  }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
