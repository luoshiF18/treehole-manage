<template>
  <div>
    <el-form :model="params" :inline="true">
      <el-form-item label="姓名">
        <el-input v-model="params.psychologist_name" placeholder="请输入咨询师姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" v-on:click="query">查询</el-button>
      </el-form-item>
    </el-form>
    <!--数据列表-->
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="psychologist_name" label="姓名" width="100"></el-table-column>
      <el-table-column prop="organization_name" label="机构名称" width="240"></el-table-column>
      <el-table-column prop="organization_address" label="机构地址" width="210"></el-table-column>
      <el-table-column prop="praise_number" label="好评量" width="110"></el-table-column>
      <el-table-column prop="praise_grade" label="好评等级" width="110"></el-table-column>
      <el-table-column prop="visit_number" label="访问量" width="110"></el-table-column>
      <el-table-column prop="platform_year" label="入驻时长" width="110"></el-table-column>
      <el-table-column prop="message" label="留言数" width="110"></el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="110" :formatter="dateFormat"></el-table-column>
      <el-table-column prop="update_time" label="更新时间" width="110" :formatter="dateFormat"></el-table-column>
      <el-table-column label="操作" width="130">
        <template slot-scope="page">
          <el-button size="small" type="text" @click="edit(page.row.psychologist_id)" icon="el-icon-edit">编辑</el-button>
          <el-button size="small" type="text" @click="del(page.row.psychologist_id)" icon="el-icon-delete">删除
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
          psychologist_name: '',
        }
      }
    },
    //方法列表
    methods: {
      //按条件查询
      query: function () {
        psychologistApi.detail_list(this.params.page, this.params.size, this.params).then((res) => {
          //将res服务端数据赋值给数据模型对象
          this.total = res.queryResult.total
          this.list = res.queryResult.list
        })
      },
      //分页查询
      changePage: function (page) {
        this.params.page = page;
        this.query();
      },
      //打开修改页面
      edit: function (psychologist_id) {
        this.$router.push({
          path: '/psychologist/detail/edit/' + psychologist_id,
          query: {
            page: this.params.page,
            psychologist_name: this.params.psychologist_name
          }
        })
      },
      //根据id删除咨询师详情信息
      del: function (psychologist_id) {
        this.$confirm('您确认提交吗?', '提示', {}).then(() => {
          //调用服务端接口
          psychologistApi.detail_del(psychologist_id).then(res => {
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
      this.params.psychologist_name = this.$route.query.psychologist_name || ''
    },
    mounted() {
      //实现进入页面就查询
      this.query();
    }
  }
</script>
​
