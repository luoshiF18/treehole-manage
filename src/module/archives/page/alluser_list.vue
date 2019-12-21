<template>
  <!--编写页面静态部分，即view部分-->
  <div>
    <div>
      <el-form  :model="params">
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
                   @click="query2">查询
        </el-button>
        <!--键盘回车事件 @keyup.enter="test"-->
        <router-link tag="span"
                     style="float: right;margin-right: 10px"
                     :to="{path:'/member/page/user/user_add',query:{
                   page:this.params.page,
                   user_id:this.params.user_id
                    }}">
        </router-link>
      </el-form>
    </div>

    <div>
      <el-card class="margin">
        <el-table :data="list"
                  style="width: 100%;height:80%"
                  v-loading="loading"
                  v-on:sort-change="sort"
                  :default-sort = "{prop: 'user_createtime', order: 'descending'}">
          <!-- 数据列表 -->
          <el-table-column type="index"
                           label="序号"
                           align="center"
                           width="40">
          </el-table-column>
          <el-table-column prop="user_nickname"
                           align="center"
                           label="昵称"
                           width="150">
          </el-table-column>
          <el-table-column prop="role_name"
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
          <!--<el-table-column label="操作"-->
                           <!--fixed="right"-->
                           <!--align="center"-->
                           <!--width="160">-->
            <!--&lt;!&ndash;按钮&ndash;&gt;-->
            <!--<template slot-scope="page">-->
              <!--&lt;!&ndash;编辑按钮&ndash;&gt;-->
              <!--<el-button type="text" size="medium" @click="edit(page.row.user_id)">编辑</el-button>-->

              <!--&lt;!&ndash;删除按钮&ndash;&gt;-->
              <!--<el-button type="text" class="del" size="medium" @click="del(page.row.user_id)">删除</el-button>-->
            <!--</template>-->

          <!--</el-table-column>-->
          <el-table-column label="操作"
                           align="center"
                           fixed="right"
                           width="150%">
            <template slot-scope="page">
              <el-button
                type="primary" @click="lookArchives(page.row.user_id)">查看用户档案
              </el-button>
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
  </div>

</template>
<script>
  import * as archivesApi from '../api/archives.js'
  import moment from 'moment'

  export default {
    data() {
      return {
        dialogTableVisible: false,
        list: [],
        total: 0,
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
        params: {  //这里和上面的查询表单做了双向绑定
          page:1,
          size:7,
          user_id: '',
          desc: "true",// 是否降序
          sortBy: "user_createtime",// 排序字段
          user_nickname: '',
          user_phone: '',
          role_id:''
        },
        loading: true,
        oneloading: true,
        reque:{
          user_id: '',
          user_nickname: '',
          user_phone: ''
        },
        oneUser:{
          userId: ''
        },
        oneUserList: []
      }
    },
    methods:{
      query:function () {  //查询页面列表
        // alert('查询')
        //调用服务端的接口
        archivesApi.allUser_list(this.params.page,this.params.size,this.reque).then((res)=>{
            //将res结果数据赋值给数据模型对象
            this.list = res.queryResult.list;
            this.total = res.queryResult.total;
            this.loading = false;
        })
      },
      query2: function () {
        //1、调用js方法请求服务端页面查询接口  2、导入user.js  当前页|每页记录数|查询条件
        archivesApi.user_list(this.params.page,this.params.size,this.params).then((res) => {
          // 2）将res结果数据赋值给list数据模型对象
          this.list = res.queryResult.list;
          this.total = res.queryResult.total;
          this.loading = false;
        })
      },
      queryOneUser:function () {  //查询页面列表
        // alert('查询')
        //调用服务端的接口
        archivesApi.archivesList_list(this.params.page,1000000,this.oneUser).then((res)=>{
          //将res结果数据赋值给数据模型对象
          this.oneUserList = res.queryResult.list;
        })
      },
      //档案查看
      look:function (resultId) {
        // alert(resultId);
        //打开修改页面
        this.$router.push({
          path:'/archivesReport/page/detail',query:{
            resultId:resultId
          }
        })
      },
      changePage:function (currentPage) {  //形参就是当前页码
        //
        this.params.page = currentPage;
        //调用query方法
        this.query();
      },
      //档案查看
      lookArchives:function (userId) {
/*        this.dialogTableVisible = true
        this.oneUser.userId = userId
        archivesApi.archivesList_list(1,1000000,this.oneUser).then((res)=>{
          //将res结果数据赋值给数据模型对象
          this.oneUserList = res.queryResult.list;
          this.oneloading = false;
        })*/
        this.$router.push({
          path:'/archives/page/userArchivesList',query:{
            userId:userId,
            flag: 1
          }
        })
      },
      //页面删除
      del:function (pageId) {
        this.$confirm('你确认删除吗?', '提示', {}).then(() => {
          //调用服务端接口
          cmsApi.page_del(pageId).then((res)=>{
            if (res.success){
              this.$message.success('删除成功')
              //刷新页面
              this.query();
            }else{
              this.$message.error('删除失败')
            }
          })
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
      }
    },
    created(){
      //取出路由中的参数,赋值给数据对象
      this.params.page = Number.parseInt(this.$route.query.page || 1);
      // this.params.siteId = this.$route.query.siteId || '';
    },
    mounted() {
      //当dom元素全部渲染完成后,调用query
      this.query();
      //this.querySite();
    }
  }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
