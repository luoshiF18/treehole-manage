<template>
  <!--用户信息管理-->
  <div>
    <!--查询表单+新增-->
    <h2></h2>
    <el-form  :model="params">
      <el-select   v-model="params.siteId"  placeholder="请选择查询站点">
        <el-option v-for="item in siteList" :key="item.siteId" :label="item.siteName" :value="item.siteId"></el-option>
        <!-- value值是用于提交的,label值是用于显示的 -->
      </el-select>
      <!--查询-->
      <el-input placeholder="请输入查询关键词"
                autofocus
                style="width: auto">
      </el-input>
      <!-- 查询按钮 -->
      <el-button
        type="primary"
        size="medium"
        :formatter="formatter"
        icon="el-icon-search"
        @click="query">查询</el-button>
      </el-form>
    <h2></h2>
    <!--数据列表 stripe 条纹-->
    <el-table :data="list"
              style="width: 100%"
              height="420"
              :default-sort = "{prop: 'user_createtime', order: 'descending'}">
      <el-table-column fixed  type="index"    align="center"  width="40"></el-table-column>
      <el-table-column fixed  prop="role_id"  align="center"  label="角色"     width="100" sortable></el-table-column>
      <el-table-column prop="user_nickname"   align="center"  label="昵称"     width="150" sortable></el-table-column>
      <el-table-column prop="user_name"       align="center"  label="姓名"     width="100" sortable></el-table-column>
      <el-table-column prop="user_createtime" align="center"  label="注册时间" width="100" sortable></el-table-column>
      <el-table-column prop="user_id"         align="center"  label="会员ID"   width="100" sortable></el-table-column>
      <el-table-column prop="user_gender"     align="center"  label="性别"     width="100"  sortable></el-table-column>
      <el-table-column prop="user_birth"      align="center"  label="出生日期" width="100" sortable></el-table-column>
      <el-table-column prop="user_phone"      align="center"  label="电话"     width="150" sortable></el-table-column>
      <el-table-column prop="user_qq"         align="center"  label="QQ"       width="150" sortable></el-table-column>
      <el-table-column prop="user_wechat"     align="center"  label="微信"     width="150" sortable></el-table-column>
      <el-table-column prop="user_region"     align="center"  label="所在地区" width="250"></el-table-column>
      <el-table-column prop="user_type"       align="center"  label="user_type"   width="100"></el-table-column>
      <el-table-column prop="user_status"     align="center"  label="user_status" width="100"></el-table-column>
      <el-table-column prop="company_id"      align="center"  label="company_id"  width="120"></el-table-column>
      <!--操作-->
      <el-table-column label="操作"  fixed="right" align="center" width="160">
        <template slot-scope="page">
          <!--编辑按钮-->
          <el-button type="text" size="small" @click="edit(page.row.pageId)">编辑</el-button>
          <!--注意:
           slot-scope="page"  slot-scope 是一个插槽,拿外面的数据,就是一行的数据 page.row.pageId
           拿到行的数据中的pageId  slot-scope="A"  @click="edit(B.row.pageId) A和B需要保持一致 -->
          <!--
          发布按钮
          <el-button type="primary" icon="el-icon-check"size="small" @click="postPage(page.row.pageId)">发布</el-button>
          -->
          <!--删除按钮-->
          <el-button type="text" size="small" @click="del(page.row.pageId)">删除</el-button>
          <el-button type="text" size="small" @click="preview(page.row.pageId)" >预览</el-button>
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

  export default {
    data() {
      return {
        siteList: [], // 站点列表
        slist: [],
        list: [
          {
          user_id: '001',
          role_id: '管理员',
          user_nickname: 'aw1ang',
          user_name: '王小虎',
          user_gender: '男',
          user_birth: '1997-02-13',
          user_phone: '17796766304',
          user_qq: '256321564',
          user_weChat: 'dfs231156',
          user_createtime: '2016-05-01',
          user_region: '上海市普陀区金沙江路 区金沙江路 1518 弄',
          user_type: '',
          user_status: '',
          company_id: ''
        },
          {
          user_id: '002',
          role_id: '用户',
          user_nickname: 'dwang',
          user_name: '王小虎',
          user_gender: '女',
          user_birth: '1997-02-13',
          user_phone: '17796766304',
          user_qq: '256321564',
          user_weChat: 'dfs231156',
          user_createtime: '2016-05-02',
          user_region: '上海市普陀区金沙江路 区金沙江路 1518 弄',
          user_type: '',
          user_status: '',
          company_id: ''
        },
          {
          user_id: '003',
          role_id: '管理员',
          user_nickname: 'rewang',
          user_name: '王小虎',
          user_gender: '男',
          user_birth: '1997-02-13',
          user_phone: '17796766304',
          user_qq: '256321564',
          user_weChat: 'dfs231156',
          user_createtime: '2016-05-03',
          user_region: '上海市普陀区金沙江路 区金沙江路 1518 弄',
          user_type: '',
          user_status: '',
          company_id: ''
        },
          {
          user_id: '004',
          role_id: '用户',
          user_nickname: 'trhwang',
          user_name: '王小虎',
          user_gender: '女',
          user_birth: '1997-02-13',
          user_phone: '17796766304',
          user_qq: '256321564',
          user_weChat: 'dfs231156',
          user_createtime: '2016-05-04',
          user_region: '上海市普陀区金沙江路 区金沙江路 1518 弄',
          user_type: '',
          user_status: '',
          company_id: ''
        },
          {
          user_id: '005',
          role_id: '管理员',
          user_nickname: 'whrang',
          user_name: '王小虎',
          user_gender: '男',
          user_birth: '1997-02-13',
          user_phone: '17796766304',
          user_qq: '256321564',
          user_weChat: 'dfs231156',
          user_createtime: '2016-05-05',
          user_region: '上海市普陀区金沙江路 区金沙江路 1518 弄',
          user_type: '',
          user_status: '',
          company_id: ''
        },
          {
          user_id: '006',
          role_id: '管理员',
          user_nickname: 'wakkng',
          user_name: '王小虎',
          user_gender: '男',
          user_birth: '1997-02-13',
          user_phone: '17796766304',
          user_qq: '256321564',
          user_weChat: 'dfs231156',
          user_createtime: '2016-05-06',
          user_region: '上海市普陀区金沙江路 区金沙江路 1518 弄',
          user_type: '',
          user_status: '',
          company_id: ''
        }],  // 数据
        params: {    //  数据对象 这里和上面的查询表单做了双向绑定
          page: 1,   //  当前页
          size: 6,   //  每页显示数据的条数
          siteId: '',//  站点ID
        },
        total: 8,  //  数据总条数
        keywords:'',
      }
    },
    filters:{
      dateFormat: function (dataStr, pattern=" ") {
        // 根据给定字符串 得到特定时间  yyyy-mm-dd
        var dt = new Date(dateStr)
        var y = dt.getFullYear()
        var m = dt.getMonth() + 1 //month从0开始
        var d = dt.getDate()
        if(pattern.toLowerCase() === 'yyyy-mm-dd') { //toLowerCase() 转换成小写
          return `${y}-${m}-${d}`
        } else {
          var hh = dt.getHours()
          var mm = dt.getMinutes()
          var ss = dt.getSeconds()
          return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
        }
      }
    },
    methods: {
      //页面查询
      query: function () {
        //1、调用js方法请求服务端页面查询接口  2、导入user.js
        userApi.page_list(this.params.page, this.params.size, this.params).then((res) => { //当前页|每页记录数
          //将res结果数据赋值给list数据模型对象
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
      //格式化内容
      formatter(row, column) {
        return row.address;
      },

      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
    },
    created() { // vm实例的data和methods初始化完毕后执行，发ajax要提前
      /*//取出路由中的参数,赋值给数据对象*/
      this.params.page = Number.parseInt(this.$route.query.page || 1);
      this.params.siteId = this.$route.query.siteId || '';

    },
    mounted() { // 模板和HTML已经渲染出来
      /*当dom元素全部渲染完成后,自动调用query*/
      this.query();
      this.querySite();
    }
  }
  }

</script>

<style scoped>
  /*编写页面样式，不是必须*/
</style>
