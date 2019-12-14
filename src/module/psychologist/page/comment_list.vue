<template>
  <div>
    <el-form :model="params" :inline="true">
      <el-form-item label="咨询师ID">
        <el-input v-model="params.psychologist_id" placeholder="请输入您要查询的咨询师ID" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" v-on:click="query">查询</el-button>
      </el-form-item>
      <el-form-item>
        <!--query用来取出数据模型中的参数放到url地址栏，带参传递-->
        <router-link :to="{path:'/psychologist/comment/add/',
        query:{
          page:this.params.page,
          psychologist_id:this.params.psychologist_id
        }}">
          <el-button type="primary" icon="el-icon-plus">新增</el-button>
        </router-link>
      </el-form-item>
    </el-form>
    <!--数据列表-->
    <el-table :data="list" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="order_id" label="订单ID" width="120"></el-table-column>
      <el-table-column prop="consultation_id" label="咨询记录ID" width="160"></el-table-column>
      <el-table-column prop="user_id" label="用户ID" width="160"></el-table-column>
      <el-table-column prop="user_nickname" label="用户昵称" width="100"></el-table-column>
      <el-table-column prop="psychologist_id" label="咨询师ID" width="160"></el-table-column>
      <el-table-column prop="psychologist_name" label="咨询师姓名" width="100"></el-table-column>
      <el-table-column prop="comment_type" label="评价类型" width="100"></el-table-column>
      <el-table-column prop="comment_content" label="评价内容" width="210"></el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="110" :formatter="dateFormat"></el-table-column>
      <el-table-column prop="update_time" label="更新时间" width="110" :formatter="dateFormat"></el-table-column>
      <el-table-column label="操作" width="130">
        <template slot-scope="page">
          <el-button size="small" type="text" @click="edit(page.row.comment_id)" icon="el-icon-edit">编辑</el-button>
          <el-button size="small" type="text" @click="del(page.row.comment_id)" icon="el-icon-delete">删除</el-button>
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
  import * as psychologistApi from '../api/psychologist'
  import moment from 'moment'

  export default {
    //数据模型
    data() {
      return {
        list: [],
        total: 0,
        params: {
          page: 1, //当前页码
          size: 5, //每页显示个数
          psychologist_id: ''
        }
      }
    },
    //方法列表
    methods: {
      //查询所有评论信息
      get: function () {
        psychologistApi.comment_all(this.params.page, this.params.size).then((res) => {
          //将res服务端数据赋值给数据模型对象
          this.total = res.queryResult.total
          this.list = res.queryResult.list
        })
      },
      //根据咨询师id查询
      query: function () {
        psychologistApi.comment_get(this.params.page, this.params.size, this.params.psychologist_id).then((res) => {
          //将res服务端数据赋值给数据模型对象
          this.total = res.queryResult.total
          this.list = res.queryResult.list
        })
      },
      //分页查询
      changePage: function (page) {
        this.params.page = page;
        this.get();
      },
      //打开修改页面
      edit: function (comment_id) {
        this.$router.push({
          path: '/psychologist/comment/edit/' + comment_id,
          query: {
            page: this.params.page,
            psychologist_id: this.params.psychologist_id
          }
        })
      },
      //根据评价id删除评价信息
      del: function (comment_id) {
        this.$confirm('您确认提交吗?', '提示', {}).then(() => {
          //调用服务端接口
          psychologistApi.comment_del(comment_id).then(res => {
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
    created() {
      this.params.page = Number.parseInt(this.$route.query.page || 1)
      this.params.psychologist_id = this.$route.query.psychologist_id || ''
    },
    mounted() {
      //实现进入页面就查询
      this.get();
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
