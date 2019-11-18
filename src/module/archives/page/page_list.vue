<template>
  <!--编写页面静态部分，即view部分-->
  <div>
    <div>
      <!--查询表单-->
      <el-form :model="params">
        量表名：<el-input v-model="params.pageAliase"  style="width: 100px"></el-input>
        <el-button type="primary" size="small" v-on:click="query">查询</el-button>
      </el-form>
      <el-table
        :data="list"
        stripe
        style="width: 100%">
        <el-table-column type="index" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="scaleName" label="量表名称" width="300">
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="page">
            <router-link tag="span" :to="{path:'/archives/page/detail',query:{
                         userId:page.row.userId,
                         scaleName:page.row.scaleName
                         }}">
              <el-button
                size="small"type="info">详情
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
              size="small"type="danger"
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
  import * as archivesApi from '../api/archives.js'

  export default {
    data() {
      return {
        siteList: [],//量表列表
        list: [],
        total: 0,
        params: {  //这里和上面的查询表单做了双向绑定
          page:1,
          size:5
        },
        reque:{
          userId: '03bc0359134e40bf8bff52df87d84f1e'
        },
        drawer: false,
        direction: 'rtl'
      }
    },
    methods:{
      query:function () {  //查询页面列表
        // alert('查询')
        //调用服务端的接口
        archivesApi.archivesList_list(this.params.page,this.params.size,this.reque).then((res)=>{
            //将res结果数据赋值给数据模型对象
            this.list = res.queryResult.list;
            this.total = res.queryResult.total;
        })
      },
      querySite:function(){  //查询站点
        cmsApi.page_site().then((res)=>{
          //将res结果数据赋值给模型对象
          this.siteList = res.queryResult.list;
        })
      },
      changePage:function (currentPage) {  //形参就是当前页码
        //
        this.params.page = currentPage;
        //调用query方法
        this.query();
      },
      //档案查看
      look:function (userId,scaleName) {
        alert(userId)
        alert(scaleName)
        //打开修改页面
        this.$router.push({
          path: '/cms/page/edit/'+pageId
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
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
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
