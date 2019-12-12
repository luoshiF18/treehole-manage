<template>
  <div>

    <el-card>
      <el-form :model="pagination">
        <router-link tag="span" :to="{path:'/marketing/activity/add'}">
          <el-button type="primary" size="medium" plain>添加活动</el-button>
        </router-link>
        <!--<el-button type="primary" size="medium" plain>添加活动</el-button>-->

        <div style="float: right; margin-right: 130px;">
          <el-input clearable v-model="pagination.key" style="width:200px" placeholder="请输入活动名称或简称">
          </el-input>
          <el-button v-on:click="getDataFromServer" icon="el-icon-search" round>查询</el-button>
        </div>

      </el-form>
      <el-table
        v-loading="loading"
        :data="activities"
        height="350"
        v-on:sort-change="sort"
        stripe>
        <el-table-column fixed prop="id" label="ID" width="120" align="center">
        </el-table-column>
        <el-table-column fixed prop="title" label="名称" width="120" align="center">
        </el-table-column>
        <el-table-column prop="beginTime" label="开始时间" sortable="custom" :formatter="formatTime" width="160" align="center">
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间" :formatter="formatTime" width="160" align="center">
        </el-table-column>
        <el-table-column prop="typeName" label="活动类型" width="120" align="center">
        </el-table-column>
        <el-table-column prop="statusName" label="状态" width="100" align="center">
        </el-table-column>
        <el-table-column prop="created" label="创建时间" sortable="custom" :formatter="formatTime" width="160" align="center">
        </el-table-column>
        <el-table-column prop="updated" label="更新时间" :formatter="formatTime" width="160" align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180" align="center">
          <template slot-scope="scope">
            <router-link tag="span" :to="{path:'/marketing/activity/info',query:{
                         id:scope.row.id,typeId:scope.row.typeId
                         }}">
              <el-button type="text" size="medium">详情</el-button>
            </router-link>
            <router-link tag="span" :to="{path:'/marketing/activity/update',query:{
                         id:scope.row.id
                         }}">
              <el-button type="text" size="medium">修改</el-button>
            </router-link>
           <!-- <el-button @click="updateActivity(scope.row.id)" type="text" size="medium">编辑</el-button>-->
            <el-button @click="del(scope.row.id)" type="text" size="medium" class="del">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        layout="total, prev, pager, next"
        :total="totalActivities"
        :page-size="pagination.size"
        :current-page="pagination.page"
        @current-change="changePage"
        style="float: right;">
      </el-pagination>

    </el-card>

  </div>
</template>

<script>
    import * as marketingApi from '../../api/marketing'
    import moment from 'moment'
    export default {
        name: "activity_list",
        data() {
            return{
                loading: true,
                activities: [],
                totalActivities: 0, //优惠券总条数
                pagination: {
                    page: 1,
                    size: 5,
                    desc: "true",// 是否降序
                    sortBy: "created",// 排序字段
                    key: "",
                    typeId: "_1",
                }, // 分页信息
            }
        },
        methods: {
            getDataFromServer(){
                // marketingApi.coupon_list(this.search, this.pagination.page, this.pagination.size,
                // this.pagination.sortBy, this.pagination.descending).then((res)=>{
                marketingApi.activity_list(this.pagination).then((res)=>{

                    this.activities = res.queryResult.list;
                    this.totalActivities = res.queryResult.total;
                    this.loading = false;

                })
            },
            changePage:function (currentPage) {  //形参就是当前页码
                //
                this.pagination.page = currentPage;
                //调用query方法
                this.getDataFromServer();
            },
            //删除
            del: function (id) {
                this.$confirm('确认删除吗?', '提示', {}).then(() => {
                    this.$confirm('再次确认，该操作不可撤销？', '提示', {}).then(() => {
                        marketingApi.activity_del(id).then((res) => {
                            if (res.success) {
                                this.$message.success("删除成功！")
                                this.getDataFromServer();
                            } else {
                                this.$message.error("删除失败！")
                            }
                        });
                    });
                });
            },
            //排序
            sort: function (sort) {
                //console.log(sort);
                //如果排序字段等于开始发放时间或量表状态名称换为数据库字段
                if(sort.prop == 'beginTime'){
                    this.pagination.sortBy = "begin_time";
                } else {
                    this.pagination.sortBy = sort.prop;
                }

                //判断排序字段
                if (sort.order == 'ascending') {
                    this.pagination.desc = false;
                } else if (sort.order == 'descending') {
                    this.pagination.desc = true;
                } else {
                    this.pagination.desc = null;
                }
                this.getDataFromServer();
            },
            formatTime(row, column) {
                if(row[column.property] == null || row[column.property] == undefined){
                    return "/";

                }
                const date = new Date(row[column.property]);
                // return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                return moment(date).format("YYYY-MM-DD HH:mm:ss");
            },

        },
        mounted() {
            this.getDataFromServer();
        },
        watch: {
            pagination: { // 监视pagination属性的变化
                deep: true, // deep为true，会监视pagination的属性及属性中的对象属性变化
                handler() {
                    // 变化后的回调函数，这里我们再次调用getDataFromServer即可
                    this.getDataFromServer();
                }
            },
            /*"pagination.key": { // 监视搜索字段,搜索字段在pagination中，不需要单独写
                handler() {
                    this.getDataFromServer();
                }
            },*/
            show: {

            }
        }
    }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .del{
    color: #f5354c;
  }

