<template>
  <div>
    <!--查询表单-->
    <el-form :model="params">
      Id:<el-input v-model="params.condition.courseId"  style="width: 100px"></el-input>
      课程名:<el-input v-model="params.condition.courseName"  style="width: 100px"></el-input>

      类型:<el-select v-model="params.condition.courseType" placeholder="请选择类型">
      <el-option value="">请选择类型</el-option>
      <el-option
        v-for="item in courseTypeList"
        :key="item.courseTypeId"
        :label="item.courseTypeName"
        :value="item.courseTypeId">
        <!-- value值是用于提交的,label值是用于显示的 -->
      </el-option>
    </el-select>

      老师:<el-select v-model="params.condition.courseTeacher" placeholder="请选择老师">
      <el-option value="">请选择老师</el-option>
      <el-option
        v-for="item in courseTeacherList"
        :key="item.teacherId"
        :label="item.teacherName"
        :value="item.teacherId">
        <!-- value值是用于提交的,label值是用于显示的 -->
      </el-option>
    </el-select>

      <el-button type="primary" size="small" v-on:click="query(1)">查询</el-button>
    </el-form>


  <el-table
    ref="multipleTable"
    :data="list"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>

    <el-table-column
      prop="courseId"
      label="Id"
      width="120">
    </el-table-column>

    <el-table-column
      prop="courseName"
      label="课程名"
      width="120">
    </el-table-column>

    <el-table-column
      prop="courseDescribe"
      label="描述"
      show-overflow-tooltip>
    </el-table-column>

    <el-table-column
      prop="courseTypeName"
      label="类型"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="courseBeginTime"
      label="开课时间"
      :formatter="dateFormat"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="courseEndTime"
      label="结课时间"
      :formatter="dateFormat"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="courseTime"
      label="课时"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="teacherName"
      label="任课老师"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="courseOther"
      label="备注"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>

    <div style="margin-top: 20px">
    <el-button type="primary" size="small" @click="go_back" >返回</el-button>
    <el-button @click="submission()"  type="primary" size="small">提交课程</el-button>
  </div>

  </div>
</template>

<script>
    import * as trainApi from '../api/courseselectionmanage'
    import moment from 'moment'
    export default {
        data() {
            return {
                list: [],
                courseTypeList: [],
                courseTeacherList:[],
                total: 0,
                multipleSelection: [],
                params: {  //这里和上面的查询表单做了双向绑定
                    page: 1,
                    size: 5,
                    condition:{
                        courseName:"",
                        courseType:"",
                        courseTeacher:"",
                        courseId:"",
                    },
                },
                //选课的参数
                par:{
                    courseList:[],
                },
                //提交选课需要的参数
                param:{
                    classId:""
                },
            }
        },

        methods: {

            //提交
            submission(){
                this.par.courseList = this.$refs.multipleTable.selection;
                this.$confirm('你确认提交吗?', '提示', {}).then(() => {
                         trainApi.add_classCourse(this.param.classId,this.par).then(res=>{
                             if (res.success) {
                                    this.$message.success('提交成功')
                                 //查询一遍
                                 this.query();
                            }else{
                                this.$message.error('提交失败')
                            }

                         })
                })

            },
            //查询课程信息
            query: function (par) {
                //如果是查询的时候 从第一页开始显示
                if(par == 1){
                    this.params.page = 1;
                }
                this.param.classId=this.$route.params.classId;
                //调用服务端的接口
                trainApi.selectCourse_list(this.params.page,this.params.size,this.param.classId,this.params.condition).then((res) => {
                    //将res结果数据赋值给数据模型对象
                    this.list = res.queryResult.list;
                    this.total = res.queryResult.total;
                })
            },
            //分页
            changePage: function (currentPage){
                this.params.page = currentPage;
                //调用query方法
                this.query();
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
                trainApi.teacher_list(1,0,this.condition).then((res) => {
                    //将res结果数据赋值给数据模型对象
                    this.courseTeacherList = res.queryResult.list;
                })
            },
            //返回
            go_back(){
                this.$router.push({
                    path:'/courseselectionmanage/page/class_list',
                    query:{

                    }
                })
            },
            //时间格式化  
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");
            }
        },
        created(){

        },
        mounted(){
            //当dom元素全部渲染完成后,调用query
            this.query();
            //查询课程类型
            this.queryCourseType();
            //查询老师
            this.queryCourseTeacher();
        }
    }
</script>
