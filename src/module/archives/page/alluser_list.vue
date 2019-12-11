<template>
  <!--编写页面静态部分，即view部分-->
  <div>
    <div>
      <!--查询表单-->
      <el-form :model="params">
        用户名：<el-input v-model="params.pageAliase"  style="width: 100px"></el-input>
        <el-button type="primary" size="small" v-on:click="query">查询</el-button>
      </el-form>
      <el-table
        :data="list"
        v-loading="loading"
        stripe
        style="width: 100%">
        <el-table-column type="index" label="序号" width="50%">
        </el-table-column>
        <el-table-column prop="user_nickname" label="用户名" width="170%">
        </el-table-column>
        <el-table-column prop="role_name" label="用户类型" width="170%">
        </el-table-column>
        <el-table-column prop="user_phone" label="手机号" width="170%">
        </el-table-column>
        <el-table-column prop="user_qq" label="qq" width="170%">
        </el-table-column>
        <el-table-column prop="company_id" label="公司" width="170%">
        </el-table-column>
        <el-table-column label="操作" width="230%">
          <template slot-scope="page">
              <el-button
                size="small"type="info" @click="lookArchives(page.row.user_id)">查看用户档案
              </el-button>
            <el-dialog title="用户测评档案" :visible.sync="dialogTableVisible">
              <el-table
                :data="oneUserList"
                v-loading="oneloading"
                stripe>
                <el-table-column type="index" label="序号" width="300%">
                </el-table-column>
                <el-table-column prop="scaleName" label="量表名称" width="400%">
                </el-table-column>
                <el-table-column label="操作" width="300%">
                  <template slot-scope="page">
                    <router-link tag="span" :to="{path:'/archives/page/detail',query:{
                         userId:page.row.userId,
                         scaleName:page.row.scaleName
                         }}">
                      <el-button
                        size="small"type="info">详情
                      </el-button>
                    </router-link>

                    <!--
                      slot-scope="page"
                      slot-scope是一个插槽,拿外面的数据,就是一行的数据
                      page.row.pageId 拿到行的数据中的pageId

                      注意:
                      slot-scope="A"  @click="edit(B.row.pageId)
                      A和B需要保持一致
                    -->
                    <el-button
                      size="small"type="danger"
                      @click="del(page.row.pageId)">删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-dialog>
            <!--
              slot-scope="page"
              slot-scope是一个插槽,拿外面的数据,就是一行的数据
              page.row.pageId 拿到行的数据中的pageId

              注意:
              slot-scope="A"  @click="edit(B.row.pageId)
              A和B需要保持一致
            -->
            <el-button
              size="small"type="danger"
              @click="del(page.row.pageId)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="params.size"
        :current-page="params.page"
        @current-change="changePage"
        style="float: right;">
      </el-pagination>
    </div>
  </div>

</template>
<script>
  import * as archivesApi from '../api/archives.js'

  export default {
    data() {
      return {
        dialogTableVisible: false,
        list: [],
        total: 0,
        params: {  //这里和上面的查询表单做了双向绑定
          page:1,
          size:5,
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
