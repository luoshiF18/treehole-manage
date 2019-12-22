<!--用户信息-->
<template>
  <div>
    <!--查询表单+新增-->
    <el-form  :model="params" class="margin">
      <el-select v-model="params.role_id"
                 clearable placeholder="角色"
                 filterable
                 size="medium"
                 style="width:110px;text-align:center;">
        <el-option
          v-for="item in options"
          :key="item.role_id"
          :label="item.label"
          :value="item.role_id">
        </el-option>
      </el-select>
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
                   style="float: right;margin-right: 10px"
                   :to="{path:'/member/page/user/user_add',query:{
                   page:this.params.page,
                   user_id:this.params.user_id
                    }}">
        <el-button type="primary"
                   size="medium"
                   icon="">新增管理员
        </el-button>
      </router-link>
    </el-form>
    <!--数据列表 stripe 条纹  v-loading="loading" -->
    <el-card class="margin">
      <el-table :data="list"

                height="420"
                v-loading="loading"
                v-on:sort-change="sort"
                :default-sort = "{prop: 'user_createtime', order: 'descending'}">
        <template  slot="empty" >
          <div>暂无数据
          </div>
        </template>
        <!--数据详情列表 (fixed)-->
        <el-table-column type="expand">
          <template slot-scope="props" >
            <el-form label-position="right" inline class="demo-table-expand">
              <el-form-item label="用户id">
                <span>{{ props.row.user_id }}</span>
              </el-form-item>
              <el-form-item label="角色">
                <span>{{ props.row.role_name }}</span>
              </el-form-item>
              <el-form-item label="年龄" >
                <span>{{ props.row.age }}</span>
              </el-form-item>
              <el-form-item label="昵称" >
                <span>{{ props.row.user_nickname }}</span>
              </el-form-item>
              <el-form-item label="用户名">
                <span>{{ props.row.user_name }}</span>
              </el-form-item>
              <el-form-item label="性别">
                <span>{{ props.row.gender }}</span>
              </el-form-item>
              <el-form-item label="出生日期">
                <span>{{ props.row.user_birth | birthFilter}}</span>
              </el-form-item>
              <el-form-item label="年龄">
                <span>{{ props.row.age }}</span>
              </el-form-item>
              <el-form-item label="邮箱">
                <span>{{ props.row.user_email }}</span>
              </el-form-item>
              <el-form-item label="手机号">
                <span>{{ props.row.user_phone }}</span>
              </el-form-item>
              <el-form-item label="QQ号">
                <span>{{ props.row.user_qq }}</span>
              </el-form-item>
              <el-form-item label="微信">
                <span>{{ props.row.user_wechat }}</span>
              </el-form-item>
              <el-form-item label="地址">
                <span>{{ props.row.user_region }}</span>
              </el-form-item>
              <el-form-item label="注册时间">
                <span>{{ props.row.user_createtime | dateFilter }}</span>
              </el-form-item>
              <el-form-item label="公司">
                <span>{{ props.row.company_id }}</span>
              </el-form-item>
              <el-form-item label="状态">
                <span>{{ props.row.user_status }}</span>
              </el-form-item>
              <el-form-item label="类型">
                <span>{{ props.row.user_type }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <!-- 数据列表 -->
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
                         sortable="custom"
                         :formatter="dateFormat1"
                         width="200">
        </el-table-column>
        <el-table-column prop="user_id"
                         align="center"
                         label="会员ID"
                         width="170">
        </el-table-column>
        <el-table-column prop="age"
                         align="center"
                         label="年龄"
                         width="100">
        </el-table-column>
        <el-table-column prop="gender"
                         align="center"
                         label="性别"
                         width="80">
        </el-table-column>
        <el-table-column prop="user_birth"
                            align="center"
                            label="出生日期"
                            :formatter="dateFormat2"
                            width="200"
                            sortable>
        </el-table-column>
        <el-table-column prop="user_phone"
                         align="center"
                         label="电话"
                         width="150"
                         >
        </el-table-column>
        <el-table-column prop="user_qq"
                         align="center"
                         label="QQ"
                         width="150"
                         >
        </el-table-column>
        <el-table-column prop="user_wechat"
                         align="center"
                         label="微信"
                         width="150"
                         >
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
          <!--按钮-->
          <template slot-scope="page">
            <!--编辑按钮-->
            <el-button type="text" size="medium" @click="edit(page.row.user_id)">编辑</el-button>

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
        labelPosition: 'right',
        loading: true,
        total: 0,  //  数据总条数

        list: [],  // 数据
        options: [{
          role_id: 1,
          label: '注册用户'
        }, {
          role_id: 2,
          label: '管理员'
        },{
          role_id: 3,
        label: '心理咨询师'
        }, {
            role_id: 4,
              label: '客服人员'
          }
        ],

        params: {  //  数据对象 这里和上面的查询表单做了双向绑定
          page: 1, //  当前页
          size: 6, //  每页显示数据的条数
          user_id: '',
          desc: "true",// 是否降序
          sortBy: "user_createtime",// 排序字段
          user_nickname: '',
          user_phone: '',
          role_id:''

        }
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
        userApi.user_list(this.params.page, this.params.size, this.params).then((res) => {
          // 2）将res结果数据赋值给list数据模型对象
          if (res.success) {
            this.list = res.queryResult.list;
            this.total = res.queryResult.total;
            this.loading = false;
          } else {
            this.list =[];
            this.total =0;
            this.loading = false;
          }

        });
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
      //排序
      sort: function (sort) {
        // console.log(sort)
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
      //页面修改(编辑)  通过user_id查询，返回结果后根据整个对象修改
      edit: function (user_id) {
        //打开页面
        this.$router.push({
          path: '/member/page/user/user_edit/' + user_id,
          query:{
            page: this.params.page
            }
        })
      },
      //编写日期格式化的方法
      dateFormat1:function (row,column) {
        const date=row[column.property]
        if(date==undefined){
          return''
        }
        return moment(date).format("YYYY-MM-DD HH:mm:ss")
      },
      dateFormat2:function (row,column) {
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
      },
      birthFilter: function (dateStr, pattern=""){
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
          return `${y}-${m}-${d}`
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
    width: 23%;
  }

  .del {
    color: #f5354c;
  }
  .margin{
    margin-top: 10px
  }
</style>
