<template>
  <div>
    <el-form :model="appointmentForm" label-width="80px" ref="appointmentForm" size="mini">
      <el-form-item label="用户ID :" prop="userId" >
        <el-input v-model="appointmentForm.userId" auto-complete="off" ></el-input>
        <!--{{appointmentForm.userId}}-->
      </el-form-item>
      <el-form-item label="订单ID" prop="id">
        <el-input v-model="appointmentForm.id" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="咨询师ID" prop="cltId">
        <el-input v-model="appointmentForm.cltId" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="预约时间" prop="appTime">
        <el-date-picker
          v-model="appointmentForm.appTime"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd hh:mm:ss"
          align="left">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="咨询方式" prop="appMode">
        <el-radio-group v-model="appointmentForm.appMode">
          <el-radio border class="radio" label="0">文字</el-radio>
          <el-radio border class="radio" label="1">语音</el-radio>
          <el-radio border class="radio" label="2">视频</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="费用" prop="appPrice">
        <el-input v-model="appointmentForm.appPrice" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="appNote">
        <el-input type="textarea" v-model="appointmentForm.appNote"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker type="datetime" v-model="appointmentForm.createTime"></el-date-picker>
      </el-form-item>
      <el-form-item label="状态" prop="appStatus">
        <el-input v-model="appointmentForm.appStatus" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="go_back">返回</el-button>
      <el-button type="primary" @click.native="editSubmit" :loading="addLoading">提交</el-button>
    </div>
  </div>
</template>
<script>
  import * as cmsApi from '../api/appointment'
  export default{
    data(){
      return {
        //预约订单id
        appointmentId:'',
        addLoading: false,//加载效果标记
        //新增界面数据
        appointmentForm: {
          id:'',
          userId:'',
          cltId: '',
          appTime: '',
          appMode: '',
          appPrice:'',
          appNote:'',
          createTime:'',
          appStatus:''
        }
      }
    },
    methods:{
      go_back(){
        this.$router.push({
          path: '/appointment/order/list', query: {
            page: this.$route.query.page,
            siteId:this.$route.query.siteId
          }
        })
      },
      editSubmit(){
        this.$refs.appointmentForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              this.appointmentForm.appTime = this.appointmentForm.appTime+""
              //修改提交请求服务端的接口
              cmsApi.page_edit(this.appointmentId,this.appointmentForm).then((res) => {
                console.log(res);
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
            });
          }
        });
      }

    },
    created: function () {
      this.appointmentId=this.$route.params.appointmentId;  //取出路由中的pageId 这个pageId要和index.js中定义的'/cms/page/edit/:pageId'中pageId保持一致
      /**
       * 在这里使用的是 $route.params来获取路由中的信息,还有一种是$route.query来获取路由中的信息
       * 有什么区别? 应用场景各自又是什么?
       * $route.query是来获取路径中  例如:(请求路径xxx)?key=value 中的key的值
       * $route.params是来获取路径中 例如:(请求路径xxx)/value   获取value的值
       */
      //根据主键查询预约单信息
      cmsApi.page_get(this.appointmentId).then((res) => {
        console.log(res);
        if(res){
          this.appointmentForm = res;
          this.appointmentForm.appMode = res.appMode+"";
          this.appointmentForm.appTime = res.appTime.split(",")

        }
      });
    },
    mounted:function(){
      // this.querySite();
      // this.queryTemplate();
    }
  }
</script>
<style>

</style>
