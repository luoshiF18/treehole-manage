<template>
  <div>
    <el-form :model="detailForm" :rules="detailFormRules" label-width="80px" ref="detailForm">
      <el-form-item label="姓名" prop="psychologist_name" style="width:20.7%">
        <el-input v-model="detailForm.psychologist_name" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="机构名称" prop="organization_name" style="width:30%">
        <el-input v-model="detailForm.organization_name" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="机构地址" prop="organization_address" style="width:30%">
        <el-input v-model="detailForm.organization_address" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="好评数" prop="praise_number" style="width:20.7%">
        <el-input v-model="detailForm.praise_number" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="好评等级" prop="praise_grade">
        <el-select v-model="detailForm.praise_grade" placeholder="请选择" clearable>
          <el-option label="初级" value="初级"></el-option>
          <el-option label="中级" value="中级"></el-option>
          <el-option label="高级" value="高级"></el-option>
          <el-option label="专家" value="专家"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="访问量" prop="visit_number" style="width:30%">
        <el-input v-model="detailForm.visit_number" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="留言数" prop="message" style="width:30%">
        <el-input v-model="detailForm.message" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="入驻时长" prop="platform_year" style="width:30%">
        <el-input v-model="detailForm.platform_year" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="更新时间" required>
        <el-date-picker type="datetime" placeholder="更新时间" v-model="detailForm.update_time"></el-date-picker>
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
        detailForm: {
          psychologist_id: '',
          psychologist_name: '',
          organization_name: '',
          organization_address: '',
          praise_number: '', //好评数
          praise_grade: '',  //好评等级
          visit_number: '',  //访问量
          platform_year: '', //入驻时长
          message: '', //留言数
          create_time: new Date(),
          update_time: new Date()
        },
        detailFormRules: {
          psychologist_name: [
            {required: true, message: '请输入咨询师姓名', trigger: 'blur'}
          ],
          organization_name: [
            {required: false, message: '请输入所在机构名称', trigger: 'blur'}
          ],
          organization_address: [
            {required: false, message: '请输入所在机构地址', trigger: 'blur'}
          ],
          praise_number: [
            {required: true, message: '请输入获得好评数', trigger: 'blur'}
          ],
          praise_grade: [
            {required: true, message: '请选择好评等级', trigger: 'change'}
          ],
          visit_number: [
            {required: true, message: '请输入访问量', trigger: 'blur'}
          ],
          platform_year: [
            {required: true, message: '请输入入住平台时长', trigger: 'blur'}
          ],
          message: [
            {required: true, message: '请输入留言数', trigger: 'blur'}
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
          path: '/psychologist/detail/list',
          //取出url中的参数
          query: {
            page: this.$route.query.page,
            psychologist_name: this.$route.query.psychologist_name
          }
        })

      },
      //修改提交
      editSubmit: function () {
        //表单校验
        this.$refs['detailForm'].validate((valid) => {
          //校验通过
          if (valid) {
            this.$confirm('您确认提交吗?', '提示', {}).then(() => {
              this.addLoading = true;
              psychologistApi.detail_edit(this.detailForm).then(res => {
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
    created: function () {
      //页面参数通过路由传入，这里通过this.$route.params来获取
      this.psychologist_id = this.$route.params.psychologist_id;
      //根据主键查询详情信息
      psychologistApi.detail_get(this.psychologist_id).then((res) => {
        if (res) {
          this.detailForm = res;
        }
      });
    },
  }
</script>

​
