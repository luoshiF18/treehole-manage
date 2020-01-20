<template>
  <!--编写页面静态部分，即view部分，<div>标签不能少-->
  <div>
    <el-form :model="params" :inline="true">
      <el-form-item label="建议ID">
        <el-input v-model="params.suggestion_id" placeholder="请输入您要查询的建议ID" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="query" icon="el-icon-search">查询</el-button>
      </el-form-item>
      <el-form-item>
        <!--query用来取出数据模型中的参数放到url地址栏，带参传递-->
        <router-link :to="{path:'/psychologist/suggestion/add/',query:{
          page:this.params.page,
          suggestion_id:this.params.suggestion_id
        }}">
          <el-button type="primary" icon="el-icon-plus">新增</el-button>
        </router-link>
      </el-form-item>
    </el-form>
    <!--数据列表-->
    <el-table :data="list" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="suggestion_id" label="建议ID" align="center"></el-table-column>
      <el-table-column prop="description" label="病情描述" align="center"></el-table-column>
      <el-table-column prop="suggestion_info" label="建议信息" align="center"></el-table-column>
      <el-table-column prop="psychotherapy" label="心理治疗" align="center"></el-table-column>
      <el-table-column prop="physicotherapy" label="物理治疗" align="center"></el-table-column>
      <el-table-column prop="warning" label="预警等级" align="center"></el-table-column>
      <el-table-column prop="create_time" label="创建时间" align="center" :formatter="dateFormat"></el-table-column>
      <el-table-column prop="update_time" label="更新时间" align="center" :formatter="dateFormat"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="page">
          <el-button size="small" type="text" @click="edit(page.row.suggestion_id)" icon="el-icon-edit">编辑</el-button>
          <el-button size="small" type="text" @click="del(page.row.suggestion_id)" icon="el-icon-delete">删除</el-button>
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
          suggestion_id: '',
        }
      }
    },
    methods: {
      //根据主键查询
      query: function () {
        //res为服务端的数据，是一个形参，名字任意
        psychologistApi.suggestion_get(this.params.page, this.params.size, this.params.suggestion_id).then((res) => {
          //将res服务端数据赋值给数据模型对象
          this.total = res.queryResult.total
          this.list = res.queryResult.list
        })
      },
      //分页查询
      changePage: function (page) {
        //调用当前实例的get方法
        this.params.page = page;
        this.get()
      },
      //打开编辑页面
      edit: function (suggestion_id) {
        this.$router.push({
          path: '/psychologist/suggestion/edit/' + suggestion_id,
          query: {
            page: this.params.page,
            suggestion_id: this.params.suggestion_id
          }
        })
      },
      //删除一条建议
      del: function (suggestion_id) {
        this.$confirm('您确认提交吗?', '提示', {}).then(() => {
          //调用服务端接口
          psychologistApi.suggestion_del(suggestion_id).then(res => {
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
      //查询所有建议信息
      get: function () {
        //res为服务端的数据，是一个形参，名字任意
        psychologistApi.suggestion_all(this.params.page, this.params.size).then((res) => {
          //将res服务端数据赋值给数据模型对象
          this.total = res.queryResult.total
          this.list = res.queryResult.list
        })
      },
      //时间格式化  
      dateFormat: function (row, column) {
        var date = row[column.property];
        if (date == undefined) {
          return "";
        }
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'row1';
        } else if (rowIndex === 3) {
          return 'row3';
        }
        return '';
      }
    },
    //钩子函数，DOM元素还未渲染就调用
    created() {
      //取出url中的参数，赋值给数据对象，由于page为字符串，需要转换为int，如果page为空，则默认为转换为1
      this.params.page = Number.parseInt(this.$route.query.page || 1)
      this.params.suggestion_id = this.$route.query.suggestion_id || ''
    },
    mounted() {
      //实现进入页面就查询
      this.get()
    }
  }
</script>
<style>
  .el-table .row1 {
    background: oldlace;
  }

  .el-table .row3 {
    background: #f0f9eb;
  }
</style>


​