</style>
<!--
<template>
  <div>
    <el-card>
      <el-form :model="pagination">
        <router-link tag="span" :to="{path:'/marketing/activity/add'}">
          <el-button type="primary" size="medium" plain>添加活动</el-button>
        </router-link>
        <div style="float: right; margin-right: 130px;">
          <el-input clearable v-model="pagination.key" style="width:200px" placeholder="请输入活动名称或简称"></el-input>
          <el-button v-on:click="getDataFromServer" icon="el-icon-search" round>查询</el-button>
        </div>
      </el-form>
      <el-table v-loading="loading" :data="activities" height="350" style="margin-top: 30px" v-on:sort-change="sort" stripe>
        <el-table-column fixed prop="id" label="ID" width="120" align="center"></el-table-column>
        <el-table-column fixed prop="title" label="名称" width="120" align="center"></el-table-column>
        <el-table-column prop="beginTime" label="开始时间" sortable="custom" :formatter="formatTime" width="160" align="center"></el-table-column>
        <el-table-column prop="endTime" label="结束时间" :formatter="formatTime" width="160" align="center"></el-table-column>
        <el-table-column prop="typeName" label="活动类型" width="120" align="center"></el-table-column>
        <el-table-column prop="statusName" label="状态" width="100" align="center"></el-table-column>
        <el-table-column prop="created" label="创建时间" sortable="custom" :formatter="formatTime" width="160" align="center"></el-table-column>
        <el-table-column prop="updated" label="更新时间" :formatter="formatTime" width="160" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-popover placement="left" trigger="click">
              <div class="box-card">
                <div :body-style="{ padding: '10px' }" style="text-align: center;">
                  <h3>活动信息</h3>
                </div>
                <el-tabs tab-position="left">
                  <el-tab-pane label="基本信息" style="margin-top: 10px">
                    <span>活动标题：</span><span class="color">{{activity.title}}</span><br>
                    <span>活动副标题： </span><span class="color">{{activity.subTitle}}</span><br>
                    <span>活动开始时间：</span><span class="color">{{activity.beginTime | dateFilter}}</span><br>
                    <span>活动结束时间： </span><span class="color">{{activity.endTime | dateFilter}}</span><br>
                    <span>活动类型： </span><span class="color">{{activity.typeName}}</span><br>
                    <span>活动规则： </span><span class="color">{{activity.rule}}</span><br>
                  </el-tab-pane>
                  <el-tab-pane label="活动描述" style="margin-top: 10px">
                    <template>
                      <el-scrollbar style="height:100%">
                        <div style="height:400px;">
                          <div v-html="activity.description">{{}}</div>
                        </div>
                      </el-scrollbar>
                    </template>
                  </el-tab-pane>
                  <el-tab-pane label="活动规则" style="margin-top: 10px">
                    <div v-if="activityRule.discount != null">
                      <span>折扣： </span>
                      <span class="color" v-text="activityRule.discount">折</span>
                    </div>
                    <div v-if="activityRule.fixedAmount != null">
                      <span>活动价： </span>
                      <span class="color" v-text="activityRule.fixedAmount"></span>
                    </div>
                    <div v-if="activityRule.reduction != null">
                      <span>优惠金额： </span>
                      <span class="color" v-text="activityRule.reduction"></span>
                    </div>
                    <span>限购</span>
                    <span class="color" v-text="activityRule.limitNum"></span>
                    <br>
                    <span>积分</span>
                    <span class="color" v-text="activityRule.point"></span>
                    <br>
                  </el-tab-pane>
                  <el-tab-pane label="商品信息" style="margin-top: 10px">
                    <div v-for="(item, i) in activityGoods">
                      <span>商品类型： </span>
                      <span class="color">{{item.resType==1?"量表":"其他还没制作完成"}}</span><br>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </div>
              <el-button type="text"  @click="preview(scope.row.id)" slot="reference" size="medium">详情</el-button>

            </el-popover>
            <router-link tag="span" :to="{path:'/marketing/activity/update',query:{id:scope.row.id}}">
              <el-button type="text" size="medium">修改</el-button>
            </router-link>
            <el-button @click="del(scope.row.id)" type="text" size="medium" class="del">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="total, prev, pager, next"
        :total="totalActivities"
        :page-size="pagination.size"
        :current-page="pagination.page"
        @current-change="changePage"
        style="float: right;">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
    import * as marketingApi from '../../api/marketing'
    import moment from 'moment'

    export default {
        name: "activity_list",
        data() {
            return {
                show: false,//优惠券信息的弹窗
               // activityId: '',
                activity: {
                    id: '',
                    title: '',
                    subTitle: '',
                    beginTime: '',
                    endTime: '',
                    typeName: '',
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
                    point: '',
                },
                activityGoods: [
                    {
                        resType: '',
                        resName: '',
                        image: '',
                        price: '',
                        actualPrice: '',
                    }
                ],
                // &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;
                loading: true,
                activities: [],
                totalActivities: 0, //优惠券总条数
                pagination: {
                    page: 1,
                    size: 5,
                    desc: "true",// 是否降序
                    sortBy: "created",// 排序字段
                    key: "",
                    typeId: "_1",
                }, // 分页信息
            }
        },
        methods: {
            //===========================
          /*  getActivityDetail() {

            },
            getActivityRule() {

                })
            },
            getActivityGoods() {

            },*/
            preview(id) {
                marketingApi.activity_detail(id).then((res) => {
                    this.activity = res;
                });
                marketingApi.activity_rule(id).then((res) => {
                this.activityRule = res;});
                marketingApi.activity_goods(id).then((res) => {
                    this.activityGoods = res;
                })
                /*this.getActivityDetail();
                this.getActivityRule();
                this.getActivityGoods();*/
            },
            getDataFromServer() {
                marketingApi.activity_list(this.pagination).then((res) => {
                    this.activities = res.queryResult.list;
                    this.totalActivities = res.queryResult.total;
                    this.loading = false;
                })
            },
            changePage: function (currentPage) {
                //形参就是当前页码
                this.pagination.page = currentPage;
                //调用query方法
                this.getDataFromServer();
            },
            //删除
            del: function (id) {
                this.$confirm('确认删除吗?', '提示', {}).then(() => {
                    this.$confirm('再次确认，该操作不可撤销？', '提示', {}).then(() => {
                        marketingApi.activity_del(id).then((res) => {
                            if (res.success) {
                                this.$message.success("删除成功！")
                                this.getDataFromServer();
                            } else {
                                this.$message.error("删除失败！")
                            }
                        });
                    });
                });
            },
            //排序
            sort: function (sort) {
                //console.log(sort);
                //如果排序字段等于开始发放时间或量表状态名称换为数据库字段
                if (sort.prop == 'beginTime') {
                    this.pagination.sortBy = "begin_time";
                } else {
                    this.pagination.sortBy = sort.prop;
                }
                //判断排序字段
                if (sort.order == 'ascending') {
                    this.pagination.desc = false;
                } else if (sort.order == 'descending') {
                    this.pagination.desc = true;
                } else {
                    this.pagination.desc = null;
                }
                this.getDataFromServer();
            },
            formatTime(row, column) {
                if (row[column.property] == null || row[column.property] == undefined) {
                    return "/";
                }
                const date = new Date(row[column.property]);
                // return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                return moment(date).format("YYYY-MM-DD HH:mm:ss");
            },
            /*formatTimeAboutInfo(time){
                const date = time;
                return moment(date).format("YYYY-MM-DD HH:mm:ss")
            }*/

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
            //this.activityId = this.$route.query.id;
            /*this.getActivityDetail();
            this.getActivityRule();
            this.getActivityGoods();*/
        },
        mounted() {
            this.getDataFromServer();
        },
        watch: {
            pagination: { // 监视pagination属性的变化
                deep: true, // deep为true，会监视pagination的属性及属性中的对象属性变化
                handler() {
                    // 变化后的回调函数，这里我们再次调用getDataFromServer即可
                    this.getDataFromServer();
                }
            },
            /*"pagination.key": { // 监视搜索字段,搜索字段在pagination中，不需要单独写
                handler() {
                    this.getDataFromServer();
                }
            },*/
        }
    }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .box-card {
    width: 500px;
    height: 300px;
    line-height: 25px;
    font-family:verdana;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .del {
    color: #f5354c;
  }

</style>
-->
