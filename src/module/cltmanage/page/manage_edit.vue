<template>
  <!--编写页面静态部分，即view部分-->
  <div>
    <el-form   :model="pageForm" label-width="120px" :rules="pageFormRules" ref="pageForm" style="padding: 20px">
      <el-form-item label="咨询师ID" prop="cltId">
        <el-input v-model="pageForm.cltId" auto-complete="off" disabled style="width: 220px"></el-input>
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
      <el-button type="primary" @click="go_back" >返回</el-button>
      <el-button type="primary" @click="editSubmit" >提交</el-button>
    </div>
  </div>

</template>
<script>
  import * as cmsApi from '../api/cltmanage'
  export default {
    data() {
      return {
        cltManageId: '',
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
      go_back(){
        this.$router.push({
          path: '/appointment/cltmanage/list', query: {
            page: this.$route.query.page,
          }
        })
      },
      editSubmit(){
        this.$refs.pageForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              //修改提交请求服务端的接口
              cmsApi.cltmanage_edit(this.cltManageId,this.pageForm).then((res) => {
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
      this.cltManageId=this.$route.params.cltManageId;  //取出路由中的pageId 这个pageId要和index.js中定义的'/cms/page/edit/:pageId'中pageId保持一致
      /**
       * 在这里使用的是 $route.params来获取路由中的信息,还有一种是$route.query来获取路由中的信息
       * 有什么区别? 应用场景各自又是什么?
       * $route.query是来获取路径中  例如:(请求路径xxx)?key=value 中的key的值
       * $route.params是来获取路径中 例如:(请求路径xxx)/value   获取value的值
       */
      //根据主键查询预约单信息
      cmsApi.cltmanage_get(this.cltManageId).then((res) => {
        console.log(res);
        if(res) {
          this.pageForm = res;
        }
      });
    }
  }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
