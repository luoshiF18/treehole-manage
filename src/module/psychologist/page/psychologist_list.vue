<template>
  <!--编写页面静态部分，即view部分，<div>标签不能少-->
  <div>
    <!--查询表单-->
    <el-form :model="params" :inline="true">
      <el-form-item label="姓名">
        <el-input v-model="params.name" placeholder="请输入您要查询的姓名" clearable></el-input>
      </el-form-item>
      <el-form-item label="咨询师性别">
        <el-select v-model="params.sex" placeholder="请选择咨询师性别" clearable>
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="咨询师资质">
        <el-select v-model="params.qualification" placeholder="请选择咨询师专业资质" clearable>
          <el-option label="国家二级心理咨询师" value="国家二级心理咨询师"></el-option>
          <el-option label="国家三级心理咨询师" value="国家三级心理咨询师"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="query">查询</el-button>
      </el-form-item>
    </el-form>
    <!--数据列表-->
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="id" label="id" width="60"></el-table-column>
      <el-table-column prop="name" label="姓名" width="100"></el-table-column>
      <el-table-column prop="sex" label="性别" width="100"></el-table-column>
      <el-table-column prop="age" label="年龄" width="100"></el-table-column>
      <el-table-column prop="region" label="地区" width="120"></el-table-column>
      <el-table-column prop="qualification" label="资质" width="150"></el-table-column>
      <el-table-column prop="introduction" label="自我介绍" width="180"></el-table-column>
      <el-table-column prop="proficiency" label="擅长领域" width="170"></el-table-column>
      <el-table-column prop="studio" label="工作室" width="100"></el-table-column>
      <el-table-column prop="phone" label="联系方式" width="120"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="130"></el-table-column>
      <el-table-column prop="updateTime" label="信息更新时间" width="130"></el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="params.size"
      :current-page="params.page"
      v-on:current-change="changePage"
      style="float:right">
    </el-pagination>
  </div>
</template>
​
<script>
  /*编写页面静态部分，即model和vm部分*/
  import * as psychologistApi from '../api/psychologist'

  export default {
    data() {
      return {
        siteList: [],//站点列表
        list: [],
        total: 0,
        params: {
          page: 1, //当前页码
          size: 5, //每页显示个数
          name: '',
          sex: '',
          qualification: '' //专业资质
        }
      }
    },
    methods: {
      //查询所有
      query: function () {
        //res为服务端的数据，是一个形参，名字任意
        psychologistApi.psychologist_list(this.params.page, this.params.size, this.params).then((res) => {
          //将res服务端数据赋值给数据模型对象
          this.total = res.queryResult.total
          this.list = res.queryResult.list
        })
      },
      //分页查询
      changePage: function (page) {
        //调用当前实例的query方法
        this.params.page = page;
        this.query()
      }
    },
    //钩子函数，DOM元素渲染完成后调用，定义在methods之后
    mounted() {
      //实现进入页面就查询
      this.query()
    }
  }
</script>
<style>
  /*编写页面样式，不是必须的*/
</style>
​
