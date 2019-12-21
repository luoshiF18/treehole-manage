<template>
  <div>
    <!--查询表单-->
    <el-form :model="params">
      Id:<el-input v-model="params.condition.studentId"  style="width: 100px"></el-input>
      姓名:<el-input v-model="params.condition.studentName"  style="width: 100px"></el-input>
      性别:<el-select v-model="params.condition.studentGender" placeholder="请选择性别" style="width: 100px">
      <el-option value="">请选择性别</el-option>
      <el-option
        v-for="item in genderList"
        :key="item.genderId"
        :label="item.genderName"
        :value="item.genderId">
        <!-- value值是用于提交的,label值是用于显示的 -->
      </el-option>
    </el-select>

      状态:<el-select v-model="params.condition.studentState" placeholder="请选择状态" style="width: 100px">
      <el-option value="">请选择状态</el-option>
      <el-option
        v-for="item in stateList"
        :key="item.stateId"
        :label="item.stateName"
        :value="item.stateId">
        <!-- value值是用于提交的,label值是用于显示的 -->
      </el-option>
    </el-select>

      期数:<el-select v-model="params.condition.studentPhase" placeholder="请选择状态" style="width: 100px">
      <el-option value="">请选择期数</el-option>
      <el-option
        v-for="item in phaseList"
        :key="item.phaseId"
        :label="item.phaseName"
        :value="item.phaseId">
        <!-- value值是用于提交的,label值是用于显示的 -->
      </el-option>
    </el-select>

      是否毕业:<el-select v-model="params.condition.studentGraduation" placeholder="请选择状态" style="width: 100px">
      <el-option value="">请选择是否毕业</el-option>
      <el-option
        v-for="item in graduationList"
        :key="item.graduationId"
        :label="item.graduationName"
        :value="item.graduationId">
        <!-- value值是用于提交的,label值是用于显示的 -->
      </el-option>
    </el-select>

      是否欠费:<el-select v-model="params.condition.studentArrears" placeholder="请选择是否欠费" style="width: 100px">
      <el-option value="">请选择是否欠费</el-option>
      <el-option
        v-for="item in arrearsList"
        :key="item.arrearsId"
        :label="item.arrearsName"
        :value="item.arrearsId">
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
      <el-table-column  prop="studentId" label="Id" width="120">
      </el-table-column>
      <el-table-column  prop="studentName" label="姓名" width="120">
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
      <el-table-column prop="studentBirthDate" label="出生日期" width="250" :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="studentType" label="职务" width="250">
        <template slot-scope="{row: {studentType}}">
          <span v-if="+studentType === 1 ">学员</span>
          <span v-else-if="+studentType === 2 ">组长</span>
          <span v-else-if="+studentType === 3 ">班长</span>
        </template>
      </el-table-column>
      <el-table-column prop="studentTelephone" label="电话" width="250">
      </el-table-column>
      <el-table-column prop="studentAddress" label="地址" width="250">
      </el-table-column>
      <el-table-column prop="studentEnrollmentTime" label="入学时间" width="250" :formatter="dateFormat">
      </el-table-column>

      <el-table-column prop="studentArrears" label="是否欠费" width="250">
        <template slot-scope="{row: {studentArrears}}">
          <span v-if="+studentArrears === 1 ">是</span>
          <span v-else-if="+studentArrears === 2 ">否</span>
        </template>
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

    <download-excel
      class = "export-excel-wrapper"
      :data = "list"
      :fields = "json_fields"
      name = "班级学生.xls">
      <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
      <el-button type="primary" size="small">导出EXCEL</el-button>
    </download-excel>

    <div slot="footer" class="dialog-footer">
      <el-button @click="go_back">返回</el-button>
    </div>

  </div>
</template>
<script>
    import * as trainApi from '../api/classestaught'
    import moment from 'moment'
    export default {
        data() {
            return {

              json_fields: {
                "id": "studentId",    //常规字段
                "姓名": "studentName", //支持嵌套属性
                "性别": {
                  field: "studentGender",
                  callback: value => {
                    if (`${value}` == 1){
                      return "男"
                    }else if(`${value}` == 2){
                      return "女"
                    };
                  }
                },"职务":{
                  field: "studentType",
                  callback: value => {
                    if (`${value}` == 1){
                      return "学员"
                    }else if(`${value}` == 2){
                      return "组长"
                    }else if(`${value}` == 3){
                      return "班长"
                    };
                  }
                },
                "状态":{
                  field: "studentState",
                  callback: value => {
                    if (`${value}` == 1){
                      return "正常"
                    }else if(`${value}` == 2){
                      return "请假中"
                    };
                  }
                },
                "出生日期":{
                  field: "studentBirthDate",
                  callback: value => {
                    if (`${value}` == ''){
                      return null;
                    }else {
                      return moment(`${value}`).format("YYYY-MM-DD");
                    }
                  }
                },
                "电话":"studentTelephone",
                "地址":"studentAddress",
                "入学时间":{
                  field: "studentEnrollmentTime",
                  callback: value => {
                    if (`${value}` == ''){
                      return null;
                    }else {
                      return moment(`${value}`).format("YYYY-MM-DD");
                    }
                  }
                },
                "是否欠费":{
                  field: "studentArrears",
                  callback: value => {
                    if (`${value}` == 1){
                      return "是"
                    }else if(`${value}` == 2){
                      return "否"
                    };
                  }
                },
                "是否毕业":{
                  field: "studentGraduation",
                  callback: value => {
                    if (`${value}` == 1){
                      return "未毕业"
                    }else if(`${value}` == 2){
                      return "已毕业"
                    };
                  }
                },
                "毕业时间":{
                  field: "studentGraduationTime",
                  callback: value => {
                    if (`${value}` == ''){
                      return null;
                    }else {
                      return moment(`${value}`).format("YYYY-MM-DD");
                    }
                  }
                },
                "备注":"studentOther"
              },

                //班级列表
                classList: [

                ],
                //期数列表
                phaseList:[],
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
              arrearsList:[
                {
                  arrearsId:"1",
                  arrearsName:"是",
                },
                {
                  arrearsId:"2",
                  arrearsName:"否",
                },

              ],
                list: [],
                total: 0,
                params: {  //这里和上面的查询表单做了双向绑定
                    page: 1,
                    size: 5,
                    condition:{
                        classId:"",
                        studentId:"",
                        studentName:"",
                        studentGender:"",
                        studentClass:"",
                        className:"",
                        studentState:"",
                        studentArrears:""
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
           this.params.condition.classId=this.$route.params.classId;
           //调用服务端的接口
           trainApi.class_student(this.params.page,this.params.size,this.params.condition).then((res) => {
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
       //查询期数
       queryPhase:function(){
           trainApi.student_Phase().then((res)=>{
               this.phaseList = res.queryResult.list;
           })
       },

       //返回
       go_back(){
           this.$router.push({
               path: '/classestaught/page/class_list', query: {

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
            //查询期数
            this.queryPhase();
        }
    }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
