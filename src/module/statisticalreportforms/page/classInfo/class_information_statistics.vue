<template>
  <div>
    <!--查询表单-->
    <el-form :model="params">
      Id:<el-input v-model="params.condition.classId"  style="width: 100px"></el-input>
      班级名:<el-input v-model="params.condition.className"  style="width: 100px"></el-input>

    <el-button type="primary" size="small" v-on:click="query(1)">查询</el-button>
    </el-form>


    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column  prop="classId" label="Id" width="120">
      </el-table-column>
      <el-table-column  prop="className" label="班级名" width="120">
      </el-table-column>
      <el-table-column prop="classPlan" label="计划" width="120">
      </el-table-column>
      <el-table-column prop="classNumber" label="人数" width="180">
      </el-table-column>
      <el-table-column prop="classCourseNumber" label="课程数" width="180">
      </el-table-column>
      <el-table-column prop="classCreatTime" label="创建日期" width="250" :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="teacherName" label="班主任" width="250">
      </el-table-column>
      <el-table-column prop="classOther" label="备注" width="250">
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="page">
          <el-button
            size="small"type="text"
            @click="class_student(page.row.classId)">班级学生统计
          </el-button>

          <el-button
            size="small"type="text"
            @click="class_course(page.row.classId)">班级课程统计
          </el-button>

          <el-button
            size="small"type="text"
            @click="class_teacher(page.row.classId)">班级老师统计
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
    import * as trainApi from '../../api/statisticalreportforms'
    import moment from 'moment'
    export default {
        data() {
            return {
                list: [],
                total: 0,
                params: {  //这里和上面的查询表单做了双向绑定
                    page: 1,
                    size: 5,
                    condition:{
                        classId:"",
                        className:"",
                    },
                },
            }
        },
   methods: {
       //查询班级信息
       query: function (par) {
           //如果是查询的时候 从第一页开始显示
           if(par == 1){
               this.params.page = 1;
           }
           //调用服务端的接口
           trainApi.class_list(this.params.page,this.params.size,this.params.condition).then((res) => {
               //将res结果数据赋值给数据模型对象
               console.log(this.params.condition);
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
       //跳转到班级学生统计页面
       class_student(classId){
          this.$router.push({
              path:'/statisticalreportforms/page/classInfo/class_student/'+classId
          })
       },
       //跳转到班级课程统计页面
       class_course(classId){
           this.$router.push({
               path:'/statisticalreportforms/page/classInfo/class_course/'+classId
           })
       },
       //跳转到班级老师统计页面
       class_teacher(classId){
           this.$router.push({
               path:'/statisticalreportforms/page/classInfo/class_teacher/'+classId
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
        }
    }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
