<template>
  <div>




    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column  prop="studentId" label="Id" width="120">
      </el-table-column>
      <el-table-column  prop="studentName" label="姓名" width="120">
      </el-table-column>
      <el-table-column  prop="phaseName" label="期数" width="120">
      </el-table-column>
      <el-table-column prop="studentGender" label="性别" width="120">
        <template slot-scope="{row: {studentGender}}">
          <span v-if="+studentGender === 1 ">男</span>
          <span v-else-if="+studentGender === 2 ">女</span>
        </template>
      </el-table-column>
      <el-table-column prop="studentState" label="状态" width="180">
        <template slot-scope="{row: {studentState}}">
          <span v-if="+studentState === 1 ">正常</span>
          <span v-else-if="+studentState === 2 ">请假中</span>
        </template>
      </el-table-column>
      <el-table-column prop="studentBirthDate" label="出生日期" width="250"  :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="studentType" label="职务" width="250">
        <template slot-scope="{row: {studentType}}">
          <span v-if="+studentType === 1 ">学员</span>
          <span v-else-if="+studentType === 2 ">组长</span>
          <span v-else-if="+studentType === 3 ">班长</span>
        </template>
      </el-table-column>
      <el-table-column prop="className" label="班级" width="250">
      </el-table-column>
      <el-table-column prop="studentTelephone" label="电话" width="250">
      </el-table-column>
      <el-table-column prop="studentAddress" label="地址" width="250">
      </el-table-column>
      <el-table-column prop="studentEnrollmentTime" label="入学时间" width="250" :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="studentGraduation" label="是否毕业" width="250">
        <template slot-scope="{row: {studentGraduation}}">
          <span v-if="+studentGraduation === 1 ">未毕业</span>
          <span v-else-if="+studentGraduation === 2 ">已毕业</span>
        </template>
      </el-table-column>
      <el-table-column prop="studentGraduationTime" label="毕业时间" width="250" :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="studentOther" label="备注" width="250">
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
    import * as studentApi from '../api/personalinformation'
    import moment from 'moment'
    export default {
        data() {
            return {
                //是否毕业
                graduationList:[
                    {
                        graduationId:"1",
                        graduationName:"未毕业",
                    },
                    {
                        graduationId:"2",
                        graduationName:"已毕业",
                    }
                ],
                //班级列表
                classList: [],
                //期数列表
                phaseList:[],
                genderList:[  //性别
                    {
                        genderId:"1",
                        genderName:"男",
                    },
                    {
                        genderId:"2",
                        genderName:"女",
                    },
                ],
                stateList:[
                    {
                        stateId:"1",
                        stateName:"正常",
                    },
                    {
                        stateId:"2",
                        stateName:"请假中",
                    },
                ],//状态
                list: [],
                total: 0,
                params: {  //这里和上面的查询表单做了双向绑定
                    page: 1,
                    size: 5,
                    condition:{
                        studentId:"",
                        studentName:"",
                        studentGender:"",
                        studentClass:"",
                        className:"",
                        studentEnrollmentTime:"",
                        studentState:"",
                        studentPhase:"",
                        studentGraduation:"",
                    },
                },
                con:{
                    a: 2,
                }
            }
        },
   methods: {
       //查询学生信息
       query: function (par) {
           //如果是查询的时候 从第一页开始显示
           if(par == 1){
               this.params.page = 1;
           }
         this.params.condition.studentId =JSON.parse(sessionStorage.getItem("login"));
           //调用服务端的接口
           studentApi.student_list(this.params.page,this.params.size,this.params.condition).then((res) => {
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
       //查询班级
       queryClass:function(){
           studentApi.class_list(1,0).then((res)=>{
               //将res结果数据赋值给模型对象
               this.classList = res.queryResult.list;
           })
       },
       //查询期数
       queryPhase:function(){
           studentApi.student_Phase().then((res)=>{
               this.phaseList = res.queryResult.list;
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
            //查询班级
            this.queryClass();
            //查询期数
            this.queryPhase();

        }
    }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
