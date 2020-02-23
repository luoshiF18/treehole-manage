<template>
  <div>
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
        tooltip: {},
        legend: {
          data: ['咨询师数量']
        },
        xAxis: {
          data: [],//动态数据
          name: '月份',//x坐标名称
          axisLine: {
            symbol: ['none', 'arrow'],//是否显示轴线箭头
          },
        },
        yAxis: {
          type: 'value',
          name: '咨询师数量/名',
          axisLine: {
            symbol: ['none', 'arrow'],//是否显示轴线箭头
          },
        },
        series: [{
          name: '咨询师数量',
          type: 'line',
          data: [],//动态数据
        }]
      });
      //异步请求x轴数据
      psychologistApi.month_get().then((res) => {
        //填入数据
        myChart.setOption({
          xAxis: {
            data: res
          },
        })
      });
       //异步请求直线图需要展示的数据
       psychologistApi.number_get().then((res) => {
         //填入数据
         myChart.setOption({
           series: [{
             name: '咨询师数量',
             data: res
           }]
         })
       });
    },
  }
</script>
