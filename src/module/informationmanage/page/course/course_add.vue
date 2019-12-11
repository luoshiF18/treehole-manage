<template>
  <!--编写页面静态部分，即view部分-->
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


      <el-form-item label="课时" prop="courseTime">
        <el-input v-model="pageForm.courseTime" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="价格" prop="coursePrice">
        <el-input v-model="pageForm.coursePrice" auto-complete="off" ></el-input>
      </el-form-item>

      ​
      <el-form-item label="备注" prop="courseOther">
        <el-input v-model="pageForm.courseOther" auto-complete="off" ></el-input>
      </el-form-item>
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
            courseTypeList:[],
            courseTeacherList:[],
            pageForm: {
                courseName: '',
                courseDescribe: '',
                courseType: '',
                courseBeginTime: '',
                courseEndTime: '',
                courseTime: '',
                courseTeacher: '',
                coursePrice:"",
                courseOther: '',
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
                {required: true, message: '请输入课程价格', trigger: 'blur'}
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
                        trainApi.add_course(this.pageForm).then(res=>{
                            //解析服务端的响应内容
                            if (res.success) {
                                this.$message.success('提交成功')
                                //将表单清空
                                this.$refs['pageForm'].resetFields();
                                //清空时间
                                this.pageForm.courseBeginTime = null;
                                this.pageForm.courseEndTime = null;

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
                path:'/informationmanage/page/course/list',
                query:{
                    page: this.$route.query.page, //取出路由中的参数
                    courseName:this.$route.query.courseName,
                    courseType:this.$route.query.courseType,
                    courseTeacher:this.$route.query.courseTeacher,
                }
            })
        },
        //查询课程类型
        queryCourseType:function(){
            trainApi.courseType_list(1,0,).then((res)=>{
                //将res结果数据赋值给模型对象
                this.courseTypeList = res.queryResult.list;
            })
        },


    },
    mounted(){
        //查询类型
        this.queryCourseType();

    }
  }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
