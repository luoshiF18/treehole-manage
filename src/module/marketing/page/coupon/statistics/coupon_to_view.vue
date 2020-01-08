<template>
    <div>
      <el-card>
        <el-form :model="pagination">
          <div style="float: right;">
            <el-input clearable v-model="pagination.key" style="width:200px" placeholder="请输入优惠券名称或简称">
            </el-input>
            <el-button v-on:click="getDataFromServer" icon="el-icon-search" round>查询</el-button>
          </div>
        </el-form>
        <el-table
          v-loading="loading"
          :data="coupons"
          height="350"
          stripe>
          <template  slot="empty" >
            <div style="text-align: left; float: left">暂无数据
            </div>
          </template>
          <el-table-column fixed prop="letter" label="首字母" width="120" align="center">
          </el-table-column>
          <el-table-column fixed prop="title" label="名称" width="120" align="center">
          </el-table-column>

          <el-table-column prop="usedTypeName" label="优惠类型" width="120" align="center">
          </el-table-column>

          <el-table-column prop="withAmount" label="使用门槛" width="100" align="center">
          </el-table-column>
          <el-table-column prop="usedAmount" label="面额" width="100" align="center">
          </el-table-column>
          <el-table-column prop="limitNum" label="限领" width="80" align="center">
          </el-table-column>

          <el-table-column prop="quota" label="发行量" width="80" align="center">
          </el-table-column>
          <el-table-column prop="stock" label="库存" width="80" align="center">
          </el-table-column>
          <el-table-column prop="statusName" label="状态" width="80" align="center">
          </el-table-column>
          <el-table-column prop="created" label="创建时间" :formatter="formatTime" width="160" align="center">
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template slot-scope="scope">
              <el-button @click="seeCouponData(scope.row.id)" type="text" size="medium">查看领取信息</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          layout="total, prev, pager, next"
          :total="totalCoupons"
          :page-size="pagination.size"
          :current-page="pagination.page"
          @current-change="changePage"
          style="float: right;">
        </el-pagination>

      </el-card>
    </div>
</template>

<script>
    import * as marketingApi from '../../../api/marketing';
    import moment from 'moment'
    export default {
        name: "coupon_to_view",
        data() {
            return{
                loading: true,
                coupons: [],
                totalCoupons: 0, //优惠券总条数
                pagination: {
                    page: 1,
                    size: 5,
                    desc: "true",// 是否降序
                    sortBy: "created",// 排序字段
                    key: "",
                    notStatus: '1',
                }, // 分页信息
            }
        },
        methods: {
            getDataFromServer(){
                marketingApi.coupon_list(this.pagination).then((res)=>{
                    if(res.success){
                        this.coupons = res.queryResult.list;
                        this.totalCoupons = res.queryResult.total;
                        this.loading = false;
                    } else {//显示暂无数据
                        this.coupons = [];
                        this.totalCoupons = 0;
                        this.loading = false;
                    }


                })
            },
            changePage:function (currentPage) {  //形参就是当前页码
                this.pagination.page = currentPage;
                //调用query方法
                this.getDataFromServer();
            },
            seeCouponData(id){
                this.$router.push({
                    path: '/marketing/coupon/statistics?id='+id,
                })
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
        }
    }
</script>

<style scoped>

</style>
