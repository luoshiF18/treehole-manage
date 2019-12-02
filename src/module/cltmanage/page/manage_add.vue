<template>
  <!--编写页面静态部分，即view部分-->
  <div>
    <el-form   :model="pageForm" label-width="120px" :rules="pageFormRules" ref="pageForm" style="padding: 20px">
      <el-form-item label="咨询师ID" prop="cltId">
        <el-input v-model="pageForm.cltId" auto-complete="off" style="width: 220px"></el-input>
        <!--<el-select v-model="pageForm.cltId" filterable placeholder="请输入咨询师ID">-->
          <!--<el-option-->
            <!--v-for="item in cltIdList"-->
            <!--:key="item.cltId"-->
            <!--:label="item.cltId"-->
            <!--:value="item.cltId">-->
          <!--</el-option>-->
        <!--</el-select>-->
      </el-form-item>
      <el-form-item label="预约开始时间" prop="leftTime">
        <el-date-picker
          v-model="pageForm.leftTime"
          type="datetime"
          placeholder="选择开始日期时间"
          align="right"
          :picker-options="startTime">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="预约结束时间" prop="rightTime">
        <el-date-picker
          v-model="pageForm.rightTime"
          type="datetime"
          placeholder="选择结束日期时间"
          align="right"
          :picker-options="endTime">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="可预约人数" prop="appNumber">
        <el-input type="appNumber" v-model.number="pageForm.appNumber" style="width: 220px"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="padding: 20px">
      <el-button type="primary" @click="addSubmit" >提交</el-button>
      <el-button type="primary" @click="go_back" >返回</el-button>
    </div>
  </div>

</template>
<script>
  import * as cmsApi from '../api/cltmanage'
  export default {
    data() {
      var aaaaa = (rule, value, callback) => {
        if (value.getTime()< new Date(this.pageForm.leftTime).getTime()+3600*1000*1){
          callback(new Error('预约时间不能低于1小时'));
        }else {
          callback();
        }
      };
      return {
        cltIdList: [],
        pageForm:{
          cltId:'',
          leftTime:'',
          rightTime: '',
          appNumber: '',
        },
        // 开始时间小于结束时间，且开始时间大于此刻
        startTime: {
          disabledDate: time => {
            if (this.pageForm.rightTime) {
              return time.getTime() > new Date(this.pageForm.rightTime).getTime() || time.getTime() < Date.now()- 8.64e7
            } else {
              return time.getTime() < Date.now()- 8.64e7
            }
          }
        },
        // 结束时间大于开始时间，且大于此刻
        endTime: {
          disabledDate: time => {
            if (this.pageForm.leftTime) {
              return time.getTime() < new Date(this.pageForm.leftTime).getTime()- 8.64e7
            } else {
              return time.getTime() < Date.now()- 8.64e7
            }
          }
        },
        pageFormRules: {
          cltId:[
            { required: true, message: '请输入咨询师ID', trigger: 'blur'}
          ],
          leftTime: [
            { required: true, message: '请选择开始日期时间', trigger: 'blur'},
            { type:'date',min:Date.now(),message: '预约开始时间不能小于此刻时间',trigger: ['blur','change']}
          ],
          rightTime: [
            { type:'date',required: true, message: '请选择结束日期时间', trigger: ['blur','change']},
            {validator: aaaaa,trigger: ['blur','change']}
          ],
          appNumber: [
            { required: true, message: '预约人数不能为空',trigger: 'blur' },
            { type: 'integer', min: 1, message: '预约人数必须为正整数',trigger: 'blur'},
          ]
        }
      }
    },
    methods:{
      // //查询所有咨询师id
      // queryCltId:function(){
      //   cmsApi.clt_id().then((res)=>{
      //     //将res结果数据赋值给模型对象
      //     this.cltIdList = res.queryResult.list;
      //   })
      // },
      addSubmit:function () {
        this.$refs['pageForm'].validate((valid) => {
          if (valid) {  //表单校验成功
            this.$confirm('你确认提交吗?', '提示', {}).then(() => {
              //调用page_add方法请求服务端的新增页面接口
              cmsApi.cltmanage_add(this.pageForm).then(res=>{
                //解析服务端的响应内容
                if (res.success) {
                  this.$message.success('提交成功')
                  //将表单清空
                  this.$refs['pageForm'].resetFields();
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
      go_back:function () {
        this.$router.push({
          path:'/appointment/cltmanage/list',
          query:{
            page: this.$route.query.page, //取出路由中的参数
          }
        })
      }
    },
    mounted() {
      // this.queryCltId();
    }
  }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
