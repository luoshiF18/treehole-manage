<template>
  <!--用户信息管理-->
  <div>
    <!--查询表单+新增-->
    <h2></h2>
    <el-form  :model="params">
     <!-- <el-select   v-model="params.siteId"  placeholder="请选择查询站点">
        <el-option v-for="item in siteList" :key="item.siteId" :label="item.siteName" :value="item.siteId"></el-option>
        &lt;!&ndash; value值是用于提交的,label值是用于显示的 &ndash;&gt;
      </el-select>-->
      <!--查询-->
      <el-input placeholder="请输入查询关键词"
                id="search"
                autofocus
                style="width: auto">
      </el-input>
      <!-- 查询按钮 -->
      <el-button
        type="primary"
        size="medium"
        icon="el-icon-search"
        @click="query">查询</el-button>
      </el-form>
    <h2></h2>
    <!--数据列表 stripe 条纹-->
    <el-table :data="list"
              style="width: 100%"
              height="420"
              :default-sort = "{prop: 'user_createtime', order: 'descending'}">
      <el-table-column fixed
                       type="index"
                       align="center"
                       width="40">
      </el-table-column>
      <el-table-column fixed  prop="role_name"
                       align="center"
                       label="角色"
                       width="100"
                       sortable>
      </el-table-column>
      <el-table-column prop="user_nickname"
                       align="center"
                       label="昵称"
                       width="150"
                       sortable>
      </el-table-column>
      <el-table-column prop="user_name"
                       align="center"
                       label="姓名"
                       width="100"
                       sortable>
      </el-table-column>
      <el-table-column prop="user_createtime"
                       align="center"
                       label="注册时间"
                       :formatter="dateFormat"
                       width="100"
                       sortable>
      </el-table-column>
      <el-table-column prop="user_id"
                       align="center"
                       label="会员ID"
                       width="100"
                       sortable>
      </el-table-column>
      <el-table-column prop="user_gender"
                       align="center"
                       label="性别"
                       width="100"
                       sortable>
      </el-table-column>
      <el-table-column prop="user_birth"
                       align="center"
                       label="出生日期"
                       :formatter="dateFormat"
                       width="100"
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
                       width="150" sortable>
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
      <!--<el-table-column prop="user_type"       v-text="list.user_type"  align="center"  label="user_type"   width="100"></el-table-column>
      <el-table-column prop="user_status"     v-text="list.user_status"  align="center"  label="user_status" width="100"></el-table-column>
      <el-table-column prop="company_id"      v-text="list.company_id"  align="center"  label="company_id"  width="120"></el-table-column>
      -->
      <!--操作-->
      <el-table-column label="操作"  fixed="right" align="center" width="160">
        <template slot-scope="page">
          <!--注意:
           slot-scope="page"  slot-scope 是一个插槽,拿外面的数据,就是一行的数据 page.row.pageId
           拿到行的数据中的pageId  slot-scope="A"  @click="edit(B.row.pageId) A和B需要保持一致 -->
          <!--
          发布按钮
          <el-button type="primary" icon="el-icon-check"size="small" @click="postPage(page.row.pageId)">发布</el-button>
          -->
          <!--编辑按钮-->
          <el-button type="text" size="small" @click="edit(page.row.pageId)">编辑</el-button>
          <!--删除按钮-->
          <el-button type="text" size="small" @click="del(page.row.pageId)">删除</el-button>
          <!--预览按钮-->
          <el-button type="text" size="small" @click="preview(page.row.pageId)">预览</el-button>
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
  </div>
</template>

<script>
  //2、导入方法user.js方法
  import * as userApi from '../api/user'
  import moment from 'moment'

  export default {
    data() {
      return {
        //siteList: [], // 站点列表
        list: [],  // 数据
        params: {  //  数据对象 这里和上面的查询表单做了双向绑定
          page: 1, //  当前页
          size: 6  //  每页显示数据的条数
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
        userApi.page_list(this.params.page, this.params.size).then((res) => { //当前页|每页记录数|查询条件
              // 2）将res结果数据赋值给list数据模型对象
              this.list = res.queryResult.list;
              this.total = res.queryResult.total;
        })
      },
      //站点查询
      querySite: function () {  //查询站点
        userApi.page_site().then((res) => {
          //将res结果数据赋值给模型对象
          this.siteList = res.queryResult.list;
        })
      },
      //当前页码改变时触发的事件 @current-change="changePage"
      changePage: function (currentPage) {  //current--》当前页码
        this.params.page = currentPage; //
        //调用query方法
        this.query();
      },
      //页面修改
      edit: function (pageId) {
        //打开修改页面
        this.$router.push({
          path: '/User/page/edit/' + pageId
        })
      },
      //页面删除
      del: function (pageId) {
        this.$confirm('你确认删除吗?', '提示', {}).then(() => {
          //调用服务端接口
          cmsApi.page_del(pageId).then((res) => {
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
      //页面预览
      preview: function (pageId) {
        //打开浏览器窗口
        window.open("http://www.xuecheng.com/cms/preview/" + pageId);
      },
      //发布界面
      postPage: function (pageId) {
        this.$confirm('确认发布该页面吗?', '提示', {}).then(() => {
          userApi.page_postPage(pageId).then((res) => {
            if (res.success) {
              console.log('发布页面id=' + pageId);
              this.$message.success('发布成功，请稍后查看结果');
            } else {
              this.$message.error('发布失败');
            }
          });
        }).catch(() => {
        });
      },
      //编写日期格式化的方法
      dateFormat:function (row,column) {
        const date=row[column.property]
        if(date==undefined){
          return''
        }
        return moment(date).format("YYYY-MM-DD")
      }
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
  /*编写页面样式，不是必须*/
</style>
