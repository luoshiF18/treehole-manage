<template>
  <div>
    <br>
    <!--查询表单-->
    <el-card>
      <el-form :model="params">
        分类查询：
        <el-select size="medium" v-model="params.typeId" filterable style="width:120px" clearable placeholder="选择分类">
          <el-option
            v-for="item in type"
            :key="item.id"
            :label="item.scaleType"
            :value="item.id">
          </el-option>
        </el-select>
        <el-button size="medium" v-on:click="query" icon="el-icon-search" round>查询</el-button>
        <i style="margin-right: 80px"></i>
        名称查询：
        <el-input size="medium" clearable v-model="params.key" style="width:200px" placeholder="请输入量表名称或简称">
        </el-input>
        <el-button size="medium" v-on:click="query" icon="el-icon-search" round>查询</el-button>
        <i style="margin-right: 300px"></i>
        <router-link tag="span" :to="{path:'/scale/page/add'}">
          <el-button type="primary">新增量表</el-button>
        </router-link>
        <!--        <el-button type="primary" v-on:click="next">新增量表</el-button>-->
      </el-form>
      <hr align=center width=100% color=#C0C0C0 SIZE=1>
      <el-table
        size="medium"
        v-loading="loading"
        :data="list"
        v-on:sort-change="sort"
        stripe
        style="width: 100%">
        <!--    <el-table-column type="expand" label="详情" width="60">
            </el-table-column>-->
        <el-table-column prop="letter" align="center" sortable="custom" label="首字母" width="90">
        </el-table-column>
        <el-table-column prop="scaleName" align="center" label="量表名称" width="150">
        </el-table-column>
        <el-table-column prop="shortName" align="center" label="简称" width="90">
        </el-table-column>
        <el-table-column prop="statusName" align="center" sortable="custom" label="状态" width="80">
        </el-table-column>
        <el-table-column prop="createTime" sortable="custom" label="创建时间" width="120">
        </el-table-column>
        <el-table-column prop="updateTime" sortable label="更新时间" width="120">
        </el-table-column>
        <el-table-column prop="price" align="center" sortable="custom" label="价格(元)" width="100">
        </el-table-column>
        <el-table-column prop="typeName" align="center" label="分类" width="100">
        </el-table-column>
        <el-table-column prop="scaleTypeName" align="center" sortable="custom" label="量表类型" width="150">
        </el-table-column>
        <el-table-column>
          <template slot-scope="page">
            <el-button style="float: right" size="mini" type="danger" @click="del(page.row.id)" plain>删除
            </el-button>
            <router-link tag="span" :to="{path:'/scale/page/info',query:{
                         scaleId:page.row.id
                         }}">
              <el-button style="float: right;margin-right: 5px" size="mini" type="primary" plain>详情</el-button>
            </router-link>
            <!--           <router-link tag="span" :to="{path:'/scale/page/alterInfo',query:{
                                    scaleId:page.row.id
                                    }}">
                         <el-button size="mini" type="primary" plain>编辑</el-button>
                       </router-link>-->

          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="total, prev, pager, next"
        :total="total"
        :page-size="params.size"
        :current-page="params.page"
        :pager-count="11"
        @current-change="changePage"
        style="float: right;">
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
    import * as scaleApi from '../api/scaleApi'

    export default {
        data() {
            return {
                loading: true,
                type: [],
                list: [],
                total: 0,
                params: {  //这里和上面的查询表单做了双向绑定
                    page: 1,
                    size: 3,
                    desc: false,
                    key: '',
                    typeId: '',
                    sortBy: '',
                    desc: ''
                }
                /*                queryType: {
                                    scaleTypeId: ''
                                }*/
            }
        },
        methods: {
            query: function () {
                scaleApi.page_list(this.params).then((res) => {
                    //将res结果数据赋值给数据模型对象
                    this.list = res.queryResult.list;
                    this.total = res.queryResult.total;
                    this.loading = false;
                })
            },
            queryTypeName: function () {
                //查询搜有分类
                scaleApi.type_list().then((res) => {
                    this.type = res.queryResult.list;
                })

            },
            changePage: function (currentPage) {  //形参就是当前页码
                this.params.page = currentPage;
                //调用query方法
                this.query();
            },
            /*      queryByType: function () {
                      scaleApi.list_byType(this.queryType).then((res) => {
                          this.deactivated();
                          this.list = res.queryResult.list;
                          this.total = res.queryResult.total;
                      })
                  },*/
            //删除
            del: function (id) {
                this.$confirm('确认删除吗?', '提示', {}).then(() => {
                    this.$confirm('再次确认，该操作不可撤销？', '提示', {}).then(() => {
                        scaleApi.scale_del(id).then((res) => {
                            if (res.success) {
                                this.$message.success("删除成功！")
                                this.query();
                            } else {
                                this.$message.error("删除失败！")
                            }
                        });
                    });
                });
            },
            //排序
            sort: function (sort) {
                // console.log(sort)
                //如果排序字段等于量表类型名称或量表状态名称换为数据库字段
                if (sort.prop == 'scaleTypeName') {
                    this.params.sortBy = 'scaleType';
                } else if (sort.prop == 'statusName') {
                    this.params.sortBy = 'status';
                } else {
                    this.params.sortBy = sort.prop;
                }
                //判断排序字段
                if (sort.order == 'ascending') {
                    this.params.desc = false;
                } else if (sort.order == 'descending') {
                    this.params.desc = true;
                } else {
                    this.params.desc = null;
                }
                this.query();
            },
            /*            //添加新量表
                        next: function () {
                            this.$confirm('新增量表中途退出将删除已添加内容。', '提示', {
                                cancelButtonText: '取消',
                                confirmButtonText: '确定',
                                type: 'info'
                            }).then(() => {
                                //打开修改页面
                                this.$router.push({
                                    path: '/scale/page/add/'
                                })
                            }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消'
                                });
                            });
                        },*/
        },


        created() {

        },
        mounted() {
            //当dom元素全部渲染完成后,调用query
            this.query();
            //查询所有分类
            this.queryTypeName();
        }
    }
</script>
<style scoped>
</style>
