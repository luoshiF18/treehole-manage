<template>
  <div>
    <!--查询表单-->
    <el-form :model="params">
      文件名:<el-input v-model="params.condition.documentName"  style="width: 100px"></el-input>
      上传人:<el-input v-model="params.condition.studentName"  style="width: 100px"></el-input>
        <span class="demonstration">上传时间</span>
        <el-date-picker
          v-model="params.condition.uploadTime"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions">
        </el-date-picker>


      <el-button type="primary" size="small" v-on:click="query(1)">查询</el-button>
    </el-form>


    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column  prop="documentName" label="文件名" width="120" >
      </el-table-column>
      <el-table-column  prop="studentName" label="上传人" width="120">
      </el-table-column>
      <el-table-column  prop="uploadTime" label="上传时间" width="120" :formatter="dateFormat">
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="page">
          <a  :href="'http://localhost:10086/document/download?docId='+page.row.documentId+'&userId='+vipId">下载</a>
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


    <div slot="footer" class="dialog-footer">
      <el-button @click="go_back">返回</el-button>
    </div>
  </div>
</template>
<script>
    import * as teacherApi from '../api/coursestaught'
    import moment from 'moment'
    export default {
        data() {
            return {

              pickerOptions: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                },
                shortcuts: [{
                  text: '今天',
                  onClick(picker) {
                    picker.$emit('pick', new Date());
                  }
                }, {
                  text: '昨天',
                  onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                  }
                }, {
                  text: '一周前',
                  onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                  }
                }]
              },

                courseTypeList:[],
                courseTeacherList:[],
                list: [],
                total: 0,
                params: {  //这里和上面的查询表单做了双向绑定
                    page: 1,
                    size: 5,
                    condition:{
                        classCourseId:"",
                        studentName:"",
                        documentName:"",
                        uploadTime:"",
                    },
                },
                //查询老师的参数
                condition:{
                    teacherType: 1
                },
              //用户Id
              vipId:"",
            }
        },
   methods: {
        //查询学生上传的作业
       query: function (par) {
           //如果是查询的时候 从第一页开始显示
           if(par == 1){
               this.params.page = 1;
           }
           //调用服务端的接口
         this.params.condition.classCourseId=this.$route.params.classCourseId;
         teacherApi.findStudentTask(this.params.page,this.params.size,this.params.condition).then((res) => {
               //将res结果数据赋值给数据模型对象
               this.list = res.queryResult.list;
               this.total = res.queryResult.total;
           })
       },
     //返回
     go_back(){
       this.$router.push({
         path: '/coursestaught/page/course_list', query: {

         }
       })
     },
       //分页
       changePage: function (currentPage){
           this.params.page = currentPage;
           //调用query方法
           this.query();
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
            this.vipId = JSON.parse(sessionStorage.getItem("login"));
        }
    }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
