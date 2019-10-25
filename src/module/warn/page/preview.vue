<template>
    <div>
      <h1>查看</h1>
      <div class="dv">
        <el-form label-position="right" class="input-width">
          <el-form-item label="登录名">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="量表名">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="预警等级">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="提交信息">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="提交时间">
            <el-input></el-input>
          </el-form-item>
          <router-link tag="span" to="/warn/page/list">
            <el-button type="primary">返回</el-button>
          </router-link>
        </el-form>
      </div>
    </div>
</template>
<script>
    export default {
        name: 'preview',
    }
</script>
<style scoped>
  .input-width{
    width: 300px;
  }
</style>
