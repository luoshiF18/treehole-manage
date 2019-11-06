<template>
  <div>
    <el-progress :percentage="66"></el-progress>

    <el-row :gutter="20">
      <el-col :span="10">
        <el-table
          size="mini"
          :default-sort="{prop: 'sort', order: 'ascending'}"
          stripe
          height="600"
          :data="questionsShow"
          style="width: 100%">
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

      </el-col>
      <!--    </el-drawer>-->

      <el-button size="medium" style="margin: 10px" type="primary" @click="insertQuestion('questions')">保存本题
      </el-button>
      <el-button size="medium" style="margin: 10px;float: right" type="success" @click="saveAndNext">
        进行下一步
      </el-button>
      <!--列表结束，下面是增加问题和选项-->
      <el-col :span="14">
        <el-card>
          <el-form :inline="true" :model="questions">
            <el-form-item
              size="small"
              label="问题序号">
              <el-input style="width:55px" v-model="questions.sort"></el-input>
            </el-form-item>
            <el-form-item
              size="small"
              label="问题：">
              <el-input type="textarea" autosize style="width:450px" v-model="questions.question"></el-input>
            </el-form-item>
          </el-form>
          <br>

          <el-form
            :model="questions"
            v-for="(option, index) in questions.options"
            :key="option.key">

            <el-form :inline="true">

              <el-form-item
                size="mini"
                :prop="'options.' + index + '.sort'">
                <el-input :disabled="true" style="width:40px" v-model="option.sort = index + 1"></el-input>
              </el-form-item>

              <el-form-item
                size="mini"
                label='选项'
                :prop="'options.' + index + '.answer'">
                <!--                通过搜索建议快速输入-->
                <el-autocomplete
                  class="inline-input"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入选项"
                  style="width:180px"
                  v-model="option.answer"></el-autocomplete>
              </el-form-item>

              <el-form-item
                size="mini"
                label='分值'
                :prop="'options.' + index + '.score'">
                <el-input style="width:65px" v-model="option.score"></el-input>
              </el-form-item>

              <el-form-item
                size="mini"
                label="跳题"
                :prop="'options.' + index + '.skip'">
                <el-tooltip :content="'点击开启跳题功能'" placement="top">
                  <el-switch
                    v-model="option.skip"
                    active-color="#13ce66"
                    inactive-color="gray"
                    active-value="1"
                    inactive-value="0">
                  </el-switch>
                </el-tooltip>
              </el-form-item>

              <el-form-item
                size="mini"
                label='跳转序号'
                :prop="'options.' + index + '.skipId'">
                <el-input style="width:55px" v-model="option.skipId"></el-input>
              </el-form-item>
              <el-button
                style="float: right"
                type="danger"
                icon="el-icon-delete"
                circle @click.prevent="removeOption(option)"
                size="small">

              </el-button>
              <!--              <hr align=center width=100% color=#C0C0C0 SIZE=1>-->
            </el-form>


            <div style="margin: 10px"></div>
          </el-form>
          <el-button type="primary" @click="addOption" plain>新增选项</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
    import * as scaleApi from '../api/scaleApi'

    export default {
        name: "fromdatadt",
        data() {
            return {
                optionSuggestion: [],
                scaleId: '',
                questions: {
                    options: [
                        {
                            sort: null,
                            answer: '',
                            score: null,
                            skip: 0,
                            skipId: '',
                        }
                    ],
                    question: "",
                    sort: 1,
                    scaleId: ''
                },
                questionsShow: [],
                dialog: true,//用于问题和选项的展示
                table: true,//用于问题和选项的展示
            }
        },
        methods: {
            //下面两个方法是为了搜索建议
            querySearch(queryString, cb) {
                var optionSuggestion = this.optionSuggestion;
                var results = queryString ? optionSuggestion.filter(this.createFilter(queryString)) : optionSuggestion;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            //查询所有已添加问题
            queryQuestion: function () {
                scaleApi.scale_question(this.scaleId).then((res) => {
                    this.questionsShow = res.questionVO3;
                })
            },
            //清空数据，为下一提准备
            clear: function () {
                this.questions.question = '',
                    this.questions.sort = '',
                    this.questions.options = [{
                        sort: '',
                        answer: '',
                        score: null,
                        skip: 0,
                        skipId: ''
                    }]
            },
            //查询量表id
            queryDetail: function () {
                scaleApi.scale_detail2(this.$route.query.scaleName).then((res) => {
                    this.scaleId = res.scaleDetail.id;
                    // console.log(this.scaleId)
                    //查询后查询一次问题和选项
                    this.queryQuestion()
                })
            },
            // 进行下一步，得分描述添加
            saveAndNext: function () {
                this.$confirm('确认选项已添加完成，进行得分描述添加吗？', '提示', {}).then(() => {
                    scaleApi.scale_handleSkip(this.scaleId).then((res) => {
                        //    解析响应内容
                        if (res.success) {
                            this.$message.success('保存成功！');
                            setTimeout(this.next2, 1000)
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                });
            },
            next2: function () {
                //打开修改页面
                this.$router.push({
                    path: '/scale/page/editDes/', query: {
                        scaleId: this.scaleId
                    }
                })
            },
            //提交方法
            insertQuestion: function () {
                this.questions.scaleId = this.scaleId;
                scaleApi.scale_addQuestion(this.questions).then((res) => {
                        // console.log(JSON.stringify(this.questions));
                    if (res.success) {
                        this.$message.success('保存成功！');
                        this.clear(),
                            this.nextSort(),
                            //新增后查询一次问题和选项
                            this.queryQuestion()
                    } else {
                        this.$message.error(res.message);
                    }

                })
            },
            //查询下一个选项序号
            nextSort: function () {
                scaleApi.scale_nextSort(this.scaleId).then((res) => {
                    this.questions.sort = res;
                })
            },
            //清除行
            removeOption(item) {
                var index = this.questions.options.indexOf(item);
                if (index !== -1) {
                    this.questions.options.splice(index, 1);
                }
            },
            //添加选项
            addOption() {
                this.questions.options.push({
                    sort: '',
                    answer: '',
                    score: null,
                    skip: 0,
                    skipId: ''
                });
            },
            //搜索建议
            loadAll() {
                return [
                    {"value": "是的"},
                    {"value": "不是的"},
                    {"value": "偶尔是"},
                    {"value": "不一定"},
                    {"value": "不确定"},
                    {"value": "介于(A)与(C)之间"},
                    {"value": "没有"},
                    {"value": "无影响"},
                    {"value": "很轻"},
                    {"value": "中度"},
                    {"value": "偏重"},
                    {"value": "严重"},
                    {"value": "三月内"},
                    {"value": "半年内"},
                    {"value": "一年内"},
                    {"value": "一年以上"},
                    {"value": "有时如此"},
                    {"value": "不尽然"},
                    {"value": "2次及其以上"}
                ];
            },
        },
        created() {
            //获取量表id
            this.queryDetail();
        },
        mounted() {
            this.optionSuggestion = this.loadAll();
        }
    }
</script>
<style scoped>

</style>
