<template>
  <div>

    <el-card>
      <el-form :model="pagination">
        <router-link tag="span" :to="{path:'/marketing/activity/point/add'}">
          <el-button type="primary" size="medium" plain>添加活动</el-button>
        </router-link>
        <!--<el-button type="primary" size="medium" plain>添加活动</el-button>-->

        <div style="float: right; margin-right: 130px;">
          <el-input clearable v-model="pagination.key" style="width:200px" placeholder="请输入活动名称或简称">
          </el-input>
          <el-button v-on:click="getDataFromServer" icon="el-icon-search" round>查询</el-button>
        </div>
        <div style="float: right;margin-right: 10px">
          <span>状态</span>
          <el-radio-group v-model="pagination.status">
            <el-radio-button label="">全部</el-radio-button>
            <el-radio-button label="1">未开始</el-radio-button>
            <el-radio-button label="2">进行中</el-radio-button>
            <el-radio-button label="0">已结束</el-radio-button>
          </el-radio-group>
        </div>
      </el-form>
      <el-table
        v-loading="loading"
        :data="activities"
        height="350"
        v-on:sort-change="sort"
        stripe>
        <template  slot="empty" >
          <div style="text-align: left; float: left">暂无数据
          </div>
        </template>
        <el-table-column fixed prop="id" label="ID" min-width="10%" align="center">
        </el-table-column>
        <el-table-column fixed prop="title" label="名称" min-width="15%" align="center">
        </el-table-column>
        <el-table-column prop="beginTime" label="开始时间" sortable="custom" :formatter="formatTime" min-width="10%" align="center">
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间" :formatter="formatTime" min-width="10%" align="center">
        </el-table-column>
        <el-table-column prop="typeName" label="活动类型" min-width="10%" align="center">
        </el-table-column>
        <el-table-column prop="statusName" label="状态" min-width="10%" align="center">
        </el-table-column>
        <el-table-column prop="created" label="创建时间" sortable="custom" :formatter="formatTime" min-width="10%" align="center">
        </el-table-column>
        <el-table-column prop="updated" label="更新时间" :formatter="formatTime" min-width="10%" align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="15%" align="center">
          <template slot-scope="scope">
            <router-link tag="span" :to="{path:'/marketing/activity/info',query:{
                         id:scope.row.id,typeId:scope.row.typeId
                         }}">
              <el-button type="text" size="medium">详情</el-button>
            </router-link>
            <router-link tag="span" :to="{path:'/marketing/activity/point/update',query:{
                         id:scope.row.id
                         }}">
              <el-button type="text" size="medium">修改</el-button>
            </router-link>
            <el-button @click="updateStatusToFinish(scope.row.id)" type="text" size="medium">下线</el-button>
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
    import * as marketingApi from '../../../api/marketing'
    import moment from 'moment'
    export default {
        name: "activity_point_list",
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
                    typeId: '_0',
                    status: '',
                }, // 分页信息
            }
        },
        methods: {
            getDataFromServer(){
                // marketingApi.coupon_list(this.search, this.pagination.page, this.pagination.size,
                // this.pagination.sortBy, this.pagination.descending).then((res)=>{
                marketingApi.activity_list(this.pagination).then((res)=>{
                    if(res.success){
                        this.activities = res.queryResult.list;
                        this.totalActivities = res.queryResult.total;
                        this.loading = false;
                    } else {
                        this.activities = [];
                        this.totalActivities =0;
                        this.loading = false;
                    }



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
            //下线活动
            updateStatusToFinish(id) {
                this.$confirm('确认下线吗?下线活动结束', '提示', {}).then(() => {
                    this.$confirm('再次确认，该操作不可撤销？', '提示', {}).then(() => {
                        marketingApi.activity_updateStatus(id).then((res) => {
                            if (res.success) {
                                this.$message.success("活动结束！")
                                this.getDataFromServer();
                            } else if(res.message){
                                this.$message.error(res.message);


                            }
                        });
                    });
                });
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
