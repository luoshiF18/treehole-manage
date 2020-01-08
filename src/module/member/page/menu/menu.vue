<template>
  <div>

    <!--编写页面静态部分，即view部分-->
    <!--查询表单-->
    <el-form :model="this.params">
      父菜单
      <el-select v-model="params.menu_pid"
                 clearable placeholder="父菜单"
                 filterable
                 size="medium"
                 style="width:110px;text-align:center;">
        <el-option
          v-for="item in menutypef"
          :key="item.id"
          :label="item.menuName"
          :value="item.id">
        </el-option>
      </el-select>
      名称查询：
      <el-input size="medium" clearable v-model="params.menuName" style="width:200px" placeholder="请输入权限名称">
      </el-input>
      <el-button size="medium" v-on:click="query" icon="el-icon-search" round>查询</el-button>

      <i style="margin-right: 50px"></i>
      <router-link tag="span" :to="{path:'/member/page/menu/add'}">
        <el-button type="primary">新增权限</el-button>
      </router-link>
    </el-form>

    <!--列表-->
    <el-table :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="menuName" label="菜单名称" width="120">
      </el-table-column>
      <el-table-column prop="code" label="菜单code" width="250">
      </el-table-column>

      <el-table-column prop="createTime" label="创建时间" width="180" :formatter="formatCreatetime">
      </el-table-column>

      <el-table-column label="编辑" width="80">
        <template slot-scope="scope">

          <el-button
            size="small"type="primary"
            @click="edit(scope.row.id)">编辑
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="删除" width="80">
        <template slot-scope="scope">

          <el-button
            size="mini"
            type="danger"
            @click="del(scope.row.id)">删除
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
        menutypef:[],
        params: {  //这里和上面的查询表单做了双向绑定
          page: 1,
          size: 10,
          menuName:'',
          menu_pid:''
        },






      }
    },
    methods:{

      formatCreatetime(row, column){
        var createTime = new Date(row.createTime);
        if (createTime) {
          return utilApi.formatDate(createTime, 'yyyy-MM-dd');
        }
      },

      edit(id){
        // alert(agentId)
        this.$router.push({
          path: '/member/page/menu/edit/'+id,query:{

          }})
      },
      //删除
      del (menuId) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          userApi.menu_del(menuId).then((res) => {
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
        userApi.menu_list(this.params).then((res)=>{
          //将res结果数据赋值给数据模型对象
          console.log(res);
          this.total = res.queryResult.total;
          this.list = res.queryResult.list;
        })
      },
      //查询所有父菜单
      queryMenuNamef: function(){
        userApi.user_menulistf().then((res) =>{
          this.menutypef= res.queryResult.list;

        })

      },




    },
    created(){
      this.queryMenuNamef();
    },
    mounted() {
      //默认查询页面
      this.query()



    }



  }
</script>
<style>

</style>
