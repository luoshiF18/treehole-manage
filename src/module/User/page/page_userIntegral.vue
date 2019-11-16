<!--用户积分-->
<template>
  <div>
    <!--查询表单+新增-->
    <h2></h2>
    <el-form  :model="params">
      <!--查询-->
      <el-input placeholder="请输入查询关键信息"
                size="medium"
                clearable
                autofocus
                v-model="params.key"
                style="width:200px">
      </el-input>
      <!-- 查询 按钮 -->
      <el-button type="primary"
                 size="medium"
                 icon="el-icon-search"
                 @click="query">查询
      </el-button>
      <!--添加 按钮 -->
      <el-button type="primary"
                 size="medium"
                 icon="el-icon-search">新增用户
      </el-button>
    </el-form>
    <h2></h2>
    <!--数据列表 stripe 条纹  -->
    <el-card>
      <el-table :data="list"
                style="width: 100%"
                height="420"
                :default-sort = "{prop: 'user_createtime', order: 'descending'}">
        <el-table-column fixed
                         type="index"
                         align="center"
                         width="40">
        </el-table-column>
        <el-table-column fixed
                         prop="points_id"
                         align="center"
                         label="记录积分ID"
                         width="180">
        </el-table-column>
        <el-table-column prop="user_id"
                         align="center"
                         label="用户ID"
                         width="200">
        </el-table-column>
        <el-table-column prop="points_time"
                         align="center"
                         label="记录时间"
                         :formatter="dateFormat"
                         width="180">
        </el-table-column>
        <el-table-column prop="points_before"
                         align="center"
                         label="计算前积分"
                         width="170">
        </el-table-column>
        <el-table-column prop="points_num"
                         align="center"
                         label="本次积分"
                         width="170"
                         sortable>
        </el-table-column>
        <el-table-column prop="points_later"
                         align="center"
                         label="计算后积分"
                         width="170"
                         sortable>
        </el-table-column>
        <el-table-column prop="description"
                         align="center"
                         label="本次积分描述"
                         width="200">
        </el-table-column>
        <el-table-column prop="act_id"
                         align="center"
                         label="活动ID"
                         width="200">
        </el-table-column>
        <!--操作-->
        <el-table-column label="操作"
                         fixed="right"
                         align="center"
                         width="160">
          <template slot-scope="page">
            <!--编辑按钮-->
            <el-button type="text" size="medium" @click="edit(page.row.user_id)">编辑</el-button>
            <!--预览按钮-->
            <el-button type="text" size="medium" @click="preview(page.row.pageId)">预览</el-button>
            <!--删除按钮-->
            <el-button type="text" class="del" size="medium" @click="del(page.row.user_id)">删除</el-button>
          </template>

        </el-table-column>
      </el-table>
      <!--列表底部分页-->
      <el-pagination layout="prev, pager, next"
                     :total="total"
                     :page-size="params.size"
                     :current-page="params.page"
                     @current-change="changePage"
                     style="float: right;">
        <!-- current-page:当前页  current-change:当前页改变时会被触发   -->
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  //2、导入方法user.js方法
  import * as userApi from '../api/user'
  import moment from 'moment'

  export default {
    data() {
      return {
        list: [],  // 数据
        params: {  //  数据对象 这里和上面的查询表单做了双向绑定
          page: 1, //  当前页
          size: 6, //  每页显示数据的条数
        },
        total: 0,  //  数据总条数
      }
    },
    methods: {
      //页面查询
      query: function () {
        //1、调用js方法请求服务端页面查询接口  2、导入user.js
        userApi.user_integral(this.params).then((res) => { //当前页|每页记录数|查询条件
          // 2）将res结果数据赋值给list数据模型对象
          this.list = res.queryResult.list;
          this.total = res.queryResult.total;
        })
      },
      //当前页码改变时触发的事件 @current-change="changePage"
      changePage: function (currentPage) {  //current--》当前页码
        this.params.page = currentPage;
        //调用query方法
        this.query();
      },
      //页面修改
      edit: function (user_id) {
        //打开修改页面
        this.$router.push({
          path: '/User/page/edit/' + user_id
        })
      },
      //页面删除
      del: function (user_id) {
        this.$confirm('你确认删除吗?', '提示', {}).then(() => {
          //调用服务端接口
          userApi.page_del(user_id).then((res) => {
            if (res.success) {
              this.$message.success('删除成功')
              //刷新页面
              this.query()
            } else {
              this.$message.error('删除失败')
            }
          })
        })
      },
      //编写日期格式化的方法
      dateFormat:function (row,column) {
        const date=row[column.property]
        if(date==undefined){
          return''
        }
        return moment(date).format("YYYY-MM-DD")
      },
      //页面内容排序
      sort: function (sort) {
        this.params.sortBy = sort.prop;
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
    },
    //钩子函数们！
    created() { // vm实例的data和methods初始化完毕后执行，发ajax要提前
      /*!//取出路由中的参数,赋值给数据对象*/
      this.params.page = Number.parseInt(this.$route.query.page || 1);
    },
    mounted() { // 模板和HTML已经渲染出来
      /*当dom元素全部渲染完成后,自动调用query*/
      this.query();
    }
  }
</script>

<style scoped>
  .del{
    color: #f5354c;
  }
</style>
