<template>
  <div>
    <el-progress :percentage="33"></el-progress>
    <el-button type="primary" icon="el-icon-back" @click="go_back">返回列表</el-button>
    <br>
    <br>
    <el-card>
      <div class="dv-add">
        <el-form :model="params" label-width="110px" :rules="pageFormRules" ref="params">


          <el-form-item label="量表图片：">
            <el-upload
              v-model="params.images"
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>


          <el-form-item prop="scaleName" label="量表名称：">
            <el-input v-model="params.scaleName" placeholder="量表的全名称"></el-input>
          </el-form-item>
          <el-form-item prop="shortName" label="量表缩写：">
            <el-input v-model="params.shortName" placeholder="量表的简称"></el-input>
          </el-form-item>
          <el-form-item prop="topicDescription" label="话题描述：">
            <!--autosize自适应内容高度，只对 type="textarea" 有效，可传入对象;rows文本域高度; resize控制是否能被用户缩放-->
            <el-input v-model="params.topicDescription" type="textarea" :autosize="{ minRows: 1, maxRows:4}"
                      placeholder="量表的话题描述"
                      resize="none"></el-input>
          </el-form-item>
          <el-form-item prop="topicBackground" label="话题背景：">
            <el-input
              v-model="params.topicBackground"
              type="textarea"
              :autosize="{ minRows: 1, maxRows:4}"
              placeholder="量表的话题背景"
              resize="none">
            </el-input>
          </el-form-item>
          <el-form-item prop="topicSuggest" label="话题建议：">
            <el-input
              v-model="params.topicSuggest"
              type="textarea"
              :autosize="{ minRows: 1, maxRows:4}"
              placeholder="量表的话题建议"
              resize="none"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="scaleFunction" label="量表功能：">
            <el-input
              v-model="params.scaleFunction"
              type="textarea"
              :autosize="{ minRows: 1, maxRows:4}"
              placeholder="量表的功能"
              resize="none">
            </el-input>
          </el-form-item>
          <el-form-item prop="guide" label="测评指导：">
            <el-input
              v-model="params.guide"
              type="textarea"
              :autosize="{ minRows: 1, maxRows:4}"
              placeholder="量表的测评指导"
              resize="none"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="status" size="medium" label="量表状态：">
            <!--label:Radio 的 value,string / number-->
            <el-radio-group v-model="params.status">
              <el-radio-button label="1">启用</el-radio-button>
              <el-radio-button label="0">暂不启用</el-radio-button>
            </el-radio-group>
          </el-form-item>


          <el-form-item prop="typeId" label="分类：">
            <el-select style="width: 150px;margin-right: 50px" v-model="params.typeId" clearable placeholder="请选择分类">
              <el-option
                v-for="item in type"
                :key="item.id"
                :label="item.scaleType"
                :value="item.id">
              </el-option>
            </el-select>
            计分方式：
            <el-select style="width: 150px" v-model="params.scoreMethodId" clearable placeholder="请选择分类">
              <el-option
                v-for="item in scoreMethod"
                :key="item.id"
                :label="item.chinese"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="scaleType" size="medium" label="类型：">
            <el-radio-group v-model="params.scaleType">
              <el-radio-button label="2">普通类型</el-radio-button>
              <el-radio-button label="1">多选类型</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="价格(元)：">
            <el-input v-model="params.price" placeholder="price"></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input
              v-model="params.remark"
              type="textarea"
              :autosize="{ minRows: 1, maxRows:4}"
              placeholder="remark"
              resize="none"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <!--            <el-button type="primary" @click="onSubmit">提交</el-button>-->
            <el-button type="primary" @click.native="onSubmit" :loading="addLoading">保存并进行下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
  import * as scaleApi from '../api/scaleApi'

  export default {
    name: 'add',
    data() {
      return {
        addLoading: false,//加载效果标记
        type: [],
        scoreMethod: [],
        params: {
          scaleName: '',
          shortName: '',
          topicDescription: '',
          topicBackground: '',
          topicSuggest: '',
          scaleFunction: '',
          guide: '',
          status: 1,
          images: '',
          typeId: '',
          scaleType: 2,
          price: 0,
          scoreMethodId: '',
          remark: ''
        },
        pageFormRules: {
          scaleName: [
            {required: true, message: '请输入量表名称', trigger: 'blur'}
          ],
          shortName: [
            {required: true, message: '请输入量表缩写', trigger: 'blur'}
          ],
          topicDescription: [
            {required: true, message: '请输入话题描述', trigger: 'blur'}
          ],
          topicBackground: [
            {required: true, message: '请输入话题背景', trigger: 'blur'}
          ],
          topicSuggest: [
            {required: true, message: '请输入话题建议', trigger: 'blur'}
          ],
          status: [
            {required: true, message: '请选择量表状态', trigger: 'blur'}
          ],
          scaleFunction: [
            {required: true, message: '请输入量表功能', trigger: 'blur'}
          ],
          typeId: [
            {required: true, message: '请选择分类', trigger: 'blur'}
          ],
          scaleType: [
            {required: true, message: '量表类型', trigger: 'blur'}
          ],
          guide: [
            {required: true, message: '请输入测评指导', trigger: 'blur'}
          ]
        },
      }
    },
    methods: {
      //查询所有算分方式
      queryScoreMethod: function () {
        scaleApi.scale_getScoreMethod().then((res) => {
          this.scoreMethod = res.queryResult.list;
        });
      },
      queryTypeName: function () {
        //查询搜有分类
        scaleApi.type_list().then((res) => {
          this.type = res.queryResult.list;
        })

      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      //设置超时后等待状态改为false
      timeOut: function () {
        this.addLoading = false;
      },
      //测试，完成后改成后面那个
      next2: function () {
        //打开修改页面
        this.$router.push({
          path: '/scale/page/editOpt/', query: {
            scaleName: this.params.scaleName
          }
        })
      },
      onSubmit: function () {
        //提交
        this.$refs.params.validate((valid) => {
          if (valid) {
            //确认提示
            this.$confirm('确认保存吗？', '提示', {}).then(() => {
              this.addLoading = true;
              setTimeout(this.timeOut, 8000)
              scaleApi.scale_create(this.params).then((res) => {
                this.addLoading = false;
                //    解析响应内容
                if (res.success) {
                  this.$message.success('保存成功！');
                  //进行下一步，添加问题和选项
                  // this.next2();
                  setTimeout(this.next2, 1000)
                } else {
                  this.$message.error(res.message);
                }
              });
            });
          } else {
            this.$message.error('校验失败，请检查内容！');
            return false;
          }
        })
      },
      go_back() {
        this.$router.push({
          path: '/scale/page/list'
        });
      },
      //添加新量表
      next1: function () {
        this.$confirm('新增量表中途退出将删除已添加内容。', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'info'
        }).then(() => {
          this.$notify.info({
            title: '提示',
            message: '开始新增量表',
            showClose: false,
          });
        }).catch(() => {
          //返回列表页面
          this.$router.push({
            path: '/scale/page/list/'
          })
        });
      },
    },
    mounted() {
      //查询所有分类
      this.queryTypeName();
      //  查询所有算分方式
      this.queryScoreMethod();
    },
    created() {
      //    调用提示
      this.next1();
    }
  }
</script>
<style scoped>

  .avatar-uploader-icon {
    font-size: 28px;
    color: #007aff;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    border: 1px solid gray;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .dv-add {
    width: 600px;
  }
</style>
