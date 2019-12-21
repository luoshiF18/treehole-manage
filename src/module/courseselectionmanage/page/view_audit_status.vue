<template>
  <div>
    <!--查询表单-->
    <el-form :model="params" style="width: 100%;margin-top: 10px">
      期数:<el-select v-model="params.condition.phaseId"
                    placeholder="请选择期数" style="width: 100px">
      <el-option value="">请选择期数</el-option>
      <el-option
        v-for="item in phaseList"
        :key="item.phaseId"
        :label="item.phaseName"
        :value="item.phaseId">
        <!-- value值是用于提交的,label值是用于显示的 -->
      </el-option>
    </el-select>
      班级名:<el-input v-model="params.condition.className"  style="width: 100px"></el-input>
      课程名:<el-input v-model="params.condition.courseName"  style="width: 100px"></el-input>
      类型:<el-select v-model="params.condition.courseTypeId" placeholder="请选择类型">
      <el-option value="">请选择类型</el-option>
      <el-option
        v-for="item in courseTypeList"
        :key="item.courseTypeId"
        :label="item.courseTypeName"
        :value="item.courseTypeId">
        <!-- value值是用于提交的,label值是用于显示的 -->
      </el-option>
    </el-select>
      <span class="demonstration">选课时间</span>
      <el-date-picker
        v-model="params.condition.selectCourseTime"
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
      style="width: 100%;margin-top: 10px">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column  prop="phaseName" label="期数" width="120">
      </el-table-column>
      <el-table-column prop="className" label="班级" width="120">
      </el-table-column>
      <el-table-column prop="classNumber" label="班级人数" width="180">
      </el-table-column>
      <el-table-column prop="classCourseNumber" label="课程数" width="250" >
      </el-table-column>
      <el-table-column prop="classHeadmasterName" label="班主任" width="250" >
      </el-table-column>
      <el-table-column prop="courseTypeName" label="课程类型" width="250" >
      </el-table-column>
      <el-table-column prop="courseName" label="课程名" width="250">
      </el-table-column>
      <el-table-column prop="courseDescribe" label="课程描述" width="250">
      </el-table-column>
      <el-table-column prop="courseTime" label="课时" width="250">
      </el-table-column>
      <el-table-column prop="state" label="审核情况" width="120">
        <template slot-scope="{row: {state}}">
          <span v-if="+state === 1 ">审核成功</span>
          <span v-else-if="+state === 2 ">审核失败</span>
          <span v-else-if="+state === 3 ">审核中</span>
        </template>
      </el-table-column>

      <el-table-column prop="selectCourseTime" label="选课时间" width="250" :formatter="dateFormat">
      </el-table-column>
    </el-table>


  </div>
</template>

<script>
    import * as teacherApi from '../api/courseselectionmanage'
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

                list: [],
                phaseList:[],
                courseTypeList: [],
                total: 0,
                multipleSelection: [],
                params: {  //这里和上面的查询表单做了双向绑定
                    page: 1,
                    size: 5,
                    condition:{
                        courseName:"",
                        courseTypeId:"",
                        className:"",
                        phaseId:"",
                        teacherId:"",
                        selectCourseTime:"",
                    },
                },

            }
        },

        methods: {
            //查询课程审核信息
            query: function (par) {
                //如果是查询的时候 从第一页开始显示
                if(par == 1){
                    this.params.page = 1;
                }
                //调用服务端的接口
              this.params.condition.teacherId = JSON.parse(sessionStorage.getItem("login"));
                teacherApi.audit_status(this.params.page,this.params.size,this.params.condition).then((res) => {
                    this.list = res.queryResult.list;
                    this.total = res.queryResult.total;
                })
            },
          //时间格式化  
          dateFormat:function(row, column) {
            var date = row[column.property];
            if (date == undefined) {
              return "";
            }
            return moment(date).format("YYYY-MM-DD");
          },
            //分页
            changePage: function (currentPage){
                this.params.page = currentPage;
                //调用query方法
                this.query();
            },
            //查询课程类型
            queryCourseType:function(){
                teacherApi.courseType_list(1,0,).then((res)=>{
                    //将res结果数据赋值给模型对象
                    this.courseTypeList = res.queryResult.list;
                })
            },
            //查询期数
            queryPhase:function(){
                teacherApi.find_Phase().then((res)=>{
                    this.phaseList = res.queryResult.list;
                })
            },

        },
        created(){

        },
        mounted(){
            //当dom元素全部渲染完成后,调用query
            this.query();
            //查询课程类型
            this.queryCourseType();
            //查询期数
            this.queryPhase();
        }
    }
</script>
<style scoped>

</style>
