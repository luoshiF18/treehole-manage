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
    <router-link :to="{path:'/informationmanage/page/course/add',query:{
                 page:this.params.page,
                 courseName:this.params.condition.courseName,
                 courseType:this.params.condition.courseType,
                 courseTeacher:this.params.condition.courseTeacher,
                 }}">
      <el-button  type="primary" size="small">新增页面</el-button>
    </router-link>
    </el-form>


    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column  prop="courseId" label="Id" width="120">
      </el-table-column>
      <el-table-column  prop="courseName" label="课程名" width="120">
      </el-table-column>
      <el-table-column prop="courseDescribe" label="描述" width="250">
      </el-table-column>
      <el-table-column prop="courseTypeName" label="类型" width="180">
      </el-table-column>
      <el-table-column prop="courseBeginTime" label="开课时间" width="250" :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="courseEndTime" label="结课时间" width="250" :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="courseTime" label="课时" width="250">
      </el-table-column>
      <el-table-column prop="teacherName" label="任课老师" width="250">
      </el-table-column>
      <el-table-column prop="courseOther" label="备注" width="250">
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="page">
          <el-button
            size="small"type="text"
            @click="edit(page.row.courseId)">编辑
          </el-button>

          <el-button
            size="small"type="text"
            @click="del(page.row.courseId)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="params.size"
      :current-page="params.page"
      @current-change="changePage"
      style="float: right;">
    </el-pagination>
  </div>
</template>
<script>
    import * as trainApi from '../../api/informationmanage'
    import moment from 'moment'
    export default {
        data() {
            return {
                courseTypeList:[],
                courseTeacherList:[],
                list: [],
                total: 0,
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
                //查询老师的参数
                condition:{
                    teacherType: 1
                }
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
           trainApi.course_list(this.params.page,this.params.size,this.params.condition).then((res) => {
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
       //跳转到修改页面
       edit(courseId){
          this.$router.push({
              path:'/informationmanage/page/course/edit/'+courseId
          })
       },
       //删除课程信息
       del:function (courseId) {
           this.$confirm('确认删除此页面吗?', '提示', {}).then(() => {
               trainApi.del_course(courseId).then((res)=>{
                   if(res.success){
                       this.$message({
                           type: 'success',
                           message: '删除成功!'
                       });
                        //查询页面
                       this.query()
                   }else{
                       this.$message({
                           type: 'error',
                           message: res.message
                       });
                   }
               })
           })
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
            //返回时到那一页
            this.params.page = Number.parseInt(this.$route.query.page || 1);
            this.params.condition.courseName=this.$route.query.courseName;
            this.params.condition.courseType=this.$route.query.courseType;
            this.params.condition.courseTeacher=this.$route.query.courseTeacher;
        },
        mounted(){
            //当dom元素全部渲染完成后,调用query
            this.query();
            //查询老师
            this.queryCourseTeacher();
            //查询课程类型
            this.queryCourseType();
        }
    }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
