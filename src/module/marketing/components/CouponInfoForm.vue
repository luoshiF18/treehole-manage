<template>
  <div>
    <el-form ref="couponForm" :model="form" label-width="150px">
      <el-form-item label="优惠券名称" prop="title">
        <el-input v-model="form.title" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="typeId">
        <el-select v-model="form.typeId" placeholder="优惠券类型">
          <el-option
            v-for="item in types"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            disabled="disabled">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否可用于特价商品" prop="withSpecial">
        <el-radio-group v-model="form.withSpecial"  disabled="disabled">
          <el-radio-button label="false">不可用于</el-radio-button>
          <el-radio-button label="true">可用于</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="使用门槛" prop="withAmount">
        <el-input v-model="form.withAmount"  disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="面额" prop="usedAmount">
        <el-input v-model="form.usedAmount"  disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="阶梯金额" prop="stepAmount">
        <el-input v-model="form.stepAmount"  disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="发放开始时间" prop="startTime">
        <el-date-picker v-model="form.startTime" type="datetime" placeholder="发放开始时间"  disabled="disabled"></el-date-picker>
      </el-form-item>
      <el-form-item label="发放结束时间" prop="endTime">
        <el-date-picker v-model="form.endTime" type="datetime" placeholder="发放结束时间"  disabled="disabled"></el-date-picker>
      </el-form-item>
      <el-form-item label="时效" prop="validType">
        <el-radio-group v-model="form.validType"  disabled="disabled">
          <el-radio-button label="false">相对</el-radio-button>
          <el-radio-button label="true">绝对</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <div v-if="form.validType == 'false' || form.validType == ''">
        <el-form-item label="领取N天后失效" prop="validDays">
          <el-input v-model="form.validDays" placeholder="N天失效"  disabled="disabled"></el-input>
        </el-form-item>

      </div>
      <div v-else>
        <el-form-item label="使用起止时间">
          <el-col :span="11">
            <el-date-picker disabled="disabled" v-model="form.validStartTime" type="datetime" placeholder="使用开始时间" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col :span="1">至</el-col>
          <el-col :span="11">
            <el-date-picker disabled="disabled" v-model="form.validEndTime" type="datetime" placeholder="使用结束时间" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
      </div>
     <!-- <el-form-item label="使用结束时间" prop="endTime">
        <el-date-picker v-model="form.validEndTime" type="datetime" placeholder="选择使用结束时间"></el-date-picker>
      </el-form-item>-->
      <el-form-item label="发行量" prop="quota">
        <el-input v-model="form.quota"  disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="限领" prop="limitNum">
        <el-input v-model="form.limitNum"  disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="适用人群" prop="usedBy">
        <el-radio-group v-model="form.usedBy"  disabled="disabled">
          <el-radio-button label="0">全体会员</el-radio-button>
          <el-radio-button label="1">普通会员</el-radio-button>
          <el-radio-button label="2">付费会员</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import * as marketingApi from '../api/marketing'
    export default {
        name: "CouponInfoForm",
        props: {
            id: {
                type: String
            },
            isEdit: {
                type: Boolean,
                default: false
            },
            usedFor: {
                type: Boolean
            }
        },
        data() {
            return {
                types: [],
                form: {
                    title: '',
                    icon: '',
                    typeId: '',
                    typeName: '',
                    withSpecial: '',
                    withAmount: '',
                    usedAmount: '',
                    stepAmount: '',
                    startTime: '',
                    endTime: '',
                    validType: '',
                    validStartTime: '',
                    validEndTime: '',
                    validDays: '',
                    quota: '',
                    limitNum: '',
                    usedBy: ''
                }
            }
        },
        methods: {

            queryTypeFromServer(){
                marketingApi.coupon_detail(this.id).then((res)=>{
                    this.form = res;
                })

            },
        },
        mounted(){
            this.queryTypeFromServer();
        },

    }

</script>

<style scoped>
  disabledSet{}
</style>
