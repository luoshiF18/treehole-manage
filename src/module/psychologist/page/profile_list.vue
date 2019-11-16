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
      <el-form-item>
        <!--query用来取出数据模型中的参数放到url地址栏，带参传递-->
        <router-link :to="{path:'/psychologist/profile/add/',query:{
          page:this.params.page,
          name:this.params.name,
          sex:this.params.sex,
          qualification:this.params.qualification
        }}">
          <el-button type="primary">新增</el-button>
        </router-link>
      </el-form-item>
    </el-form>
    <!--数据列表-->
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="id" label="id" width="60"></el-table-column>
      <el-table-column prop="name" label="姓名" width="80"></el-table-column>
      <el-table-column prop="sex" label="性别" width="60"></el-table-column>
      <el-table-column prop="age" label="年龄" width="80"></el-table-column>
      <el-table-column prop="region" label="地区" width="100"></el-table-column>
      <el-table-column prop="qualification" label="专业资质" width="150"></el-table-column>
      <el-table-column prop="introduction" label="自我介绍" width="180"></el-table-column>
      <el-table-column prop="proficiency" label="擅长领域" width="160"></el-table-column>
      <el-table-column prop="studio" label="工作室" width="140"></el-table-column>
      <el-table-column prop="phone" label="联系方式" width="120"></el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="110"></el-table-column>
      <el-table-column prop="update_time" label="更新时间" width="110"></el-table-column>
      <el-table-column label="操作" width="110">
        <template slot-scope="page">
          <el-button size="small" type="text" @click="edit(page.row.id)">编辑</el-button>
          <el-button size="small" type="text" @click="del(page.row.id)">删除</el-button>
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
          sex: '',
          qualification: '' //专业资质
        }
      }
    },
    methods: {
      //查询所有
      query: function () {
        //res为服务端的数据，是一个形参，名字任意
        psychologistApi.profile_list(this.params.page, this.params.size, this.params).then((res) => {
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
          path: '/psychologist/profile/edit/' + id,
          query: {
            page: this.params.page,
            name: this.params.name,
            sex: this.params.sex,
            qualification: this.params.qualification
          }
        })
      },
      //删除记录
      del: function (id) {
        this.$confirm('您确认提交吗?', '提示', {}).then(() => {
          //调用服务端接口
          psychologistApi.profile_del(id).then(res => {
            if (res.success) {
              this.$message.success("删除成功！")
              //刷新页面
              this.get()
            } else {
              this.$message.error("删除失败！")
            }
          })
        })
      },
      //按照id自增查询所有简介信息
      get: function () {
        //res为服务端的数据，是一个形参，名字任意
        psychologistApi.profile_all(this.params.page, this.params.size).then((res) => {
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
      this.params.sex = this.$route.query.sex || ''
      this.params.qualification = this.$route.query.qualification || ''
    },
    //钩子函数，DOM元素渲染完成后调用，定义在methods之后
    mounted() {
      //实现进入页面就查询
      this.get()
    }
  }
</script>
<style>
  /*编写页面样式，不是必须的*/
</style>
​
