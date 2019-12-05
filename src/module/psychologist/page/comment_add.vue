<template>
  <div>
    <el-form :model="commentForm" :rules="commentFormRules" label-width="80px" ref="commentForm">
      <el-form-item label="用户id" prop="user_id" style="width: 30%">
        <el-input v-model="commentForm.user_id" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="咨询师id" prop="psychologist_id" style="width:30%">
        <el-input v-model="commentForm.psychologist_id" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="订单id" prop="order_id" style="width:30%">
        <el-input v-model="commentForm.order_id" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="咨询id" prop="consultation_id" style="width:30%">
        <el-input v-model="commentForm.consultation_id" auto-complete="off" placeholder="请输入咨询记录ID"></el-input>
      </el-form-item>
      <el-form-item label="评价类型" prop="comment_type">
        <el-select v-model="commentForm.comment_type" placeholder="请选择" clearable>
          <el-option label="好评" value="好评"></el-option>
          <el-option label="差评" value="差评"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="评价内容" prop="comment_content" style="width:30%">
        <el-input type="textarea" v-model="commentForm.comment_content" auto-complete="off"
                  placeholder="请填写对咨询师的评价信息"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="create_time">
        <el-date-picker type="datetime" placeholder="创建时间" v-model="commentForm.create_time"></el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="addSubmit">提交</el-button>
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
        commentForm: {
          comment_id: '',
          user_id: '',
          psychologist_id: '',
          order_id: '', //订单id
          consultation_id: '', //咨询记录id
          comment_type: '', //评价类型
          comment_content: '', //评价内容
          create_time: new Date(),
          update_time: new Date()
        },
        commentFormRules: {
          user_id: [
            {required: true, message: '请填写用户id', trigger: 'blur'}
          ],
          psychologist_id: [
            {required: true, message: '请填写咨询师id', trigger: 'blur'}
          ],
          order_id: [
            {required: false, message: '请填写订单id', trigger: 'blur'}
          ],
          consultation_id: [
            {required: true, message: '请填写咨询记录id', trigger: 'blur'}
          ],
          comment_type: [
            {required: true, message: '请选择评价等级', trigger: 'change'}
          ],
          comment_content: [
            {required: true, message: '请输入评价内容', trigger: 'blur'}
          ],
          create_time: [
            {type: 'date', required: true, message: '请选择该评价信息的创建时间', trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      //提交
      addSubmit: function () {
        this.$refs['commentForm'].validate((valid) => {
          //表单校验成功
          if (valid) {
            this.$confirm('您确认提交吗?', '提示', {}).then(() => {
              psychologistApi.comment_add(this.commentForm).then(res => {
                //解析服务端响应内容
                if (res.success) {
                  this.$message.success("提交成功！")
                  //添加成功，将表单清空
                  this.$refs['commentForm'].resetFields();
                } else {
                  this.$message.error("提交失败！")
                }
              });
            })
          }
        });
      },
      //返回
      go_back: function () {
        this.$router.push({
          path: '/psychologist/comment/list',
          //取出当前url中的参数
          query: {
            page: this.$route.query.page,
            psychologist_id: this.$route.query.psychologist_id
          }
        })
      }
    },
  }
</script>

​
