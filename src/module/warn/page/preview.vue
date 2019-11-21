<template>
  <div>
    <el-button type="info" size="small" @click="goback"><span class="iconfont icon-fanhui"></span></el-button>
    <h1>预警报告</h1>
    <div class="dv">
      <el-row :gutter="20">
        <el-col :span="4">
          <div>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-col>
        <el-col :span="9">
          <div>
            <el-form label-width="90px">
              <el-form-item label="昵称：">
                <span>{{tt}}</span>
              </el-form-item>
              <el-form-item label="姓名：">
                <span></span>
              </el-form-item>
              <el-form-item label="生日：">
                <span></span>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="9">
          <div>
            <el-form label-width="90px">
              <el-form-item label="电话号码：">
                <span></span>
              </el-form-item>
              <el-form-item label="邮箱：">
                <span></span>
              </el-form-item>
              <el-form-item label="居住地：">
                <span></span>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <div class="font-one">测评量表信息</div>
        </el-col>
        <el-col :span="20">
          <div>
            <el-form label-width="90px">
              <el-form-item label="量表名称：">
                <span></span>
              </el-form-item>
              <el-form-item label="量表分类：">
                <span></span>
              </el-form-item>
              <el-form-item label="量表描述：">
               <span></span>
              </el-form-item>
              <el-form-item label="量表功能：">
                <span></span>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <div class="font-two">心理咨询师建议</div>
        </el-col>
        <el-col :span="20">
          <div>
            <el-form label-width="90px">
              <el-form-item>
                <el-input  v-model="textarea"
                           type="textarea"
                           placeholder="咨询师预警建议："
                           resize="none"
                           :autosize="{ minRows: 8, maxRows: 16}">
                </el-input>
              </el-form-item>
              <el-form-item>
                <div class="block">
                  <span class="demonstration"></span>
                  <el-date-picker
                    v-model="value1"
                    type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-form>
      <el-form-item>
        <el-button style="margin-left:36vw" type="primary" @click="save">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: 'preview',
    data() {
      return {
        imageUrl: '',
        value1: '',
        textarea:'',
        tt:'你好'
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      goback(){
        this.$router.push({path:'/warn/page/list'})
      },
      save(){
        alert('00');
      }
    }
  }
</script>
<style scoped>
  .avatar-uploader{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 10vw;
    height: 10vw;
    line-height: 10vw;
    text-align: center;
  }
  .avatar {
    width: 10vw;
    height: 10vw;
    display: block;
  }
  .el-row {
    margin-bottom: 20px;
  &
  :last-child {
    margin-bottom: 0;
  }
  }
  .font-one{
    width: 15px;
    margin: 38px auto;
    line-height: 24px;
    font-size: 20px;
  }
  .font-two{
    width: 15px;
    margin: 14px auto;
    line-height: 24px;
    font-size: 20px;
  }
  h1{
    text-align: center;
  }
  .block{
    float: right;
  }
</style>
