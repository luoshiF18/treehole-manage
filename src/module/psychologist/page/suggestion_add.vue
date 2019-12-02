<template>
  <div>
    <el-form :model="suggestionForm" :rules="suggestionFormRules" label-width="80px" ref="suggestionForm">
      <el-form-item label="建议ID" prop="suggestion_id" style="width:30%">
        <el-input v-model="suggestionForm.suggestion_id" auto-complete="off"
                  placeholder="请确保与咨询记录列表中的建议ID一致"></el-input>
      </el-form-item>
      <el-form-item label="病情描述" prop="description" style="width: 40%">
        <el-input type="textarea" v-model="suggestionForm.description" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="建议信息" prop="suggestion_info" style="width:40%">
        <el-input type="textarea" v-model="suggestionForm.suggestion_info" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="心理治疗" prop="psychotherapy" style="width:40%">
        <el-input type="textarea" v-model="suggestionForm.psychotherapy" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="物理治疗" prop="physicotherapy" style="width:40%">
        <el-input type="textarea" v-model="suggestionForm.physicotherapy" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="预警等级" prop="warning">
        <el-select v-model="suggestionForm.warning" placeholder="请选择" clearable>
          <el-option label="关注" value="关注"></el-option>
          <el-option label="追踪" value="追踪"></el-option>
          <el-option label="高危" value="高危"></el-option>
          <el-option label="警戒" value="警戒"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" required>
        <el-date-picker type="datetime" placeholder="创建时间" v-model="suggestionForm.create_time"></el-date-picker>
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
        suggestionForm: {
          suggestion_id: '',
          description: '',
          suggestion_info: '',
          psychotherapy: '',
          physicotherapy: '',
          warning: '',
          create_time: new Date(),
          update_time: new Date()
        },
        suggestionFormRules: {
          suggestion_id: [
            {required: true, message: '请输入建议id', trigger: 'blur'},
          ],
          description: [
            {required: true, message: '请输入病情描述信息', trigger: 'blur'}
          ],
          suggestion_info: [
            {required: true, message: '请输入建议信息', trigger: 'blur'}
          ],
          psychotherapy: [
            {required: true, message: '请输入心理治疗方案', trigger: 'blur'}
          ],
          physicotherapy: [
            {required: true, message: '请输入物理治疗方案', trigger: 'blur'}
          ],
          warning: [
            {required: true, message: '请选择预警等级', trigger: 'change'}
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
        this.$refs['suggestionForm'].validate((valid) => {
          //表单校验成功
          if (valid) {
            this.$confirm('您确认提交吗?', '提示', {}).then(() => {
              psychologistApi.suggestion_add(this.suggestionForm).then(res => {
                //解析服务端响应内容
                if (res.success) {
                  this.$message.success("提交成功！")
                  //添加成功，将表单清空
                  this.$refs['suggestionForm'].resetFields();
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
          path: '/psychologist/suggestion/list',
          //取出当前url中的参数
          query: {
            page: this.$route.query.page,
            suggestion_id: this.$route.query.suggestion_id
          }
        })
      }
    },
  }
</script>

​

