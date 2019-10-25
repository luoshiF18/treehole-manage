<template>
    <div>
      <h1>预警列表</h1>
      <el-form ref="form" :model="form" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="1">-</el-col>
        <el-col :span="4">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="col" :span="4">
          <el-input  placeholder="用户名"></el-input>
        </el-col>
        <el-col class="col" :span="3">
          <el-input placeholder="量表名"></el-input>
        </el-col>
        <el-col :span="3">
          <el-select v-model="form.region" placeholder="预警等级">
            <el-option label="一" value="shanghai"></el-option>
            <el-option label="二" value="beijing"></el-option>
            <el-option label="三" value="beijing"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" size="mini">查询按钮</el-button>
        </el-col>
      </el-row>
      </el-form>

      <el-table style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="date" label="序号"></el-table-column>
        <el-table-column prop="name" label="登录名"></el-table-column>
        <el-table-column prop="address" label="姓名"></el-table-column>
        <el-table-column prop="address" label="性别"></el-table-column>
        <el-table-column prop="address" label="量表名称"></el-table-column>
        <el-table-column prop="address" label="预警等级"></el-table-column>
        <el-table-column prop="address" label="提交时间"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <router-link tag="span" :to="{path:'/warn/page/preview',query:{}}">
              <el-button type="primary" size="mini">查看</el-button>
            </router-link>
            <el-button type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>
<script>
    export default {
        name: 'warn_list',
      data() {
        return {
          form: {
            date1: '',
            date2: ''
          }
        }
      },
    }
</script>
<style scoped>
  .el-row {
    margin-bottom: 20px;
    margin-left: 20px;
  }
</style>
