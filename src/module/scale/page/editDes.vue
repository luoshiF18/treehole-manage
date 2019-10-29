<template>
  <div>
    <el-button style="margin: 10px" size="small" @click="goback">
      <i class="iconfont icon-fanhui"></i> 返回
    </el-button>
    <div class="dv-des">
      <el-card>
      <el-form label-width="80px">
        <el-form-item label="描述">
          <el-input
            type="textarea"
            :autosize="{ minRows: 1, maxRows:4}"
            placeholder="description"
            resize="none">
          </el-input>
        </el-form-item>
        <el-form-item label="量表ID">
          <el-input placeholder="scaleId"></el-input>
        </el-form-item>
        <el-form-item label="得分1">
          <el-input placeholder="score1"></el-input>
        </el-form-item>
        <el-form-item label="得分2">
          <el-input placeholder="score2"></el-input>
        </el-form-item>
        <el-form-item label="预警等级">
          <el-input placeholder="warningLevel"></el-input>
        </el-form-item>
        <el-form-item label="警告信息">
          <el-input
            type="textarea"
            :autosize="{ minRows: 1, maxRows:4}"
            placeholder="warningMessage"
            resize="none">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'editDes',
    methods: {
      goback() {
        alert('00');
      },
      submit(){
        alert('提交');
      }
    }
  }
</script>
<style scoped>
  .dv-des {
    width: 500px;
  }

  .iconfont {
    font-size: 12px;
  }
</style>
