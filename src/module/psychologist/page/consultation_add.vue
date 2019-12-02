<template>
  <div>
    <el-form :model="consultationForm" :rules="consultationFormRules" label-width="80px" ref="consultationForm">
      <el-form-item label="咨询ID" prop="consultation_id" style="width:30%">
        <el-input v-model="consultationForm.consultation_id" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="咨询师ID" prop="psychologist_id" style="width: 40%">
        <el-input v-model="consultationForm.psychologist_id" auto-complete="off"
                  placeholder="请确保与简介信息列表中的咨询师id一致"></el-input>
      </el-form-item>
      <el-form-item label="用户ID" prop="user_id" style="width:40%">
        <el-input v-model="consultationForm.user_id" auto-complete="off" placeholder="请确保与用户列表中的用户id一致"></el-input>
      </el-form-item>
      <el-form-item label="建议ID" prop="suggestion_id" style="width:40%">
        <el-input v-model="consultationForm.suggestion_id" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="咨询类型" prop="type">
        <el-select v-model="consultationForm.type" placeholder="请选择" clearable>
          <el-option label="语音" value="语音"></el-option>
          <el-option label="视频" value="视频"></el-option>
          <el-option label="面对面" value="面对面"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" required>
        <el-date-picker type="datetime" placeholder="创建时间" v-model="consultationForm.consultation_time"></el-date-picker>
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
        consultationForm: {
          consultation_id: '',
          psychologist_id: '',
          user_id: '',
          suggestion_id: '',
          type: '',//咨询类型
          consultation_time: new Date()
        },
        consultationFormRules: {
          consultation_id: [
            {required: true, message: '请输入咨询id', trigger: 'blur'},
          ],
          psychologist_id: [
            {required: true, message: '请输入心理咨询师id', trigger: 'blur'}
          ],
          user_id: [
            {required: true, message: '请输入用户id', trigger: 'blur'}
          ],
          suggestion_id: [
            {required: true, message: '请输入建议id', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请选择咨询类型', trigger: 'change'}
          ],
          consultation_time: [
            {type: 'date', required: true, message: '请选择该咨询记录的创建时间', trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      //提交
      addSubmit: function () {
        this.$refs['consultationForm'].validate((valid) => {
          //表单校验成功
          if (valid) {
            this.$confirm('您确认提交吗?', '提示', {}).then(() => {
              psychologistApi.consultation_add(this.consultationForm).then(res => {
                //解析服务端响应内容
                if (res.success) {
                  this.$message.success("提交成功！")
                  //添加成功，将表单清空
                  this.$refs['consultationForm'].resetFields();
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
          path: '/psychologist/consultation/list',
          //取出当前url中的参数
          query: {
            page: this.$route.query.page,
            consultation_id: this.$route.query.consultation_id
          }
        })
      }
    },
  }
</script>

​

