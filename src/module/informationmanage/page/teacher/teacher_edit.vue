<template>
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
      ​
      <el-form-item label="备注" prop="teacherOther">
        <el-input v-model="pageForm.teacherOther" auto-complete="off" ></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="go_back">返回</el-button>
      <el-button type="primary" @click.native="editSubmit" :loading="addLoading">提交</el-button>
    </div>
  </div>
</template>
<script>
    import * as trainApi from '../../api/informationmanage'
  export default{
    data(){
      return {
        //模版列表
        templateList:[],
        addLoading: false,//加载效果标记
          typeList:[
              {
                  typeId:1,
                  typeName:"讲师"
              },
              {
                  typeId:2,
                  typeName:"班主任"
              },
          ],
        //新增界面数据
          pageForm: {
              teacherName:'',
              teacherGender:'',
              teacherBirthDate:'',
              teacherType:"",
              teacherTelephone:'',
              teacherAddress:'',
              teacherOther:'',
          },
          //根据主键查询页面信息  的参数
          param:{
            //参数Id
              teacherId:"",
          },
          pageFormRules: {

              teacherName: [
                  {required: true, message: '请输入姓名', trigger: 'blur'}
              ],
              teacherType:[
                  {required: true, message: '请选择职务', trigger: 'blur'}
              ],
              teacherState:[
                  {required: true, message: '请选择状态', trigger: 'blur'}
              ],
              teacherTelephone:[
                {validator: this.checkPhone,required: true,  trigger: 'blur'}
              ],
              teacherAddress: [
                  {required: true, message: '请输入地址', trigger: 'blur'}
              ]
          },
      }
    },
    methods:{
      go_back(){
        this.$router.push({
          path: '/informationmanage/page/teacher/list', query: {
                //page: this.$route.params.page,
          }
        })
      },
      //校验手机号
      checkPhone(rule, value, callback) {
        if (!value) {
          callback(new Error('请输入手机号'))
        } else {
          const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/
          console.log(reg.test(value))
          if (reg.test(value)) {
            callback()
          } else {
            return callback(new Error('请输入正确的手机号'))
          }
        }
      },
        //进行修改
      editSubmit(){
        this.$refs.pageForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              trainApi.update_teacher(this.param.teacherId,this.pageForm).then((res) => {

                if(res.success){
                  this.addLoading = false;
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  //返回
                  this.go_back();

                }else{
                  this.addLoading = false;
                  this.$message.error('提交失败');
                }
              });
            })
          }
        });
      },

    },
    created: function () {
      this.param.teacherId=this.$route.params.teacherId;
      //根据主键查询页面信息
      trainApi.teacher_list(1,1,this.param).then((res) => {
        if(res){
           this.pageForm = res.queryResult.list[0];
           console.log(this.pageForm)
            this.pageForm.teacherGender=(res.queryResult.list[0].teacherGender)+"";
        }
      });
    },
    mounted:function(){

    }
  }
</script>
<style>

</style>
