<template>
  <!--编写页面静态部分，即view部分-->
  <div>
    <el-form   :model="pageForm" label-width="100px"  :rules="pageFormRules" ref="pageForm">

      <div @mouseleave="findInfo">
        <el-form-item label="请假人Id" prop="leavePeopleId">
          <el-input v-model="pageForm.leavePeopleId" auto-complete="off" ></el-input>
        </el-form-item>
      </div>

      <el-form-item label="请假人类型" prop="leavePeopleType">
        <el-select v-model="pageForm.leavePeopleType" placeholder="请选择类型">
          <el-option
            v-for="item in leavePeopleTypeList"
            :key="item.leavePeopleTypeId"
            :label="item.leavePeopleTypeName"
            :value="item.leavePeopleTypeId">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="请假人姓名" prop="leavePeopleName">
        <el-input v-model="pageForm.leavePeopleName" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="开始时间">
        <el-date-picker type="date" placeholder="开课时间" v-model="pageForm.leaveStartTime"></el-date-picker>
      </el-form-item>

      <el-form-item label="结束时间">
        <el-date-picker type="date" placeholder="结课时间" v-model="pageForm.leaveEndTime"></el-date-picker>
      </el-form-item>

      <el-form-item label="理由" prop="leaveOther">
        <el-input v-model="pageForm.leaveOther" auto-complete="off" ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="addSubmit" >提交</el-button>
    </div>

  </div>

</template>
<script>
    import * as teacherApi from '../api/leave'
  export default {
    data() {
        return {
            leavePeopleTypeList:[
                {
                    leavePeopleTypeId:1,
                    leavePeopleTypeName:'学生'
                },
                {
                    leavePeopleTypeId:2,
                    leavePeopleTypeName:'老师'
                },
            ],
            pageForm: {
                leavePeopleType: '',
                leavePeopleId: '',
                leavePeopleName: '',
                leaveStartTime: '',
                leaveEndTime: '',
                leaveOther: '',
            },
            //查询老师的参数
            condition:{
                teacherType: 1,
            },
            pageFormRules: {
                leavePeopleType: [
                    {required: true, message: '请选择请假人类型', trigger: 'blur'}
                ],
                leavePeopleId:[
                    {required: true, message: '请输入请假人Id', trigger: 'blur'}
                ],
                leavePeopleName:[
                    {required: true, message: '请输入请假人姓名', trigger: 'blur'}
                ],
                leaveStartTime:[
                    {required: true, message: '请输入请假开始时间', trigger: 'blur'}
                ],
                leaveEndTime:[
                    {required: true, message: '请输入请假结束时间', trigger: 'blur'}
                ],
                leaveOther:[
                    {required: true, message: '请输入请假理由', trigger: 'blur'}
                ],
            }
        }
    },
    methods:{
        //请假
        addSubmit(){
            this.$refs['pageForm'].validate((valid) => {
                if (valid) {  //表单校验成功
                    this.$confirm('你确认提交吗?', '提示', {}).then(() => {
                        //调用page_add方法请求服务端的新增页面接口
                        teacherApi.add_leave(this.pageForm).then(res=>{
                            //解析服务端的响应内容
                            if (res.success) {
                                this.$message.success('提交成功')
                                //将表单清空
                                this.$refs['pageForm'].resetFields();
                                //清空时间
                                this.pageForm.leaveStartTime = null;
                                this.pageForm.leaveEndTime = null;
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
        findInfo(){
            teacherApi.findInfo( this.pageForm.leavePeopleId).then(res=>{
                 this.pageForm.leavePeopleType  = res.leavePeopleType
                 this.pageForm.leavePeopleName = res.leavePeopleName
            })
        }

    },
    mounted(){


    }
  }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
