<template>
  <div>

    <el-card>
      <el-form :model="pagination">
        <el-button type="primary" size="medium" @click="addCoupon()" plain>添加优惠券</el-button>

        <div style="float: right;">
          <el-input clearable v-model="pagination.key" style="width:200px" placeholder="请输入优惠券名称或简称">
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
        :data="coupons"
        height="350"
        v-on:sort-change="sort"
        stripe>
        <template  slot="empty" >
          <div style="text-align: left; float: left">暂无数据
          </div>
        </template>
        <el-table-column fixed prop="letter" label="首字母" sortable="custom" width="120" align="center">
        </el-table-column>
        <el-table-column fixed prop="title" label="名称" width="120" align="center">
        </el-table-column>
        <el-table-column     label="图片" width="120" align="center">
          <template width="90" slot-scope="scope">
            <img v-if="scope.row.icon" :src="scope.row.icon" width="100" height="40">
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column prop="startTime" label="发放开始时间" sortable="custom" :formatter="formatTime" width="160" align="center">
        </el-table-column>
        <el-table-column prop="endTime" label="发放结束时间" :formatter="formatTime" width="160" align="center">
        </el-table-column>
        <el-table-column prop="withSpecial" label="是否用于特价商品" :formatter="formatSpecial" width="140" align="center">
        </el-table-column>
        <el-table-column prop="typeName" label="发放类型" width="120" align="center">
        </el-table-column>
        <el-table-column prop="usedTypeName" label="优惠类型" width="120" align="center">
        </el-table-column>

        <el-table-column prop="withAmount" label="使用门槛" width="100" align="center">
        </el-table-column>
        <el-table-column prop="usedAmount" label="面额" width="100" align="center">
        </el-table-column>
        <el-table-column prop="validTypeName" label="时效" width="120" align="center">
        </el-table-column>
        <el-table-column prop="validDays" label="有效天数" :formatter="formatValidDays" width="80" align="center">
        </el-table-column>
        <el-table-column prop="validStartTime" label="使用开始时间" :formatter="formatTime" width="160" align="center">
        </el-table-column>
        <el-table-column prop="validEndTime" label="使用结束时间" :formatter="formatTime" width="160" align="center">
        </el-table-column>
        <el-table-column prop="limitNum" label="限领" width="80" align="center">
        </el-table-column>
        <el-table-column prop="usedBy" label="适用人群" width="80" :formatter="formatUsedBy" align="center">
        </el-table-column>
        <el-table-column prop="quota" label="发行量" width="80" align="center">
        </el-table-column>
        <el-table-column prop="stock" label="库存" width="80" align="center">
        </el-table-column>
        <el-table-column prop="statusName" label="状态" width="80" align="center">
        </el-table-column>
        <el-table-column prop="created" label="创建时间" sortable="custom" :formatter="formatTime" width="160" align="center">
        </el-table-column>
        <el-table-column prop="updated" label="更新时间" :formatter="formatTime" width="160" align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button @click="updateCoupon(scope.row)" type="text" size="medium">编辑</el-button>
            <el-button @click="updateStatusToFinished(scope.row.id)" type="text" size="medium">下架</el-button>
            <el-button @click="del(scope.row.id)" type="text" size="medium" class="del">删除</el-button>
            <br>
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
    <el-dialog title="优惠券"
               :close-on-click-modal='false'
               :visible.sync="show"
               :append-to-body='true'
               :lock-scroll="true"
               width="50%"
               height="600"
               >
    <div slot="title">
       <span>{{isEdit ? '修改' : '新增'}}优惠券</span>
    </div>
     <el-card style="height: 400px; overflow: auto;" shadow="never">
        <coupon-form  :isEdit="isEdit" :oldCoupon="oldCoupon" ref="couponForm" :show="show" @close="closeDialog"/>
     </el-card>
    </el-dialog>

  </div>
</template>

<script>
    import * as marketingApi from '../api/marketing'
    import moment from 'moment'
    import CouponForm from "../components/CouponForm";
    export default {
        name: "coupon_list",
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
                    status: '',
                }, // 分页信息
                show: false,// 控制对话框的显示
                isEdit: false, // 是否是编辑
                oldCoupon: {},
            }
        },
        methods: {
            getDataFromServer(){
               // marketingApi.coupon_list(this.search, this.pagination.page, this.pagination.size,
                // this.pagination.sortBy, this.pagination.descending).then((res)=>{
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
            addCoupon() {
                // 修改标记
                this.isEdit = false;
                // 控制弹窗可见：
                this.show = true;
                // 把oldBrand变为null
                this.oldCoupon = null;
            },
            updateCoupon(oldCoupon) {
                // 修改标记
                this.isEdit = true;
                // 控制弹窗可见：
                this.show = true;

                this.oldCoupon = oldCoupon;


            },
            //删除
            del: function (id) {
                this.$confirm('确认删除吗?', '提示', {}).then(() => {
                    this.$confirm('再次确认，该操作不可撤销？', '提示', {}).then(() => {
                        marketingApi.coupon_del(id).then((res) => {
                            if (res.success) {
                                this.$message.success("删除成功！")
                                this.getDataFromServer();
                            } else if(res.message){
                                this.$message.error(res.message);


                            }
                        });
                    });
                });
            },
            //修改优惠券状态为结束
            updateStatusToFinished(id) {
                this.$confirm('确认下架吗?下架即为结束发放', '提示', {}).then(() => {
                    this.$confirm('再次确认，该操作不可撤销？', '提示', {}).then(() => {
                        marketingApi.coupon_updateStatus(id).then((res) => {
                            if (res.success) {
                                this.$message.success("优惠券结束发放！")
                                this.getDataFromServer();
                            } else if(res.message){
                                this.$message.error(res.message);


                            }
                        });
                    });
                });
            },
            //查看统计数据
            seeCouponData(id){
                this.$router.push({
                    path: '/marketing/coupon/statistics?id='+id,
                })
            },
            //排序
            sort: function (sort) {
                //console.log(sort);
                //如果排序字段等于开始发放时间或量表状态名称换为数据库字段
                if(sort.prop == 'startTime'){
                    this.pagination.sortBy = "start_time";
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
          /*  formatValidType(row, column) {
                const validType = row[column.property]
                return validType ? "绝对时效":"相对时效";
            },*/
            formatSpecial(row, column) {
                const special = row[column.property]
                return special ? "可用于":"不可用于";
            },

            formatUsedBy(row, column){
                const usedBy = row[column.property]
                if(usedBy == 0){
                    return "全体会员"
                } else if(usedBy == 1){
                    return "普通会员"
                } else {
                    return "付费会员"
                }
            },
            formatValidDays(row, column){
                    const validDays = row[column.property]
                    if(validDays == 0 || validDays == null){
                        return "/"
                    } else {
                        return validDays;
                    }
            },
            closeDialog(){//子组件向父组件传。关闭dialog
                this.show = false;
                this.getDataFromServer();
            }
        },
        components:{
            CouponForm
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
