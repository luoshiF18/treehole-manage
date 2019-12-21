<template>
  <div>
    <!--查询表单-->
    <el-form :model="params">
      请假人ID:<el-input v-model="params.condition.leavePeopleId"  style="width: 100px"></el-input>
      姓名:<el-input v-model="params.condition.leavePeopleName"  style="width: 100px"></el-input>
      请假人状态:<el-select v-model="params.condition.leaveState" placeholder="请选择类型" style="width: 100px">
      <el-option value="">请选择状态</el-option>
      <el-option
        v-for="item in leaveStateList"
        :key="item.leaveStateId"
        :label="item.leaveStateName"
        :value="item.leaveStateId">
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
      <el-table-column  prop="leavePeopleId" label="请假人Id" width="120">
      </el-table-column>
      <el-table-column prop="leavePeopleName" label="请假人姓名" width="120">
      </el-table-column>

      <el-table-column prop="leavePeopleType" label="请假人类型" width="250">
        <template slot-scope="{row: {leavePeopleType}}">
          <span v-if="+leavePeopleType === 1 ">学生</span>
          <span v-else-if="+leavePeopleType === 2 ">老师</span>
        </template>
      </el-table-column>


      <el-table-column prop="leaveTime" label="请假时间" width="180"    :formatter="dateFormat"  >
      </el-table-column>

      <el-table-column prop="leaveStartTime" label="开始时间" width="250" :formatter="dateFormat"  >
      </el-table-column>
      <el-table-column prop="leaveEndTime" label="结束时间" width="250" :formatter="dateFormat" >
      </el-table-column>

      <el-table-column prop="leaveState" label="状态" width="250">
        <template slot-scope="{row: {leaveState}}">
          <span v-if="+leaveState === 1 ">已消假</span>
          <span v-else-if="+leaveState === 2 ">请假中</span>
          <span v-else-if="+leaveState === 3 ">审核中</span>
          <span v-else-if="+leaveState === 4 ">审核未通过</span>
        </template>
      </el-table-column>
      <el-table-column prop="leaveOther" label="理由" width="250">
      </el-table-column>
      <el-table-column prop="leaveRemoveTime" label="消假时间" width="250" :formatter="dateFormat" >
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
      name = "班级请假记录.xls">
      <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
      <el-button type="primary" size="small">导出EXCEL</el-button>
    </download-excel>

  </div>
</template>
<script>
    import * as classApi from '../api/leaveaudit'
    import moment from 'moment'

    export default {
        data() {
            return {
              json_fields: {
                "请假人Id": "leavePeopleId",    //常规字段
                "请假人姓名": "leavePeopleName", //支持嵌套属性
                "请假人类型": {
                  field: "leavePeopleType",
                  callback: value => {
                    if (`${value}` == 1){
                      return "学生"
                    }else if(`${value}` == 2){
                      return "老师"
                    };
                  }
                },
                "请假时间":{
                  field: "leaveTime",
                  callback: value => {
                    if (`${value}` == ''){
                      return null;
                    }else {
                      return moment(`${value}`).format("YYYY-MM-DD");
                    }
                  }
                },
                "开始时间":{
                  field: "leaveStartTime",
                  callback: value => {
                    if (`${value}` == ''){
                      return null;
                    }else {
                      return moment(`${value}`).format("YYYY-MM-DD");
                    }
                  }
                },
                "结束时间":{
                  field: "leaveEndTime",
                  callback: value => {
                    if (`${value}` == ''){
                      return null;
                    }else {
                      return moment(`${value}`).format("YYYY-MM-DD");
                    }
                  }
                },
                "状态":{
                  field: "leaveState",
                  callback: value => {
                    if (`${value}` == 1){
                      return "已消假"
                    }else if(`${value}` == 2){
                      return "请假中"
                    }else if(`${value}` == 3){
                      return "审核中"
                    }else if(`${value}` == 4){
                      return "审核未通过"
                    };
                  }
                },
                "理由":"leaveOther",
                "消假时间":{
                  field: "leaveRemoveTime",
                  callback: value => {
                    if (`${value}` == ''){
                      return null;
                    }else {
                      return moment(`${value}`).format("YYYY-MM-DD");
                    }
                  }
                },
              },

                leavePeopleTypeList:[
                    {
                        leavePeopleTypeId:1,
                        leavePeopleTypeName:'学生'
                    },
                    {
                        leavePeopleTypeId:2,
                        leavePeopleTypeName:'老师'
                    },
                ],
              leaveStateList:[
                {
                  leaveStateId:1,
                  leaveStateName:'已消假',
                },
                {
                  leaveStateId:2,
                  leaveStateName:'请假中',
                },
                {
                  leaveStateId:3,
                  leaveStateName:'审核中',
                },
                {
                  leaveStateId:4,
                  leaveStateName:'审核未通过',
                },
              ],
                list: [],
                total: 0,
                phaseList:[],
                params: {  //这里和上面的查询表单做了双向绑定
                    page: 1,
                    size: 5,
                    condition:{
                        leavePeopleType:"",
                        leavePeopleId:"",
                        leavePeopleName:"",
                        leaveState:"",
                        className:"",
                        phaseId:"",
                        classId:"",
                    },
                },
            }
        },
   methods: {
       //查询请假记录
       query: function (par) {
           //如果是查询的时候 从第一页开始显示
           if(par == 1){
               this.params.page = 1;
           }
            this.params.condition.classId=JSON.parse(sessionStorage.getItem("login"));
           classApi.leaveAllInfo(this.params.page,this.params.size,this.params.condition).then((res) => {
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

       //时间格式化  
       dateFormat:function(row, column) {
           var date = row[column.property];
           if (date == undefined) {
               return "";
           }
           return moment(date).format("YYYY-MM-DD HH:mm:ss");
       }
   },

        created(){

        },
        mounted(){
            //当dom元素全部渲染完成后,调用query
            this.query();
            //时间格式化
            this.formatDate();
        }
    }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
