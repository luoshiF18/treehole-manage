<template>
    <div>
      <el-form :model="couponBo">

          <div class="coupon">
            <span>¥</span><span id="price" v-text="couponBo.usedAmount"></span>
            <div class="date"><span>使用期限</span><span v-text="formatTime(couponBo.validStartTime)"></span>&nbsp;&nbsp;<span v-text="formatTime(couponBo.validEndTime)"></span></div>
            <div class="click"><el-button type="text" @click="receive">立即领券</el-button></div>
            <div class="linear"></div>
          </div>

      </el-form>
    </div>
</template>

<script>
    import * as marketingApi from '../api/marketing'
    import moment from 'moment'
    export default {
        name: "coupon_page",
        data() {
            return{
                couponId: '',
                couponBo: {
                    id: '',
                    title: '',
                    withAmount:'',
                    usedAmount: '',
                    withSpecial: '',
                    typeName: '',
                    usedType: '',
                    validType: '',
                    validStartTime: '',
                    validEndTime: '',
                    validDays: '',
                    limitNum: '',
                    usedBy: '',

                },
                userCouponRequest: {
                    id: '',
                    title: '',
                    withAmount:'',
                    usedAmount: '',
                    withSpecial: '',
                    typeName: '',
                    usedType: '',
                    validType: '',
                    validStartTime: '',
                    validEndTime: '',
                    validDays: '',
                    limitNum: '',
                    usedBy: '',
                    userId: '1',
                },

            }
        },
        methods: {
            receive() {
              marketingApi.receive_coupon(this.userCouponRequest).then((res)=>{
                  if(res.success){
                      this.$message.success("已领取")
                  } else if(res.message){
                      this.$message.error(res.message)
                  } else {
                      this.$message.error("领取失败")
                  }
              })
            },
            getCouponDetail() {
                marketingApi.coupon_cdetail(this.couponId).then((res) => {
                    this.couponBo = res;
                    this.userCouponRequest = this.couponBo;
                   /* title: '',
                        withAmount:'',
                        usedAmount: '',
                        withSpecial: '',
                        typeName: '',
                        usedType: '',
                        validType: '',
                        validStartTime: '',
                        validEndTime: '',
                        validDays: '',
                        limitNum: '',
                        usedBy: '',*/
                    this.userCouponRequest["userId"] = "zaici";
                })
            },
            formatTime(time) {
                if(time == null){
                    return "/";
                }
                const date = new Date(time);
                // return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                return moment(date).format("YYYY-MM-DD");
            },
        },
        created() {
            //取出路由中的参数,赋值给数据对象
            this.couponId = this.$route.query.id;

        },
        mounted() {
            this.getCouponDetail();
        }
    }
</script>

<style scoped>
  .coupon{
    transform: translate(75%);
    color: white;
    width: 367px;
    border:0px solid black;
    height: 57px;
    margin-top: 3%;
    background-color: red; /* 不支持线性的时候显示 */
    /*background-image: linear-gradient(to right, #FD7C56 , #FF293B);*/
    background-image: linear-gradient(to right, #FD7C56 , #FF283B);
    border-radius: 20px;
    padding: 7px;
    /*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);*/
  }
  #price{
    font-size: 1.7em;
    margin-left: 7px;
  }
  .linear{
    height: 64px;
    width: 0px;
    border: 1px dashed red;
    float: right;
    margin-right: 50px;
    transform: translate(-50%,-90%);
   /* margin-top: 53px;*/
  }
  .click{
    float: right;
    color: white;
    font-size: 16px;
    transform: translate(-30%,-130%);
    margin-right: 20px;
   /* margin-top: 60px;*/
  }
  .date{
    font-size: 10px;
    margin-top: 5px;
  }
  .el-button--text{
    color: #fff;
    font-size: 15px;
   /* transform: translate(-30%,-130%);*/
  }

  .el-button--text:hover{
    color: #bbb;
    /*font-size: 16px;
    transform: translate(-30%,-130%);*/
  }
</style>
