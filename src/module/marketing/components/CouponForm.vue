<template>
  <div>
    <el-form ref="couponForm" :model="form" label-width="150px" :rules="pageFormRules">
      <el-form-item label="优惠券名称" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="typeId">
        <el-select v-model="form.type" placeholder="请选择优惠券类型">
          <el-option label="注册赠券" :value="1"></el-option>
          <el-option label="全场赠券" :value="2"></el-option>
          <el-option label="购物赠券" :value="3"></el-option>
        </el-select>

        <!--<el-select v-model="form.typeId" placeholder="请选择优惠券类型">
          <el-option
            v-for="item in types"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>-->
      </el-form-item>
      <el-form-item label="是否可用于特价商品" prop="withSpecial">
        <el-radio-group v-model="form.withSpecial">
          <el-radio-button label="false">不可用于</el-radio-button>
          <el-radio-button label="true">可用于</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="使用门槛" prop="withAmount">
        <el-input v-model="form.withAmount"><span slot="prefix">满</span><span slot="suffix">元</span></el-input>
      </el-form-item>
      <el-form-item label="面额" prop="usedAmount">
        <el-input v-model="form.usedAmount"><span slot="suffix">元</span></el-input>
      </el-form-item>
      <!--  <el-form-item label="发放起止时间" prop="startTime">
          <el-col :span="11" prop="startTime">
            <el-date-picker v-model="form.startTime" type="datetime" placeholder="选择发放开始时间" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col :span="1">至</el-col>
          <el-col :span="11" prop="endTime">
            <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择发放结束时间" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>-->
      <el-form-item label="发放开始时间" prop="startTime">
        <el-date-picker v-model="form.startTime" type="datetime" placeholder="选择发放开始时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="发放结束时间" prop="endTime">
        <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择发放结束时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="有效期" prop="validType">
        <el-radio-group v-model="form.validType" @change="changeValidType">
          <el-radio-button label="false">固定天数</el-radio-button>
          <el-radio-button label="true">日期范围</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <!-- <div v-if="form.validType == 'true'">
         <el-form-item label="使用起止时间" prop="startTime">
           <el-col :span="11">
             <el-date-picker v-model="form.validStartTime" type="datetime" placeholder="选择使用开始时间" style="width: 100%;"></el-date-picker>
           </el-col>
           <el-col :span="1">至</el-col>
           <el-col :span="11">
             <el-date-picker v-model="form.validEndTime" type="datetime" placeholder="选择使用结束时间" style="width: 100%;"></el-date-picker>
           </el-col>
         </el-form-item>
       </div>
       <div v-else>
         <el-form-item label="N天失效" prop="validDays">
           <el-input v-model="form.validDays" placeholder="N天失效"></el-input>
         </el-form-item>
       </div>-->
      <!--这里如果不加 form.validType == '' ，会先出现使用起止时间;如果不用'false',点击一次后不会再有反应-->
      <div v-if="form.validType == 'false' || form.validType == ''">
        <el-form-item label="领取N天后失效" prop="validDays">
          <el-input v-model="form.validDays" placeholder="N天失效"></el-input>
        </el-form-item>

      </div>
      <div v-else>
        <el-form-item label="使用起止时间">
          <el-col :span="11">
            <el-date-picker v-model="form.validStartTime" type="datetime" placeholder="选择使用开始时间"
                            style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col :span="1">至</el-col>
          <el-col :span="11">
            <el-date-picker v-model="form.validEndTime" type="datetime" placeholder="选择使用结束时间"
                            style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
      </div>
      <!-- <el-form-item label="使用结束时间" prop="endTime">
         <el-date-picker v-model="form.validEndTime" type="datetime" placeholder="选择使用结束时间"></el-date-picker>
       </el-form-item>-->
      <el-form-item label="发行量" prop="quota">
        <el-input v-model="form.quota"></el-input>
      </el-form-item>
      <el-form-item label="限领" prop="limitNum">
        <el-input v-model="form.limitNum"></el-input>
      </el-form-item>
      <el-form-item label="适用人群" prop="usedBy">
        <el-radio-group v-model="form.usedBy">
          <el-radio-button label="0">全体会员</el-radio-button>
          <el-radio-button label="1">普通会员</el-radio-button>
          <el-radio-button label="2">付费会员</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="clear">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import * as marketingApi from '../api/marketing'

    export default {
        name: "CouponForm",
        props: {
            oldCoupon: {
                type: Object
            },
            isEdit: {
                type: Boolean,
                default: false
            },
            show: {
                type: Boolean,
                default: true
            },
        },
        data() {
            return {
                types: [],
                form: {
                    title: '',
                    icon: '',
                    type: '',
                    typeName: '',
                    withSpecial: '',
                    withAmount: '',
                    usedAmount: '',
                    stepAmount: '',
                    startTime: '',
                    endTime: '',
                    validType: 'false',
                    validStartTime: '',
                    validEndTime: '',
                    validDays: '',
                    quota: '',
                    limitNum: '',
                    usedBy: ''
                },
                // 添加界面必填选项+不填警告
                pageFormRules: {
                    title: [{required: true,  message: '不合法的输入', trigger: 'blur'}],
                /*    typeId: [{required: true, message: '不合法的输入', trigger: 'blur'}],
                    withSpecial: [{required: true, message: '不合法的输入', trigger: 'blur'}],
                    withAmount: [{required: true,  message: '不合法的输入', trigger: 'blur'}],
                    usedAmount: [{required: true,  message: '不合法的输入', trigger: 'blur'}],
                    stepAmount: [{required: true,  message: '不合法的输入', trigger: 'blur'}],
                    startTime: [{required: true, message: '不合法的输入', trigger: 'blur'}],
                    endTime: [{required: true,   message: '不合法的输入', trigger: 'blur'}],
                    validType: [{required: true, message: '不合法的输入', trigger: 'blur'}],
                    quota: [{required: true,     message: '不合法的输入', trigger: 'blur'}],
                    limitNum: [{required: true,  message: '不合法的输入', trigger: 'blur'}],
                    usedBy: [{required: true,    message: '不合法的输入', trigger: 'blur'}],
                    validDays: [{required: true,    message: '不合法的输入', trigger: 'blur'}],*/
                }
            }

        },
        methods: {

            submit() {
                if (!this.isEdit) {
                    //确认提示
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        marketingApi.coupon_add(this.form).then((res) => {
                            //    解析响应内容
                            if (res.success) {
                                this.$emit("close");//关闭dialog --父子组件
                                this.$message.success('提交成功！');
                                //进行下一步，添加问题和选项
                            } else {
                                this.$message.error(res.message);
                            }
                        });
                    });
                } else {
                    //确认提示
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        marketingApi.coupon_update(this.form).then((res) => {
                            //    解析响应内容
                            if (res.success) {
                                this.$emit("close");
                                this.$message.success('提交成功！');
                                //进行下一步，添加问题和选项
                            } else {
                                this.$message.error(res.message);
                            }
                        });
                    });
                }

            },
            //重置
            clear() {
                if (!this.isEdit) {
                    // 重置表单
                    this.$refs.couponForm.resetFields();
                } else {
                    Object.assign(this.form, this.oldCoupon);
                }

            },
            init() {
                //将这一部分从监听里面提取出来是因为，如果第一次打开的就是修改优惠券，会出现空表格，可是oldCoupon是有值的，不知道为什么没有渲染上
                if (this.isEdit) {
                    this.$refs.couponForm.clearValidate();//清除表单验证
                    Object.assign(this.form, this.oldCoupon);
                } else {
                    Object.assign(this.form, {
                        title: '',
                        icon: '',
                        type: '',
                        typeName: '',
                        withSpecial: 'false',
                        withAmount: '',
                        usedAmount: '',
                        stepAmount: '',
                        startTime: '',
                        endTime: '',
                        validType: 'false',
                        validStartTime: '',
                        validEndTime: '',
                        validDays: '',
                        quota: '',
                        limitNum: '',
                        usedBy: '0'
                    });
                }
            },
            changeValidType(val) {//修改了时效类型，则修改对应的时间

                if (this.isEdit) {  //修改请求，
                    let oldVal = this.oldCoupon.validType;
                    //alert("val="+val +"oldVal="+oldVal+"typeofval"+typeof(val)+"another"+typeof(oldVal));
                    if (val == oldVal.toString()) {
                        this.form.validEndTime = this.oldCoupon.validEndTime;
                        this.form.validStartTime = this.oldCoupon.validStartTime;
                        this.form.validDays = this.oldCoupon.validDays;
                    } else {
                        //alert("val="+val +"oldVal="+oldVal+"typeofval"+typeof(val)+"another"+typeof(oldVal));
                        if (val == true) {
                            this.form.validDays = null;
                        } else {
                            this.form.validStartTime = null;
                            this.form.validEndTime = null;
                        }
                    }
                } else {
                    //alert("val="+val +"typeofval"+typeof(val));
                    if (val == true) {
                        this.form.validDays = null;
                    } else {
                        this.form.validStartTime = null;
                        this.form.validEndTime = null;
                    }
                }

            },

        },
        mounted() {
            this.init();
        },
        watch: {
            oldCoupon: {
                deep: true,
                handler() {
                    this.init();
                    /*if (this.isEdit) {
                        Object.assign(this.form, this.oldCoupon);
                    } else {
                        Object.assign(this.form, {
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
                        });
                    }*/
                }
            },
            show: {  //没有提交，直接关闭dialog，则用户手动输入的数据恢复成原来的数据（新增：""，修改:
                deep: false,
                handler() {
                    if (!this.show) {
                        this.clear();
                    }
                    if(!this.show){
                        //如果不加这一段在编辑页面删掉了必填项（与表单验证不符，当打开同一个条信息的编辑，验证失败信息会出现，因为监听oldCoupon没有改变
                        this.init();
                    }
                }
            }
        }
    }

</script>

<style scoped>
  disabledSet {
  }
</style>
