<!--用户积分-->
<template>
  <div>
    <!--查询表单+新增-->
    <el-form  :model="params" class="margin">
      <!--查询-->
      <el-input placeholder="用户ID"
                size="medium"
                clearable
                autofocus
                prefix-icon="el-icon-search"
                v-model="params.user_id"
                style="width:200px">
      </el-input>
      <!--查询-->
      <el-input placeholder="用户昵称"
                size="medium"
                clearable
                autofocus
                prefix-icon="el-icon-search"
                v-model="params.user_nickname"
                style="width:200px">
      </el-input>
      <!-- 查询 按钮 -->
      <el-button type="primary"
                 size="medium"
                 icon="el-icon-search"
                 @click="query">查询
      </el-button>
      <!--添加 按钮 -->
      <router-link tag="span"
                   :to="{path:'/member/page/point/point_add',query:{
                   page:this.params.page,
                   points_id:this.params.points_id
      }}">
      <el-button type="primary"
                 size="medium"
                 icon="el-icon-search">新增记录
      </el-button>
      </router-link>
    </el-form>
    <!--数据列表 stripe 条纹  -->
    <el-card class="margin">
      <el-table :data="list"
                v-loading="loading"
                style="width: 100%;height:350px"
                height="420"
                :default-sort = "{prop: 'user_createtime', order: 'descending'}">
        <template  slot="empty" >
          <div>暂无数据
          </div>
        </template>
            <!--数据详情列表 (fixed)-->
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="right" inline class="demo-table-expand">

                  <el-form-item label="积分ID">
                    <span>{{ props.row.points_id }}</span>
                  </el-form-item>
                  <el-form-item label="用户ID">
                    <span>{{ props.row.user_id }}</span>
                  </el-form-item>
                  <el-form-item label="记录时间">
                    <span>{{ props.row.points_time | dateFilter}}</span>
                  </el-form-item>
                  <el-form-item label="记录前积分">
                    <span>{{ props.row.points_before}}</span>
                  </el-form-item>
                  <el-form-item label="记录后积分">
                    <span>{{ props.row.points_later }}</span>
                  </el-form-item>
                  <el-form-item label="本次积分">
                    <span>{{ props.row.points_num }}</span>
                  </el-form-item>
                  <el-form-item label="本次积分描述">
                    <span>{{ props.row.description}}</span>
                  </el-form-item>
                  <el-form-item label="活动ID">
                    <span>{{ props.row.act_id }}</span>
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
        <el-table-column prop="points_id"
                         align="center"
                         label="积分ID"
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
                         sortable
                         :formatter="dateFormat"
                         width="180">
        </el-table-column>
        <el-table-column prop="points_before"
                         align="center"
                         label="计算前积分"
                         width="100">
        </el-table-column>
        <el-table-column prop="points_num"
                         align="center"
                         label="本次积分"
                         width="100"
                        >
        </el-table-column>
        <el-table-column prop="points_later"
                         align="center"
                         label="计算后积分"
                         width="100"
                        >
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

            <!--删除按钮-->
            <el-button type="text" class="del" size="medium" @click="del(page.row.points_id)">删除</el-button>
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
        loading:true,
        list: [],  // 数据
        params: {  //  数据对象 这里和上面的查询表单做了双向绑定
          page: 1, //  当前页
          size: 6, //  每页显示数据的条数
          //points_id:'',
          user_id: '',
          user_nickname: ''

        },
        total: 0,  //  数据总条数
      }
    },
    methods: {
      //页面查询
      query: function () {
        //1、调用js方法请求服务端页面查询接口  2、导入user.js
        userApi.user_point(this.params.page, this.params.size,this.params).then((res) => { //当前页|每页记录数|查询条件
          if (res.success) {
            // 2）将res结果数据赋值给list数据模型对象
            this.list = res.queryResult.list;
            this.total = res.queryResult.total;
            this.loading = false;
          } else {
            this.list = [];
            this.total = 0;
            this.loading = false;
          }
        })
      },
      //当前页码改变时触发的事件 @current-change="changePage"
      changePage: function (currentPage) {  //current--》当前页码
        this.params.page = currentPage;
        //调用query方法
        this.query();
        this.loading = false;
      },

      //页面删除
      del: function (points_id) {
        this.$confirm('你确认删除吗?', '提示', {}).then(() => {
          //调用服务端接口
          userApi.point_del(points_id).then((res) => {
            if (res.success) {
              this.$message.success('删除成功')
              //刷新页面
              this.query()
            } else {
              this.$message.error('删除失败!' + res.message)
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
    // 私有过滤器
    filters: { //自定义私有过滤器 过滤器有两个条件 过滤器名称:处理函数
      dateFilter: function (dateStr, pattern=""){
        var dt = new Date(dateStr)
        //yyyy-mm-dd
        var y = dt.getFullYear()
        var m = dt.getMonth() + 1
        var d = dt.getDate()
        if(pattern.toLowerCase() === 'yyyy-mm-dd') {
          return `${y}-${m}-${d}`
        }else{ // hh:mm:ss
          var hh = dt.getHours()
          var mm = dt.getMinutes()
          var ss = dt.getSeconds()
          return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
        }
      }
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
    margin-top: 10px;
  }
  .del{
    color: #f5354c;
  }
</style>
