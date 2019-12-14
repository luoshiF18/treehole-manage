<template>
  <div>
    <div>
      <el-steps :active="active" finish-status="success" simple>
        <el-step title="基本信息"></el-step>
        <el-step title="活动规则"></el-step>
        <el-step title="选择商品"></el-step>
      </el-steps>
      <div v-if="active === 0">
        <el-card>
          <el-form :model="activityRequest.activity" style="margin-top: 20px;" label-width="150px">
            <el-form-item label="活动类型" prop="type">
              <el-select v-model="activityRequest.activity.typeId" placeholder="请选择活动类型">
                <el-option label="满减"     value="1_1_1"></el-option>
                <el-option label="促销价"   value="2_2_1"></el-option>
                <el-option label="打折"     value="3_3_1"></el-option>
                <!--<el-option label="优惠套餐" value="5"></el-option>
                <el-option label="赠品"     value="6"></el-option>-->
              </el-select>
            </el-form-item>

            <el-form-item label="活动名称" prop="title" >
              <el-input v-model="activityRequest.activity.title"></el-input>
            </el-form-item>
            <el-form-item label="副标题" prop="subTitle">
              <el-input v-model="activityRequest.activity.subTitle"></el-input>
            </el-form-item>
            <el-form-item label="活动起止时间">
              <el-col :span="8">
                <el-date-picker v-model="activityRequest.activity.beginTime" type="datetime" placeholder="选择开始时间"
                                style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col :span="1">至</el-col>
              <el-col :span="8">
                <el-date-picker v-model="activityRequest.activity.endTime" type="datetime" placeholder="选择结束时间"
                                style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item>

            </el-form-item>
            <el-form-item label="活动规则">
              <el-input type="textarea" :rows="2" v-model="activityRequest.activity.rule" placeholder="请填写活动规则"></el-input>
            </el-form-item>
          </el-form>
        </el-card>

      </div>
      <div v-if="active === 1">
        <el-card>

          <el-form :model="activityRequest.activityRule" style="margin-top: 20px;" label-width="150px">
            <el-form-item label="优惠类型">
              <el-radio-group v-model="activityRequest.activityRule.type">
                <el-radio :label="1">减钱</el-radio>
                <el-radio :label="2">打折</el-radio>
                <el-radio :label="3">促销价（商品选择）</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="优惠条件" v-if="activityRequest.activityRule.type != '3'">
              <el-radio-group v-model="activityRequest.activityRule.threshold">
                <!-- <el-radio label="1">满元</el-radio>
                 <el-radio label="2">满件</el-radio>-->
                <el-radio :label="1" >
                  <!-- <el-input v-model="activityRequest.activityRule.withAmount" style="text-align: center"><span slot="prefix">满</span><span slot="suffix">元</span></el-input>-->


                  满<input v-model="activityRequest.activityRule.withAmount" type="text"> 元</el-radio>
                <el-radio :label="2">
                  <!-- <el-input v-model="activityRequest.activityRule.withNumber"><span slot="prefix">满</span><span slot="suffix">件</span></el-input>-->
                  满<input v-model="activityRequest.activityRule.withNumber" type="text">件</el-radio>
              </el-radio-group>
              <br>
              <el-radio-group v-model="activityRequest.activityRule.type">
                <el-radio :label="1">
                  减<span><input type="text" v-model="activityRequest.activityRule.reduction"></span>元
                </el-radio>
                <el-radio :label="2">
                  打<input type="text" v-model="activityRequest.activityRule.discount">折
                </el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="限购数量">
              <el-input v-model="activityRequest.activityRule.limitNum" placeholder="每个用户在此优惠下最多可购买的数量"></el-input>
            </el-form-item>
            <el-form-item label="积分设置">
              <el-input v-model="activityRequest.activityRule.point" placeholder="为活动设置固定积分值"></el-input>
            </el-form-item>
            <el-form-item label="积分描述">
              <el-input v-model="activityRequest.activityRule.pointDesc"></el-input>
            </el-form-item>

          </el-form>
        </el-card>
      </div>
      <div v-if="active === 2">
        <el-card>
          <el-form  style="margin-top: 20px;" label-width="150px" :model="res">
            <el-form-item label="商品类型">
              <el-radio-group v-model="res.resTypes" >
                <el-radio label="1">量表</el-radio>
                <el-radio label="2">视频</el-radio>
                <el-radio label="3">咨询</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="量表类型" v-if="res.resTypes == '1'">

              <!-- <el-select v-model="res.scaleTypeId" placeholder="请选择分类">
                 <el-option
                   v-for="item in scaleTypes" :key="item.id" :label="item.scaleType" :value="item.id">
                 </el-option>
               </el-select>-->
              <el-select v-model="scalePagination.scaleTypeId" style="width:120px" clearable placeholder="选择分类">
                <el-option
                  v-for="item in scaleTypes"
                  :key="item.id"
                  :label="item.scaleType"
                  :value="item.id">
                </el-option>
              </el-select>

            </el-form-item>
            <!--  <el-form-item>
                <el-table
                  ref="multipleTable"
                  :data="res.scales"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column prop="scaleName" label="名称" width="120"></el-table-column>
                  &lt;!&ndash;<el-table-column prop="images" label="图片" width="120"></el-table-column>&ndash;&gt;
                  <el-table-column prop="price" label="价格" width="60"></el-table-column>
                </el-table>
              </el-form-item>-->


            <!--表单1-->
            <div>
              <el-table :data="res.scales"
                        class="table1" @selection-change="handleSelectionChange" height="250" ref="multipleTable">
                <el-table-column type="selection" align="center" width="60"></el-table-column>
                <el-table-column prop="scaleName" align="center" label="名称" width="180"></el-table-column>
                <el-table-column prop="images" align="center" label="图片" width="100"></el-table-column>
                <el-table-column prop="price" align="center" label="价格" width="150"></el-table-column>
              </el-table>
              <!--按钮-->
              <el-button type="success" @click="turnToGoods()" class="optionBtn">
                <i class="el-icon-arrow-right el-icon--right"></i>
              </el-button>
              <!--表单2-->
              <el-table :data="activityRequest.activityGoodsList"
                        tooltip-effect="dark"
                        height="250"
                        class="table2"
                        sort-orders="descending">
                <el-table-column  prop="resType" label="商品类型" align="center" width="100" :formatter="formatResType"></el-table-column>
                <el-table-column prop="resId" label="商品ID" align="center" width="150"></el-table-column>
                <el-table-column prop="resName" align="center" label="商品名称" width="100"></el-table-column>
                <el-table-column prop="price" align="center" label="原价" width="70"></el-table-column>
                <el-table-column prop="actualPrice" align="center" label="活动价" width="80" ></el-table-column>
                <el-table-column label="操作" align="center" width="100">
                  <template slot-scope="page">
                    <el-button type="text" class="del"
                               size="medium" @click="del(page.row)">删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form>
        </el-card>
      </div>


      <div class="deployBtn">
        <el-button style="margin-top:  12px;" @click="prev" v-if="active==1||active==2">上一步</el-button>
        <el-button style="margin-top:  12px;" @click="next" v-if="active==0||active==1">下一步</el-button>
        <el-button v-if="active==2" @click="submit">提交</el-button>
      </div>
    </div>


  </div>
