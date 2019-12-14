<template>
  <div>
    <el-form :model="profileExtForm" :rules="profileExtFormRules" label-width="80px" ref="profileExtForm">
      <!--简介信息数据列表-->
      <el-form-item label="姓名" prop="name" style="width:20.7%">
        <el-input v-model="profileExtForm.name" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="profileExtForm.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄" prop="age" style="width:20.7%">
        <el-input v-model="profileExtForm.age" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="所在地区" prop="region" style="width:20.7%">
        <el-input v-model="profileExtForm.region" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="专业资质" prop="qualification">
        <el-select v-model="profileExtForm.qualification" placeholder="请选择" clearable>
          <el-option label="国家二级心理咨询师" value="国家二级心理咨询师"></el-option>
          <el-option label="国家三级心理咨询师" value="国家三级心理咨询师"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="自我介绍" prop="introduction" style="width:30%">
        <el-input type="textarea" v-model="profileExtForm.introduction" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="擅长领域" prop="proficiency" style="width:60%">
        <el-input v-model="profileExtForm.proficiency" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="工作室" prop="studio" style="width:60%">
        <el-input v-model="profileExtForm.studio" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone" style="width:20.7%">
        <el-input v-model="profileExtForm.phone" auto-complete="off" clearable></el-input>
      </el-form-item>
      <!--状态信息数据列表-->
      <el-form-item label="工作状态" prop="state.free">
        <el-radio-group v-model="profileExtForm.state.free">
          <el-radio label="空闲"></el-radio>
          <el-radio label="忙碌"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="收费标准" prop="state.price" style="width:30%">
        <el-input type="textarea" v-model="profileExtForm.state.price" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="所持证书" prop="state.certificate" style="width:40%">
        <el-input v-model="profileExtForm.state.certificate" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="微信" prop="state.we_chat" style="width:20.7%">
        <el-input v-model="profileExtForm.state.we_chat" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="QQ" prop="state.qq" style="width:20.7%">
        <el-input v-model="profileExtForm.state.qq" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="详细地址" prop="state.address" style="width:40%">
        <el-input v-model="profileExtForm.state.address" auto-complete="off" clearable></el-input>
      </el-form-item>
      <!--详情信息数据列表-->
      <el-form-item label="机构名称" prop="detail.organization_name" style="width:30%">
        <el-input v-model="profileExtForm.detail.organization_name" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="机构地址" prop="detail.organization_address" style="width:30%">
        <el-input v-model="profileExtForm.detail.organization_address" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="好评数" prop="detail.praise_number" style="width:20.7%">
        <el-input v-model.number="profileExtForm.detail.praise_number" auto-complete="off" placeholder="请输入数字类型好评数"
                  clearable></el-input>
      </el-form-item>
      <el-form-item label="好评等级" prop="detail.praise_grade">
        <el-select v-model="profileExtForm.detail.praise_grade" placeholder="请选择" clearable>
          <el-option label="初级" value="初级"></el-option>
          <el-option label="中级" value="中级"></el-option>
          <el-option label="高级" value="高级"></el-option>
          <el-option label="专家" value="专家"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="访问量" prop="detail.visit_number" style="width:30%">
        <el-input v-model="profileExtForm.detail.visit_number" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="留言数" prop="detail.message" style="width:30%">
        <el-input v-model="profileExtForm.detail.message" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="入驻时长" prop="detail.platform_year" style="width:30%">
        <el-input v-model="profileExtForm.detail.platform_year" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="create_time">
        <el-date-picker type="datetime" placeholder="创建时间" v-model="profileExtForm.create_time"></el-date-picker>
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
        profileExtForm: {
          id: '',
          name: '',
          sex: '',
          age: '',
          region: '',
          qualification: '',//心理咨询师资质
          introduction: '',//自我介绍
          proficiency: '',//擅长领域
          studio: '',
          phone: '',
          create_time: new Date(),
          update_time: new Date(),
          state: {
            id: '',
            name: '',
            free: '',
            price: '',
            certificate: '',
            we_chat: '',
            qq: '',
            address: '',
            update_time: '',
            create_time: ''
          },
          detail: {
            psychologist_id: '',
            psychologist_name: '',
            organization_name: '',
            organization_address: '',
            praise_number: '',
            praise_grade: '',
            visit_number: '',
            platform_year: '',
            message: '',//留言数
            create_time: '',
            update_time: ''
          }
        },
        profileExtFormRules: {
          /*简介信息校验规则*/
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
          create_time: [
            {type: 'date', required: true, message: '请选择创建时间', trigger: 'change'}
          ],
          /*状态信息校验规则*/
          'state.free': [
            {required: true, message: '请选择工作状态', trigger: 'change'}
          ],
          'state.price': [
            {required: true, message: '请输入收费标准', trigger: 'blur'}
          ],
          'state.certificate': [
            {required: true, message: '请输入所持证书', trigger: 'blur'}
          ],
          'state.we_chat': [
            {required: true, message: '请输入微信联系方式', trigger: 'blur'}
          ],
          'state.qq': [
            {required: true, message: '请输入QQ联系方式', trigger: 'blur'}
          ],
          'state.address': [
            {required: true, message: '请输入所在详细地址', trigger: 'blur'}
          ],
          /* 详情信息校验规则*/
          'state.organization_name': [
            {required: false, message: '请输入所在机构名称', trigger: 'blur'}
          ],
          'state.organization_address': [
            {required: false, message: '请输入所在机构地址', trigger: 'blur'}
          ],
          'detail.praise_number': [
            {type: 'number', required: true, message: '请输入数字类型好评数', trigger: 'blur'}
          ],
          'detail.praise_grade': [
            {required: true, message: '请选择好评等级', trigger: 'change'}
          ],
          'detail.visit_number': [
            {required: true, message: '请输入访问量', trigger: 'blur'}
          ],
          'detail.message': [
            {required: true, message: '请输入留言数', trigger: 'blur'}
          ],
          'detail.platform_year': [
            {required: true, message: '请输入入住平台时长', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      //提交
      addSubmit: function () {
        this.$refs['profileExtForm'].validate((valid) => {
          //表单校验成功
          if (valid) {
            this.$confirm('您确认提交吗?', '提示', {}).then(() => {
              //调用profileExt_add方法请求服务端的新增接口
              psychologistApi.profileExt_add(this.profileExtForm).then(res => {
                //解析服务端响应内容
                if (res.success) {
                  this.$message.success("提交成功！")
                  //添加成功，将表单清空
                  this.$refs.profileExtForm.resetFields()
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
          path: '/psychologist/profile/list',
          //取出url中的参数
          query: {
            page: this.$route.query.page,
            name: this.$route.query.name,
            sex: this.$route.query.sex,
            qualification: this.$route.query.qualification
          }
        })
      }
    },
  }
</script>

​
