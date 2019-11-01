<template>
  <div>
    <el-button type="primary" icon="el-icon-back" @click="go_back">返回列表</el-button>
    <br><br>
    <!--    <h1 align="center">量表详细信息</h1>-->
    <el-card class="box-outCard">
      <el-card :body-style="{ padding: '10px' }" style="text-align: center">
        <span><h2>量表详细信息</h2></span>
      </el-card>
      <!--        <el-card class="box-card">
                量表id： <span v-text="scaleDetail.id"></span>
              </el-card>-->
      <el-card class="box-card" v-loading="loading">
        量表图片： <img src="https://www.agri35.com/UploadFiles/img_0_3350240698_1000634026_26.jpg"
                   class="image">
        <!--          量表图片： <span v-text="scaleDetail.images"></span>-->
      </el-card>
      <el-card class="box-card" v-loading="loading">
        量表名称：<span class="color" style="margin-right: 220px" v-text="scaleDetail.scaleName"></span>
        量表缩写： <span class="color" v-text="scaleDetail.shortName"></span>
      </el-card>
      <el-card class="box-card" v-loading="loading">
        量表状态： <span class="color" style="margin-right: 120px" v-text="scaleDetail.statusName"></span>
        量表分类： <span class="color" style="margin-right: 120px" v-text="scaleDetail.type"></span>
        量表类型： <span class="color" style="margin-right: 120px" v-text="scaleDetail.scaleTypeName"></span>
        量表价格： ￥<span class="color" v-text="scaleDetail.price"></span>
      </el-card>
      <el-card class="box-card" v-loading="loading">
        话题描述： <span class="color" v-text="scaleDetail.topicDescription"></span>
      </el-card>
      <el-card class="box-card" v-loading="loading">
        话题背景： <span class="color" v-text="scaleDetail.topicBackground"></span>
      </el-card>
      <el-card class="box-card" v-loading="loading">
        话题建议： <span class="color" v-text="scaleDetail.topicSuggest"></span>
      </el-card>
      <el-card class="box-card" v-loading="loading">
        量表功能： <span class="color" v-text="scaleDetail.scaleFunction"></span>
      </el-card>
      <el-card class="box-card" v-loading="loading">
        测评指导： <span class="color" v-text="scaleDetail.guide"></span>
      </el-card>
      <el-card class="box-card" v-loading="loading">
        创建时间： <span class="color" style="margin-right: 220px" v-text="scaleDetail.createTime"></span>
        创建人姓名： <span class="color" v-text="scaleDetail.createUserId"></span>
      </el-card>
      <el-card class="box-card" v-loading="loading">
        更新时间： <span class="color" style="margin-right: 220px" v-text="scaleDetail.updateTime"></span>
        更新人姓名： <span class="color" v-text="scaleDetail.updateUserId"></span>
      </el-card>
      <el-card class="box-card" v-loading="loading">
        量表备注： <span class="color" v-text="scaleDetail.remark"></span>
      </el-card>
      <el-card :body-style="{ padding: '10px' }" style="text-align: center">
        <span><h2>分数段描述</h2></span>

        <!--显示问题和选项-->
        <el-button type="primary" style="float: left" @click="table = true">点击查看问题和选项</el-button>
        <br><br>
        <el-drawer
          title="点击问题序号旁边小箭头查看该问题的选项"
          :visible.sync="table"
          direction="rtl"
          size="50%">
          <el-card v-loading="loading">
            <el-table
              :default-sort="{prop: 'sort', order: 'ascending'}"
              stripe
              height="600"
              :data="questions"
              style="width: 100%">
              <!--点击打开问题和选项-->
              <el-table-column type="expand" prop="options">
                <template slot-scope="props">
                  <el-table
                    border
                    :default-sort="{prop: 'sort', order: 'ascending'}"
                    :data="props.row.options"
                  >
                    <el-table-column width="100" align="center" prop="sort" label="选项序号">
                      <template slot-scope="scope">
                        <span>{{scope.row.sort}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" align="center" prop="answer" label="选项">
                      <template slot-scope="scope">
                        <span>{{scope.row.answer}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" prop="score" label="分值">
                      <template slot-scope="scope">
                        <span>{{scope.row.score}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" prop="skipName" label="跳题">
                      <template slot-scope="scope">
                        <span>{{scope.row.skipName}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" prop="skipQuestionSort" label="跳题的问题序号">
                      <template slot-scope="scope">
                        <span>{{scope.row.skipQuestionSort}}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-table-column>

              <el-table-column
                align="center"
                width="150"
                sortable
                label="问题序号"
                prop="sort">
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                label="问题"
                prop="question">
              </el-table-column>
            </el-table>
          </el-card>


        </el-drawer>
        <!--分数段和描述结束-->
      </el-card>

      <!--量表描述-->
      <el-card class="box-card" v-loading="loading">
        <el-table
          v-loading="loading"
          :data="scaleDesc"
          stripe
          style="width: 100%">
          <!--    <el-table-column type="expand" label="详情" width="60">
              </el-table-column>-->
          <el-table-column prop="score1" align="center" label="Low" width="60">
          </el-table-column>
          <el-table-column prop="score2" align="center" label="High" width="60">
          </el-table-column>
          <el-table-column prop="crTime" label="创建时间" width="100">
          </el-table-column>
          <el-table-column prop="createUserName" align="center" label="创建人姓名" width="90">
          </el-table-column>
          <el-table-column prop="upTime" label="更新时间" width="100">
          </el-table-column>
          <el-table-column prop="updateUserName" align="center" label="更新人姓名" width="90">
          </el-table-column>
          <el-table-column prop="warningLevel" align="center" label="预警等级" width="80">
          </el-table-column>
          <el-table-column prop="description" label="描述" width="290">
            <template slot-scope="scope">
              <el-popover placement="top-start" width="400" trigger="hover">
                <div>{{scope.row.description}}</div>
                <span slot="reference">{{ scope.row.description.substr(0,30)+'...' }}</span>
              </el-popover>
            </template>
            <!--            <template slot-scope="sff">
                          <el-input
                            readonly
                            v-model="sff.row.description"
                            type="textarea"
                            :autosize="{ minRows: 1, maxRows:4}"
                            placeholder="remark"
                            resize="none"
                          >
                          </el-input>
                        </template>-->
          </el-table-column>
          <el-table-column prop="warningMessage" label="预警信息" width="290">
            <template slot-scope="scope">
              <el-popover placement="top" width="400" trigger="hover">
                <div>{{scope.row.warningMessage}}</div>
                <span slot="reference">{{ scope.row.warningMessage.substr(0,30)+'...' }}</span>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!--结束-->
    </el-card>
    <br><br>
  </div>
</template>

<script>
    import * as scaleApi from '../api/scaleApi'

    export default {
        name: 'editInfo',
        data() {
            return {
                dialog: false,//用于问题和选项的展示
                table: false,//用于问题和选项的展示
                scaleId: '',
                scaleDetail: {},
                loading: true,
                scaleDesc: [],
                questions: []
            }
        },
        methods: {
            queryQuestion: function () {
                scaleApi.scale_question(this.scaleId).then((res) => {
                    this.questions = res.questionVO3;
                })
            },
            queryDesc: function () {
                scaleApi.scale_desc(this.scaleId).then((res) => {
                    this.scaleDesc = res.queryResult.list
                })
            },
            queryDetail: function () {
                scaleApi.scale_detail(this.scaleId).then((res) => {
                    this.scaleDetail = res.scaleDetail;
                    this.loading = false;
                })
            },
            go_back() {
                this.$router.push({
                    path: '/scale/page/list'
                });
            },
        },
        created() {
            //取出路由中的参数,赋值给数据对象
            this.scaleId = this.$route.query.scaleId;
            this.queryDetail();
            this.queryDesc();
            this.queryQuestion();
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
  .box-outCard {
    width: 1243px;
  }

  .box-card {
    width: 1200px;
  }

  .color {
    color: #4059ad;
  }

  .image {
    width: 12%;
    display: inline;
  }

</style>
