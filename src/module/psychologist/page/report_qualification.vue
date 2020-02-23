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
        title: {
          text: '咨询师资质占比情况饼状图',
          subtext: '',
          x: 'center'
        },
        tooltip: {//提示框组件
          trigger: 'item',//触发类型，在饼形图中为item
          formatter: "{a} <br/>{b} : {c} ({d}%)"//提示内容格式
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: []
        },
        series: [
          {
            name: '咨询师资质占比',
            type: 'pie',
            radius: '70%',
            center: ['50%', '60%'],
            data: [],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });
      //异步请求legend所需要的数据
      psychologistApi.qualificationNames_get().then((res) => {
        //填入数据
        myChart.setOption({
          legend: {
            data: res.qualificationNames
          },
        })
      });
      //异步请求series所需要的数据
      psychologistApi.qualificationCount_get().then((res) => {
        //填入数据
        myChart.setOption({
          series: [{
            name: '咨询师资质占比',
            data: res.qualificationCount
          }]
        })
      });
    },
  }
</script>
