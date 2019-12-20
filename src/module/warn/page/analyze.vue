<template>
  <div>
    <h1>预警信息的分析与统计</h1>
    <el-tabs type="border-card">
      <el-tab-pane label="用户预警信息来源分析">
        <el-col class="col" :span="4">
        <el-input v-model="userNickName" class="col" :span="4" placeholder="请输入您要查询的用户名"></el-input>
        </el-col>
        &nbsp;&nbsp;
        <el-button type="primary" icon="el-icon-search" @click="initData">搜索</el-button>
        <div id="div1">
        <div id="test1" class="divleft">
        </div>
          <div  class="divRight">
            <el-collapse accordion>
              <el-collapse-item>
                <template slot="title">
                  功能说明 Function Declaration<i class="header-icon el-icon-info"></i>
                </template>
                <div>您可以在本页面查询用户查询预警信息的量表类型，一以便您能更好的掌握用户的心理状况</div>
              </el-collapse-item>
              <el-collapse-item title="心理咨询师意见">
                <div>有就是显示哪个咨询师在什么时间，给他服务了哪些方面的内容，得出了什么样的结论，无就显示没有进行过心理咨询师的服务</div>
              </el-collapse-item>
              <el-collapse-item title="用户最常做的量表类型">
                <div  id="little" style="width:400px;height:180px;">
                </div>
              </el-collapse-item>
    <!--          <el-collapse-item title="用户心理分析">

                <div>
                  根据用户最常做的量表类型，产生预警信息最多的量表类型，咨询师的意见，
                  提示用户应该在某些方面多注意，给出合理的建议
                </div>

              </el-collapse-item>-->
            </el-collapse>

          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="量表分析">
        <div>
        <el-col class="col" :span="4">
          <el-input v-model="scaleName" class="col" :span="4" placeholder="请输入您要查询的量表名称"></el-input>
        </el-col>
        &nbsp;&nbsp;
        <el-button type="primary" icon="el-icon-search" @click="pieSca">搜索</el-button>
        </div>
        <div id="div">
          <div id="test2" class="divleft">
          </div>
          <div class="divRight">
            <el-collapse accordion>
              <el-collapse-item>
                <template slot="title">
                  功能说明 Function Declaration<i class="header-icon el-icon-info"></i>
                </template>
                <div>您可以在本页面查询某个量表预警情况百分比、量表的详细信息，帮助您更好的了解哪些方面的问题更值得关注。</div>
              </el-collapse-item>
              <el-collapse-item title="量表的基本信息">
                <div>
                  缩写: {{this.params.shortName}}
                  主体描述: {{this.params.topicDescription}}
                  制定背景: {{this.params.topicBackground}}
                </div>
              </el-collapse-item>
              <el-collapse-item title="量表的类型和功能">
                <div>
                  类型: {{this.params.scaleType}}
                  功能: {{this.params.scaleFunction}}
                </div>
              </el-collapse-item>
            </el-collapse>

          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="高危人群">

        <el-form ref="form" :model="need" label-width="80px">
          <el-row :gutter="20">
            <el-col class="col" :span="4">
              <el-input v-model="need.userNickName" placeholder="登录名">
              </el-input>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" v-on:click="getWarnUser" size="mini" >查询按钮</el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-table
          :data="list"
          border
          style="width: 100%"
          class="el-row"
        >
          <el-table-column align="center" type="selection" width="55"></el-table-column>
          <el-table-column label="序号"
                           width="50" align="center">
            <template scope="scope"><span v-text="getIndex(scope.$index)"></span></template>
          </el-table-column>
          <el-table-column align="center" prop="userNickName" label="登录名"></el-table-column>
          <el-table-column align="center" prop="userName" label="姓名"></el-table-column>
          <el-table-column align="center" prop="sex" label="性别">
            <template slot-scope="scope">
              {{ scope.row.sex === '0' ? '男' : '女' }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="phone" label="电话"></el-table-column>
          <el-table-column align="center" prop="reason" label="干预的原因"></el-table-column>
          <el-table-column align="center" prop="status" label="干预后的状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status==2" style="color: red">还需干预</span>
            </template>
          </el-table-column>
          <el-table-column align="center"  fixed="right" label="操作">
            <template slot-scope="page">
              <el-button type="primary" size="mini"
                         @click="look(page.row.warnHUserid)">详情
              </el-button>
              <el-dialog
                title="高危人群详情"
                :modal=false
                :visible.sync="dialogTableVisible"
                :width="dialogWidth">
                <div >
                  <table v-loading="loading">
                  <el-form  label-width="100px">
                    <el-form-item  label="预警等级">
                      <span>{{warnHresult.warningLevel}}</span>
                    </el-form-item>
                    <el-form-item  label="预警信息：">
                      <span>{{warnHresult.wmessage}}</span>
                    </el-form-item>
                    <el-form-item  label="预警时间：">
                      <span>{{warnHresult.createTime}}</span>
                    </el-form-item>
                    <el-form-item  label="干预方式：">
                      <span>{{warnHresult.way}}</span>
                    </el-form-item>
                    <el-form-item  label="干预原因：">
                      <span>{{warnHresult.reason}}</span>
                    </el-form-item>
                    <el-form-item  label="干预内容：">
                      <span>{{warnHresult.context}}</span>
                    </el-form-item>
                    <el-form-item  label="干预结果：">
                      <span>{{warnHresult.effect}}</span>
                    </el-form-item>
                    <el-form-item  label="干预时间：">
                      <span>{{warnHresult.recordTime}}</span>
                    </el-form-item>
                  </el-form>
                  </table>
                </div>
              </el-dialog>
            </template>
          </el-table-column>

        </el-table>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
    import echarts from 'echarts'
    import * as warnApi from '../api/warn.js'

    export default {
        name: 'analyze',
        data() {
            return {
                list: [],
                total: 0,
                scaleName: '',
                userNickName: '',
                pieUser: [],
                pieScale: [],
                result:{
                    data: [],
                    MaxPie:''
                },
                warnHresult:{
                    warningLevel: 0,
                    wmessage:'',
                    createTime:'',
                    way:'',
                    context:'',
                    reason:'',
                    effect:'',
                    recordTime:'',
                    scaleName:''
                },
                loading:true,
                dialogTableVisible:false,
                dialogWidth: '',
                params:{
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
                    scaleType: 0,
                    price: 0,
                    remark: ''
                },
              need:{
                  page: 1,
                  size: 10,
                  userNickName:''
              }
            }

        },
        methods: {
            initData:function (){
                //调用接口获取数据
                if (this.userNickName == null) {
                    alert("请输入用户名")
                }
                warnApi.pieData(this.userNickName).then((res) => {
                    //将res结果数据赋值给数据模型对象
                    this.pieUser=res;
                    //this.loading = false;
                 // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('test1'));
                myChart.setOption({
                    title : {
                        text: '产生预警信息的量表类型',//主标题
                        subtext: '预警信息来源',//副标题
                        x:'center',//x轴方向对齐方式
                        y:'top'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'right',
                        y: 'center',
                        /*icon:'circle',*/
                        liteWidth: 23,
                        itemHeight: 20,
                        background: 'red',
                        data: this.pieUser
                    },
                    series : [
                        {
                            name: '产生预警信息的量表类型',
                            type: 'pie',
                            radius : '50%',
                            center: ['50%', '50%'],
                            data: this.pieUser,
                            label : {
                                normal : {
                                    formatter: '{b}: ({d}%)',
                                    textStyle : {
                                        fontWeight : 'normal',
                                        fontSize : 15
                                    }
                                }
                            },
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(30, 144, 255, 0.5)'
                                }
                            },
                        }
                    ]
                });
                })
                this.pieUserData();
            },
            pieUserData:function (){
                //调用接口获取数据
                if (this.userNickName == null) {
                    alert("请输入用户名")
                }
                warnApi.pieUser(this.userNickName).then((res) => {
                    //将res结果数据赋值给数据模型对象
                    this.result.data=res;
                    //this.loading = false;
                    // 基于准备好的dom，初始化echarts实例
                    var myChart = echarts.init(document.getElementById('little'));
                    myChart.setOption({
                        title : {
                           /* text: '产生预警信息的量表类型百分比（示例）',//主标题*/
                            subtext: '用户所做量表类型',//副标题
                            x:'center',//x轴方向对齐方式
                            y:'top'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            x: 'right',
                            y: 'center',
                            /*icon:'circle',*/
                            background: 'red',
                            data: this.result.data
                        },
                        series : [
                            {
                                name: '用户所做量表类型',
                                type: 'pie',
                                radius : '30%',
                                center: ['50%', '50%'],
                                label : {
                                    normal : {
                                        formatter: '{b}: ({d}%)',
                                        textStyle : {
                                            fontWeight : 'normal',
                                            fontSize : 15
                                        }
                                    }
                                },
                                data: this.result.data,
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(30, 144, 255, 0.5)'
                                }
                            }
                        ]
                    });
                })

            },
            pieSca:function (){
                //调用接口获取数据
                if (this.scaleName == null) {
                    alert("请输入量表名称")
                }
                warnApi.pieScaleData(this.scaleName).then((res) => {
                    //将res结果数据赋值给数据模型对象
                    this.pieScale=res;
                    //this.loading = false;
                    // 基于准备好的dom，初始化echarts实例
                    var myChart = echarts.init(document.getElementById('test2'));
                    myChart.setOption({
                        title : {
                            text: '用户所做该量表的预警情况',//主标题
                            subtext: '量表分析',//副标题
                            x:'center',//x轴方向对齐方式
                            y:'top'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            x: 'right',
                            y: 'center',
                            /*icon:'circle',*/
                            liteWidth: 23,
                            itemHeight: 20,
                            background: 'red',
                            data: this.pieScale
                        },
                        series : [
                            {
                                name: '产生预警等级分布图',
                                type: 'pie',
                                radius : '50%',
                                center: ['50%', '50%'],
                                data: this.pieScale,
                                label : {
                                    normal : {
                                        formatter: '{b}: ({d}%)',
                                        textStyle : {
                                            fontWeight : 'normal',
                                            fontSize : 15
                                        }
                                    }
                                },
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(30, 144, 255, 0.5)'
                                    }
                                },
                            }
                        ]
                    });
                })
                this.getScaleDetail();
            },
            getScaleDetail:function(){
                warnApi.getScaleDetail(this.scaleName).then((res) => {
                    this.params = res.scaleDetail;
                })

            },
            setDialogWidth() {
                console.log(document.body.clientWidth)
                var val = document.body.clientWidth
                const def = 800 // 默认宽度
                if (val < def) {
                    this.dialogWidth = '100%'
                } else {
                    this.dialogWidth = def + 'px'
                }
            },
            ceshi:function (){
                    var myChart = echarts.init(document.getElementById('test1'));
                    myChart.setOption({
                        title : {
                            text: '产生预警信息的量表类型百分比（示例）',//主标题
                            subtext: '测试数据',//副标题
                            x:'center',//x轴方向对齐方式
                            y:'top'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            x: 'right',
                            y: 'center',
                            /*icon:'circle',*/
                            liteWidth: 23,
                            itemHeight: 20,
                            background: 'red',
                            data: ['职场','婚姻','人机关系','心理健康','压力']
                        },
                        series : [
                            {
                                name: '预警信息的来源分类',
                                type: 'pie',
                                radius : '50%',
                                center: ['50%', '50%'],
                                data: [
                                    {value:234,name:'职场'},
                                    {value:134,name:'婚姻'},
                                    {value:233,name:'人机关系'},
                                    {value:512,name:'心理健康'},
                                    {value:111,name:'压力'}
                                ],
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(30, 144, 255, 0.5)'
                                    }
                                },
                            }
                        ]
                    });

            },
            getWarnUser:function () {
                //查询页面列表
                warnApi.getWarnUser(this.need.page, this.need.size,this.need.userNickName).then((res) => {
                    //将res结果数据赋值给数据模型对象
                    this.list = res.queryResult.list;
                    this.total = res.queryResult.total;
                })
            },
            //表格序号
            getIndex($index) {
                return (this.need.page - 1) * this.need.size + $index + 1
            },
            //打开查看页面，查看预警详细信息
            look: function (warnHUserid) {
                this.dialogTableVisible = true;
                this.loading=true;
                warnApi.warnHresult(warnHUserid).then((res) => {
                    //将res结果数据赋值给数据模型对象
                    this.warnHresult = res;
                    this.loading=false;
                })
            },

        },
        mounted() {
           this.ceshi();
           this.getWarnUser();
            window.onresize = () => {
                return (() => {
                    this.setDialogWidth()
                })()
            };
        },
    }
</script>
<style scoped>
  .el-row {
    margin-bottom: 20px;
    margin-left: 20px;
    text-align: center;
  }
  .divRight{
    margin-top: 15px;
    padding: 10px 10px 0 10px;
    float:left;
    width:700px;
    height:600px;
   /* background-color: #6d6d72;*/
  }
/*  .rightOne{
    background-color: #2ac845;
    width: 700px;
    height: 300px;
  }
  .rightTwo{
    background-color: #8a6de9;
    width: 700px;
    height: 300px;
  }*/

  .divleft{
    margin-top: 15px;
    padding: 10px 10px 0 10px;
    float:left;
    width:700px;
    height:600px;
  }
</style>
