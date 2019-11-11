<template>
  <div>
    <el-form :model="stateForm" :rules="stateFormRules" label-width="80px" ref="stateForm">
      <el-form-item label="id" prop="id" style="width:20.7%">
        <el-input v-model.number="stateForm.id" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name" style="width:20.7%">
        <el-input v-model="stateForm.name" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="工作状态" prop="free">
        <el-select v-model="stateForm.free" placeholder="请选择" clearable>
          <el-option label="空闲" value="空闲"></el-option>
          <el-option label="忙碌" value="忙碌"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务价格" prop="price" style="width:20.7%">
        <el-input v-model.number="stateForm.price" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="所持证书" prop="certificate" style="width:30%">
        <el-input type="textarea" v-model="stateForm.certificate" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="微信" prop="weChat" style="width:20.7%">
        <el-input v-model="stateForm.weChat" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="QQ" prop="qq" style="width:20.7%">
        <el-input v-model="stateForm.qq" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="详细地址" prop="address" style="width:40%">
        <el-input v-model="stateForm.address" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="创建时间" required>
        <el-date-picker type="datetime" placeholder="创建时间" v-model="stateForm.createTime"></el-date-picker>
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
        stateForm: {
          id: '',
          name: '',
          free: '', //工作状态，空闲或忙碌
          price: '',
          certificate: '', //专业证书
          weChat: '',
          qq: '',
          address: '',
          createTime: new Date(),
          updateTime: new Date()
        },
        stateFormRules: {
          id: [
            {type: 'number', required: true, message: '请输入数字类型id', trigger: 'blur'},
          ],
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          free: [
            {required: true, message: '请选择工作状态', trigger: 'change'}
          ],
          price: [
            {type: 'number', required: true, message: '请输入数字类型价格', trigger: 'blur'}
          ],
          certificate: [
            {required: true, message: '请输入所持证书', trigger: 'blur'}
          ],
          weChat: [
            {required: true, message: '请输入微信联系方式', trigger: 'blur'}
          ],
          qq: [
            {required: true, message: '请输入QQ联系方式', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '请输入所在详细地址', trigger: 'blur'}
          ],
          createTime: [
            {type: 'date', required: true, message: '请选择创建时间', trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      //提交
      addSubmit: function () {
        this.$refs['stateForm'].validate((valid) => {
          //表单校验成功
          if (valid) {
            this.$confirm('您确认提交吗?', '提示', {}).then(() => {
              //调用profile_add方法请求服务端的新增简介信息接口
              psychologistApi.state_add(this.stateForm).then(res => {
                //解析服务端响应内容
                if (res.success) {
                  this.$message.success("提交成功！")
                  //添加成功，将表单清空
                  this.$refs['stateForm'].resetFields();
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
          path: '/psychologist/state/list',
          //取出url中的参数
          query: {
            page: this.$route.query.page,
            name: this.$route.query.name,
            price: this.$route.query.price,
            free: this.$route.query.free
          }
        })
      }
    },

    mounted() {

    }
  }
</script>

​
