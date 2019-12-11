<template>
  <!--编写页面静态部分，即view部分-->
  <div>
    <el-form   :model="pageForm" label-width="80px"  :rules="pageFormRules" ref="pageForm">

      <el-form-item label="姓名" prop="teacherName">
        <el-input v-model="pageForm.teacherName" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="性别">
        <el-radio-group v-model="pageForm.teacherGender">
         <el-radio class="radio" label="1">男</el-radio>
         <el-radio class="radio" label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="职务" prop="teacherType">
        <el-select v-model="pageForm.teacherType" placeholder="请选择职务">
          <el-option
            v-for="item in typeList"
            :key="item.typeId"
            :label="item.typeName"
            :value="item.typeId">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="出生日期">
        <el-date-picker type="date" placeholder="出生日期" v-model="pageForm.teacherBirthDate"></el-date-picker>
      </el-form-item>
      ​

      <el-form-item label="电话" prop="teacherTelephone">
          <el-input v-model="pageForm.teacherTelephone" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="地址" prop="teacherAddress">
        <el-input v-model="pageForm.teacherAddress" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="备注" prop="teacherOther">
        <el-input v-model="pageForm.teacherOther" auto-complete="off" ></el-input>
      </el-form-item>
      ​
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="addSubmit" >提交</el-button>
      <el-button type="primary" @click="go_back" >返回</el-button>
    </div>

  </div>

</template>
<script>
    import * as trainApi from '../../api/informationmanage'
  export default {
    data() {
        return {
            //职务 列表
            typeList: [
                {
                    typeId:"1",
                    typeName:"讲师"
                },
                {
                    typeId:"2",
                    typeName:"班主任"
                }
            ],
            pageForm: {
                teacherName: '',
                teacherGender: '',
                teacherBirthDate: '',
                teacherType:"",
                teacherTelephone: '',
                teacherAddress: '',
                teacherOther:""
            },
            pageFormRules: {

                teacherName: [
                    {required: true, message: '请输入姓名', trigger: 'blur'}
                ],
                teacherType:[
                    {required: true, message: '请选择职务', trigger: 'blur'}
                ],
                teacherTelephone:[
                    {required: true, message: '请输入电话', trigger: 'blur'}
                ],
                teacherAddress: [
                    {required: true, message: '请输入地址', trigger: 'blur'}
                ]
            }
        }
    },
    methods:{
        //添加学生信息
        addSubmit(){
            this.$refs['pageForm'].validate((valid) => {
                if (valid) {  //表单校验成功
                    this.$confirm('你确认提交吗?', '提示', {}).then(() => {
                        //调用page_add方法请求服务端的新增页面接口
                        trainApi.add_teacher(this.pageForm).then(res=>{
                            //解析服务端的响应内容
                            if (res.success) {
                                this.$message.success('提交成功')
                                //将表单清空
                                this.$refs['pageForm'].resetFields();
                                //清空单项选择
                                this.pageForm.teacherGender = 6;
                                //清空时间
                                this.pageForm.teacherBirthDate = null;
                            }else if(res.message){
                                this.$message.error(res.message)
                            }else{
                                this.$message.error('提交失败')
                            }
                        });
                    })
                }
            })
        },
        //返回
        go_back(){
            this.$router.push({
                path:'/informationmanage/page/teacher/list',
                query:{
                    page: this.$route.query.page, //取出路由中的参数
                    teacherName:this.$route.query.teacherName,
                    teacherGender:this.$route.query.teacherGender,
                    teacherState:this.$route.query.teacherState,
                }
            })
        },

    },
    mounted(){

    }
  }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