</template>

<script>
    import * as marketingApi from '../../api/marketing'
    export default {
        name: "activity_update",
        data() {
            return {
                active: 0,
                activityId: '',
                scaleTypes: [{   //量表的所有分类
                    id: '',
                    scaleType: '',
                }],
                res: {             //选择的商品资源
                    resTypes: '1', //1.量表 2.视频 3.咨询
                    scales : [],   //选择量表类型后显示的table1中量表数据

                },
                scalePagination : {//量表的分页
                    page: '1',
                    size: '5',
                    scaleTypeId: '',
                },
                multipleSelection: [],// 选中的项
                activityRequest: {//提交的活动内容
                    activity: {
                        id: '',
                        title: '',
                        subTitle: '',
                        typeId:'',
                        beginTime: '',
                        endTime: '',
                        typeName: '',
                        images: '',
                        rule: '',
                        status: '',
                        description: ''
                    },
                    activityRule: {
                        type: '1',
                        discount: '',
                        fixedAmount: '',
                        reduction: '',
                        limitNum: '',
                        threshold: '0',
                        withAmount: '',
                        withNumber: '',
                        //  withCoupon: '0',
                        //  couponId: '',
                        point: '',
                        pointDesc: '',
                    },
                    activityGoodsList: [],
                },
            }
        },
        methods: {
            del(row){
                //确认提示
                this.$confirm('确认删除吗？', '提示', {}).then(() => {
                    this.activityRequest.activityGoodsList.splice(this.activityRequest.activityGoodsList.indexOf(row), 1);
                });

            },
            submit(){
                //确认提示
                this.$confirm('确认提交吗？', '提示', {}).then(() => {
                    marketingApi.activity_update(this.activityRequest).then((res) => {
                        //    解析响应内容
                        if (res.success) {
                            this.$message.success('提交成功！');
                            //进行下一步，添加问题和选项
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                });
            },
            queryActivityFromServer() {
              marketingApi.activity_all(this.activityId).then((res) => {
                  this.activityRequest.activity = res.activity;
                  this.activityRequest.activityRule = res.activityRule;
                  this.activityRequest.activityGoodsList = res.activityGoodsList;
                  for (let i = 0; i < this.activityRequest.activityGoodsList.length; i++) {
                      let goods= this.activityRequest.activityGoodsList[i];
                      delete goods.id;
                      delete goods.activityId;
                  }

              })
            },
            queryScaleType() {
                if(this.res.resTypes == 1){
                    marketingApi.queryScaleType().then((res) => {

                        this.scaleTypes = res.queryResult.list;
                        //alert(JSON.stringify(this.res.scaleTypes))
                        //alert(this.res.scaleTypes[0].id)
                    })
                }
            },
            queryScaleByTypeId() {
                if(this.scalePagination.scaleTypeId != ''){
                    marketingApi.queryScaleByTypeId(this.scalePagination).then((res) => {
                        this.res.scales = res.queryResult.list;
                    })
                }

            },
            turnToGoods() {
                if(this.res.resTypes == "1"){
                    if(this.multipleSelection.length>0){

                        const goodsList = this.activityRequest.activityGoodsList.reverse();//为了实现新增加数据的在上面
                        let lists = [];
                        for (let i = 0; i < this.multipleSelection.length; i++) {
                            let scale= this.multipleSelection[i];
                            let list = {};
                            //    actualPrice: '89',
                            list.resType = '1';
                            [list.resId, list.resName, list.image, list.price] = [scale.id,scale.scaleName,scale.image,scale.price];

                            /*list.resId = scale.id;
                            list.resName = scale.scaleName;
                            list.image = scale.image;
                            list.price = scale.price;*/
                            //lists= lists.concat(list);
                            if(JSON.stringify(this.activityRequest.activityGoodsList).indexOf(JSON.stringify(list.resId))>0){

                                list = {};
                                lists = [];
                                this.multipleSelection.length = 0;
                                this.$confirm('有重复提交项，请检查再提交', '提示', {}).then(() => {
                                })
                            }
                            if(JSON.stringify(list)!= '{}'){
                                lists= lists.concat(list);
                            }
                        }
                        if(JSON.stringify(lists) != '[]'){
                            this.activityRequest.activityGoodsList = goodsList.concat(lists);

                        }
                        this.activityRequest.activityGoodsList.reverse();//为了实现新增加数据的在上面
                        this.$refs.multipleTable.clearSelection();//
                    }
                }
            },
            /*  toggleSelection(rows) {
                  if (rows) {
                      rows.forEach(row => {
                          this.$refs.multipleTable.toggleRowSelection(row);
                      });
                  } else {
                      this.$refs.multipleTable.clearSelection();
                  }
              },*/
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            prev() {
                --this.active;
                if(this.active < 0) this.active = 0;
            },
            next() {
                if(this.active++ > 2) this.active = 0;
            },
            //商品类型
            formatResType(row, column){
                const resType = row[column.property]
                if(resType=='1'){
                    return "量表";
                } else if(resType == "2"){
                    return "视频";
                } else if(resType == "3"){
                    return "咨询";
                }
            },
        },
        created() {
            //取出路由中的参数,赋值给数据对象
            this.activityId = this.$route.query.id;
            this.queryActivityFromServer();
        },
        mounted() {
            this.queryScaleType();
        },
        watch: {
            scalePagination: { // 监视pagination属性的变化
                deep: true, // deep为true，会监视pagination的属性及属性中的对象属性变化
                handler() {
                    if(this.scalePagination.scaleTypeId != ''){
                        this.queryScaleByTypeId();
                    }


                }
            },
        }

    }
</script>

<style scoped>
  .deployBtn{
    float: right;
  }
</style>
