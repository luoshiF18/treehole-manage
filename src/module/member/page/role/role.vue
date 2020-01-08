<template>
  <div>

    <!--编写页面静态部分，即view部分-->
    <!--查询表单-->
    <el-form :model="this.params">

      名称查询：
      <el-input size="medium" clearable v-model="params.name" style="width:200px" placeholder="请输入角色名称">
      </el-input>
      <el-button size="medium" v-on:click="query" icon="el-icon-search" round>查询</el-button>

      <i style="margin-right: 50px"></i>
      <router-link tag="span" :to="{path:'/member/page/role/add'}">
        <el-button type="primary">新增角色</el-button>
      </router-link>
    </el-form>

    <!--列表-->
    <el-table :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="role_name" label="角色名称" width="120">
      </el-table-column>
      <el-table-column prop="description" label="描述" width="250">
      </el-table-column>

      <el-table-column prop="create_time" label="创建时间" width="180" :formatter="formatCreatetime">
      </el-table-column>

      <el-table-column label="查看权限" width="80">
        <template slot-scope="scope">

          <el-button
            size="small"type="primary"
            @click="look(scope.row.role_id)">查看
          </el-button>
        </template>
      </el-table-column>


      <el-table-column label="编辑" width="80">
        <template slot-scope="scope">

          <el-button
            size="small"type="primary"
            @click="edit(scope.row.role_id)">编辑
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="删除" width="80">
        <template slot-scope="scope">

          <el-button
            size="mini"
            type="danger"
            @click="del(scope.row.role_id)">删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <!--分页-->
    <el-col :span="24" class="toolbar">

      <el-pagination background layout="prev, pager, next" @current-change="changePage" :current-size="this.params.size"
                     :total=this.total :current-page="this.params.page"
                     style="float:right;">
      </el-pagination>
    </el-col>
  </div>
</template>
<script>
  import * as userApi from '../../api/member'
  import utilApi from '@/common/utils';
  export default{
    data(){
      return {
        list:[],
        total:0,
        listLoading:false,
        page: 1,
        size: 10,
        params: {  //这里和上面的查询表单做了双向绑定

          name:''
        },






      }
    },
    methods:{

      formatCreatetime(row, column){
        var createTime = new Date(row.create_time);
        if (createTime) {
          return utilApi.formatDate(createTime, 'yyyy-MM-dd');
        }
      },

      look(role_id){
        // alert(agentId)
        this.$router.push({
          path: '/member/page/permiss/list/'+role_id,query:{

          }})
      },
      edit(role_id){
        // alert(agentId)
        this.$router.push({
          path: '/member/page/role/edit/'+role_id,query:{

          }})
      },
      //删除
      del (role_id) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          userApi.role_del(role_id).then((res) => {
            this.listLoading = false;
            if(res.success){
              this.$message.success("删除成功")
              this.query();
            }else{
              this.$message.error('删除失败');
            }

          });
        }).catch(() => {

        });
      },
      changePage(page){
        this.params.page = page;
        this.query()
      },
      query(){
        /*     alert("查询")*/
        userApi.role_list(this.page,this.size,this.params).then((res)=>{
          //将res结果数据赋值给数据模型对象
          console.log(res);
          this.total = res.queryResult.total;
          this.list = res.queryResult.list;
        })
      },





    },
    created(){

    },
    mounted() {
      //默认查询页面
      this.query()



    }



  }
</script>
<style>

</style>
