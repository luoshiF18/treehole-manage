<template>
  <div >
    <div id="pdfCentent">
    <el-button type="info" size="small" @click="goback"><span class="iconfont icon-fanhui">返回</span></el-button>
    <h1>{{pageForm.userNickName}}的预警报告</h1>
    <div class="dv">
      <el-row :gutter="20">
        <el-col :span="4">
          <div>
            <!--<el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>-->
            <span>
              <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2298681129,3725042306&fm=26&gp=0.jpg" class="avatar" >
            </span>
          </div>
        </el-col>
        <el-col :span="9">
          <div>
            <el-form  label-width="90px">
              <el-form-item  label="昵称：">
                <span>{{pageForm.userNickName}}</span>
              </el-form-item>
              <el-form-item label="姓名：">
                <span >{{pageForm.userName}}</span>
              </el-form-item>
              <el-form-item   label="生日：">
                <span  id="userBirth">{{dateFormat(pageForm.userBirth)}}</span>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="9">
          <div>
            <el-form label-width="90px">
              <el-form-item label="电话号码：">
                <span>{{pageForm.phone}}</span>
              </el-form-item>
              <el-form-item label="邮箱：">
                <span>{{pageForm.userEmail}}</span>
              </el-form-item>
              <el-form-item label="居住地：">
                <span>{{pageForm.userRegion}}</span>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <div class="font-one">测评量表信息</div>
        </el-col>
        <el-col :span="20">
          <div>
            <el-form label-width="90px">
              <el-form-item   label="量表名称：">
                <span>{{pageForm.scaleName}}</span>
              </el-form-item>
              <el-form-item label="量表分类：">
                <span>{{pageForm.scaleType}}</span>
              </el-form-item>
              <el-form-item label="量表描述：">
               <span>{{pageForm.topicDescription}}</span>
              </el-form-item>
              <el-form-item label="量表功能：">
                <span>{{pageForm.scaleFunction}}</span>
              </el-form-item>
              <el-form-item label="预警等级：">
                <span>{{pageForm.warningLevel}}</span>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="2">
          <div class="font-two">心理咨询师建议</div>
        </el-col>
        <el-col :span="20">
          <div>
            <el-form label-width="90px">
              <el-form-item>
                <el-input  v-model="pageForm.wmessage"
                           :disabled="true"
                           type="textarea"
                           placeholder="无"
                           resize="none"
                           :autosize="{ minRows: 8, maxRows: 16}">
                </el-input>
              </el-form-item>
              <el-form-item>
                <div class="block">
                  <span class="demonstration">生成时间：</span>
                  <el-date-picker
                    :disabled="true"
                    v-model="pageForm.createTime"
                    type="datetime">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
    <el-form>
      <el-form-item>
        <el-button style="margin-left:36vw" type="primary"  @click="ExportSavePdf(htmlTitle,nowTime)">PDF导出</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

    import * as warnApi from '../api/warn.js'
    import { Loading } from 'element-ui';
  export default {
    name: 'preview',
    data() {
      return {
          imageUrl:'',
          pageForm: {
              userNickName: '',
              userName: '',
              userBirth: '',
              phone: '',
              userEmail: '',
              userRegion: '',
              scaleName: '',
              scaleType: '', //量表的分类
              scaleFunction: '',
              topicDescription: '',
              warningLevel: 0,
              createTime: '',
              wmessage: ''
          },
          warningId: '',
          htmlTitle: "预警报告PDF",
          nowTime: "",
          fullscreen: true
      };
    },
    methods: {

       handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      goback(){
        this.$router.push({path:'/warn/page/list'})
      },
        dateFormat:function(time) {
            let date=new Date(time);
            let year=date.getFullYear();
            /* 在日期格式中，月份是从0开始的，因此要加0
             * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
             * */
            let month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
            let day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
            // 拼接
            return year+"-"+month+"-"+day;
        },
        queryOne:function () {
            //根据主键查询页面信息
            warnApi.page_get(this.warningId).then((res) => {
                console.log(res);
                if(res){
                    this.pageForm = res;
                }
                this.fullscreen = false;
                let loadingInstance = Loading.service(this.fullscreen);
                this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                    loadingInstance.close();
                });
            });
        }
    },
      created: function () {
          this.warningId=this.$route.params.warningId;  //取出路由中的warnId
      },

      mounted() {
          Loading.service(this.fullscreen);
          this.queryOne();
      }
  }
</script>
<style scoped>
  .avatar-uploader{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 10vw;
    height: 10vw;
    line-height: 10vw;
    text-align: center;
  }
  .avatar {
    width: 10vw;
    height: 10vw;
    display: block;
  }
  .el-row {
    margin-bottom: 20px;
  &
  :last-child {
    margin-bottom: 0;
  }
  }
  .font-one{
    width: 15px;
    margin: 38px auto;
    line-height: 24px;
    font-size: 20px;
  }
  .font-two{
    width: 15px;
    margin: 14px auto;
    line-height: 24px;
    font-size: 20px;
  }
  h1{
    text-align: center;
  }
  .block{
    float: right;
  }
</style>
