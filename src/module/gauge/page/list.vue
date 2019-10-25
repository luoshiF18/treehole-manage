<template>
    <div>
      <h1>量表列表</h1>
      <el-table  style="width: 100%">
        <el-table-column prop="" label="序号"></el-table-column>
        <el-table-column prop="" label="标题"></el-table-column>
        <el-table-column prop="" label="创建时间"></el-table-column>
        <el-table-column prop="" label="创建人"></el-table-column>
        <el-table-column prop="" label="分类"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-dropdown>
              <i style="margin-right: 15px">编辑</i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link tag="span" to="/gauge/page/add">新增</router-link>
                </el-dropdown-item>
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button  type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>
<script>
    export default {
        name: 'list',
    }
</script>
<style scoped>

</style>
