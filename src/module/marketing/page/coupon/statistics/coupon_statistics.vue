<template>
  <div>
    <el-button type="primary" icon="el-icon-back" @click="go_back">返回列表</el-button>
    <span id="echarts_bar" style="width: 300px;height:400px;"></span>
    <!-- 饼状图pie-->
    <span id="echarts_pie" style="width: 500px;height:400px;"></span>
  </div>
</template>

<script>
    import echarts from 'echarts';
    import * as marketingApi from '../../../api/marketing';
    export default {
        name: "coupon_statistics",
        data() {
            return {
              id: '5a1ac5ac1763472a9409d28ae3612789',
                barCouponData: '',
                pieCouponUsedData: '',
            }
        },
        methods: {
          initData() {
              //优惠券领取情况
              marketingApi.coupon_statistics(this.id).then((res) => {
                this.barCouponData = res;
                //
                let names = [];     //类别数组（实际用来盛放X轴坐标值）
                let nums = [];       //销量数组（实际用来盛放Y坐标值）
                let obj = eval(res);     //解析后台传来的json数据
                for (let i = 0; i < obj.length; i++) {
                    names.push(obj[i].name);
                }
                for (let i = 0; i < obj.length; i++) {
                    nums.push(obj[i].value);
                }
                //
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('echarts_bar'));
                myChart.setOption({
                    title : {
                        text: '优惠券领取情况',//主标题
                    },
                    tooltip : {},
                    legend: {
                        data: '张数'
                    },
                    xAxis: {
                        data: names
                    },
                    yAxis: {},
                    series: [{
                        name: '张数',
                        type: 'bar',
                        data: nums
                    }]
                });


            })
              //优惠券使用情况
              marketingApi.coupon_used_statistics(this.id).then((res) => {
                  this.pieCouponUsedData = res;
                  //
                  let names = [];     //类别数组（实际用来盛放X轴坐标值）
                  let nums = [];       //销量数组（实际用来盛放Y坐标值）
                  let obj = eval(res);     //解析后台传来的json数据
                  for (let i = 0; i < obj.length; i++) {
                      names.push(obj[i].name);
                  }
                  for (let i = 0; i < obj.length; i++) {
                      nums.push(obj[i].value);
                  }
                  // 基于准备好的dom，初始化echarts实例
                  let myChart = echarts.init(document.getElementById('echarts_pie'));

                  myChart.setOption({
                      title : {
                          text: '优惠券领取后的使用情况',//主标题
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
                          bottom: 'bottom',
                          data: names
                      },
                      series : [
                          {
                              name: '用户使用信息',
                              type: 'pie',
                              radius : '50%',
                              center: ['50%', '50%'],
                              data: this.pieCouponUsedData,
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
          },
          go_back() {
               this.$router.push({
                   path: '/marketing/coupon/user/used/statistics'
               });
          }

        },
        created() {
            this.id = this.$route.query.id;;
        },
        mounted() {
            this.initData();
        }

    }
</script>

<style scoped>

</style>
