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


    <el-button type="primary" size="small" v-on:click="query(1)">查询</el-button>
    </el-form>


    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column  prop="phaseName" label="期数" width="120">
      </el-table-column>
      <el-table-column  prop="className" label="班级名" width="120">
      </el-table-column>
      <el-table-column  prop="courseName" label="课程名" width="120">
      </el-table-column>
      <el-table-column prop="courseDescribe" label="描述" width="250">
      </el-table-column>
      <el-table-column prop="courseTypeName" label="类型" width="180">
      </el-table-column>
      <el-table-column prop="courseTime" label="课时" width="250">
      </el-table-column>
      <el-table-column prop="coursePrice" label="价格" width="250">
      </el-table-column>
      <el-table-column prop="courseOther" label="备注" width="250">
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

    <download-excel
      class = "export-excel-wrapper"
      :data = "list"
      :fields = "json_fields"
      name = "老师所教课程.xls">
      <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
      <el-button type="primary" size="small">导出EXCEL</el-button>
    </download-excel>

    <div slot="footer" class="dialog-footer" >
      <el-button @click="go_back" >返回</el-button>
    </div>

  </div>
</template>
<script>
    import * as trainApi from '../../api/statisticalreportforms'
    import moment from 'moment'
    export default {
        data() {
            return {

              json_fields: {
                "期数": "phaseName",    //常规字段
                "班级名": "className",    //常规字段
                "课程名": "courseName", //支持嵌套属性
                "描述": "courseDescribe",
                "类型":"courseTypeName",
                "课时":"courseTime",
                "价格":"coursePrice",
                "备注":"courseOther"
              },

                courseTypeList:[],
                courseTeacherList:[],
                list: [],
                total: 0,
                params: {  //这里和上面的查询表单做了双向绑定
                    page: 1,
                    size: 5,
                    condition:{
                        courseId:"",
                        classId:"",
                        courseName:"",
                        courseType:"",
                        courseTeacher:"",
                        teacherId:"",
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
           this.params.condition.teacherId=this.$route.params.teacherId;
           //调用服务端的接口
           trainApi.teacher_course(this.params.page,this.params.size,this.params.condition).then((res) => {
               if(res.success == true){
                   //将res结果数据赋值给数据模型对象
                   this.list = res.queryResult.list;
                   this.total = res.queryResult.total;
               }else {
                   this.$message.success(res.message)
               }

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
       //返回
       go_back(){
           this.$router.push({
               path: '/statisticalreportforms/page/teacherinfo/teacher_information_statistics', query: {

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
       },

      },
        created(){

        },
        mounted(){
            //当dom元素全部渲染完成后,调用query
            this.query();

            //查询课程类型
            this.queryCourseType();
        }
    }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
