<!--用户信息-->
<template>
  <div>
    <!--查询表单+新增-->
    <h2></h2>
    <el-form  :model="params">
        <!--<el-select v-model="params" placeholder="查询条件" style="width: auto;">
          &lt;!&ndash;<el-option v-for="item in siteList" :key="item.siteId" :label="item.siteName" :value="item.siteId"></el-option>&ndash;&gt;
          &lt;!&ndash; value值是用于提交的,label值是用于显示的 &ndash;&gt;
          <el-option label="手机号"   value="user_phone"></el-option>
          <el-option label="用户ID"   value="user_id"></el-option>
          <el-option label="用户昵称" value="user_nickname"></el-option>
        </el-select>-->
        <!-- v-model="params.user_nickname" -->
        <el-input placeholder="用户Id"
                  size="medium"
                  prefix-icon="el-icon-search"
                  clearable
                  v-model="params.user_id"
                  style="width:200px;text-align:center;">
        </el-input>
      <el-input placeholder="用户昵称"
                size="medium"
                prefix-icon="el-icon-search"
                clearable
                v-model="params.user_nickname"
                style="width:200px;text-align:center;">
      </el-input>
      <el-input placeholder="手机号"
                size="medium"
                prefix-icon="el-icon-search"
                clearable
                v-model="params.user_phone"
                style="width:200px;text-align:center;">
      </el-input>
        <!-- 查询 -->
        <el-button type="primary"
                   size="medium"
                   icon="el-icon-search"
                   @click="query">查询
        </el-button>
        <!--键盘回车事件 @keyup.enter="test"-->
      <router-link tag="span"
                   :to="{path:'/scale/page/page_add',query:{
                   page:this.params.page,
                   user_id:this.params.user_id
      }}">
        <el-button type="primary"
                   size="medium"
                   icon="el-icon-search">新增管理员
        </el-button>
      </router-link>
    </el-form>
    <h2></h2>
    <!--数据列表 stripe 条纹  v-loading="loading" -->
    <el-card>
      <el-table :data="list"
                style="width: 100%"
                height="420"
                :default-sort = "{prop: 'user_createtime', order: 'descending'}">
        <el-table-column type="index"
                         fixed
                         align="center"
                         width="40">
        </el-table-column>
        <el-table-column prop="user_nickname"
                         align="center"
                         label="昵称"
                         width="150">
        </el-table-column>
        <el-table-column prop="role_name"
                         fixed
                         align="center"
                         label="角色"
                         width="100"
        >
        </el-table-column>
        <el-table-column prop="user_name"
                         align="center"
                         label="姓名"
                         width="100">
        </el-table-column>
        <el-table-column prop="user_createtime"
                         align="center"
                         label="注册时间"
                         :formatter="dateFormat"
                         width="200"
                         sortable>
        </el-table-column>
        <el-table-column prop="user_id"
                         align="center"
                         label="会员ID"
                         width="170">
        </el-table-column>
        <el-table-column prop="user_image"
                         align="center"
                         label="用户头像"
                         width="100">
        </el-table-column>
        <el-table-column prop="gender"
                         align="center"
                         label="性别"
                         width="80">
          <!--<template slot-scope="scope">-->

          <!--</template>-->
        </el-table-column>
        <el-table-column prop="user_birth"
                            align="center"
                            label="出生日期"
                            :formatter="dateFormat"
                            width="200"
                            sortable>
        </el-table-column>
        <el-table-column prop="user_phone"
                         align="center"
                         label="电话"
                         width="150"
                         sortable>
        </el-table-column>
        <el-table-column prop="user_qq"
                         align="center"
                         label="QQ"
                         width="150"
                         sortable>
        </el-table-column>
        <el-table-column prop="user_wechat"
                         align="center"
                         label="微信"
                         width="150"
                         sortable>
        </el-table-column>
        <el-table-column prop="user_region"
                         align="center"
                         label="所在地区"
                         width="250">
        </el-table-column>
        <!--操作-->
        <el-table-column label="操作"
                         fixed="right"
                         align="center"
                         width="160">
          <template slot-scope="page">
            <!--编辑按钮-->
            <el-button type="text" size="medium" @click="edit(page.row.pageId)">编辑</el-button>
            <!--预览按钮-->
            <el-button type="text" size="medium" @click="preview(page.row.pageId)">预览</el-button>
            <!--删除按钮-->
            <el-button type="text" class="del" size="medium" @click="del(page.row.user_id)">删除</el-button>
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
        siteList: {
          user_id: '',
          user_nickname: '',
          user_phone: ''
        },
        list: [],  // 数据

        params: {  //  数据对象 这里和上面的查询表单做了双向绑定
          page: 1, //  当前页
          size: 6, //  每页显示数据的条数
          user_id: '',
          user_nickname: '',
          user_phone: ''
        },

        total: 0,  //  数据总条数
      }
    },
    methods: {
      //分页查询
      changePage:function(page) {  //形参就是当前页码
        //调用query方法
        this.params.page = page;
        this.query()
      },
      //页面查询(nickName|phone|user_id)
      query: function () {
        //1、调用js方法请求服务端页面查询接口  2、导入user.js  当前页|每页记录数|查询条件
        userApi.user_list(this.params.page,this.params.size,this.params).then((res) => {
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
      //页面添加
      add: function () {

      },
      //页面删除
      del: function (user_id) {
        this.$confirm('你确认删除吗?', '提示', {}).then(() => {
          //调用服务端接口
          userApi.user_del(user_id).then((res) => {
            if (res.success) {
              this.$message.success('删除成功')
              this.query() //刷新页面
            } else {
              this.$message.error('删除失败')
            }
          })
        })
      },
      //页面修改
      edit: function (pageId) {
        //打开修改页面
        this.$router.push({
          path: '/member/page/edit/' + pageId
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
  .del{
    color: #f5354c;
  }
</style>
