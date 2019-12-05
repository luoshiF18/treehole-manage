<template>
  <div>
    <el-form :model="params" :inline="true">
      <el-form-item label="咨询师ID">
        <el-input v-model="params.psychologist_id" placeholder="请输入您要查询的咨询师ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" v-on:click="query">查询</el-button>
      </el-form-item>
      <el-form-item>
        <!--query用来取出数据模型中的参数放到url地址栏，带参传递-->
        <router-link :to="{path:'/psychologist/consultation/add/',
        query:{
          page:this.params.page,
          psychologist_id:this.params.psychologist_id
        }}">
          <el-button type="primary" icon="el-icon-plus">新增</el-button>
        </router-link>
      </el-form-item>
    </el-form>
    <!--数据列表-->
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="consultation_id" label="咨询记录ID" width="155"></el-table-column>
      <el-table-column prop="suggestion_id" label="建议ID" width="160"></el-table-column>
      <el-table-column prop="user_id" label="用户ID" width="146"></el-table-column>
      <el-table-column prop="user_nickname" label="用户昵称" width="160"></el-table-column>
      <el-table-column prop="psychologist_id" label="咨询师ID" width="155"></el-table-column>
      <el-table-column prop="psychologist_name" label="咨询师姓名" width="160"></el-table-column>
      <el-table-column prop="type" label="咨询类型" width="160"></el-table-column>
      <el-table-column prop="consultation_time" label="咨询时间" width="200" :formatter="dateFormat"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="page">
          <el-button size="small" type="text" @click="opensug(page.row.suggestion_id)" icon="el-icon-search">查看建议
          </el-button>
          <el-button size="small" type="text" @click="del(page.row.consultation_id)" icon="el-icon-delete">删除
          </el-button>
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
      //查询所有咨询记录
      get: function () {
        psychologistApi.consultation_all(this.params.page, this.params.size).then((res) => {
          //将res服务端数据赋值给数据模型对象
          this.total = res.queryResult.total
          this.list = res.queryResult.list
        })
      },
      //根据咨询师id查询咨询记录
      query: function () {
        psychologistApi.consultation_get(this.params.page, this.params.size, this.params.psychologist_id).then((res) => {
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
      //打开查看建议页面
      opensug: function (suggestion_id) {
        this.$router.push({
          path: '/psychologist/suggestion/open/' + suggestion_id,
          query: {
            page: this.params.page,
            suggestion_id: this.params.suggestion_id
          }
        })
      },
      //根据评价id删除评价信息
      del: function (consultation_id) {
        this.$confirm('您确认提交吗?', '提示', {}).then(() => {
          //调用服务端接口
          psychologistApi.consultation_del(consultation_id).then(res => {
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

​
