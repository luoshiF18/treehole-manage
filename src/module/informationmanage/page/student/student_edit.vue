<template>
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

      <el-form-item label="职务" prop="studentType">
        <el-select v-model="pageForm.studentType" placeholder="请选择职务">
          <el-option
            v-for="item in typeList"
            :key="item.typeId"
            :label="item.typeName"
            :value="item.typeId">
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
        //模版列表
        templateList:[],
        addLoading: false,//加载效果标记
          typeList:[
              {
                  typeId:1,
                  typeName:"学员"
              },
              {
                  typeId:2,
                  typeName:"组长"
              },
              {
                  typeId:3,
                  typeName:"班长"
              },
          ],
          classList: [],//班级列表
        //新增界面数据
          pageForm: {
              studentName:'',
              studentGender:'',
              studentBirthDate:'',
              studentClass:"",
              studentType:"",
              studentTelephone:'',
              studentAddress:'',
              studentEnrollmentTime: new Date(),
              studentOther:"",
          },
          //判断班级人数是否满的参数
          par:{
              classId:"",
          },
          //根据主键查询页面信息 参数
          param:{
            //参数Id
              studentId:"",
          },
          pageFormRules: {

              studentName: [
                  {required: true, message: '请输入姓名', trigger: 'blur'}
              ],
              studentClass:[
                  {required: true, message: '请选择班级', trigger: 'blur'}
              ],
              studentState:[
                  {required: true, message: '请选择状态', trigger: 'blur'}
              ],
              studentTelephone:[
                  {required: true, message: '请输入电话', trigger: 'blur'}
              ],
              studentAddress: [
                  {required: true, message: '请输入地址', trigger: 'blur'}
              ]
          },
      }
    },
    methods:{
      go_back(){
        this.$router.push({
          path: '/informationmanage/page/student/list', query: {
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
              console.log(123);
              console.log(this.pageForm);
              trainApi.update_student(this.param.studentId,this.pageForm).then((res) => {
                  console.log(res);
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
        //查询班级
        queryClass:function(){
            trainApi.class_list(1,0).then((res)=>{
                //将res结果数据赋值给模型对象
                this.classList = res.queryResult.list;
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
    created: function () {
      this.param.studentId=this.$route.params.studentId;
      //根据主键查询页面信息
      trainApi.student_list(1,1,this.param).then((res) => {

        if(res){
            console.log(res.queryResult.list[0])
           this.pageForm = res.queryResult.list[0];
            this.pageForm.studentGender=(res.queryResult.list[0].studentGender)+"";
        }
      });
    },
    mounted:function(){
        //初始化班级
        this.queryClass();

    }
  }
</script>
<style>

</style>
