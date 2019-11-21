<template>
  <div>
    <el-button style="margin: 10px" size="small" @click="goback">
      <i class="iconfont icon-fanhui"></i> 返回
    </el-button>
    <el-card>
      <div class="dv-add">
        <el-form label-width="110px">
          <el-form-item label="量表名称：">
            <el-input v-model="params.scaleName" placeholder="量表的全名称"></el-input>
          </el-form-item>
          <el-form-item label="量表缩写：">
            <el-input v-model="params.shortName" placeholder="量表的简称"></el-input>
          </el-form-item>
          <el-form-item label="话题描述：">
            <!--autosize自适应内容高度，只对 type="textarea" 有效，可传入对象;rows文本域高度; resize控制是否能被用户缩放-->
            <el-input v-model="params.topicDescription" type="textarea" autosize placeholder="量表的话题描述"
                      resize="none"></el-input>
          </el-form-item>
          <el-form-item label="话题背景：">
            <el-input
              v-model="params.topicBackground"
              type="textarea"
              :autosize="{ minRows: 1, maxRows:4}"
              placeholder="量表的话题背景"
              resize="none">
            </el-input>
          </el-form-item>
          <el-form-item label="话题建议：">
            <el-input
              v-model="params.topicSuggest"
              type="textarea"
              :autosize="{ minRows: 1, maxRows:4}"
              placeholder="量表的话题建议"
              resize="none"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="量表功能：">
            <el-input
              v-model="params.scaleFunction"
              type="textarea"
              :autosize="{ minRows: 1, maxRows:4}"
              placeholder="量表的功能"
              resize="none">
            </el-input>
          </el-form-item>
          <el-form-item label="测评指导：">
            <el-input
              v-model="params.guide"
              type="textarea"
              :autosize="{ minRows: 1, maxRows:4}"
              placeholder="量表的测评指导"
              resize="none"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="量表状态：">
            <!--label:Radio 的 value,string / number-->
            <el-radio-group v-model="params.status">
              <el-radio label="1">启用</el-radio>
              <el-radio label="0">暂不启用</el-radio>
            </el-radio-group>
          </el-form-item>

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

          <el-form-item label="分类：">
            <el-select v-model="params.typeId" clearable placeholder="请选择分类">
              <el-option
                v-for="item in type"
                :key="item.id"
                :label="item.scaleType"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型：">
            <el-radio-group v-model="params.scaleType">
              <el-radio label="1">普通类型</el-radio>
              <el-radio label="2">跳题类型</el-radio>
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
            <el-button type="primary" @click.native="onSubmit" :loading="addLoading">提交</el-button>
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
                params: {
                    scaleName: '',
                    shortName: '',
                    topicDescription: '',
                    topicBackground: '',
                    topicSuggest: '',
                    scaleFunction: '',
                    guide: '',
                    status: 0,
                    images: '',
                    typeId: '',
                    scaleType: 1,
                    price: 0,
                    remark: ''
                }
            }
        },
        methods: {
            queryTypeName: function () {
                //查询搜有分类
                scaleApi.type_list().then((res) => {
                    this.type = res.queryResult.list;
                })

            },
            goback() {
                alert('00');
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            onSubmit() {
                this.$confirm('确认提交吗？', '提示', {}).then(() => {
                    this.addLoading = true;
                    scaleApi.scale_create(this.params).then((res) => {
                        // console.log(res);
                        if (res.success) {
                            this.addLoading = false;
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            //返回
                            this.go_back();

                        } else {
                            this.addLoading = false;
                            this.$message.error('提交失败');
                        }
                    });
                });
            }
        },
        mounted() {
            //查询所有分类
            this.queryTypeName();
        }
    }
</script>
<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
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
