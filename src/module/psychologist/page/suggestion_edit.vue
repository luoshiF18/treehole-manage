<template>
  <div>
    <el-form :model="suggestionForm" :rules="suggestionFormRules" label-width="80px" ref="suggestionForm">
      <el-form-item label="病情描述" prop="description" style="width:40%">
        <el-input type="textarea" v-model="suggestionForm.description" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="建议信息" prop="suggestion_info" style="width:40%">
        <el-input type="textarea" v-model="suggestionForm.suggestion_info" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="心理治理" prop="psychotherapy" style="width:40%">
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
      <el-form-item label="更新时间" required>
        <el-date-picker type="datetime" placeholder="更新时间" v-model="suggestionForm.update_time"></el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="editSubmit">提交</el-button>
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
          description: [
            {required: true, message: '请输入病情描述信息', trigger: 'blur'}
          ],
          suggestion_info: [
            {required: true, message: '请输入所给建议信息', trigger: 'blur'}
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
          update_time: [
            {type: 'date', required: true, message: '请选择更新时间', trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      //返回建议信息列表
      go_back: function () {
        this.$router.push({
          path: '/psychologist/suggestion/list',
          //取出url中的参数
          query: {
            page: this.$route.query.page,
            suggestion_id: this.$route.query.suggestion_id
          }
        })
      },
      //修改提交
      editSubmit: function () {
        //表单校验
        this.$refs['suggestionForm'].validate((valid) => {
          //校验通过
          if (valid) {
            this.$confirm('您确认提交吗?', '提示', {}).then(() => {
              this.addLoading = false;
              psychologistApi.suggestion_edit(this.suggestionForm).then(res => {
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
    //钩子函数用来数据回显
    created: function () {
      //页面参数通过路由传入，这里通过this.$route.params来获取
      this.suggestion_id = this.$route.params.suggestion_id;
      //根据主键查询详情信息
      psychologistApi.suggestion_find(this.suggestion_id).then((res) => {
        if (res) {
          this.suggestionForm = res;
        }
      });
    },
  }
</script>

​
