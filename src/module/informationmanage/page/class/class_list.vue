<template>
  <div>
    <!--查询表单-->
    <el-form :model="params">
      Id:<el-input v-model="params.condition.classId"  style="width: 100px"></el-input>
      班级名:<el-input v-model="params.condition.className"  style="width: 100px"></el-input>

      期数:<el-select v-model="params.condition.classPhase" placeholder="请选择期数" style="width: 100px">
      <el-option value="">请选择期数</el-option>
      <el-option
        v-for="item in phaseList"
        :key="item.phaseId"
        :label="item.phaseName"
        :value="item.phaseId">
        <!-- value值是用于提交的,label值是用于显示的 -->
      </el-option>
    </el-select>


      是否毕业:<el-select v-model="params.condition.classGraduation" placeholder="请选择是否毕业" style="width: 100px">
      <el-option value="">请选择是否毕业</el-option>
      <el-option
        v-for="item in graduationList"
        :key="item.graduationId"
        :label="item.graduationName"
        :value="item.graduationId">
        <!-- value值是用于提交的,label值是用于显示的 -->
      </el-option>
    </el-select>

    <el-button type="primary" size="small" v-on:click="query(1)">查询</el-button>
    <router-link :to="{path:'/informationmanage/page/class/add',query:{
                 page:this.params.page,
                 className:this.params.condition.className,
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
      <el-table-column  prop="classId" label="Id" width="120">
      </el-table-column>
      <el-table-column  prop="classPhase" label="期数" width="120">
      </el-table-column>
      <el-table-column  prop="className" label="班级名" width="120">
      </el-table-column>
      <el-table-column prop="classPlan" label="计划" width="250">
      </el-table-column>
      <el-table-column prop="classNumber" label="实际人数" width="180">
      </el-table-column>
      <el-table-column prop="classPlannedNumber" label="计划人数" width="180">
      </el-table-column>
      <el-table-column prop="classCourseNumber" label="课程数" width="180">
      </el-table-column>
      <el-table-column prop="classCreatTime" label="创建日期" width="250" :formatter="dateFormat" >
      </el-table-column>
      <el-table-column prop="classEndTime" label="毕业日期" width="250" :formatter="dateFormat" >
      </el-table-column>
      <el-table-column prop="teacherName" label="班主任" width="250">
      </el-table-column>

      <el-table-column prop="classGraduation" label="是否毕业" width="250">
        <template slot-scope="{row: {classGraduation}}">
          <span v-if="+classGraduation === 1 ">未毕业</span>
          <span v-else-if="+classGraduation === 2 ">已毕业</span>
        </template>
      </el-table-column>

      <el-table-column prop="classOther" label="备注" width="250">
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="page">
          <el-button
            size="small"type="text"
            @click="edit(page.row.classId)">编辑
          </el-button>

          <el-button
            size="small"type="text"
            @click="del(page.row.classId)">删除
          </el-button>

          <el-button
            size="small"type="text"
            @click="graduation(page.row.classId)">全班毕业
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
                list: [],
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
                //期数列表
                phaseList:[],
                total: 0,
                params: {  //这里和上面的查询表单做了双向绑定
                    page: 1,
                    size: 5,
                    condition:{
                        className:"",
                        classId:"",
                        classGraduation:"",
                        classPhase:"",
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

       //查询期数
       queryPhase:function(){
           trainApi.student_Phase().then((res)=>{
               this.phaseList = res.queryResult.list;
           })
       },
       //跳转到修改页面
       edit(classId){
          this.$router.push({
              path:'/informationmanage/page/class/edit/'+classId
          })
       },
       //删除老师信息
       del:function (classId) {
           this.$confirm('确认删除此页面吗?', '提示', {}).then(() => {
               trainApi.del_class(classId).then((res)=>{
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
       //全班毕业
       graduation(classId) {

           this.$confirm('确认全班同学可以毕业?', '提示', {}).then(() => {
               trainApi.student_graduation_all(classId).then((res) => {
                   if (res.success) {
                       this.$message({
                           type: 'success',
                           message: '恭喜您，全班顺利毕业!'
                       });
                       //查询页面
                       this.query()
                   } else {
                       this.$message({
                           type: 'error',
                           message: '提交失败'
                       });
                   }
               })
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
            //查询期数
            this.queryPhase();
        }
    }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
