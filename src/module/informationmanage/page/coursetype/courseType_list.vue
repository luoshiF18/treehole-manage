<template>
  <div>
    <!--查询表单-->
    <el-form :model="params">
      Id:<el-input v-model="params.condition.courseTypeId"  style="width: 100px"></el-input>
      类型名:<el-input v-model="params.condition.courseTypeName"  style="width: 100px"></el-input>

    <el-button type="primary" size="small" v-on:click="query(1)">查询</el-button>
    <router-link :to="{path:'/informationmanage/page/courseType/add',query:{
                 page:this.params.page,
                 courseTypeName:this.params.condition.courseTypeName,
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
      <el-table-column  prop="courseTypeId" label="Id" width="120">
      </el-table-column>
      <el-table-column  prop="courseTypeName" label="类型名" width="120">
      </el-table-column>
      <el-table-column prop="courseTypeCourseNumber" label="课程数" width="180">
      </el-table-column>
      <el-table-column prop="courseTypeDescribe" label="描述" width="250">
      </el-table-column>
      <el-table-column prop="courseTypeAdaptivePerson" label="适应人群" width="250">
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="page">
          <el-button
            size="small"type="text"
            @click="edit(page.row.courseTypeId)">编辑
          </el-button>

          <el-button
            size="small"type="text"
            @click="del(page.row.courseTypeId)">删除
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

    export default {
        data() {
            return {
                list: [],
                total: 0,
                params: {  //这里和上面的查询表单做了双向绑定
                    page: 1,
                    size: 5,
                    condition:{
                        courseTypeName:"",
                        courseTypeId:"",
                    },
                },
            }
        },
   methods: {
       //查询课程类型信息
       query: function (par) {
           //如果是查询的时候 从第一页开始显示
           if(par == 1){
               this.params.page = 1;
           }
           //调用服务端的接口
           trainApi.courseType_list(this.params.page,this.params.size,this.params.condition).then((res) => {
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
       edit(courseTypeId){
          this.$router.push({
              path:'/informationmanage/page/courseType/edit/'+courseTypeId
          })
       },
       //删除课程类型信息
       del:function (courseTypeId) {
           this.$confirm('确认删除此页面吗?', '提示', {}).then(() => {
               trainApi.del_courseType(courseTypeId).then((res)=>{
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
       }
      },
        created(){
            //返回时到那一页
            this.params.page = Number.parseInt(this.$route.query.page || 1);
            this.params.condition.courseTypeId=this.$route.query.courseTypeId;
            this.params.condition.courseTypeName=this.$route.query.courseTypeName;
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
