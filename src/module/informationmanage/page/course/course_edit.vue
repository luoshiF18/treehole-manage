<template>
  <div>
    <el-form   :model="pageForm" label-width="80px"  :rules="pageFormRules" ref="pageForm">

      <el-form-item label="课程名" prop="courseName">
        <el-input v-model="pageForm.courseName" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="描述" prop="courseDescribe">
        <el-input v-model="pageForm.courseDescribe" auto-complete="off" ></el-input>
      </el-form-item>


      <el-form-item label="类型" prop="courseType">
        <el-select v-model="pageForm.courseType" placeholder="请选择类型">
          <el-option
            v-for="item in courseTypeList"
            :key="item.courseTypeId"
            :label="item.courseTypeName"
            :value="item.courseTypeId">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="开课时间">
        <el-date-picker type="date" placeholder="开课时间" v-model="pageForm.courseBeginTime"></el-date-picker>
      </el-form-item>

      <el-form-item label="结课时间">
        <el-date-picker type="date" placeholder="结课时间" v-model="pageForm.courseEndTime"></el-date-picker>
      </el-form-item>

      <el-form-item label="课时" prop="courseTime">
        <el-input v-model="pageForm.courseTime" auto-complete="off" ></el-input>
      </el-form-item>


      <el-form-item label="任课老师" prop="courseTeacher">
        <el-select v-model="pageForm.courseTeacher" placeholder="请选择类型">
          <el-option
            v-for="item in courseTeacherList"
            :key="item.teacherId"
            :label="item.teacherName"
            :value="item.teacherId">
          </el-option>
        </el-select>
      </el-form-item>
      ​
      <el-form-item label="价格" prop="coursePrice">
        <el-input v-model="pageForm.coursePrice" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="备注" prop="courseOther">
        <el-input v-model="pageForm.courseOther" auto-complete="off" ></el-input>
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
          addLoading: false,//加载效果标记
          courseTypeList:[],
          courseTeacherList:[],
          pageForm: {
              courseId:"",
              courseName: '',
              courseDescribe: '',
              courseType: '',
              courseBeginTime: '',
              courseEndTime: '',
              courseTime: '',
              courseTeacher: '',
              coursePrice:'',
              courseOther: '',
          },
          //根据主键查询页面信息 的参数
          param:{
              courseId:""
          },
          //查询老师的参数
          condition:{
              teacherType: 1,
          },
          pageFormRules: {
              courseName: [
                  {required: true, message: '请输入课程名', trigger: 'blur'}
              ],
              courseType:[
                  {required: true, message: '请选择课程类型', trigger: 'blur'}
              ],
              courseBeginTime:[
                  {required: true, message: '请选择开课时间', trigger: 'blur'}
              ],
              courseEndTime:[
                  {required: true, message: '请选择结课时间', trigger: 'blur'}
              ],
              courseTime:[
                  {required: true, message: '请输入课时', trigger: 'blur'}
              ],
              courseTeacher:[
                  {required: true, message: '请输入任课老师', trigger: 'blur'}
              ],
              coursePrice:[
                  {required: true, message: '请输入价格', trigger: 'blur'}
              ],
          }
      }
    },
    methods:{
      go_back(){
        this.$router.push({
          path: '/informationmanage/page/course/list', query: {
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
              trainApi.update_course(this.param.courseId,this.pageForm).then((res) => {
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
        //查询课程类型
        queryCourseType:function(){
            trainApi.courseType_list(1,0,).then((res)=>{
                //将res结果数据赋值给模型对象
                this.courseTypeList = res.queryResult.list;
            })
        },
        //查询老师
        queryCourseTeacher:function(){
            trainApi.teacher_list(1,0,this.condition).then((res)=>{
                //将res结果数据赋值给模型对象
                this.courseTeacherList = res.queryResult.list;
            })
        },

    },
      created: function () {
          this.param.courseId=this.$route.params.courseId;
          //根据主键查询页面信息
          trainApi.course_list(1,1,this.param).then((res) => {
              if(res){
                  this.pageForm = res.queryResult.list[0];
              }
          });
      },
    mounted:function(){
        //查询类型
        this.queryCourseType();
        //查询老师
        this.queryCourseTeacher();
    }
  }
</script>
<style>

</style>
