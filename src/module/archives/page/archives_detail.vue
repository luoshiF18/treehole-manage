<template>
    <div>
      <div id="pdfCentent" class="wid">

        <h1>《{{archivesExt.scaleName}}》测评档案</h1>
        <div class="piece">
          <h3>一.基本信息</h3>
          <table>
            <tr>
              <td>登录名:</td>
              <td>{{archivesExt.user_nickname}}</td>
            </tr>
            <tr>
              <td>姓名:</td>
              <td>{{archivesExt.user_name}}</td>
            </tr>
            <tr>
              <td>性别:</td>
              <td>{{archivesExt.gender == 1 ? '女' : '男'}}</td>
            </tr>
            <tr>
              <td>评测次数:</td>
              <td>{{archivesExt.scaleCount}}</td>
            </tr>
            <tr>
              <td>出生日期:</td>
              <td>{{archivesExt.user_birth}}</td>
            </tr>
          </table>
        </div>

        <div class="piece">
          <h3>二.量表介绍</h3>
          <div class="score-description-bord">
            <span>{{archivesExt.topicBackground}}</span>
          </div>
        </div>

        <div class="piece">
          <h3>三.历次作答记录</h3>
          <el-table
            :data="resultTinies"
            stripe
            style="width: 100%">
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="createTime" :formatter="dateFormat" label="测评时间"></el-table-column>
            <el-table-column prop="score" label="得分"></el-table-column>
            <el-table-column prop="warningInfo" label="预警信息"></el-table-column>
          </el-table>
        </div>

        <div class="piece">
          <h3>四.心理测评趋势图</h3>
          <div>
            <h1>生活事件量表</h1>
            <div id="myLine" ref="myLine"></div>
          </div>
        </div>


      </div>
      <el-button type="danger"
                 @click="ExportSavePdf(htmlTitle,nowTime)">导出PDF</el-button>
    </div>

</template>


<script>
  import * as archivesApi from '../api/archives.js'
  import { Loading } from 'element-ui';
  import moment from 'moment'
  // import Watermark from '../../../common/watermark'

  export default {
    data() {
      return {
        resultTinies: [], //历次作答记录
        archivesExt: {},
        total: 0,
        params: {  //这里和上面的查询表单做了双向绑定
          page:1,
          size:8,
          userId: '2',
          scaleName: '生活事件量表'
        },
        reque:{
          userId: '2',
          scaleName: '生活事件量表'
        },
        echartData:{
          xData: [null],
          yData: [null]
        },
        htmlTitle: "PDF名称",
        nowTime: "",
        fullscreen: true
      }
    },
    methods:{
      queryArchivesExt:function () {  //查询页面列表
        // alert('查询')
        //调用服务端的接口
        archivesApi.query_archivesExt(this.reque).then((res)=>{
          //将res结果数据赋值给数据模型对象
          this.archivesExt = res;
          this.resultTinies = res.resultTinies;

          for (var i=0; i<this.archivesExt.scaleCount;i++){
            this.echartData.xData[i] = "第"+ (i+1) + "次";
            this.echartData.yData[i] = this.resultTinies[i].score;
          }

          // console.log(this.echartData.xData);
          // console.log(this.echartData.yData);


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
                data: this.echartData.xData
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
                  data: this.echartData.yData,
                }
              ]
            }
          );

        })
        this.fullscreen = false;
        let loadingInstance = Loading.service(this.fullscreen);
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close();
        });
      },
      dateFormat:function(row,column){
        var date = row[column.property];

        if(date == undefined){return ''};

        return moment(date).format("YYYY-MM-DD HH:mm:ss")

      }
    },
    created(){
      //取出路由中的参数,赋值给数据对象
      this.reque.userId = this.$route.query.userId || '';
      this.reque.scaleName = this.$route.query.scaleName || '';
    },
    mounted() {
      Loading.service(this.fullscreen);
      //当dom元素全部渲染完成后,调用query
      this.queryArchivesExt();
      //this.querySite();
        //以下三步即可完成echarts的初始化使用,代码注释的详解别忘了看看
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
  .ce{

  }
  table{
    margin:auto ;
  }
  table,td{
    width: 500px;
    text-align:center;
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
    /*border: 1px solid #d7d7dc;*/
    padding: 60px;

  }
  h3{
    text-align:left
  }
  .piece{
    margin-top: 5%;
  }
</style>
