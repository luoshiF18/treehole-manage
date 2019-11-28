<template>
  <div>
    <el-form :model="commentForm" :rules="commentFormRules" label-width="80px" ref="commentForm">
      <el-form-item label="评价类型" prop="comment_type">
        <el-radio-group v-model="commentForm.comment_type">
          <el-radio label="好评"></el-radio>
          <el-radio label="差评"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="评价内容" prop="comment_content" style="width:30%">
        <el-input type="textarea" v-model="commentForm.comment_content" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="更新时间" required>
        <el-date-picker type="datetime" placeholder="更新时间" v-model="commentForm.update_time"></el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click.native="editSubmit" :loading="addLoading">提交</el-button>
      <el-button type="primary" @click="go_back">返回</el-button>
    </div>
  </div>
</template>
​
<script>
  import * as psychologistApi from '../api/psychologist'

  export default {
    data() {
      return {
        addLoading: false,//加载效果标记
        commentForm: {
          comment_type: '',
          comment_content: '',
          update_time: new Date()
        },
        commentFormRules: {
          comment_type: [
            {required: true, message: '请选择评价类型', trigger: 'change'}
          ],
          comment_content: [
            {required: true, message: '请输入评价内容', trigger: 'blur'}
          ],
          update_time: [
            {type: 'date', required: true, message: '请选择更新时间', trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      //返回列表
      go_back: function () {
        this.$router.push({
          path: '/psychologist/comment/list',
          //取出url中的参数
          query: {
            page: this.$route.query.page,
            comment_id: this.$route.query.comment_id
          }
        })
      },
      //修改提交
      editSubmit: function () {
        //表单校验
        this.$refs['commentForm'].validate((valid) => {
          //校验通过
          if (valid) {
            this.$confirm('您确认提交吗?', '提示', {}).then(() => {
              this.addLoading = false;
              psychologistApi.comment_edit(this.commentForm).then(res => {
                if (res.success) {
                  this.addLoading = false;
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  //返回
                  this.go_back();
                } else {
                  this.addLoading = false;
                  this.$message.error('提交失败');
                }
              });
            });
          }
        });
      }

    },
    //钩子函数，进入修改页面就查询要修改的页面信息，用来做数据回显
    created: function () {
      //页面参数通过路由传入，这里通过this.$route.params来获取
      this.comment_id = this.$route.params.comment_id;
      //根据主键查询简介信息
      psychologistApi.comment_find(this.comment_id).then((res) => {
        if (res) {
          this.commentForm = res;
        }
      });
    }
  }
</script>

​
