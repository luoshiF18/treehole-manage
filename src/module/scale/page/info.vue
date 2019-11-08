<template>
  <div>
    <el-button type="primary" icon="el-icon-back" @click="go_back">返回列表</el-button>
    <br><br>
    <!--    <h1 align="center">量表详细信息</h1>-->
    <el-card class="box-outCard">
      <el-card :body-style="{ padding: '10px' }" style="text-align: center">
        <span><h2>量表详细信息</h2></span>
        <!--编辑详细信息开始-->
        <el-button icon="el-icon-edit" style="float: right;margin-bottom: 5px" @click="alterInfo" size="medium"
                   type="warning" plain round>
          编辑详细信息
        </el-button>
        <el-drawer
          title="更改量表详细信息"
          :visible.sync="infoDetail"
          direction="rtl"
          size="60%">
          <el-card>
            <div style="height:600px;overflow-y:scroll">
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
                  <el-select v-model="params.typeId" clearable placeholder="请选择分类">
                    <el-option
                      v-for="item in type"
                      :key="item.id"
                      :label="item.scaleType"
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
                  <el-button type="primary" @click.native="onSubmit" :loading="addLoading">修改量表</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </el-drawer>
        <!--编辑详细信息结束-->
        <!--显示量表详细信息-->
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
        <el-popover
          placement="right"
          width="400"
          trigger="click">
          <el-button slot="reference"
                     style="float: right"
                     size="medium"
                     type="success"
                     plain round>新增得分描述
          </el-button>
          <!--新增描述-->
          <el-card>
            <el-form
              :inline="true"
              :model="desc2"
              ref="form">
              <el-form-item label="分值设置：" prop="score1">
                <div>
                  <el-input size="small" style="width: 90px" v-model="desc2.score1"
                            placeholder="最低分"></el-input>
                  &nbsp;分&nbsp;到
                </div>
              </el-form-item>
              <el-form-item prop="score2">
                <div>
                  <el-input size="small" style="width: 90px" v-model="desc2.score2"
                            placeholder="最高分"></el-input>
                  &nbsp;分
                </div>
              </el-form-item>

              <el-form-item label="描述信息：" prop="description">
                <el-input
                  style="width: 350px"
                  class="ele-input"
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows:6}"
                  placeholder="请填写描述信息"
                  v-model="desc2.description"
                  resize="none"
                ></el-input>
              </el-form-item>

              <el-form-item label="预警等级：" prop="warningLevel">
                <div>
                  <el-radio-group v-model="desc2.warningLevel" size="mini">
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
                  :autosize="{ minRows: 3, maxRows:6}"
                  placeholder="请填写预警信息"
                  v-model="desc2.warningMessage"
                  resize="none">
                </el-input>
              </el-form-item>
            </el-form>
            <el-button size="medium" style="float: bottom" type="success" @click="submit2">新增描述</el-button>

          </el-card>
          <!--新增描述结束-->
        </el-popover>
        <!--显示问题和选项-->
        <el-button type="primary" style="float: left;margin-bottom: 5px" @click="table = true">点击查看问题和选项</el-button>
        <el-drawer
          :modal-append-to-body="true"
          title="点击问题序号旁边小箭头查看该问题的选项"
          :visible.sync="table"
          direction="rtl"
          size="55%">
          <!--添加新问题-->
          <el-popover>
            <el-button round type="success" plain size="mini" slot="reference" @click="remind">新增问题</el-button>
            <!--开始添加新问题-->
            <el-card>
              <el-form :inline="true" :model="questions1">
                <el-form-item
                  size="small"
                  label="问题序号">
                  <el-input style="width:55px" v-model="questions1.sort"></el-input>
                </el-form-item>
                <el-form-item
                  size="small"
                  label="问题：">
                  <el-input type="textarea" autosize style="width:450px" v-model="questions1.question"></el-input>
                </el-form-item>
              </el-form>
              <br>

              <el-form
                :model="questions1"
                v-for="(option, index) in questions1.options"
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
                    <el-input
                      placeholder="请输入选项"
                      v-model="option.answer"></el-input>
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
                    circle @click.prevent="removeOption1(option)"
                    size="small">

                  </el-button>
                  <!--              <hr align=center width=100% color=#C0C0C0 SIZE=1>-->
                </el-form>

                <div style="margin: 20px"></div>
              </el-form>
              <el-button size="small" type="primary" @click="addOption1" plain>新增选项</el-button>
              <el-button size="small" type="success" style="float: right" @click="insertQuestion1('questions1')">保存本题
              </el-button>

            </el-card>
          </el-popover>
          <!-- 添加新问题结束-->
          <!--下面是第一层数据,展示所有问题-->
          <el-card v-loading="loading">

            <el-table
              size="mini"
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
                    <el-table-column align="center" prop="skipQuestionSort" label="跳转的问题序号">
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
              <!--编辑，编辑问题-->
              <!--里层数据，修改问题和它的选项-->
              <el-table-column>
                <template slot-scope="page">
                  <el-button
                    round
                    icon="el-icon-delete"
                    type="danger"
                    plain size="mini"
                    style="float: right"
                    @click="delQuestion(page.row.id)">删除
                  </el-button>
                  <el-button
                    slot="reference"
                    round
                    type="warning"
                    plain size="mini"
                    icon="el-icon-edit"
                    style="float: right;margin-right: 5px"
                    @click="editQuestion(page.row.id)">编辑
                  </el-button>
                </template>
              </el-table-column>
              <!-- 编辑问题结束-->
              <!--太卡，放到外面-->
              <!--修改问题和选项-->
              <el-drawer
                :modal-append-to-body="true"
                size="50%"
                title="修改问题和选项"
                :append-to-body="true"
                :visible.sync="innerDrawer">
                <div>
                  <el-form size="small" :inline="true" v-model="editQuestion1">
                    <el-card>
                      <el-form-item
                        size="small"
                        label="问题序号">
                        <el-input :disabled="true" style="width:55px" v-model="editQuestion1.sort"></el-input>
                      </el-form-item>
                      <el-form-item
                        size="small"
                        label="问题：">
                        <el-input type="textarea" autosize style="width:400px"
                                  v-model="editQuestion1.question"></el-input>
                      </el-form-item>
                      <el-button size="small" type="success" @click="updateQuestion">保存并关闭
                      </el-button>
                    </el-card>
                    <el-card>
                      <el-form
                        style="margin-top: 0px"
                        :model="editQuestion1"
                        v-for="(option, index) in editQuestion1.options"
                        :key="option.key">

                        <el-form :inline="true">

                          <el-form-item
                            size="mini"
                            :prop="'options.' + index + '.sort'">
                            <el-input :disabled="true" style="width:40px"
                                      v-model="option.sort"></el-input>
                          </el-form-item>
                          <el-form-item
                            size="mini"
                            label='选项'
                            :prop="'options.' + index + '.answer'">
                            <!--                通过搜索建议快速输入-->
                            <el-input
                              type="textarea"
                              :autosize="{ minRows: 1, maxRows: 4}"
                              placeholder="请输入选项"
                              style="width:170px"
                              v-model="option.answer"></el-input>
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
                            <el-radio-group v-model="option.skip">
                              <el-radio-button label="0">否</el-radio-button>
                              <el-radio-button label="1">是</el-radio-button>
                            </el-radio-group>
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
                            size="mini">

                          </el-button>
                          <!--<hr align=center width=100% color=#C0C0C0 SIZE=1>-->
                        </el-form>

                        <div style="margin: 20px"></div>
                      </el-form>
                      <el-button size="small" type="primary" @click="addOption" plain>新增选项</el-button>
                    </el-card>
                    <!-- 选项显示结束-->
                  </el-form>
                </div>
              </el-drawer>
              <!--修改问题和选项结束-->
              <!--操作结束-->

            </el-table>
            <!--第一层结束-->

          </el-card>

        </el-drawer>
        <!--问题和选项抽屉结束-->
      </el-card>
      <!--显示量表详细信息结束-->
      <!--分数段描述-->
      <el-card class="box-card" v-loading="loading">
        <el-table
          :default-sort="{prop: 'score1', order: 'ascending'}"
          v-loading="loading"
          :data="scaleDesc"
          stripe
          style="width: 100%">

          <el-table-column sortable prop="score1" align="center" label="Low" width="90">
          </el-table-column>
          <el-table-column sortable prop="score2" align="center" label="High" width="90">
          </el-table-column>
          <!--          <el-table-column prop="crTime" label="创建时间" width="100">
                    </el-table-column>
                    <el-table-column prop="createUserName" align="center" label="创建人姓名" width="90">
                    </el-table-column>
                    <el-table-column prop="upTime" label="更新时间" width="100">
                    </el-table-column>
                    <el-table-column prop="updateUserName" align="center" label="更新人姓名" width="90">
                    </el-table-column>-->
          <el-table-column prop="description" label="描述" width="350">
            <template slot-scope="scope">
              <el-popover placement="top-start" width="400" trigger="hover">
                <div>{{scope.row.description}}</div>
                <span slot="reference">{{ scope.row.description.substr(0,35)+'...' }}</span>
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
          <el-table-column prop="warningLevel" align="center" label="预警等级" width="80">
          </el-table-column>
          <el-table-column sortable prop="warningMessage" label="预警信息" width="350">
            <template slot-scope="scope">
              <el-popover placement="top" width="400" trigger="hover">
                <div>{{scope.row.warningMessage}}</div>
                <span slot="reference">{{ scope.row.warningMessage.substr(0,35)+'...' }}</span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="page">
              <el-button
                round
                @click="delDesc(page.row.id)"
                icon="el-icon-delete"
                type="danger"
                plain size="mini"
                style="float: right">删除
              </el-button>
              <el-button
                round
                @click="editDesc(page.row.id)"
                icon="el-icon-edit"
                type="warning"
                plain size="mini"
                style="float: right;margin-right: 2px">编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--编辑desc得分描述-->
        <el-drawer
          title="修改分数描述"
          :visible.sync="dialog"
          direction="rtl"
          size="40%">
          <el-card>
            <el-form
              :inline="true"
              :model="desc"
              ref="form">
              <el-form-item label="分值设置：" prop="score1">
                <div>
                  <el-input :disabled="true" size="small" style="width: 90px" v-model="desc.score1"
                            placeholder="最低分"></el-input>
                  &nbsp;分&nbsp;到
                </div>
              </el-form-item>
              <el-form-item prop="score2">
                <div>
                  <el-input :disabled="true" size="small" style="width: 90px" v-model="desc.score2"
                            placeholder="最高分"></el-input>
                  &nbsp;分
                </div>
              </el-form-item>

              <el-form-item label="描述信息：" prop="description">
                <el-input
                  style="width: 400px"
                  class="ele-input"
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows:7}"
                  placeholder="请填写描述信息"
                  v-model="desc.description"
                  resize="none"
                ></el-input>
              </el-form-item>

              <el-form-item label="预警等级：" prop="warningLevel">
                <div>
                  <el-radio-group v-model="desc.warningLevel" size="mini">
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
                  style="width: 400px"
                  class="ele-input"
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows:7}"
                  placeholder="请填写预警信息"
                  v-model="desc.warningMessage"
                  resize="none">
                </el-input>
              </el-form-item>
            </el-form>
            <el-button size="medium" style="float: bottom" type="success" @click="submit('desc')">更改描述</el-button>

          </el-card>

        </el-drawer>
        <!--编辑desc得分描述结束-->
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
                optionSuggestion: [],
                infoDetail: false,//用于问题和选项里层修改
                innerDrawer: false,//用于问题和选项里层修改
                dialog: false,//用于编辑得分描述
                table: false,//用于问题和选项的展示
                scaleId: '',
                scaleDetail: {},
                loading: true,
                scaleDesc: [],
                questions: [],
                editQuestion1: '',
                //新增问题使用
                questions1: {
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
                //编辑得分描述使用
                desc: {
                    id: '',
                    scaleId: '',
                    score1: '',
                    score2: '',
                    description: '',
                    warningLevel: 1,
                    warningMessage: ''
                },
                //新增得分描述使用
                desc2: {
                    id: '',
                    scaleId: '',
                    score1: '',
                    score2: '',
                    description: '',
                    warningLevel: 1,
                    warningMessage: ''
                },
                //下面都是更改详细信息使用
                //下面都是更改详细信息使用
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
                    status: 1,
                    images: '',
                    typeId: '',
                    scaleType: 2,
                    price: 0,
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
            //更改量表详细信息
            alterInfo: function () {
                this.infoDetail = true;
            },
            //新增得分描述
            submit2: function () {
                this.$confirm('确认保存吗？', '提示', {}).then(() => {
                    this.desc2.scaleId = this.scaleId;
                    scaleApi.scale_addDesc(this.desc2).then((res) => {
                        if (res.success) {
                            this.queryDesc();
                            this.$message.success('保存成功！');
                            this.clear2();
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                });
            },
            //更改得分描述
            submit(formName) {
                this.$confirm('确认更改吗？', '提示', {}).then(() => {
                    scaleApi.scale_editOneDesc(this.desc).then((res) => {
                        if (res.success) {
                            this.queryDesc();
                            this.dialog = false;
                            this.$message.success('更改成功！');
                            this.$refs[formName].resetFields();
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                });
            },
            //获取一个得分描述
            editDesc(descId) {
                scaleApi.scale_oneDesc(descId).then((res) => {
                    //打开编辑窗口
                    this.dialog = true;
                    this.desc = res;
                });

            },
            //删除得分描述
            delDesc(descId) {
                this.$confirm('确认删除描述吗？该操作不可撤销？', '提示', {}).then(() => {
                    scaleApi.scale_delDesc(descId).then((res) => {
                        if (res.success) {
                            this.queryDesc();
                            this.$message.success('删除描述成功！');
                        } else {
                            this.$message.error('删除描述失败！');
                        }
                    });
                });
            },
            //提醒注意序号，新增问题中使用
            remind: function () {
                this.$notify({
                    title: '提醒：',
                    message: '请注意问题序号设置，不要重复！',
                    type: 'warning',
                    position: 'top-left'
                });
            },
            //清空数据，为下一提准备，新增问题中使用
            clear: function () {
                this.questions1.question = '',
                    this.questions1.sort = '',
                    this.questions1.options = [{
                        sort: '',
                        answer: '',
                        score: null,
                        skip: 0,
                        skipId: ''
                    }]
            },
            //清空数据，为下一提准备
            clear2: function () {
                this.desc2.id = '',
                    this.desc2.scaleId = '',
                    this.desc2.score1 = '',
                    this.desc2.score2 = '',
                    this.desc2.description = '',
                    this.desc2.warningLevel = 1,
                    this.desc2.warningMessage = ''
            },
            //提交新增问题，新增问题中使用
            insertQuestion1: function () {
                this.$confirm('确认保存新问题吗？', '提示', {}).then(() => {
                    this.questions1.scaleId = this.scaleId;
                    scaleApi.scale_addQuestion(this.questions1).then((res) => {
                        // console.log(JSON.stringify(this.questions1));
                        if (res.success) {
                            scaleApi.scale_handleSkip(this.scaleId).then((res) => {
                                if (res.success) {
                                    this.clear();
                                    this.queryQuestion();
                                    this.$message.success('保存成功！');
                                } else {
                                    this.$message.error(res.message);
                                }
                            });
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                });
            },
            //清除行，新增问题中使用
            removeOption1(item) {
                var index = this.questions1.options.indexOf(item);
                if (index !== -1) {
                    this.questions1.options.splice(index, 1);
                }
            },
            //添加选项，新增问题中使用
            addOption1() {
                this.questions1.options.push({
                    sort: '',
                    answer: '',
                    score: null,
                    skip: 0,
                    skipId: ''
                });
            },
            //删除问题
            delQuestion(questionId) {
                // console.log(questionId)
                this.$confirm('确认删除该问题吗？该操作不可撤销？', '提示', {}).then(() => {
                    scaleApi.scale_delQuestion(questionId).then((res) => {
                        if (res.success) {
                            this.queryQuestion();
                            this.$message.success('删除问题成功！');
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                });
            },
            //提交更改
            updateQuestion: function () {
                this.$confirm('确认保存修改吗？', '提示', {}).then(() => {
                    scaleApi.scale_upOneQuestion(this.editQuestion1).then((res) => {
                        if (res.success) {
                            scaleApi.scale_handleSkip(this.scaleId).then((res) => {
                                if (res.success) {
                                    this.queryQuestion();
                                    this.$message.success('更改成功！');
                                    this.innerDrawer = false;
                                } else {
                                    this.$message.error(res.message);
                                }
                            })
                        } else {
                            this.$message.error(res.message);
                        }

                    });
                });
            },
            //添加选项,更改中使用
            addOption() {
                this.editQuestion1.options.push({
                    sort: '',
                    answer: '',
                    score: null,
                    skip: 0,
                    skipId: ''
                });
            },
            //删除行,更改中使用
            removeOption(item) {
                this.$confirm('确认删除该选项吗？该操作不可撤销？', '提示', {}).then(() => {
                    // console.log(item.id)
                    scaleApi.scale_delOption(item.id).then((res) => {
                        if (res.success) {
                            this.$message.success('删除选项成功！');
                            var index = this.editQuestion1.options.indexOf(item);
                            if (index !== -1) {
                                this.editQuestion1.options.splice(index, 1);
                            }
                            this.queryQuestion();
                        } else {
                            this.$message.error('删除选项失败！');
                        }

                    })

                });
            },
            //处理修改，获取一个问题的问题和选项
            editQuestion(questionId) {
                // this.table = false;
                this.innerDrawer = true;
                // console.log(questionId);
                scaleApi.scale_editOneQuestion(questionId).then((res) => {
                    this.editQuestion1 = res.questionVO3;
                })
            },
            //修改详情
            next1: function () {
                //打开修改页面
                this.$router.push({
                    path: '/scale/page/alterInfo/', query: {
                        scaleId: this.scaleId
                    }
                })
            },
            //获取所有问题和选项
            queryQuestion: function () {
                scaleApi.scale_question(this.scaleId).then((res) => {
                    this.questions = res.questionVO3;
                })
            },
            //查看量表分数描述
            queryDesc: function () {
                scaleApi.scale_desc(this.scaleId).then((res) => {
                    this.scaleDesc = res.queryResult.list
                })
            },
            //查询量表详细信息
            queryDetail: function () {
                scaleApi.scale_detail(this.scaleId).then((res) => {
                    this.scaleDetail = res.scaleDetail;
                    this.loading = false;
                })
            },
            //回到列表
            go_back() {
                this.$router.push({
                    path: '/scale/page/list'
                });
            },
            //    下面全是更改量表详细信息
            onSubmit: function () {
                //提交
                this.$refs.params.validate((valid) => {
                    if (valid) {
                        //确认提示
                        this.$confirm('确认修改吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            setTimeout(this.timeOut, 8000)
                            scaleApi.scale_alterInfo(this.params).then((res) => {
                                this.addLoading = false;
                                //    解析响应内容
                                if (res.success) {
                                    this.$message.success('提交成功！');
                                    //进行下一步，关闭抽屉
                                    this.infoDetail = false;
                                    this.queryDetail();
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
            queryTypeName: function () {
                //查询搜有分类
                scaleApi.type_list().then((res) => {
                    this.type = res.queryResult.list;
                })

            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            queryDetail2: function () {
                scaleApi.scale_detail(this.scaleId).then((res) => {
                    this.params = res.scaleDetail;
                })
            },
        },
        mounted() {
            //查询所有分类
            this.queryTypeName();
        },
        created() {
            //取出路由中的参数,赋值给数据对象
            this.scaleId = this.$route.query.scaleId;
            this.queryDetail();
            this.queryDetail2();
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
  .set_height {
    max-height: 500px;
  }

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
