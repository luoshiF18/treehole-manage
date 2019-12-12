<template>
  <div>
    <!--查询表单-->
    <el-form :model="params">
      Id:<el-input v-model="params.condition.teacherId"  style="width: 100px"></el-input>
      姓名:<el-input v-model="params.condition.teacherName"  style="width: 100px"></el-input>
      性别:<el-select v-model="params.condition.teacherGender" placeholder="请选择性别">
      <el-option value="">请选择性别</el-option>
      <el-option
        v-for="item in genderList"
        :key="item.genderId"
        :label="item.genderName"
        :value="item.genderId">
        <!-- value值是用于提交的,label值是用于显示的 -->
      </el-option>
    </el-select>

        状态:<el-select v-model="params.condition.teacherState" placeholder="请选择状态">
      <el-option value="">请选择状态</el-option>
      <el-option
            v-for="item in stateList"
            :key="item.stateId"
            :label="item.stateName"
            :value="item.stateId">
            <!-- value值是用于提交的,label值是用于显示的 -->
          </el-option>
        </el-select>

      职务:<el-select v-model="params.condition.teacherType" placeholder="请选择状态">
      <el-option value="">请选择职务</el-option>
      <el-option
        v-for="item in typeList"
        :key="item.typeId"
        :label="item.typeName"
        :value="item.typeId">
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
      <el-table-column  prop="teacherId" label="Id" width="120">
      </el-table-column>
      <el-table-column  prop="teacherName" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="teacherGender" label="性别" width="120">
        <template slot-scope="{row: {teacherGender}}">
          <span v-if="+teacherGender === 1 ">男</span>
          <span v-else-if="+teacherGender === 2 ">女</span>
        </template>
      </el-table-column>
      <el-table-column prop="teacherState" label="状态" width="180">
        <template slot-scope="{row: {teacherState}}">
          <span v-if="+teacherState === 1 ">正常</span>
          <span v-else-if="+teacherState === 2 ">请假中</span>
        </template>
      </el-table-column>
      <el-table-column prop="teacherBirthDate" label="出生日期" width="250" :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="teacherType" label="职务" width="250">
        <template slot-scope="{row: {teacherType}}">
          <span v-if="+teacherType === 1 ">讲师</span>
          <span v-else-if="+teacherType === 2 ">班主任</span>
        </template>
      </el-table-column>
      <el-table-column prop="teacherTelephone" label="电话" width="250">
      </el-table-column>
      <el-table-column prop="teacherAddress" label="地址" width="250">
      </el-table-column>
      <el-table-column prop="teacherOther" label="备注" width="250">
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
      name = "学生老师.xls">
      <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
      <el-button type="primary" size="small">导出EXCEL</el-button>
    </download-excel>

    <div slot="footer" class="dialog-footer">
      <el-button @click="go_back">返回</el-button>
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
                "id": "teacherId",    //常规字段
                "姓名": "teacherName", //支持嵌套属性
                "性别": {
                  field: "teacherGender",
                  callback: value => {
                    if (`${value}` == 1){
                      return "男"
                    }else if(`${value}` == 2){
                      return "女"
                    };
                  }
                },
                "状态":{
                  field: "teacherState",
                  callback: value => {
                    if (`${value}` == 1){
                      return "正常"
                    }else if(`${value}` == 2){
                      return "请假中"
                    };
                  }
                },
                "出生日期":{
                  field: "teacherBirthDate",
                  callback: value => {
                    if (`${value}` == ''){
                      return null;
                    }else {
                      return moment(`${value}`).format("YYYY-MM-DD");
                    }
                  }
                },
                "职务":{
                  field: "teacherType",
                  callback: value => {
                    if (`${value}` == 1){
                      return "讲师"
                    }else if(`${value}` == 2){
                      return "班主任"
                    };
                  }
                },
                "电话":"teacherTelephone",
                "地址":"teacherAddress",
                "备注":"teacherOther"
              },
              json_meta: [
                [
                  {
                    " key ": " charset ",
                    " value ": " utf- 8 "
                  }
                ]
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
                ],
                typeList:[
                    {
                        typeId:'1',
                        typeName:'讲师',
                    },
                    {
                        typeId:'2',
                        typeName:'班主任',
                    }
                ],

                list: [],
                total: 0,
                params: {  //这里和上面的查询表单做了双向绑定
                    page: 1,
                    size: 5,
                    condition:{
                        teacherId:"",
                        studentId:"",
                        teacherName:"",
                        teacherGender:"",
                        teacherClass:"",
                        teacherState:"",
                    },
                },
            }
        },
   methods: {
       //查询老师信息
       query: function (par) {
           //如果是查询的时候 从第一页开始显示
           if(par == 1){
               this.params.page = 1;
           }
           this.params.condition.studentId=this.$route.params.studentId;
           //调用服务端的接口
           trainApi.student_teacher(this.params.page,this.params.size,this.params.condition).then((res) => {
               //将res结果数据赋值给数据模型对象
               console.log(res.queryResult.list)
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
       //返回
       go_back(){
           this.$router.push({
               path: '/statisticalreportforms/page/studentInfo/student_information_statistics', query: {

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
        }
    }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
