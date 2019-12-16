<template>
  <div>
    <div id="pdfCentent">
      <h3>{{suggestionForm.user_nickname}}的治疗方案</h3>
      <div class="dv">
        <el-row :gutter="20">
          <el-col :span="4">
            <div>
              <span><img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                         class="avatar"></span>
            </div>
          </el-col>
          <el-col :span="9">
            <div>
              <el-form label-width="90px">
                <el-form-item label="用户昵称：">
                  <span>{{suggestionForm.user_nickname}}</span>
                </el-form-item>
                <el-form-item label="用户姓名：">
                  <span>{{suggestionForm.user_name}}</span>
                </el-form-item>
                <el-form-item label="用户手机：">
                  <span>{{suggestionForm.user_phone}}</span>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :span="9">
            <div>
              <el-form label-width="90px">
                <el-form-item label="医生姓名：">
                  <span>{{suggestionForm.psychologist_name}}</span>
                </el-form-item>
                <el-form-item label="医生手机：">
                  <span>{{suggestionForm.psychologist_phone}}</span>
                </el-form-item>
                <el-form-item label="预警等级：">
                  <span>{{suggestionForm.warning}}</span>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="2">
            <div class="font-two">建议信息</div>
          </el-col>
          <el-col :span="20">
            <div>
              <el-form label-width="50px">
                <el-form-item>
                  <el-input v-model="suggestionForm.suggestion_info"
                            :disabled="true"
                            type="textarea"
                            placeholder="暂无"
                            resize="none"
                            :autosize="{ minRows: 8, maxRows: 16}">
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="2">
            <div class="font-two">心理治疗</div>
          </el-col>
          <el-col :span="20">
            <div>
              <el-form label-width="50px">
                <el-form-item>
                  <el-input v-model="suggestionForm.psychotherapy"
                            :disabled="true"
                            type="textarea"
                            placeholder="暂无"
                            resize="none"
                            :autosize="{ minRows: 8, maxRows: 16}">
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="2">
            <div class="font-two">物理治疗</div>
          </el-col>
          <el-col :span="20">
            <div>
              <el-form label-width="50px">
                <el-form-item>
                  <el-input v-model="suggestionForm.physicotherapy"
                            :disabled="true"
                            type="textarea"
                            placeholder="暂无"
                            resize="none"
                            :autosize="{ minRows: 8, maxRows: 16}">
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <el-form :inline="true">
      <el-form-item>
        <el-button type="danger" icon="el-icon-back" style="margin-left:35vw" @click="go_back">返回</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" style="margin-left:0vw" @click="ExportSavePdf(htmlTitle,nowTime)">PDF导出
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
​
<script>
  import * as psychologistApi from '../api/psychologist'

  export default {
    data() {
      return {
        addLoading: false,//加载效果标记
        suggestionForm: {
          suggestion_id: '', //建议id
          description: '', //病情描述
          suggestion_info: '', //咨询师给出的建议信息
          psychotherapy: '', //心理治疗方案
          physicotherapy: '', //物理治疗方案
          warning: '', //咨询师给出的预警等级
          create_time: new Date(),
          update_time: new Date(),
          user_nickname: '', //用户昵称
          user_name: '', //用户姓名
          user_phone: '', //用户手机
          psychologist_name: '', //咨询师姓名
          psychologist_phone: '' //咨询师手机
        },
        htmlTitle: "治疗方案",
        nowTime: ""
      }
    },
    methods: {
      //返回建议信息列表
      go_back: function () {
        this.$router.push({
          path: '/psychologist/consultation/list',
          //取出url中的参数
          query: {
            page: this.$route.query.page,
            suggestion_id: this.$route.query.suggestion_id
          }
        })
      },
    },
    //钩子函数用来数据回显
    created: function () {
      //页面参数通过路由传入，这里通过this.$route.params来获取
      this.suggestion_id = this.$route.params.suggestion_id;
      //根据主键查询详情信息
      psychologistApi.suggestion_find(this.suggestion_id).then((res) => {
        if (res) {
          this.suggestionForm = res;
        }
      });
    },
  }
</script>
<style scoped>

  .avatar {
    width: 10vw;
    height: 10vw;
    background-color: transparent;
    border-radius: 50%;
    border: 1px solid #fdf5e6;
  }

  .font-two {
    width: 100px;
    margin: 40px auto;
    line-height: 28px;
    font-size: 18px;
  }

  h3 {
    text-align: center;
  }
</style>
​
