<template>
  <div>
    <el-form :model="profileForm" :rules="profileFormRules" label-width="80px" ref="profileForm">
      <el-form-item label="姓名" prop="name" style="width:20.7%">
        <el-input v-model="profileForm.name" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="profileForm.sex" placeholder="请选择" clearable>
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年龄" prop="age" style="width:20.7%">
        <el-input v-model="profileForm.age" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="所在地区" prop="region" style="width:20.7%">
        <el-input v-model="profileForm.region" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="专业资质" prop="qualification">
        <el-select v-model="profileForm.qualification" placeholder="请选择" clearable>
          <el-option label="国家二级心理咨询师" value="国家二级心理咨询师"></el-option>
          <el-option label="国家三级心理咨询师" value="国家三级心理咨询师"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="自我介绍" prop="introduction" style="width:30%">
        <el-input type="textarea" v-model="profileForm.introduction" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="擅长领域" prop="proficiency" style="width:60%">
        <el-input v-model="profileForm.proficiency" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="工作室" prop="studio" style="width:60%">
        <el-input v-model="profileForm.studio" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone" style="width:20.7%">
        <el-input v-model="profileForm.phone" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="更新时间" required>
        <el-date-picker type="datetime" placeholder="更新时间" v-model="profileForm.updateTime"></el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="go_back">返回</el-button>
      <el-button type="primary" @click.native="editSubmit" :loading="addLoading">提交</el-button>
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
        profileForm: {
          id: '',
          name: '',
          sex: '',
          age: '',
          region: '',
          qualification: '', //专业资质
          introduction: '',
          proficiency: '', //擅长领域
          studio: '',
          phone: '',
          createTime: new Date(),
          updateTime: new Date()
        },
        profileFormRules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: 'change'}
          ],
          age: [
            {required: true, message: '请输入年龄', trigger: 'blur'}
          ],
          region: [
            {required: true, message: '请输入所在地区', trigger: 'blur'}
          ],
          qualification: [
            {required: true, message: '请选择资质认证', trigger: 'change'}
          ],
          proficiency: [
            {required: true, message: '请输入擅长领域', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {pattern: /^1[34578]\d{9}$/, message: '请输入合法的手机号', trigger: 'blur'},
          ],
          updateTime: [
            {type: 'date', required: true, message: '请选择更新时间', trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      //返回列表
      go_back: function () {
        this.$router.push({
          path: '/psychologist/profile/list',
          //取出url中的参数
          query: {
            page: this.$route.query.page,
            name: this.$route.query.name,
            sex: this.$route.query.sex,
            qualification: this.$route.query.qualification
          }
        })
      },
      //修改提交
      editSubmit: function () {
        //表单校验
        this.$refs['profileForm'].validate((valid) => {
          //校验通过
          if (valid) {
            this.$confirm('您确认提交吗?', '提示', {}).then(() => {
              this.addLoading = true;
              psychologistApi.profile_edit(this.profileForm).then(res => {
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
      this.id = this.$route.params.id;
      //根据主键查询页面信息
      psychologistApi.profile_get(this.id).then((res) => {
        console.log(res);
        if (res) {
          this.profileForm = res;
        }
      });
    },

    mounted() {

    }
  }
</script>

​
