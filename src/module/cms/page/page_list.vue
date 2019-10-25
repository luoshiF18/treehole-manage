<template>
  <!--编写页面静态部分，即view部分-->
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
      <el-table-column prop="pageName" label="页面名称" width="120">
      </el-table-column>
      <el-table-column prop="pageAliase" label="别名" width="120">
      </el-table-column>
      <el-table-column prop="pageType" label="页面类型" width="180">
      </el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径" width="250">
      </el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径" width="250">
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="page">
          <el-button
            size="small"type="text"
            @click="edit(page.row.pageId)">编辑
          </el-button>
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
          <el-button
            @click="preview(page.row.pageId)"
            type="text"
            size="small">页面预览
          </el-button>
          <el-button
            size="small" type="primary" plain @click="postPage(page.row.pageId)">发布
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

</template>
<script>
  import * as cmsApi from '../api/cms'

  export default {
    data() {
      return {
        siteList: [],//站点列表
        list: [],
        total: 0,
        params: {  //这里和上面的查询表单做了双向绑定
          page:1,
          size:10,
          siteId: '',
          pageAliase: ''
        }
      }
    },
    methods:{
      query:function () {  //查询页面列表
        // alert('查询')
        //调用服务端的接口
        cmsApi.page_list(this.params.page,this.params.size,this.params).then((res)=>{
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
      //页面修改
      edit:function (pageId) {
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
      //页面预览
      preview:function (pageId) {
        //打开浏览器窗口
        window.open("http://www.xuecheng.com/cms/preview/"+pageId);
      },
      postPage:function (pageId) {
        this.$confirm('确认发布该页面吗?', '提示', {
        }).then(() => {
          cmsApi.page_postPage(pageId).then((res) => {
            if(res.success){
              console.log('发布页面id='+pageId);
              this.$message.success('发布成功，请稍后查看结果');
            }else{
              this.$message.error('发布失败');
            }
          });
        }).catch(() => {

        });
      }
    },
    created(){
      //取出路由中的参数,赋值给数据对象
      this.params.page = Number.parseInt(this.$route.query.page || 1);
      this.params.siteId = this.$route.query.siteId || '';
    },
    mounted() {
      //当dom元素全部渲染完成后,调用query
      this.query();
      this.querySite();
    }
  }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
