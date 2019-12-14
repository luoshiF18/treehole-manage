<template>
  <div>

    <!--编写页面静态部分，即view部分-->


      <!--列表-->
      <el-table :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;">
        <el-table-column type="index" width="60">
        </el-table-column>
       <!-- <el-table-column prop="agent_name" label="客服姓名" width="200">
        </el-table-column>
        <el-table-column prop="touser_name" label="用户姓名" width="200">
        </el-table-column>-->
        <el-table-column prop="calltype" label="发送方" width="200">
        </el-table-column>
        <el-table-column prop="message_content" label="聊天内容" width="600">
        </el-table-column>
        <!--<el-table-column prop="message_content" label="用户聊天内容" width="150">
        </el-table-column>-->

        <el-table-column prop="message_createtime" label="时间" width="180" :formatter="formatCreatetime1">
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
  import * as messageApi from '../../api/onlinetalk'
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
          convers_id:''
        },
        message:{
          message_id:'', //消息id
          message_type:'', //回复标题
          calltype:'',//会话方向
          agent_id:'', //客服id
          touser_id:'', //用户id
          agent_name:'', //客服姓名
          touser_name:'', //用户姓名
          convers_id:'', //会话id*/
          message_content:'', //会话内容
          message_createtime:new Date(),//创建时间
        },





      }
    },
    methods:{

     formatCreatetime1(row, column){
        var createTime = new Date(row.message_createtime);
        if (createTime) {
          return utilApi.formatDate(createTime, 'yyyy-MM-dd hh:mm:ss');
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
       // alert("查询")
        //alert(this.$route.convers.convers_id)
       // let conversId = this.$route.convers.convers_id;
        //alert(conversId)
        this.params.convers_id = this.$route.params.conversId;
        messageApi.message_list(this.params).then((res)=>{
          //将res结果数据赋值给数据模型对象
          console.log(res)
          this.total = res.queryResult.total
          this.list = res.queryResult.list
          //alert(this.total)
        })
      },





    },
    created(){
   // alert(this.convers_id)
     // alert(this.$route.convers.convers_id)
    // this.message2.convers_id = this.$route.convers.convers_id;
      //alert(this.message2.convers_id)
     /* messageApi.message_list(this.params).then((res)=>{
        //将res结果数据赋值给数据模型对象
        console.log(res)
        this.total = res.queryResult.total
        this.list = res.queryResult.list
        //alert(this.total)
      })*/
    },
    mounted() {
      //默认查询页面
      this.query()



  }



  }
</script>
<style>

</style>
