<template>
  <div>

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

      期数:<el-select v-model="params.condition.studentPhase" placeholder="请选择期数" style="width: 110px">
      <el-option value="">请选择期数</el-option>
      <el-option
        v-for="item in phaseList"
        :key="item.phaseId"
        :label="item.phaseName"
        :value="item.phaseId">
        <!-- value值是用于提交的,label值是用于显示的 -->
      </el-option>
    </el-select>

      班级:<el-select v-model="params.condition.studentClass" placeholder="请选择班级" style="width: 100px">
      <el-option value="">请选择班级</el-option>
      <el-option
        v-for="item in classList"
        :key="item.classId"
        :label="item.className"
        :value="item.classId">
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



      是否毕业:<el-select v-model="params.condition.studentGraduation" placeholder="请选择是否毕业" style="width: 100px">
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
      类型:<el-select v-model="params.condition.costType" placeholder="请选择类型" style="width: 100px">
      <el-option
        v-for="item in typeList"
        :key="item.typeId"
        :label="item.typeName"
        :value="item.typeId">
        <!-- value值是用于提交的,label值是用于显示的 -->
      </el-option>
    </el-select>
      <el-button type="primary" size="small" v-on:click="query()">查询</el-button>
    </el-form>

    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column type="index" width="60">
      </el-table-column>

      <el-table-column  prop="costStudentId" label="Id" width="120">
      </el-table-column>

      <el-table-column prop="costStudentName" label="姓名" width="120">
      </el-table-column>

      <el-table-column prop="costArrears" label="欠费金额" width="120">
      </el-table-column>

      <el-table-column prop="costTime" label="交费时间" width="180" :formatter="dateFormat">
      </el-table-column>

      <el-table-column prop="costOther" label="备注" width="250">
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
      name = "学生欠费信息.xls">
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
                "id": "costStudentId",    //常规字段
                "姓名": "costStudentName", //支持嵌套属性
                "欠费金额":"costArrears",
                "交费时间":{
                  field: "costTime",
                  callback: value => {
                    if (`${value}` == ''){
                      return null;
                    }else {
                      return moment(`${value}`).format("YYYY-MM-DD");
                    }
                  }
                },
                "备注":"costOther"
              },
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

              typeList:[
                {
                  typeId: "1",
                  typeName: "交费记录",
                },
                {
                  typeId: "2",
                  typeName: "欠费记录",
                }
              ],
                typeList:[
                    {
                        typeId: "1",
                        typeName: "交费记录",
                    },
                    {
                        typeId: "2",
                        typeName: "欠费记录",
                    }
                ],
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
                      studentArrears:"",
                        costType:"",
                    },
                },
            }
        },
   methods: {
       //查询欠费记录
       query: function () {
           if(this.params.condition.costType == 1){
               this.$router.push({
                   path: '/statisticalreportforms/page/payInfo/payment_record_all', query: {
                       costStudentId:this.params.condition.costStudentId,
                       costStudentName:this.params.condition.costStudentName,
                   }
               })
           }
           trainApi.payment_record(this.params.page,this.params.size,this.params.condition).then((res) => {
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
       //返回
       go_back(){
           this.$router.push({
               path: '/statisticalreportforms/page/payInfo/student_list', query: {

               }
           })
       },
     //查询班级
     queryClass:function(){
       trainApi.class_list(1,0).then((res)=>{
         //将res结果数据赋值给模型对象
         this.classList = res.queryResult.list;
       })
     },
     //查询期数
     queryPhase:function(){
       trainApi.student_Phase().then((res)=>{
         this.phaseList = res.queryResult.list;
       })
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
            //把传过来的数据 赋值
            this.params.condition.costStudentId = this.$route.query.costStudentId
            this.params.condition.costStudentName = this.$route.query.costStudentName
            this.params.condition.costType = '2'
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
