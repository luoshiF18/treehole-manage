<template>
  <div>

    <el-progress :percentage="100"></el-progress>
    <div class="body-dv">
      <el-row :gutter="10">

        <el-col
          style="margin-top: 47px"
          :span="14">
          <el-card>
            <!--stripe是否为斑马纹-->
            <el-table
              :default-sort="{prop: 'score1', order: 'ascending'}"
              stripe
              :data="desInfoShow">
              <!-- type="expand" 和 Scoped slot 可以开启展开行功能，
              el-table-column 的模板会被渲染成为展开行的内容-->
              <el-table-column align="center"
                               width="100"
                               sortable
                               label="Low"
                               prop="score1">
              </el-table-column>
              <el-table-column align="center"
                               width="100"
                               sortable
                               label="High"
                               prop="score2">
              </el-table-column>
              <!--show-overflow-tooltip当内容过长被隐藏时显示 tooltip-->
              <el-table-column :show-overflow-tooltip="true"
                               class="el-tooltip__popper"
                               label="描述信息"
                               prop="description">
              </el-table-column>
              <el-table-column align="center"
                               width="100"
                               sortable
                               label="预警等级"
                               prop="warningLevel">
              </el-table-column>
              <el-table-column :show-overflow-tooltip="true"
                               class="el-tooltip__popper"
                               label="预警信息"
                               prop="warningMessage">
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <el-button type="success" style="margin: 10px;float: right" size="medium" @click="next">完成量表创建</el-button>

        <el-col :span="10">
          <!--          添加新得分描述-->
          <el-card>
            <el-form :inline="true" :model="form" ref="form">
              <el-form-item label="分值设置：" prop="score1">
                <div>
                  <el-input size="small" style="width: 90px" v-model="form.score1" placeholder="最低分"></el-input>
                  &nbsp;分&nbsp;到
                </div>
              </el-form-item>
              <el-form-item prop="score2">
                <div>
                  <el-input size="small" style="width: 90px" v-model="form.score2" placeholder="最高分"></el-input>
                  &nbsp;分
                </div>
              </el-form-item>

              <el-form-item label="描述信息：" prop="description">
                <el-input
                  style="width: 350px"
                  class="ele-input"
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows:7}"
                  placeholder="请填写描述信息"
                  v-model="form.description"
                  resize="none"
                ></el-input>
              </el-form-item>

              <el-form-item label="预警等级：" prop="warningLevel">
                <div>
                  <el-radio-group v-model="form.warningLevel" size="mini">
                    <el-radio-button label="1"></el-radio-button>
                    <el-radio-button label="2"></el-radio-button>
                    <el-radio-button label="3"></el-radio-button>
                    <el-radio-button label="4"></el-radio-button>
                    <el-radio-button label="5"></el-radio-button>
                  </el-radio-group>
                </div>
              </el-form-item>
              <el-form-item label="预警信息：" prop="warningMessage">
                <el-input
                  style="width: 350px"
                  class="ele-input"
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows:7}"
                  placeholder="请填写预警信息"
                  v-model="form.warningMessage"
                  resize="none">
                </el-input>
              </el-form-item>
              <el-button type="primary" @click="submit('form')" plain>新增描述</el-button>
            </el-form>
          </el-card>
          <!--          添加新得分描述结束-->
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
    import * as scaleApi from '../api/scaleApi'

    export default {
        name: 'editDes',
        data() {
            return {
                scaleId: '',
                form: {
                    score1: '',
                    score2: '',
                    scaleId: '',
                    description: '',
                    warningLevel: '1',
                    warningMessage: ''
                },
                desInfoShow: []
            }
        },
        methods: {
            //跳转到详细页面
            next: function () {
                this.$confirm('确认完成表量表创建吗？', '提示', {}).then(() => {
                    //打开详情
                    this.$router.push({
                        path: '/scale/page/info/', query: {
                            scaleId: this.scaleId
                        }
                    });
                });
            },
            findAllDesc: function () {
                scaleApi.scale_findDesc(this.scaleId).then((res) => {
                    this.desInfoShow = res.queryResult.list;
                });
            },
            submit(formName) {
                this.form.scaleId = this.scaleId;
                scaleApi.scale_addDesc(this.form).then((res) => {
                    if (res.success) {
                        this.findAllDesc();
                        this.$message.success('保存成功！');
                        this.$refs[formName].resetFields();
                    } else {
                        this.$message.error(res.message);
                    }
                });
            },
        },
        created() {
            //得到量表id
            this.scaleId = this.$route.query.scaleId;
            this.findAllDesc();
        }
    }
</script>
<!--自己的style，控制描述和预警预览框的宽度-->
<style>
  .el-tooltip__popper {
    max-width: 60%;
  }
</style>
<style scoped>
  .body-dv {

  }

  .ele-input {
    width: 25vw;
  }

  .card-style {
    margin-top: 10px;
    /* width: 35vw;*/
  }

  .iconfont {
    font-size: 12px;
  }
</style>
