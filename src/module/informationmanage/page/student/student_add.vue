<template>
  <!--编写页面静态部分，即view部分-->
  <div>
    <el-form   :model="pageForm" label-width="80px"  :rules="pageFormRules" ref="pageForm">

      <el-form-item label="姓名" prop="studentName">
        <el-input v-model="pageForm.studentName" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="性别">
        <el-radio-group v-model="pageForm.studentGender">
         <el-radio class="radio" label="1">男</el-radio>
         <el-radio class="radio" label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>


      <el-form-item label="期数" prop="studentPhase">
        <el-select v-model="pageForm.studentPhase" placeholder="请选择班级">
          <el-option
            v-for="item in phaseList"
            :key="item.phaseId"
            :label="item.phaseName"
            :value="item.phaseId">
          </el-option>
        </el-select>
        <el-button  type="primary" size="small" @click="findCorrespondingClass">查询对应的班级</el-button>
      </el-form-item>

      <el-form-item label="出生日期">
        <el-date-picker type="date" placeholder="出生日期" v-model="pageForm.studentBirthDate"></el-date-picker>
      </el-form-item>
      ​

      <el-form-item label="所属班级" prop="studentClass">
        <el-select v-model="pageForm.studentClass" placeholder="请选择班级" @change="findNumber()">
          <el-option
            v-for="item in classList"
            :key="item.classId"
            :label="item.className"
            :value="item.classId">
          </el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="电话" prop="studentTelephone">
          <el-input v-model="pageForm.studentTelephone" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="地址" prop="studentAddress">
        <el-input v-model="pageForm.studentAddress" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="备注" prop="studentOther">
        <el-input v-model="pageForm.studentOther" auto-complete="off" ></el-input>
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
            classList: [],//班级列表
            phaseList:[],//期数列表
            pageForm: {
                studentName: '',
                studentGender: '',
                studentBirthDate: '',
                studentClass:"",
                studentTelephone: '',
                studentAddress: '',
                studentOther:"",
                studentPhase:'',
            },
            //判断班级人数是否满的参数
            par:{
                classId:"",
            },
          //查询对应班级的参数
          query_class:{
            classPhase:'',
          },
            pageFormRules: {

                studentName: [
                    {required: true, message: '请输入姓名', trigger: 'blur'}
                ],
                studentClass:[
                    {required: true, message: '请选择班级', trigger: 'blur'}
                ],
                studentTelephone:[
                    {validator: this.checkPhone,required: true,  trigger: 'blur'}
                ],
                studentAddress: [
                    {required: true, message: '请输入地址', trigger: 'blur'}
                ]
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
                        trainApi.add_student(this.pageForm).then(res=>{
                            //解析服务端的响应内容
                            if (res.success) {
                                this.$message.success('提交成功')
                                //将表单清空
                                this.$refs['pageForm'].resetFields();
                                //清空单项选择
                                this.pageForm.studentGender = 6;
                                //清空时间
                                this.pageForm.studentBirthDate = null;
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
      //校验手机号
      checkPhone(rule, value, callback) {
        if (!value) {
          callback(new Error('请输入手机号'))
        } else {
          const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/
          console.log(reg.test(value))
          if (reg.test(value)) {
            callback()
          } else {
            return callback(new Error('请输入正确的手机号'))
          }
        }
      },
        //返回
        go_back(){
            this.$router.push({
                path:'/informationmanage/page/student/list',
                query:{
                    page: this.$route.query.page, //取出路由中的参数
                    studentName:this.$route.query.studentName,
                    studentGender:this.$route.query.studentGender,
                    studentClass:this.$route.query.studentClass,
                    studentState:this.$route.query.studentState,
                }
            })
        },
        //查询班级
      findCorrespondingClass:function(){
            this.query_class.classPhase = this.pageForm.studentPhase;
            trainApi.class_list(1,0,this.query_class).then((res)=>{
                //将res结果数据赋值给模型对象
                this.classList = res.queryResult.list;
            })
            this.pageForm.studentClass = null;
        },
        //查询期数
        queryPhase:function(){
            trainApi.student_Phase().then((res)=>{
                this.phaseList = res.queryResult.list;
                this.pageForm.studentPhase = res.queryResult.list[(res.queryResult.total)-1].phaseId;
            })
        },
        //判断班级人数是否满
        findNumber(){
            this.par.classId = this.pageForm.studentClass
            trainApi.class_list(1,0,this.par).then((res)=>{
                //将res结果数据赋值给模型对象
                console.log(res.queryResult.list[0])
               var num = res.queryResult.list[0].classNumber;
               var planNum = res.queryResult.list[0].classPlannedNumber;
                if(num >= planNum){
                    alert("此班级人已经满")
                }
            })
        }
    },
    mounted(){

        //查询期数
        this.queryPhase();
    }
  }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
