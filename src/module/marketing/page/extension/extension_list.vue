<template>
  <div>

    <el-card>
      <el-form :model="pagination">
        <router-link tag="span" :to="{path:'/marketing/extension/add'}">
          <el-button type="primary" size="medium" plain>添加推广</el-button>
        </router-link>
<!--
        <div style="float: right;">
          <el-input clearable v-model="pagination.key" style="width:200px" placeholder="请输入">
          </el-input>
          <el-button v-on:click="queryExtensionFromServer" icon="el-icon-search" round>查询</el-button>
        </div>
        <div style="float: right;margin-right: 10px">
          <span>状态</span>
          <el-radio-group v-model="pagination.status">
            <el-radio-button label="">全部</el-radio-button>
            <el-radio-button label="1">未开始</el-radio-button>
            <el-radio-button label="2">进行中</el-radio-button>
            <el-radio-button label="0">已结束</el-radio-button>
          </el-radio-group>
        </div>-->
      </el-form>
      <el-table
        v-loading="loading"
        :data="extensions"
        height="350"
        v-on:sort-change="sort"
        stripe>
        <template  slot="empty" >
          <div>暂无数据
          </div>
        </template>
        <el-table-column fixed prop="modeName" label="推广方式" width="120" align="center"></el-table-column>
        <el-table-column prop="title" label="标题" width="120" align="center"></el-table-column>
        <el-table-column prop="content" label="文本内容" width="160" align="center"></el-table-column>
        <el-table-column prop="usedForStr" label="推广内容"  width="160" align="center"></el-table-column>
        <el-table-column prop="usedForId" label="推广资源id" width="160" align="center"></el-table-column>
        <el-table-column prop="count" label="预计发送" width="100" align="center"></el-table-column>
        <el-table-column prop="succCount" label="成功发送" width="100" align="center"></el-table-column>

        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button @click="del(scope.row.id)" type="text" size="medium" class="del">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        layout="total, prev, pager, next"
        :total="totalExtensions"
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
    export default {
        name: "extension_list",
        data() {
            return {
                loading: true,
                extensions: [],
                totalExtensions: 0, //优惠券总条数
                pagination: {
                    page: 1,
                    size: 5,
                    desc: "true",// 是否降序
                    sortBy: "",// 排序字段
                    key: "",
                }, // 分页信息
            }
        },
        methods: {
            queryExtensionFromServer(){
                marketingApi.extension_list(this.pagination).then((res)=>{
                    this.extensions = res.queryResult.list;
                    this.totalExtensions = res.queryResult.total;
                    this.loading = false;
                })


            },
            changePage:function (currentPage) {  //形参就是当前页码
                //
                this.pagination.page = currentPage;
                //调用query方法
                this.queryExtensionFromServer();
            },
            //删除
            del: function (id) {
                this.$confirm('确认删除吗?', '提示', {}).then(() => {
                    this.$confirm('再次确认，该操作不可撤销？', '提示', {}).then(() => {
                        marketingApi.extension_del(id).then((res) => {
                            if (res.success) {
                                this.$message.success("删除成功！")
                                this.queryExtensionFromServer();
                            } else if(res.message){
                                this.$message.error(res.message);


                            }
                        });
                    });
                });
            },
            //排序
            sort: function (sort) {
                //console.log(sort);
                //是否需要排序

                this.pagination.sortBy = sort.prop;


                //判断排序字段
                if (sort.order == 'ascending') {
                    this.pagination.desc = false;
                } else if (sort.order == 'descending') {
                    this.pagination.desc = true;
                } else {
                    this.pagination.desc = null;
                }
                this.queryExtensionFromServer();
            },
        },
        mounted() {
            this.queryExtensionFromServer();
        }
    }
</script>

<style scoped>
  .del{
    color: #f5354c;
  }
</style>
