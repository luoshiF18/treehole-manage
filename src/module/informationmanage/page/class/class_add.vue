<template>
  <!--编写页面静态部分，即view部分-->
  <div>
    <el-form   :model="pageForm" label-width="80px"  :rules="pageFormRules" ref="pageForm">

      <el-form-item label="班级名" prop="className">
        <el-input v-model="pageForm.className" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="期数" prop="studentPhase">
        <el-select v-model="pageForm.classPhase" placeholder="请选择班级">
          <el-option
            v-for="item in phaseList"
            :key="item.phaseId"
            :label="item.phaseName"
            :value="item.phaseId">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="计划" prop="classPlan">
        <el-input v-model="pageForm.classPlan" auto-complete="off" ></el-input>
      </el-form-item>
      ​
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
            phaseList:[],
            classHeadmasterList:[],
            pageForm: {
                className: '',
                classPlan: '',
                classHeadmaster: '',
                classPlannedNumber:"",
                classOther: '',
                phaseList:"",
            },
            //查询班主任的参数
            condition:{
                teacherType: 2,
            },
            pageFormRules: {
                className: [
                    {required: true, message: '请输入姓名', trigger: 'blur'}
                ],
                classHeadmaster:[
                    {required: true, message: '请选择班主任', trigger: 'blur'}
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
                        trainApi.add_class(this.pageForm).then(res=>{
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
                path:'/informationmanage/page/class/list',
                query:{
                    page: this.$route.query.page, //取出路由中的参数
                    className:this.$route.query.className,
                }
            })
        },
        //查询期数
        queryPhase:function(){
            trainApi.student_Phase().then((res)=>{
                this.phaseList = res.queryResult.list;
                this.pageForm.studentPhase = res.queryResult.list[(res.queryResult.total)-1].phaseId;
            })
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
    mounted(){
        //查询班主任
        this.queryclassHeadmaster();
        //查询期数
        this.queryPhase();
    }
  }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
