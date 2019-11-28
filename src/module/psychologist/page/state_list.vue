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
      <el-form-item>
        <!--query用来取出数据模型中的参数放到url地址栏，带参传递-->
        <router-link :to="{path:'/psychologist/state/add/',query:{
          page:this.params.page,
          name:this.params.name,
          price:this.params.price,
          free:this.params.free
        }}">
          <el-button type="primary" icon="el-icon-plus">新增</el-button>
        </router-link>
      </el-form-item>
    </el-form>
    <!--数据列表-->
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="id" label="id" width="60"></el-table-column>
      <el-table-column prop="name" label="姓名" width="70"></el-table-column>
      <el-table-column prop="free" label="工作状态" width="80"></el-table-column>
      <el-table-column prop="price" label="收费标准" width="260"></el-table-column>
      <el-table-column prop="certificate" label="所持专业证书" width="230"></el-table-column>
      <el-table-column prop="we_chat" label="微信" width="115"></el-table-column>
      <el-table-column prop="qq" label="QQ" width="115"></el-table-column>
      <el-table-column prop="address" label="详细地址" width="180"></el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="110"></el-table-column>
      <el-table-column prop="update_time" label="更新时间" width="110"></el-table-column>
      <el-table-column label="操作" width="130">
        <template slot-scope="page">
          <el-button size="small" type="text" @click="edit(page.row.id)" icon="el-icon-edit">编辑</el-button>
          <el-button size="small" type="text" @click="del(page.row.id)" icon="el-icon-delete">删除</el-button>
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
        this.get()
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
      //删除记录
      del: function (id) {
        this.$confirm('您确认提交吗?', '提示', {}).then(() => {
          //调用服务端接口
          psychologistApi.state_del(id).then(res => {
            if (res.success) {
              this.$message.success("删除成功！")
              //刷新页面
              this.query()
            } else {
              this.$message.error("删除失败！")
            }
          })
        })
      },
      //按照id自增查询所有状态信息
      get: function () {
        //res为服务端的数据，是一个形参，名字任意
        psychologistApi.state_all(this.params.page, this.params.size).then((res) => {
          //将res服务端数据赋值给数据模型对象
          this.total = res.queryResult.total
          this.list = res.queryResult.list
        })
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
      this.get()
    }
  }

</script>
<style>

</style>
​
