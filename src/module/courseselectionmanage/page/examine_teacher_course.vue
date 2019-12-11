<template>
  <div>
    <!--查询表单-->
    <el-form :model="params">
      期数:<el-select v-model="params.condition.phaseId" placeholder="请选择期数" style="width: 100px">
      <el-option value="">请选择期数</el-option>
      <el-option
        v-for="item in phaseList"
        :key="item.phaseId"
        :label="item.phaseName"
        :value="item.phaseId">
        <!-- value值是用于提交的,label值是用于显示的 -->
      </el-option>
    </el-select>

      班级名:<el-input v-model="params.condition.className"  style="width: 100px"></el-input>
      课程名:<el-input v-model="params.condition.courseName"  style="width: 100px"></el-input>

      类型:<el-select v-model="params.condition.courseTypeId" placeholder="请选择类型">
      <el-option value="">请选择类型</el-option>
      <el-option
        v-for="item in courseTypeList"
        :key="item.courseTypeId"
        :label="item.courseTypeName"
        :value="item.courseTypeId">
        <!-- value值是用于提交的,label值是用于显示的 -->
      </el-option>
    </el-select>

      <el-button type="primary" size="small" v-on:click="query(1)">查询</el-button>
    </el-form>


    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column v-if="false" prop="teacherCourseId" label="id" width="120">
      </el-table-column >
      <el-table-column  prop="phaseName" label="期数" width="120">
      </el-table-column>
      <el-table-column prop="className" label="班级" width="120">
      </el-table-column>
      <el-table-column prop="classNumber" label="班级人数" width="180">
      </el-table-column>
      <el-table-column prop="classCourseNumber" label="课程数" width="250" >
      </el-table-column>
      <el-table-column prop="classHeadmasterName" label="班主任" width="250" >
      </el-table-column>
      <el-table-column prop="courseTypeName" label="课程类型" width="250" >
      </el-table-column>
      <el-table-column prop="courseName" label="课程名" width="250">
      </el-table-column>
      <el-table-column prop="courseDescribe" label="课程描述" width="250">
      </el-table-column>
      <el-table-column prop="courseTime" label="课时" width="250">
      </el-table-column>
      <el-table-column prop="teacherName" label="选课老师" width="250">
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="page">
          <el-button
            size="small"type="text"
            @click="pass(page.row.teacherCourseId)">通过
          </el-button>

          <el-button
            size="small"type="text"
            @click="noPass(page.row.teacherCourseId)">不通过
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <div style="margin-top: 20px">
      <el-button @click="submission()"  type="primary" size="small">提交课程</el-button>
    </div>

  </div>
</template>

<script>
    import * as trainApi from '../api/courseselectionmanage'
    export default {
        data() {
            return {
                list: [],
                phaseList:[],
                courseTypeList: [],
                total: 0,
                multipleSelection: [],
                params: {  //这里和上面的查询表单做了双向绑定
                    page: 1,
                    size: 5,
                    condition:{
                        courseName:"",
                        courseTypeId:"",
                        className:"",
                        phaseId:"",
                    },
                },
            }
        },

        methods: {


            //查询课程信息
            query: function (par) {
                //如果是查询的时候 从第一页开始显示
                if(par == 1){
                    this.params.page = 1;
                }
                //调用服务端的接口
                trainApi.examineTeacherCourselist(this.params.page,this.params.size,this.params.condition).then((res) => {
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
            //查询期数
            queryPhase:function(){
                trainApi.find_all_phase().then((res)=>{
                    this.phaseList = res.queryResult.list;
                })
            },
            //通过
            pass:function(teacherCourseId){
                this.$confirm('确认通过吗?', '提示', {}).then(() => {
                    trainApi.pass(teacherCourseId).then((res)=>{
                        if(res.success){
                            this.$message({
                                type: 'success',
                                message: '审核完成!'
                            });
                            //查询页面
                            this.query()
                        }else{
                            this.$message({
                                type: 'error',
                                message: '审核失败!'
                            });
                        }
                    })
                })
            },
            //不通过
            noPass:function(teacherCourseId){
                this.$confirm('确认通过吗?', '提示', {}).then(() => {
                    trainApi.noPass(teacherCourseId).then((res)=>{
                        if(res.success){
                            this.$message({
                                type: 'success',
                                message: '审核完成!'
                            });
                            //查询页面
                            this.query()
                        }else{
                            this.$message({
                                type: 'error',
                                message: '审核失败!'
                            });
                        }
                    })
                })
            },




        },
        created(){

        },
        mounted(){
            //当dom元素全部渲染完成后,调用query
            this.query();
            //查询课程类型
            this.queryCourseType();
            //查询期数
            this.queryPhase();
        }
    }
</script>
