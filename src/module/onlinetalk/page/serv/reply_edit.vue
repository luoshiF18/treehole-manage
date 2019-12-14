<template>
  <div>
    <el-form  :model="replyForm" label-width="80px"  ref="replyForm" >
      <el-form-item label="标题" prop="reply_title">
        <el-input v-model="replyForm.reply_title" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="回复内容" prop="reply_content">
        <el-input v-model="replyForm.reply_content" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="类别" prop="category">
        <el-input v-model="replyForm.category" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="创建者" prop="reply_creater">
        <el-input v-model="replyForm.reply_creater" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="reply_createtime">
        <el-date-picker type="datetime" placeholder="创建时间" v-model="replyForm.reply_createtime"></el-date-picker>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="go_back">返回</el-button>
      <el-button type="primary" @click.native="editSubmit" :loading="addLoading">提交</el-button>
    </div>
  </div>
</template>
<script>
  import * as replyApi from '../../api/onlinetalk'
  export default{
    data(){
      return {
        replyId:'',

        addLoading: false,//加载效果标记
        //新增界面数据
        replyForm: {
            reply_id:'',
            reply_title:'',
            reply_content:'',
            reply_createtime:new Date(),
            reply_creater:'',
            category:''

        },

      }
    },
    methods:{
      go_back(){
        this.$router.push({
          path: '/reply/list', query: {
            page: this.$route.query.page,
          }
        })
      },
      editSubmit(){
        this.$refs.replyForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              replyApi.reply_edit(this.replyForm).then((res) => {
                console.log(res);
                if(res.success){
                  this.addLoading = false;
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  //返回
                  this.go_back();

                }else{
                  this.addLoading = false;
                  this.$message.error('提交失败');
                }
              });
            });
          }
        });
      }
    },
    created: function () {
      this.replyId=this.$route.params.replyId;
      //根据主键查询页面信息
      replyApi.reply_get(this.replyId).then((res) => {
        console.log(res);
        if(res){
          this.replyForm = res;
        }
      });
    },
    mounted:function(){



    }
  }
</script>
<style>

</style>
