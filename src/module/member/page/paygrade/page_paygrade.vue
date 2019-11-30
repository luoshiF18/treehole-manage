<!--会员用户等级-->
<template>

  <div>
    <!--查询表单+新增-->
    <el-form  :model="params" class="margin">
      <!--查询-->
      <el-input placeholder="等级ID"
                size="medium"
                prefix-icon="el-icon-search"
                clearable
                v-model="params.grade_id"
                style="width:200px;text-align:center;"
                autofocus>
      </el-input>
      <el-input placeholder="等级名称"
                size="medium"
                prefix-icon="el-icon-search"
                clearable
                v-model="params.grade_name"
                autofocus
                style="width:200px;text-align:center;">
      </el-input>
      <el-input placeholder="等级排名"
                size="medium"
                prefix-icon="el-icon-search"
                clearable
                v-model="params.rank"
                autofocus
                style="width:200px;text-align:center;">
      </el-input>
      <!-- 查询 按钮 -->
      <el-button type="primary"
                 size="medium"
                 icon="el-icon-search"
                 @click="query">查询
      </el-button>
      <!--添加 按钮 -->
      <router-link tag="span"
                   :to="{path:'/member/page/paygrade/paygrade_add',query:{
                   page:this.params.page,
                   paygrade_id:this.params.grade_id
      }}">
      <el-button type="primary"
                  style="float: right"
                  size="medium">新增等级
      </el-button>
      </router-link>
    </el-form>
    <h2></h2>
    <!--数据列表 stripe 条纹  -->
    <el-card class="margin">
      <el-table :data="list"
                v-loading="loading"
                style="width: 100%; margin-top: 20px;margin-left: 20px;height:50%"
                height="420"
                :default-sort = "{prop: 'user_createtime', order: 'descending'}">
        <!--数据详情列表 (fixed)-->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="right" inline class="demo-table-expand">
              <el-form-item label="等级ID">
                <span>{{ props.row.paygrade_id }}</span>
              </el-form-item>
              <el-form-item label="会员卡类型">
                <span>{{ props.row.paygrade_name }}</span>
              </el-form-item>
              <el-form-item label="售卡金额" >
                <span>{{ props.row.card_price }}</span>
              </el-form-item>
              <el-form-item label="有效天数" >
                <span>{{ props.row.card_legality }}</span>
              </el-form-item>
              <el-form-item label="权益描述">
                <span>{{ props.row.card_desc }}</span>
              </el-form-item>
              <el-form-item label="初始储值">
                <span>{{ props.row.initial_money }}</span>
              </el-form-item>
              <el-form-item label="初始积分">
                <span>{{ props.row.initial_points}}</span>
              </el-form-item>
              <el-form-item label="会员折扣">
                <span>{{ props.row.discount }}</span>
              </el-form-item>
              <el-form-item label="会员等级">
                <span>{{ props.row.rank }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <!-- 数据列表 -->
        <el-table-column type="index"
                         align="center"
                         fixed
                         width="40">
        </el-table-column>
        <el-table-column prop="paygrade_id"
                         align="center"
                         fixed
                         label="等级ID"
                         width="200">
        </el-table-column>
        <el-table-column prop="rank"
                         align="center"
                         label="等级序号"
                         width="100">
        </el-table-column>
        <el-table-column prop="paygrade_name"
                         align="center"
                         label="会员卡类型"
                         width="130">
        </el-table-column>
        <el-table-column prop="card_price"
                         align="center"
                         label="售卡金额"
                         width="100">
        </el-table-column>
        <el-table-column prop="card_legality"
                         align="center"
                         label="有效天数"
                         width="100">
        </el-table-column>
        <el-table-column prop="card_desc"
                         align="center"
                         label="权益描述"
                         width="180">
        </el-table-column>
        <el-table-column prop="discount"
                         align="center"
                         label="会员折扣"
                         width="100">
        </el-table-column>
        <el-table-column prop="initial_money"
                         align="center"
                         label="初始储值"
                         width="150">
        </el-table-column>
        <el-table-column prop="initial_points"
                         align="center"
                         label="初始积分"
                         width="150">
        </el-table-column>


        <!--操作-->
        <el-table-column label="操作"
                         align="center"
                         fixed="right"
                         width="180">
          <template slot-scope="page">
            <!--编辑按钮-->
            <el-button type="text" size="medium" @click="edit(page.row.paygrade_id)">编辑</el-button>
            <!--删除按钮-->
            <el-button type="text" class="del" size="medium" @click="del(page.row.paygrade_id)">删除</el-button>
          </template>

        </el-table-column>
      </el-table>
      <!--列表底部分页-->
      <el-pagination layout="total, prev, pager, next"
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
  import * as userApi from '../../api/member'
  import moment from 'moment'

  export default {
    data() {
      return {
        loading: true,
        list: [],  // 数据
        params: {  //  数据对象 这里和上面的查询表单做了双向绑定
          page: 1, //  当前页
          size: 6, //  每页显示数据的条数
          grade_id:'',
          grade_name:'',
          rank:''
        },
        total: 0,  //  数据总条数
      }
    },
    methods: {
      //页面查询
      query: function () {
        //1、调用js方法请求服务端页面查询接口  2、导入user.js
        /*this表示当前vue实例；res 整个response
         1）服务端返回成功就调用then方法*/
        userApi.vip_user_grade(this.params.page, this.params.size,this.params).then((res) => { //当前页|每页记录数|查询条件
          // 2）将res结果数据赋值给list数据模型对象
          this.list = res.queryResult.list;
          this.total = res.queryResult.total;
          this.loading = false;
        })
      },
      //当前页码改变时触发的事件 @current-change="changePage"
      changePage: function (currentPage) {  //current--》当前页码
        this.params.page = currentPage;
        //调用query方法
        this.query();
      },
      //页面修改
      edit: function (paygrade_id) {
        //打开修改页面
        this.$router.push({
          path: '/member/page/paygrade/page_paygrade/' + paygrade_id,
          query:{
            page: this.params.page
          }
        })
      },
      //页面删除
      del: function (paygrade_id) {
        this.$confirm('你确认删除吗?', '提示', {}).then(() => {
          //调用服务端接口
          userApi.paygrade_del(paygrade_id).then((res) => {
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
        return moment(date).format("YYYY-MM-DD  HH:mm:ss")
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
      this.params.page = Number.parseInt(this.$route.query.prepage || 1);
    },
    mounted() { // 模板和HTML已经渲染出来
      /*当dom元素全部渲染完成后,自动调用query*/
      this.query();
    },
    // 监听查询信息
    watch: {
      params: { // 监视pagination属性的变化
        deep: true, // deep为true，会监视pagination的属性及属性中的对象属性变化
        handler() {
          // 变化后的回调函数，这里我们再次调用getDataFromServer即可
          this.query();
        }
      },
      show: {
      }
    }
  }

</script>

<style scoped>
  /*编写页面样式，不是必须*/
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #f5d2ac;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 40%;
  }
  .margin{
    margin-top: 20px;
  }
  .del{
    color: #f5354c;
  }
</style>
