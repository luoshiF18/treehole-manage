<template>
  <!--编写页面静态部分，即view部分-->
  <div>
    <!--查询表单-->
    <el-form :model="params">
      <el-select v-model="params.siteId" placeholder="请选择站点">
        <el-option v-for="item in siteList" :key="item.siteId" :label="item.siteName" :value="item.siteId">
          <!-- value值是用于提交的,label值是用于显示的 -->
        </el-option>
      </el-select>
      页面别名：
      <el-input v-model="params.pageAliase" style="width: 100px"></el-input>
      <el-button type="primary" size="small" @click="query">查询</el-button>
      <!-- 路由跳转进行传递数据 -->
      <router-link :to="{path:'/User/page/add',query:{page:this.params.page,siteId:this.params.siteId}}">
        <el-button type="primary" size="small">新增页面</el-button>
      </router-link>
      <!-- <router-link>就是相当于html中的a标签 to就是要跳转的路径 -->
    </el-form>
    <!--下拉列表-->
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="pageName" label="页面名称" width="120"></el-table-column>
      <el-table-column prop="pageAliase" label="别名" width="120"></el-table-column>
      <el-table-column prop="pageType" label="页面类型" width="180"></el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径" width="250"></el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径" width="250"></el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="page">
          <el-button size="small" type="text" @click="edit(page.row.pageId)">编辑</el-button>
          <!--
            slot-scope="page"
            slot-scope 是一个插槽,拿外面的数据,就是一行的数据
            page.row.pageId 拿到行的数据中的pageId
            注意:
            slot-scope="A"  @click="edit(B.row.pageId)
            A和B需要保持一致
          -->
          <el-button size="small" type="text" @click="del(page.row.pageId)">删除</el-button>
          <el-button @click="preview(page.row.pageId)" type="text" size="small">页面预览</el-button>
          <el-button size="small" type="primary" plain @click="postPage(page.row.pageId)">发布</el-button>
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
  export default {
    name: "userGrade"
  }
</script>

<style scoped>

</style>
