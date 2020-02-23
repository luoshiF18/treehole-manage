<template>
  <div>
    <!--为ECharts准备一个具备大小（宽高）的DOM-->
    <div id="main" style="width: 100%;height:500px"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import * as psychologistApi from '../api/psychologist'

  export default {
    mounted() {
      //基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'));
      //绘制图表
      myChart.setOption({
        backgroundColor: 'rgba(255, 255, 255, 1)',
        tooltip: {},//提示框不设值表示按照默认设置
        legend: {
          data: ['累计好评量'],
        },
        //x轴（横轴）
        xAxis: {
          data: [],
          name: '咨询师姓名',
          axisLine: {
            symbol: ['none', 'arrow'],//是否显示轴线箭头
          },
        },
        //y轴（纵轴）
        yAxis: {
          name: '好评数/个',
          axisLine: {
            symbol: ['none', 'arrow'],//是否显示轴线箭头
          },
        },
        //柱子要显示的数据
        series: [{
          barWidth: 25,//柱的宽度
          name: '累计好评量',
          type: 'bar',//bar表示柱状
          data: [],
        }]
      });
      //异步请求x轴数据
      psychologistApi.names_get().then((res) => {
        //填入数据
        myChart.setOption({
          xAxis: {
            data: res.queryResult.list
          },
        })
      });
      //异步请求柱子需要展示的数据
      psychologistApi.praises_get().then((res) => {
        //填入数据
        myChart.setOption({
          series: [{
            name: '累计好评量',
            data: res.queryResult.list
          }]
        })
      });
    },
  }
</script>
