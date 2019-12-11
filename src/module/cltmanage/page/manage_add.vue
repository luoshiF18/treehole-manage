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
      <el-form-item label="预约日期" prop="cltDate">
        <el-date-picker
          v-model="pageForm.cltDate"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="checkDate">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="预约开始时间" prop="cltStartTime">
        <el-time-select
          placeholder="起始时间"
          v-model="pageForm.cltStartTime"
          :picker-options="{
            start: '00:00',
            step: '01:00',
            end: '23:59',
          }">
        </el-time-select>
      </el-form-item>
      <el-form-item label="预约结束时间" prop="cltEndTime">
        <el-time-select
          placeholder="结束时间"
          v-model="pageForm.cltEndTime"
          :picker-options="{
            start: '00:00',
            step: '01:00',
            end: '24:00',
            minTime: pageForm.cltStartTime
          }">
        </el-time-select>
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
      return {
        cltIdList: [],
        pageForm:{
          cltId:'',
          cltDate:'',
          cltStartTime: '',
          cltEndTime: '',
        },
        //日期效验(预约日期不能小于当前日期)
        checkDate: {
          disabledDate(time) {
            return time.getTime() < Date.now()- 8.64e7 || time.getTime() > Date.now()+ 3600 * 1000 * 24 * 7 - 8.64e7;
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '明天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '后天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 2);
              picker.$emit('pick', date);
            }
          }]
        },
        pageFormRules: {
          cltDate: [
            { required: true, message: '请选择预约日期', trigger: 'blur'},
          ],
          cltStartTime: [
            { required: true, message: '请选择预约开始时间', trigger:'blur'},
          ],
          cltEndTime: [
            { required: true, message: '请选择预约结束时间',trigger: 'blur' },
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
