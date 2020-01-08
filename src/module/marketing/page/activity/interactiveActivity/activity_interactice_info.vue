<template>
  <div>
    <el-button type="primary"
               size="medium"
               style="margin-left: 15px"
               icon="el-icon-arrow-left"
               @click="go_back">返回
    </el-button>
    <el-card class="card">
      <el-form :model="interactiveActivity" style="margin-top: 20px;" label-width="150px" ref="interactiveActivityAddForm">
        <el-form-item label="活动主题" prop="type">
          <el-input v-model="interactiveActivity.title"></el-input>
        </el-form-item>
        <el-form-item label="活动短标题" prop="type">
          <el-input v-model="interactiveActivity.shortTitle"></el-input>
        </el-form-item>
        <el-form-item label="活动副标题" prop="type">
          <el-input v-model="interactiveActivity.subTitle"></el-input>
        </el-form-item>
        <!--  <el-form-item label="活动上线时间">
            <el-date-picker
              v-model="interactiveActivity.releaseBeginTime"
              type="date"
              placeholder="选择上线日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="活动下线时间">
            <el-date-picker
              v-model="interactiveActivity.releaseEndTime"
              type="date"
              placeholder="选择上线日期">
            </el-date-picker>
          </el-form-item>-->
        <el-form-item label="上线起止时间">
          <el-col :span="8">
            <el-date-picker v-model="interactiveActivity.releaseBeginTime" type="date" placeholder="选择开始时间"
                            style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col :span="1">至</el-col>
          <el-col :span="8">
            <el-date-picker v-model="interactiveActivity.releaseEndTime" type="date" placeholder="选择结束时间"
                            style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="活动起止时间">
          <el-col :span="8">
            <el-date-picker v-model="interactiveActivity.beginTime" type="datetime" placeholder="选择开始时间"
                            style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col :span="1">至</el-col>
          <el-col :span="8">
            <el-date-picker v-model="interactiveActivity.endTime" type="datetime" placeholder="选择结束时间"
                            style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item label="活动类型">
          <el-col :span="6">
            <el-radio-group v-model="interactiveActivity.ifOnline">
              <el-radio :label="true">线上</el-radio><br>
              <el-radio :label="false" style="margin-top: 20px">线下(请填写活动举办地点)</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="18">
            <span v-if="interactiveActivity.ifOnline === false">
              <el-input v-model="interactiveActivity.place"  style="margin-top: 10px"></el-input>
            </span>
          </el-col>
        </el-form-item>
        <el-form-item label="活动费用">
          <el-col :span="6">
            <el-radio-group v-model="interactiveActivity.ifPay">
              <el-radio :label="false">免费</el-radio><br>
              <el-radio :label="true" style="margin-top: 20px">需支付活动费用：</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="18">
            <span v-if="interactiveActivity.ifPay === true">
              <el-input v-model="interactiveActivity.payAmount"  style="margin-top: 10px"></el-input>
            </span>
          </el-col>
        </el-form-item>
        <el-form-item label="人数限制">
          <el-col :span="6">
            <el-radio-group v-model="interactiveActivity.ifLimitNum">
              <el-radio :label="false">无</el-radio><br>
              <el-radio :label="true" style="margin-top: 20px">人数最多为：</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="18">
            <span v-if="interactiveActivity.ifLimitNum === true">
              <el-input v-model="interactiveActivity.limitNum"  style="margin-top: 10px"></el-input>
            </span>
          </el-col>
        </el-form-item>
        <el-form-item label="参与方式">
          <el-input v-model="interactiveActivity.joinInMode"></el-input>
        </el-form-item>

        <el-divider></el-divider>
        <span>活动描述</span>
        <v-editor v-model="interactiveActivity.introduce"></v-editor>
        <el-divider></el-divider>
        <span>活动联系人信息</span>
        <el-form-item label="姓名">
          <el-input v-model="interactiveActivity.originatorName"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="interactiveActivity.originatorPhone"></el-input>
        </el-form-item>
        <el-divider></el-divider>
        <span>其他说明</span>
        <el-form-item label="其他">
          <el-input v-model="interactiveActivity.other"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
    import * as marketingApi from '../../../api/marketing';
    import vEditor from '../../../components/Editor'
    export default {
        name: "activity_interactice_info",
        data() {
            return {
                id: '',
                interactiveActivity: {},
            }
        },
        methods: {
            getDataFromServer() {
              marketingApi.interactiveActivity_info(this.id).then((res) => {

                  this.interactiveActivity = res;
              })
            },
            // 返回
            go_back:function () {
                // 获取当前路由
                this.$router.push({
                    path:'/marketing/activity/interactive/list',
                    query:{

                    }
                })
            },
         /*   //单选按钮值改变事件
            changeIfOnline(val){
                if(val == 1){
                    console.log("online")
                    this.interactiveActivity.place = '';
                }else {
                    console.log("offline")
                    console.log(this.interactiveActivity.place)
                }
            },
            changeIfPay(val){
                if(val == 0){
                    console.log("free")
                    this.interactiveActivity.payAmount = '';
                }else {
                    console.log("pay")
                }
            },
            changeIfLimitNum(val){
                if(val == 0){
                    console.log("no limit")
                    this.interactiveActivity.limitNum = '';
                }else {
                    console.log("limit")
                }
            },*/
        },
        created() {
            //取出路由中的参数,赋值给数据对象
            this.id = this.$route.query.id;
            this.getDataFromServer();
        },
        components: {
            vEditor
        }
    }
</script>

<style scoped>

</style>
