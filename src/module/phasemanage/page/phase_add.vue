<template>
  <!--编写页面静态部分，即view部分-->
  <div>
    <el-form   :model="pageForm" label-width="80px"  :rules="pageFormRules" ref="pageForm">

      <el-form-item label="名称" prop="phaseName">
        <el-input v-model="pageForm.phaseName" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="学费" prop="phaseTuition">
        <el-input v-model="pageForm.phaseTuition" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="优惠金额" prop="phasePreferentialAmount">
        <el-input v-model="pageForm.phasePreferentialAmount" auto-complete="off" ></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="addSubmit" >提交</el-button>
      <el-button type="primary" @click="go_back" >返回</el-button>
    </div>

  </div>

</template>
<script>
    import * as trainApi from '../api/phase'
  export default {
    data() {
        return {
            pageForm: {
                phaseName: '',
                phaseTuition: '',
                phasePreferentialAmount: '',
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
        //添加课程信息
        addSubmit(){
            this.$refs['pageForm'].validate((valid) => {
                if (valid) {  //表单校验成功
                    this.$confirm('你确认提交吗?', '提示', {}).then(() => {
                        //调用page_add方法请求服务端的新增页面接口
                        trainApi.add_phase(this.pageForm).then(res=>{
                            //解析服务端的响应内容
                            if (res.success) {
                                this.$message.success('提交成功')
                                //将表单清空
                                this.$refs['pageForm'].resetFields();
                                //填写名称
                                this.find_phaseName();
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
        find_phaseName(){
            //填写名称
            trainApi.find_phaseName().then((res) => {
                this.pageForm.phaseName = res
            });
        },
        //返回
        go_back(){
            this.$router.push({
                path:'/phasemanage/page/phase_list',
                query:{
                    page: this.$route.query.page, //取出路由中的参数
                    phaseName:this.$route.query.phaseName,
                    phaseId:this.$route.query.phaseId,
                }
            })
        },
    },
      created: function () {
        //填写名称
        this.find_phaseName();
      },
    mounted(){

    }
  }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
