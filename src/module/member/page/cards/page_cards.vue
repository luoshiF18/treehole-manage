<!--会员卡信息-->
<template>
  <div>
    <h2></h2><!--查询表单+新增-->
    <el-form  :model="params">
      <!--查询-->
      <el-input placeholder="用户ID"
                size="medium"
                clearable
                prefix-icon="el-icon-search"
                v-model="params.user_id"
                autofocus
                style="width:200px">
      </el-input>
      <el-input placeholder="会员卡ID"
                size="medium"
                clearable
                prefix-icon="el-icon-search"
                v-model="params.card_id"
                autofocus
                style="width:200px">
      </el-input>
      <el-input placeholder="手机号"
                size="medium"
                clearable
                prefix-icon="el-icon-search"
                v-model="params.user_phone"
                autofocus
                style="width:200px">
      </el-input>
      <!-- 查询 按钮 -->
      <el-button type="primary"
                 size="medium"
                 icon="el-icon-search"
                 @click="query">查询
      </el-button>
      <!--添加 按钮 -->
      <!--<el-button type="primary"
                 size="medium"
                 icon="el-icon-search">添加
      </el-button>-->
    </el-form>
    <h2></h2>
    <!--数据列表  stripe n. 条纹  -->
    <el-card>
      <el-table :data="list"in
                style="width: 100%"
                v-loading="loading"
                height="420"
                :default-sort = "{prop: 'user_createtime', order: 'descending'}">
        <el-table-column type="index"
                         fixed
                         align="center"
                         width="40">
        </el-table-column>
        <el-table-column prop="card_id"
                         fixed
                         align="center"
                         label="会员卡ID"
                         width="150">
        </el-table-column>
        <el-table-column prop="user_id"
                         align="center"
                         label="用户ID"
                         width="200">
        </el-table-column>
        <el-table-column prop="paygrade"
                         align="center"
                         label="付费等级"
                         width="150">
        </el-table-column>
        <el-table-column prop="freegrade"
                         align="center"
                         label="非付费等级"
                         width="150">
        </el-table-column>
        <el-table-column prop="consum_all"
                         align="center"
                         label="消费总额"
                         width="120"
                         sortable>
        </el-table-column>
        <el-table-column prop="paygrade_start"
                         align="center"
                         label="会员开始时间"
                         :formatter="dateFormat"
                         width="160"
                         sortable>
        </el-table-column>
        <el-table-column prop="paygrade_end"
                         align="center"
                         label="会员截止时间"
                         :formatter="dateFormat"
                         width="160"
                         sortable>
        </el-table-column>
        <el-table-column prop="points_now"
                         align="center"
                         label="现有积分"
                         width="100">
        </el-table-column>
        <el-table-column prop="points_sum"
                         align="center"
                         label="总积分"
                         width="100">
        </el-table-column>
        <!--操作-->
        <el-table-column label="操作"
                         fixed="right"
                         align="center"
                         width="160">
          <template slot-scope="page">
            <!--编辑按钮-->
            <el-button type="text" size="medium" @click="edit(page.row.card_id)">编辑</el-button>
            <!--预览按钮-->
            <el-button type="text" size="medium" @click="preview(page.row.card_id)">预览</el-button>
            <!--删除按钮-->
            <!--<el-button type="text" class="del" size="medium" @click="del(page.row.card_id)">删除</el-button>-->
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

          card_id: '', //会员卡ID
          user_id: '', //会员ID
          user_phone: ''//会员手机号
        },
        total: 0,  //  数据总条数
      }
    },
    methods: {
      //页面查询
      query: function () {
        //1、调用js方法请求服务端页面查询接口  2、导入user.js
        userApi.page_cardslist(this.params.page, this.params.size, this.params).then((res) => {
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
        this.loading = false;
      },
      //页面修改
      edit: function (card_id) {
        //打开修改页面
        this.$router.push({
          path: '/member/page/edit/' + card_id
        })
      },
      //页面删除！！！！
      /*del: function (card_id) {
        this.$confirm('你确认删除吗?', '提示', {}).then(() => {
          //1、调用服务端接口
          userApi.card_del(card_id).then((res) => {
            if (res.success) {
              this.$message.success('删除成功')
              //2、刷新页面
              this.query()
            } else {
              this.$message.error('删除失败')
            }
          })
        })
      },*/
      //页面预览
      preview: function (card_id) {
        //打开浏览器窗口
        window.open("http://www.xuecheng.com/cms/preview/" + card_id);
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
      /*取出路由中的参数,赋值给数据对象*/
      this.params.page = Number.parseInt(this.$route.query.page || 1);
    },
    mounted() { // 模板和HTML已经渲染出来
      /*当dom元素全部渲染完成后,自动调用query*/
      this.query();
    },
    // 监听查询信息
    watch: {
      params: { // 监视pagination属性的变化
        deep: true, // deep为true，会监视pagination的属性及属性中的对象属性变化
        handler() {// 变化后的回调函数，这里我们再次调用query即可
          this.query();
        }
      },
      show: {
      }
    }
  }
</script>

<style scoped>
  .del{
    color: #f5354c;
  }
</style>
