<template>
  <div>

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
      <el-table-column prop="teacherName" label="班主任" width="250">
      </el-table-column>
      <el-table-column prop="classOther" label="备注" width="250">
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="page">
          <el-button
            size="small"type="text"
            @click="edit(page.row.classId)">编辑
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
    import * as classApi from '../api/classinformation'
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
                        classId:"501912110000",
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
                classApi.class_list(this.params.page,this.params.size,this.params.condition).then((res) => {
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
            //跳转到修改页面
            edit(classId){
                this.$router.push({
                    path:'/classinformation/page/class_edit/'+classId
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
