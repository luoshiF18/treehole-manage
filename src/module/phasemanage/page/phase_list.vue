<template>
  <div>
    <!--查询表单-->
    <el-form :model="params">
      期数Id:<el-input v-model="params.condition.phaseId"  style="width: 100px"></el-input>
      期数名称:<el-input v-model="params.condition.phaseName"  style="width: 100px"></el-input>
    <el-button type="primary" size="small" v-on:click="query">查询</el-button>
    <router-link :to="{path:'/phasemanage/page/phase_add',query:{
                 page:this.params.page,
                 phaseId:this.params.condition.phaseId,
                 phaseName:this.params.condition.phaseName,
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
      <el-table-column  prop="phaseId" label="Id" width="120">
      </el-table-column>
      <el-table-column prop="phaseName" label="名称" width="120">
      </el-table-column>
      <el-table-column prop="phaseCourseNumber" label="课程数" width="180">
      </el-table-column>
      <el-table-column prop="phaseTuition" label="学费" width="180">
      </el-table-column>
      <el-table-column prop="phasePreferentialAmount" label="优惠金额" width="250">
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="page">
          <el-button
            size="small"type="text"
            @click="edit(page.row.phaseId)">编辑
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
    import * as trainApi from '../api/phase'

    export default {
        data() {
            return {
                courseTypeList:[],
                courseTeacherList:[],
                list: [],
                total: 0,
                params: {  //这里和上面的查询表单做了双向绑定
                    page: 1,
                    size: 5,
                    condition:{
                        phaseId:"",
                        phaseName:"",
                    },
                },
            }
        },
   methods: {
       //查询课程信息
       query: function () {
           //调用服务端的接口
           trainApi.find_phase(this.params.page,this.params.size,this.params.condition).then((res) => {
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
       //跳转到修改页面
       edit(phaseId){
          this.$router.push({
              path:'/phasemanage/page/phase_edit/'+phaseId
          })
       },
      },
        created(){
            //返回时到那一页
            this.params.page = Number.parseInt(this.$route.query.page || 1);
            this.params.condition.phaseId=this.$route.query.phaseId;
            this.params.condition.phaseName=this.$route.query.phaseName;
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
