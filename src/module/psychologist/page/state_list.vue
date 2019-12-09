<template>
  <!--编写页面静态部分，即view部分，<div>标签不能少-->
  <div>
    <el-form :model="params" :inline="true">
      <el-form-item label="姓名">
        <el-input v-model="params.name" placeholder="请输入咨询师姓名"></el-input>
      </el-form-item>
      <el-form-item label="工作状态">
        <el-select v-model="params.free" placeholder="请选择咨询师工作状态" clearable>
          <el-option label="空闲" value="空闲"></el-option>
          <el-option label="忙碌" value="忙碌"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务价格">
        <el-input v-model="params.price" placeholder="请输入您要查询的服务价格"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="query" icon="el-icon-search">查询</el-button>
      </el-form-item>
    </el-form>
    <!--数据列表-->
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="name" label="姓名" width="100"></el-table-column>
      <el-table-column prop="free" label="工作状态" width="80"></el-table-column>
      <el-table-column prop="price" label="收费标准" width="260"></el-table-column>
      <el-table-column prop="certificate" label="所持专业证书" width="230"></el-table-column>
      <el-table-column prop="we_chat" label="微信" width="160"></el-table-column>
      <el-table-column prop="qq" label="QQ" width="160"></el-table-column>
      <el-table-column prop="address" label="详细地址" width="180"></el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="110" :formatter="dateFormat"></el-table-column>
      <el-table-column prop="update_time" label="更新时间" width="110" :formatter="dateFormat"></el-table-column>
      <el-table-column label="操作" width="70">
        <template slot-scope="page">
          <el-button size="small" type="text" @click="edit(page.row.id)" icon="el-icon-edit">编辑</el-button>
        </template>
      </el-table-column>
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
  import moment from 'moment'

  export default {
    data() {
      return {
        list: [],
        total: 0,
        params: {
          page: 1, //当前页码
          size: 5, //每页显示个数
          name: '',
          price: '',
          free: '' //空闲或忙碌
        }
      }
    },
    methods: {
      //查询所有
      query: function () {
        //res为服务端的数据，是一个形参，名字任意
        psychologistApi.state_list(this.params.page, this.params.size, this.params).then((res) => {
          //将res服务端数据赋值给数据模型对象
          this.total = res.queryResult.total
          this.list = res.queryResult.list
        })
      },
      //分页查询
      changePage: function (page) {
        //调用当前实例的query方法
        this.params.page = page;
        this.query();
      },
      //打开修改页面
      edit: function (id) {
        this.$router.push({
          path: '/psychologist/state/edit/' + id,
          query: {
            page: this.params.page,
            name: this.params.name,
            price: this.params.price,
            free: this.params.free
          }
        })
      },
      //时间格式化  
      dateFormat: function (row, column) {
        var date = row[column.property];
        if (date == undefined) {
          return "";
        }
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
      }
    },
    //钩子函数，DOM元素还未渲染就调用
    created() {
      //取出url中的参数，赋值给数据对象，由于page为字符串，需要转换为int，如果page为空，则默认为转换为1
      this.params.page = Number.parseInt(this.$route.query.page || 1)
      this.params.name = this.$route.query.name || ''
      this.params.price = this.$route.query.price || ''
      this.params.free = this.$route.query.free || ''
    },
    mounted() {
      //实现进入页面就查询
      this.query();
    }
  }

</script>
<style>

</style>
​
