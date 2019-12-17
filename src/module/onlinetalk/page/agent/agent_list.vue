<template>
  <div>

    <!--编写页面静态部分，即view部分-->
      <!--查询表单-->
      <el-form :model="params">

        姓名查询：
        <el-input size="medium" clearable v-model="params.agent_name" style="width:200px" placeholder="请输入客服人员姓名">
        </el-input>
        <el-button size="medium" v-on:click="query" icon="el-icon-search" round>查询</el-button>

        <i style="margin-right: 50px"></i>
        <router-link tag="span" :to="{path:'/agent/add'}">
          <el-button type="primary">新增客服</el-button>
        </router-link>
      </el-form>

      <!--列表-->
      <el-table :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;">
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column prop="agent_name" label="客服姓名" width="120">
        </el-table-column>
        <el-table-column prop="agent_no" label="客服号码" width="150">
        </el-table-column>
        <el-table-column prop="creater" label="创建人" width="150">
        </el-table-column>
        <el-table-column prop="Create_Time" label="创建时间" width="180" :formatter="formatCreatetime">
        </el-table-column>
        <el-table-column prop="agent_phone" label="客服电话" width="150">
        </el-table-column>
        <el-table-column prop="agent_from" label="客服地址" width="250">
        </el-table-column>
        <el-table-column prop="agent_sex" label="客服性别" width="100">
        </el-table-column>
        <el-table-column label="编辑" width="80">
          <template slot-scope="scope">

            <el-button
              size="small"type="primary"
              @click="edit(scope.row.agent_id)">编辑
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="删除" width="80">
          <template slot-scope="scope">

            <el-button
              size="mini"
              type="danger"
              @click="del(scope.row.agent_id)">删除
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
  import * as agentApi from '../../api/onlinetalk'
  import utilApi from '@/common/utils';
  export default{
    data(){
      return {
        list:[],
        total:0,
        listLoading:false,
        params: {  //这里和上面的查询表单做了双向绑定
          page: 1,
          size: 10,
          agent_name:''
        },
        agent:{
          agent_id:'',
          agent_name:'',
          agent_no:'',
          create_time:'',
          creater:'',
          agent_password:'',
          agent_phone:'',
          agent_from:'',
          agent_sex:''
        }





      }
    },
    methods:{

     formatCreatetime(row, column){
        var createTime = new Date(row.create_time);
        if (createTime) {
          return utilApi.formatDate(createTime, 'yyyy-MM-dd');
        }
      },

      edit(agentId){
      // alert(agentId)
        this.$router.push({
          path: '/agent/edit/'+agentId,query:{
          agent: this.agent
          }})
      },
      //删除
      del (agentId) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          agentApi.agent_del(agentId).then((res) => {
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
        agentApi.agent_list(this.params).then((res)=>{
          //将res结果数据赋值给数据模型对象
          console.log(res)
          this.total = res.queryResult.total
          this.list = res.queryResult.list
          //alert(this.total)
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
