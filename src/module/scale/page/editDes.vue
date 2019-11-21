<template>
  <div>
    <el-button style="margin: 10px" size="small" @click="goback">
      <i class="iconfont icon-fanhui"></i> 返回
    </el-button>
    <div class="body-dv">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card>
            <!--stripe是否为斑马纹-->
            <el-table stripe
                      :data="desShow">
              <!-- type="expand" 和 Scoped slot 可以开启展开行功能，
              el-table-column 的模板会被渲染成为展开行的内容-->
              <el-table-column align="center"
                               width="100"
                               sortable
                               label="得分1"
                               prop="score1">
              </el-table-column>
              <el-table-column align="center"
                               width="100"
                               sortable
                               label="得分2"
                               prop="score2">
              </el-table-column>
              <!--show-overflow-tooltip当内容过长被隐藏时显示 tooltip-->
              <el-table-column :show-overflow-tooltip="true"
                               label="描述信息"
                               prop="description">
              </el-table-column>
              <el-table-column align="center"
                               width="100"
                               sortable
                               label="预警等级"
                               prop="radio1">
              </el-table-column>
              <el-table-column :show-overflow-tooltip="true"
                               label="警告信息"
                               prop="warningMessage">
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>

        <el-col :span="12">
          <el-card>
            <el-form :inline="true" :model="form" ref="form">
              <el-form-item label="得分1" prop="score1">
                <el-input v-model="form.score1" placeholder="score1"></el-input>
              </el-form-item>
              <el-form-item label="得分2" prop="score2">
                <el-input v-model="form.score2" placeholder="score2"></el-input>
              </el-form-item>

              <div style="margin-top: 10px"></div>
              <el-form-item label="描述信息" prop="description">
                <el-input class="ele-input" type="textarea"
                          :autosize="{ minRows: 3, maxRows:8}"
                          placeholder="description"
                          v-model="form.description"
                          resize="none"></el-input>
              </el-form-item>

              <div style="margin-top: 10px"></div>
              <el-form-item label="预警等级" prop="radio1">
                <div>
                  <el-radio-group v-model="form.radio1" size="mini">
                    <el-radio-button label="1"></el-radio-button>
                    <el-radio-button label="2"></el-radio-button>
                    <el-radio-button label="3"></el-radio-button>
                    <el-radio-button label="4"></el-radio-button>
                    <el-radio-button label="5"></el-radio-button>
                  </el-radio-group>
                </div>
              </el-form-item>
              <div style="margin-top: 10px"></div>
              <el-form-item label="警告信息" prop="warningMessage">
                <el-input
                  class="ele-input"
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows:8}"
                  placeholder="warningMessage"
                  v-model="form.warningMessage"
                  resize="none">
                </el-input>
              </el-form-item>
              <div style="margin:10px"></div>
              <el-form-item>
                <el-button style="margin-left: 50%" type="primary" @click="submit('form')">提交</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'editDes',
    data() {
      return {
        form: {
          score1: '',
          score2: '',
          description: '',
          radio1: '1',
          warningMessage: ''
        },
        desShow:[]
      }
    },
    methods: {
      goback() {
        alert('00');
      },
      submit(formName) {
        this.$refs[formName].resetFields();
      },
    },
  }
</script>
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
