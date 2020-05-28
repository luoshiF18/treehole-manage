<template>
  <div style="height: 100%">
    <el-button type="primary" icon="el-icon-back" @click="go_back">返回列表</el-button>
    <br><br>
    <!--    <h1 align="center">量表详细信息</h1>-->
   <!-- <el-card shadow="never">-->
      <el-card :body-style="{ padding: '10px' }" style="text-align: center;">
        <span><h3>活动信息</h3></span>
      </el-card>
      <el-card class="box-card" style="width: 100%;">
        <el-tabs tab-position="left" style="height: 310px">
          <el-tab-pane label="基本信息">

            <span>活动标题：</span><span class="color" v-text="activity.title"></span><br>
            <span>活动副标题： </span><span class="color" v-text="activity.subTitle"></span><br>
    <!--        <span>活动开始时间：</span><span class="color" v-text="activity.beginTime"></span><br>

            <span>活动结束时间： </span><span class="color" v-text="activity.endTime"></span><br>-->
            <span>活动开始时间：</span><span class="color">{{activity.beginTime | dateFilter}}</span><br>
            <span>活动结束时间： </span><span class="color">{{activity.endTime | dateFilter}}</span><br>
            <span>活动类型： </span><span class="color" v-text="activity.typeName"></span><br>

            <span>活动规则： </span><span class="color" v-text="activity.rule"></span><br>

          </el-tab-pane>
          <el-tab-pane label="活动描述">
            <template>
              <!--<div style="height:400px;">-->
              <el-scrollbar style="height:100%">
                <div style="height:400px;" >
                  <div v-html="activity.description">{{}}</div>
                </div>
              </el-scrollbar>
              <!-- </div>-->
            </template>
          </el-tab-pane>
          <el-tab-pane label="活动规则">
            <div v-if="activityRule.discount != null"><span>折扣： </span><span class="color" v-text="activityRule.discount">折</span></div>
            <div v-if="activityRule.fixedAmount != null"><span>活动价： </span><span class="color" v-text="activityRule.fixedAmount"></span></div>
            <div v-if="activityRule.reduction != null"><span>优惠金额： </span><span class="color" v-text="activityRule.reduction"></span></div>
            <span>限购</span><span class="color" v-text="activityRule.limitNum"></span>
            <br>
            <span>积分</span><span class="color" v-text="activityRule.point"></span>
            <br>
          </el-tab-pane>
          <el-tab-pane label="商品信息" v-if="types[1] != '4'">
          <!--  <div v-if="activityGoods.goodsMap['scaleId']">
              {{activityGoods.goodsMap['sacleId']}}
            </div>-->
            <el-scrollbar style="height:100%">
              <div style="height:400px;" >
                 <div>
              <el-table :data="activityGoodsList"
                        style="width: 100%">

                <el-table-column  prop="resType" label="资源类型" min-width="10%" align="center">
                  <template scope="scope">
                    <p v-if="scope.row.resType == '1'">量表
                    </p>

                  </template>
                </el-table-column>
                <el-table-column  prop="resName" label="资源名称" min-width="20%" align="center">
                </el-table-column>
                <el-table-column prop="price" label="原价格" min-width="10%" align="center">
                </el-table-column>
                <el-table-column prop="actualPrice" label="活动价格" min-width="10%" align="center">
                  <template scope="scope">
                    <p v-if="scope.row.actualPrice == null">以活动页面为准
                    </p>
                    <p e-else>{{scope.row.actualPrice}}</p>
                  </template>
                </el-table-column>
              </el-table>
            </div>
              </div>
            </el-scrollbar>
          </el-tab-pane>

        </el-tabs>

      </el-card>
      <el-dialog title="优惠券信息"
               :close-on-click-modal='false'
               :visible.sync="show"
               :append-to-body='true'
               :lock-scroll="true"
               width="50%"
               height="600"
    >
      <el-card style="height: 400px; overflow: auto;" shadow="never">
        <coupon-info-form :id="activityRule.couponId" ref="couponInfoForm" :show="show" :usedFor="false"/>
      </el-card>
    </el-dialog>
    <!--</el-card>-->
    <br><br>
  </div>
</template>

<script>
    import * as marketingApi from '../../api/marketing'
    export default {
        name: "activity_info",
        data() {
            return {
                show: false,//优惠券信息的弹窗
                activityId: '',
                typeId: '',
                types: [],
                activity: {
                    id: '',
                    title: '',
                    subTitle: '',
                    beginTime: '',
                    endTime: '',
                    typeName: '',
                    typeId: '',
                    images: '',
                    rule: '',
                    status: '',
                    description: ''
                },
                activityRule: {
                    discount: '',
                    fixedAmount: '',
                    reduction: '',
                    limitNum: '',
                    withCoupon: '',
                    couponId: '',
                    point: '',
                },
                activityGoodsList: [
                    {
                        resType: '',
                        resName: '',
                        image: '',
                        price: '',
                        actualPrice: '',
                    }
                ],
            }
        },
        methods: {
            getActivityDetail() {
                marketingApi.activity_detail(this.activityId).then((res) => {
                    this.activity = res;
                })
            },
            getActivityRule() {
                marketingApi.activity_rule(this.activityId).then((res) => {
                    this.activityRule = res;
                    //alert(this.activityRule.withCoupon+ "/typepof" +typeof(this.activityRule.withCoupon));
                   /* alert(JSON.stringify(this.activityRule.fixedAmount));
                    alert(JSON.stringify(this.activityRule.discount));
                    alert(JSON.stringify(this.activityRule.reduction));*/

                    //+"/"+this.activityRule.discount+"/"+this.activityRule.reduction
                })
            },
            getActivityGoods() {
                marketingApi.activity_goods(this.activityId).then((res) => {

                    this.activityGoodsList = res;
                   // alert(res.goods)
                })
            },
            go_back() {
                if(this.types[1] == 4){
                    this.$router.push({
                        path: '/marketing/activity/point/list'
                    });
                } else {
                    let typeId = this.activity.typeId;
                    if(typeId == '1_1_1' ){
                        this.$router.push({
                            path:'/marketing/activity/page/list/1_1_1',
                        });
                    } else if(typeId == '2_2_1'){
                        this.$router.push({
                            path:'/marketing/activity/page/list/2_2_1',
                        });
                    }else if(typeId == '3_3_1'){
                        this.$router.push({
                            path:'/marketing/activity/page/list/3_3_1',
                        });
                    }

                }

            },
        },
        filters: { //自定义私有过滤器 过滤器有两个条件 过滤器名称:处理函数
            dateFilter: function (dateStr, pattern = "") {
                var dt = new Date(dateStr)
                //yyyy-mm-dd
                var y = dt.getFullYear()
                var m = dt.getMonth() + 1
                var d = dt.getDate()
                if (pattern.toLowerCase() === 'yyyy-mm-dd') {
                    return `${y}-${m}-${d}`
                } else { // hh:mm:ss
                    var hh = dt.getHours()
                    var mm = dt.getMinutes()
                    var ss = dt.getSeconds()
                    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
                }
            }
        },
        created() {
            //取出路由中的参数,赋值给数据对象
            this.activityId = this.$route.query.id;
            this.typeId = this.$route.query.typeId;
            this.types = this.typeId.split("_");
            if(this.types[1] == 4){
                this.getActivityDetail();
                this.getActivityRule();
                this.activityGoodsList = null;
            } else {
                this.getActivityDetail();
                this.getActivityRule();
                this.getActivityGoods();
            }

        },
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

  .el-scrollbar__wrap{
    overflow-x: hidden;
  }

</style>

