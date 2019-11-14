<template>
  <!--编写页面静态部分，即view部分-->
  <div>
    <!--查询表单-->
    <el-form :model="params">
      <el-select v-model="params.siteId" placeholder="请选择站点">
     <!-- <el-option v-for="item in siteList" :key="item.siteId" :label="item.siteName" :value="item.siteId"></el-option>-->
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
        <!-- value值是用于提交的,label值是用于显示的 -->
      </el-select>
      <!--      页面别名：
      <el-input v-model="params.pageAliase" style="width: 100px"></el-input>-->

      <el-button type="primary" size="small" @click="query">查询</el-button>
      <!-- 路由跳转进行传递数据 -->
      <router-link :to="{path:'/Marketing/page/add',query:{page:this.params.page,siteId:this.params.siteId}}">
        <el-button type="primary" size="small">新增页面</el-button>
      </router-link>
      <!-- <router-link>就是相当于html中的a标签 to就是要跳转的路径-->
    </el-form>
    <!--下拉列表-->
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column type="index"  width="60"></el-table-column>
      <el-table-column prop="letter" label="ID"       width="100"></el-table-column>
      <el-table-column prop="icon"   label="图片"     width="120"></el-table-column>
      <el-table-column prop="type_id"label="优惠类型" width="180"></el-table-column>
      <el-table-column prop="with_special" label="可用于特价商品" width="180"></el-table-column>
      <el-table-column prop="with_amount"  label="满多少金额"     width="180"></el-table-column>
      <el-table-column prop="stock"   label="库存金额" width="180"></el-table-column>
      <el-table-column prop="created" label="创建时间" width="180"></el-table-column>
      <el-table-column prop="valid_type"label="时效"   width="180"></el-table-column>
      <el-table-column prop="quota"     label="发券时间" width="180"></el-table-column>
      <el-table-column prop="limit_num" label="限领数量" width="180"></el-table-column>
      <el-table-column prop="used_by"   label="受益人群（0：全体1：普通会员,2：付费会员）" width="180"></el-table-column>
      <!--操作-->
      <el-table-column fixed="right" align="center" label="操作" width="250">
        <template slot-scope="page">
          <!--编辑按钮-->
          <el-button type="text" size="medium" @click="edit(page.row.pageId)">修改</el-button>
          <!--slot-scope="page"slot-scope 是一个插槽,拿外面的数据,就是一行的数据page.row.pageId 拿到行的数据中的pageId
            注意:slot-scope="A"  @click="edit(B.row.pageId) A和B需要保持一致 -->
          <!--发布按钮-->
         <!-- <el-button type="primary" icon="el-icon-check"size="small" @click="postPage(page.row.pageId)">发布</el-button>
          <el-button type="primary" icon="el-icon-view" @click="preview(page.row.pageId)" size="small">预览</el-button>-->
          <!--删除按钮-->
          <el-button type="text" size="medium"@click="del(page.row.pageId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
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
  import * as cmsApi from '../api/marketing'

  export default {
    data() {
      return {
        siteList: [],  // 站点列表
        list: [{
          letter: 'HKYH',
          tittle: '回馈用户',
          icon: '图片',
          type_id: '满减',
          with_special: '不能',
          with_amount: '200',
          used_amount: '20',
          stock:'1000',
          created:'2019-10-26',
          valid_type:'20',
          quota:'2019-10-26',
          limit_num:'200',
          used_by:'全体'
        }, {
          letter: 'HKYH',
          tittle: '回馈用户',
          icon: '图片',
          type_id: '满减',
          with_special: '不能',
          with_amount: '200',
          used_amount: '20',
          stock:'1000',
          created:'2019-10-26',
          valid_type:'20',
          quota:'2019-10-26',
          limit_num:'200',
          used_by:'全体'
        }, {
          letter: 'HKYH',
          tittle: '回馈用户',
          icon: '图片',
          type_id: '满减',
          with_special: '不能',
          with_amount: '200',
          used_amount: '20',
          stock:'1000',
          created:'2019-10-26',
          valid_type:'20',
          quota:'2019-10-26',
          limit_num:'200',
          used_by:'全体'
        }, ],
        total: 0,
        params: {  // 数据对象 这里和上面的查询表单做了双向绑定
          page: 1, // 当前页
          size: 10,
          siteId: '',
          pageAliase: ''
        }
      }
    },
    methods: {
      //页面查询
      query: function () {
        //调用服务端的接口
        cmsApi.page_list(this.params.page, this.params.size, this.params).then((res) => {
          //将res结果数据赋值给list数据模型对象
          this.list = res.queryResult.list;
          this.total = res.queryResult.total;
        })
      },
      querySite: function () {  //查询站点
        cmsApi.page_site().then((res) => {
          //将res结果数据赋值给模型对象
          this.siteList = res.queryResult.list;
        })
      },
      changePage: function (currentPage) {  //形参就是当前页码
        this.params.page = currentPage;
        //调用query方法
        this.query();
      },
      //页面修改
      edit: function (pageId) {
        //打开修改页面
        this.$router.push({
          path: '/User/page/edit/' + pageId
        })
      },
      //页面删除
      del: function (pageId) {
        this.$confirm('你确认删除吗?', '提示', {}).then(() => {
          //调用服务端接口
          cmsApi.page_del(pageId).then((res) => {
            if (res.success) {
              this.$message.success('删除成功')
              //刷新页面
              this.query();
            } else {
              this.$message.error('删除失败')
            }
          })
        })
      },
      //页面预览
      preview: function (pageId) {
        //打开浏览器窗口
        window.open("http://www.xuecheng.com/cms/preview/" + pageId);
      },
      postPage: function (pageId) {
        this.$confirm('确认发布该页面吗?', '提示', {}).then(() => {
          cmsApi.page_postPage(pageId).then((res) => {
            if (res.success) {
              console.log('发布页面id=' + pageId);
              this.$message.success('发布成功，请稍后查看结果');
            } else {
              this.$message.error('发布失败');
            }
          });
        }).catch(() => {

        });
      }
    },
    created() {
      //取出路由中的参数,赋值给数据对象
      this.params.page = Number.parseInt(this.$route.query.page || 1);
      this.params.siteId = this.$route.query.siteId || '';
    },
    mounted() { // 模板和HTML已经渲染出来
      //当dom元素全部渲染完成后,调用query
      this.query();
      this.querySite();
    }
  }
</script>

<style scoped>
  /*编写页面样式，不是必须*/
</style>
