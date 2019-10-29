<template>
    <div>
      <h1>查看</h1>
      <div class="dv">
        <el-form label-position="right" class="input-width">
          <el-form-item label="登录名">
            <el-input v-model="pageForm.userNickName" ></el-input>
          </el-form-item>
          <el-form-item label="量表名">
            <el-input v-model="pageForm.scaleName"></el-input>
          </el-form-item>
          <el-form-item label="预警等级">
            <el-input v-model="pageForm.warningLevel"></el-input>
          </el-form-item>
          <el-form-item label="预警信息">
            <el-input type="textarea" v-model="pageForm.wmessage"></el-input>
          </el-form-item>
          <el-form-item label="提交时间">
            <el-date-picker type="datetime"  v-model="pageForm.createTime"></el-date-picker>
          </el-form-item>
          <router-link tag="span" to="/warn/page/list">
            <el-button type="primary">返回</el-button>
          </router-link>
        </el-form>
      </div>
    </div>
</template>
<script>
    import * as warnApi from '../api/warn.js'
    export default {
        data() {
            return {
                pageForm: {
                    "scaleName": '',
                    "userNickName": '',
                    "warningLevel": 0,
                    "createTime": '',
                    "wmessage": ''
                },
            }
        },
        methods:{



        },
        created: function () {
            this.warningId=this.$route.params.warningId;  //取出路由中的pageId 这个pageId要和index.js中定义的'/cms/page/edit/:pageId'中pageId保持一致
            //根据主键查询页面信息
            warnApi.page_get(this.warningId).then((res) => {
                console.log(res);
                if(res){
                    this.pageForm = res;
                }
            });
        },

    }
</script>
<style scoped>
  .input-width{
    width: 300px;
  }
</style>
