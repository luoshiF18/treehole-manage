<template>
  <div>
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


              list: [],
                total: 0,
                params: {  //这里和上面的查询表单做了双向绑定
                    page: 1,
                    size: 5,
                    condition:{
                        studentId:"",
                        studentName:"",
                    },
                },
            }
        },
   methods: {
       //查询欠费记录
       query: function () {
           this.params.condition.studentId = this.$route.params.costStudentId;
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
        }
    }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
