<template>
  <div>
    <el-form :model="stateForm" :rules="stateFormRules" label-width="80px" ref="stateForm">
      <el-form-item label="姓名" prop="name" style="width:20.7%">
        <el-input v-model="stateForm.name" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="工作状态" prop="free">
        <el-radio-group v-model="stateForm.free">
          <el-radio label="空闲"></el-radio>
          <el-radio label="忙碌"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="收费标准" prop="price" style="width:30%">
        <el-input type="textarea" v-model="stateForm.price" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="所持证书" prop="certificate" style="width:40%">
        <el-input v-model="stateForm.certificate" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="微信" prop="we_chat" style="width:20.7%">
        <el-input v-model="stateForm.we_chat" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="QQ" prop="qq" style="width:20.7%">
        <el-input v-model="stateForm.qq" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="详细地址" prop="address" style="width:40%">
        <el-input v-model="stateForm.address" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="更新时间" required>
        <el-date-picker type="datetime" placeholder="更新时间" v-model="stateForm.update_time"></el-date-picker>
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
        stateForm: {
          id: '',
          name: '',
          free: '',
          price: '',
          certificate: '',
          we_chat: '',
          qq: '',
          address: '',
          create_time: new Date(),
          update_time: new Date()
        },
        stateFormRules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          free: [
            {required: true, message: '请选择工作状态', trigger: 'change'}
          ],
          price: [
            {required: true, message: '请输入服务价格', trigger: 'blur'}
          ],
          certificate: [
            {required: true, message: '请输入所持证书', trigger: 'blur'}
          ],
          we_chat: [
            {required: true, message: '请输入微信联系方式', trigger: 'blur'}
          ],
          qq: [
            {required: true, message: '请输入QQ联系方式', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '请输入所在详细地址', trigger: 'blur'},
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
          path: '/psychologist/state/list',
          //取出url中的参数
          query: {
            page: this.$route.query.page,
            name: this.$route.query.name,
            free: this.$route.query.free,
            price: this.$route.query.price
          }
        })
      },
      //修改
      editSubmit: function () {
        //表单校验
        this.$refs['stateForm'].validate((valid) => {
          //校验通过
          if (valid) {
            this.$confirm('您确认提交吗?', '提示', {}).then(() => {
              this.addLoading = false;
              psychologistApi.state_edit(this.stateForm).then(res => {
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
      psychologistApi.state_get(this.id).then((res) => {
        console.log(res);
        if (res) {
          this.stateForm = res;
        }
      });
    }
  }
</script>

​
