<template>
  <div>
    <el-button type="primary"
               size="medium"
               style="margin-left: 15px"
               icon="el-icon-arrow-left"
               @click="go_back">返回
    </el-button>
    <el-card class="card">
      <el-form :model="activityRequest" style="margin-top: 20px;" label-width="150px" ref="pointAddForm">
        <el-form-item label="活动类型" prop="type">
          <el-select v-model="activityRequest.activity.typeId" placeholder="请选择活动类型">
            <el-option label="签到"     value="4_4_0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="活动名称" prop="title" >
          <el-input v-model="activityRequest.activity.title"></el-input>
        </el-form-item>
        <el-form-item label="副标题" prop="subTitle">
          <el-input v-model="activityRequest.activity.subTitle"></el-input>
        </el-form-item>
        <el-form-item label="活动起止时间">
          <el-col :span="8">
            <el-date-picker v-model="activityRequest.activity.beginTime" type="datetime" placeholder="选择开始时间"
                            style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col :span="1">至</el-col>
          <el-col :span="8">
            <el-date-picker v-model="activityRequest.activity.endTime" type="datetime" placeholder="选择结束时间"
                            style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="活动规则">
          <el-input type="textarea" :rows="2" v-model="activityRequest.activity.rule" placeholder="请填写活动规则"></el-input>
        </el-form-item>
        <el-form-item label="优惠类型">
          <el-radio-group v-model="activityRequest.activityRule.type">
            <el-radio label="4">积分</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="积分设置">
          <el-input v-model="activityRequest.activityRule.point" placeholder="为活动设置固定积分值"></el-input>
        </el-form-item>
        <el-form-item label="积分描述">
          <el-input v-model="activityRequest.activityRule.pointDesc"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button type="primary" @click="submit" style="margin-left: 20px">提交</el-button>
        <el-button type="primary" @click="resetForm('pointAddForm')">重置</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
    import * as marketingApi from '../../../api/marketing'
    export default {
        name: "activity_point_add",
        data() {
            return {
                activityRequest: {
                    activity: {
                        id: '',
                        title: '',
                        subTitle: '',
                        typeId: '',
                        beginTime: '',
                        endTime: '',
                        typeName: '',
                        images: '',
                        rule: '',
                        status: '',
                        description: ''
                    },
                    activityRule: {
                        type: '4',
                        point: '',
                        pointDesc: '',
                    },

                },

            }
        },
        methods: {
            // 重置
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            //提交
            submit() {
                this.$refs['pointAddForm'].validate((valid) => {
                    if (valid) {  //表单校验成功
                        this.$confirm('你确认提交吗?', '提示', {}).then(() => {
                            //调用user_add方法请求服务端的新增页面接口
                            marketingApi.activity_add(this.activityRequest).then(res=>{
                                //解析服务端的响应内容
                                if (res.success) {
                                    this.$message.success('提交成功')
                                    //将表单清空
                                    this.$refs['pointAddForm'].resetFields();
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
            // 返回
            go_back:function () {
                // 获取当前路由
                this.$router.push({
                    path:'/marketing/activity/point/list',
                    query:{

                    }
                })
            },
        }
    }
</script>

<style scoped>
  .card {
    width: 70%;
    margin-top: 10px;
    margin-left: 12%;
  }
</style>
