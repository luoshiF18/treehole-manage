<template>
  <!--编写页面静态部分，即view部分-->
  <div>
    <div>
      <!--查询表单-->
      <el-form :model="params">
        <el-select v-model="params.siteId" placeholder="请选择站点">
          <el-option
            v-for="item in siteList"
            :key="item.siteId"
            :label="item.siteName"
            :value="item.siteId">
            <!-- value值是用于提交的,label值是用于显示的 -->
          </el-option>
        </el-select>
        页面别名：<el-input v-model="params.pageAliase"  style="width: 100px"></el-input>
        <el-button type="primary" size="small" v-on:click="query">查询</el-button>
        <router-link :to="{path:'/cms/page/add',query:{
        page:this.params.page,
        siteId:this.params.siteId
      }}">   <!-- 路由跳转进行传递数据 -->
          <el-button  type="primary" size="small">新增页面</el-button>
        </router-link>
        <!-- <router-link>就是相当于html中的a标签 to就是要跳转的路径 -->
      </el-form>
      <el-table
        :data="list"
        stripe
        style="width: 100%">
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column prop="user_nickname" label="登录名" width="120">
        </el-table-column>
        <el-table-column prop="userName" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="role_name" label="用户类型" width="120">
        </el-table-column>
        <el-table-column prop="scaleName" label="量表名称" width="120">
        </el-table-column>
        <el-table-column prop="create_date" label="提交时间" width="120">
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="page">
            <router-link tag="span" :to="{path:'/archivesReport/page/detail',query:{
                         resultId:page.row.id
                         }}">
              <el-button
                size="small"type="text">详情
              </el-button>
            </router-link>

            <!--
              slot-scope="page"
              slot-scope是一个插槽,拿外面的数据,就是一行的数据
              page.row.pageId 拿到行的数据中的pageId

              注意:
              slot-scope="A"  @click="edit(B.row.pageId)
              A和B需要保持一致
            -->
            <el-button
              size="small"type="text"
              @click="del(page.row.pageId)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="params.size"
        :current-page="params.page"
        @current-change="changePage"
        style="float: right;">
      </el-pagination>
    </div>
  </div>

</template>
<script>
  import * as archivesReportApi from '../api/archivesReport.js'

  export default {
    data() {
      return {
        siteList: [],//量表列表
        list: [],
        total: 0,
        params: {  //这里和上面的查询表单做了双向绑定
          page:1,
          size:8,
          userId: '2',
          scaleName: '生活事件量表'
        },
        reque:{
          userId: '2',
          scaleName: '生活事件量表'
        }
      }
    },
    methods:{
      query:function () {  //查询页面列表
        // alert('查询')
        //调用服务端的接口
        archivesReportApi.archivesReport_list(this.params.page,this.params.size).then((res)=>{
          //将res结果数据赋值给数据模型对象
          this.list = res.queryResult.list;
          this.total = res.queryResult.total;
        })
      },
      //档案查看
      look:function (resultId) {
        alert(resultId);
        //打开修改页面
        this.$router.push({
          path: '/archivesReport/page/detail/'+resultId
        })
      },
      //页面删除
      del:function (pageId) {
        this.$confirm('你确认删除吗?', '提示', {}).then(() => {
          //调用服务端接口
          cmsApi.page_del(pageId).then((res)=>{
            if (res.success){
              this.$message.success('删除成功')
              //刷新页面
              this.query();
            }else{
              this.$message.error('删除失败')
            }
          })
        })
      }
    },
    created(){
      //取出路由中的参数,赋值给数据对象
      this.params.page = Number.parseInt(this.$route.query.page || 1);
      // this.params.siteId = this.$route.query.siteId || '';
    },
    mounted() {
      //当dom元素全部渲染完成后,调用query
      this.query();
      //this.querySite();
    }
  }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
