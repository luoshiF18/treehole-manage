<template>
  <div class="wid">

    <h1>《{{resultExt.scaleName}}》测评报告</h1>
    <div class="piece">
      <table>
        <tr>
          <td>登录名:</td>
          <td>{{resultExt.user_nickname}}</td>
        </tr>
        <tr>
          <td>姓名:</td>
          <td>{{resultExt.user_name}}</td>
        </tr>
        <tr>
          <td>性别:</td>
          <td>{{resultExt.gender == 1 ? '女' : '男'}}</td>
        </tr>
        <tr>
          <td>出生日期:</td>
          <td>{{resultExt.user_birth}}</td>
        </tr>
        <tr>
          <td>完成时间:</td>
          <td>{{resultExt.createTime}}</td>
        </tr>
      </table>
    </div>

    <div class="piece">
      <h3>一.测验介绍</h3>
      <div class="score-description-bord">
        <span>{{resultExt.topicBackground}}</span>
      </div>
    </div>

    <div class="piece">
      <h3>二.测试结果</h3>
      <div>
        <h1>生活事件量表</h1>
        <div id="myLine" ref="myLine"></div>
        <div>
          <table class="eva_table">
            <tr class="eva_rep_bac">
              <td colspan="3"><span class="eva_font">总评</span></td>
            </tr>

            <tr class="eva_rep_2">
              <td><span class="eva_font">原始分：{{resultExt.score}}</span></td>
              <td><span class="eva_font">标准分：</span></td>
              <td><span class="eva_font">状态：{{resultExt.heal_level}}</span></td>
            </tr>

            <tr>
              <td colspan="3">
                <span class="eva_font">【结果描述】</span>
                <br>
                <span>{{resultExt.description}}</span>
              </td>
            </tr>

            <tr>
              <td colspan="3">
                <span class="eva_font">【心理建议】</span>
                <br>
                <span class="eva_first_two">{{resultExt.topicSuggest}} </span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <div class="piece">
      <h3>三.原始答卷</h3>
      <el-table
        :data="resultTinies"
        stripe
        style="width: 100%">
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column prop="scaleName" label="问题" width="120">
        </el-table-column>
        <el-table-column prop="scaleName" label="用户答案" width="120">
        </el-table-column>
      </el-table>
    </div>


  </div>
</template>


<script>
  import * as archivesApi from '../api/archivesReport.js'


  export default {
    data() {
      return {
        resultTinies: [], //历次作答记录
        resultExt: {},
        reque:{
          resultId: '',
        }
      }
    },
    methods:{
      queryArchivesExt:function () {  //查询页面列表
        // alert('查询')
        //调用服务端的接口
        archivesApi.query_archivesExt(this.reque.resultId).then((res)=>{
          //将res结果数据赋值给数据模型对象
          this.resultExt = res;
          console.log(this.archivesExt);
        })
      },
    },
    created(){
      //取出路由中的参数,赋值给数据对象
      this.reque.resultId = this.$route.query.resultId || '';
    },
    mounted() {

      //当dom元素全部渲染完成后,调用query
      this.queryArchivesExt();
      //this.querySite();
      //以下三步即可完成echarts的初始化使用,代码注释的详解别忘了看看
      const myLine = this.$echarts.init(this.$refs.myLine);
      myLine.setOption(
        {
          title: {
            text: '生活事件量表',   //图表顶部的标题
            subtext: '纯属虚构'    //副标题
          },
          tooltip: {   //鼠标悬浮框的提示文字
            trigger: 'axis'
          },
          legend: {
            data: [ '总分']
          },
          xAxis: [{  //x轴坐标数据
            type: 'category',
            boundaryGap: false,
            data: ['第一次', '第二次']
          }],
          yAxis: [{   //y轴坐标数据
            type: 'value',
            axisLabel: {
              formatter: '{value} '
            }
          }],
          series: [  //驱动图表生成的数据内容数组，几条折现，数组中就会有几个对应对象，来表示对应的折线
            {
              name: "总分",
              type: "line",  //pie->饼状图  line->折线图  bar->柱状图
              itemStyle : {
                normal : {
                  lineStyle:{
                    color:'#000000'
                  }
                }
              },
              data: [26,13.5],
            }
          ]
        }
      );
    }
  }
</script>

<style scoped>
  /*编写页面样式，不是必须*/
  h1,h3{
    text-align: center;
  }
  .el-input__inner{
    width: 200px;
  }
  .score-description-bord{
    width: 100%;
    font-family: Bahnschrift;
    letter-spacing: 1px;
  }
  #myLine {
    width: 500px;
    height: 400px;
  }
  table{
    margin:auto ;
  }
  table,td{
    width: 500px;
    /*text-align:center;*/
    vertical-align:middle;
    border: 1px solid black;
    border-collapse: collapse;
  }
  div{
    margin:0 auto;
    text-align:center;
  }
  .wid{
    width: 65%;
    border: 1px solid #d7d7dc;
    padding: 60px;
  }
  h3{
    text-align:left
  }
  .piece{
    margin-top: 5%;
  }
  .eva_table{
    width: 70%;
    border: 3px solid black;
    text-align: left;
  }
  .eva_rep_bac{
    height: 60px;
    background: #d7d7dc;
  }
  .eva_rep_2{
    height: 50px;
  }
  .eva_font{
    font-weight: bold;
  }
  td{
    padding-left: 5px;
  }
  .eva_first_two{
    font-family: Bahnschrift;
  }

</style>
