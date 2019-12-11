<template>
  <!--编写页面静态部分，即view部分-->
  <div>
    <div>
      <!--查询表单-->
      <el-form :model="params">
        用户登录名：<el-input v-model="reque.user_nickname"  style="width: 100px"></el-input>
        量表名: <el-input v-model="reque.scaleName"  style="width: 200px"></el-input>
        <el-button type="primary" size="small" v-on:click="query">查询</el-button>
      </el-form>
      <el-table
        :data="list"
        stripe
        style="width: 100%">
        <el-table-column type="index" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="user_nickname" label="登录名" width="200">
        </el-table-column>
        <el-table-column prop="userName" label="姓名" width="200">
        </el-table-column>
        <el-table-column prop="role_name" label="用户类型" width="200">
        </el-table-column>
        <el-table-column prop="scaleName" label="量表名称" width="200">
        </el-table-column>
        <el-table-column prop="create_date"  :formatter="dateFormat" label="提交时间" width="200">
        </el-table-column>
        <el-table-column label="操作" width="350">
          <template slot-scope="page">
              <el-button
                size="small" type="info"
                @click="look(page.row.id)">详情
              </el-button>
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

      <el-button
        size="small"type="danger"
        @click="export2Excel()">导出
      </el-button>

      <el-pagination
        layout="prev, pager, next"
        background
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
  import * as archivesReportApi from '../api/archivesReport.js'

  import moment from 'moment'

  export default {
    data() {
      return {
        siteList: [],
        list: [{
          userId: '',
          userName: '',
          user_nickname: '',
          scaleName: '',
          id: '',
          role_name: '',
          create_date: ''
        }],
        total: 0,
        params: {  //这里和上面的查询表单做了双向绑定
          page:1,
          size:5
        },
        reque:{
          user_nickname: '',
          scaleName: ''
        }
      }
    },
    methods:{
      query:function () {  //查询页面列表
        // alert('查询')
        //调用服务端的接口
        archivesReportApi.archivesReport_list(this.params.page,this.params.size,this.reque).then((res)=>{
          //将res结果数据赋值给数据模型对象
          this.list = res.queryResult.list;
          this.total = res.queryResult.total;
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
      dateFormat:function(row,column){
        var date = row[column.property];

        if(date == undefined){return ''};

        return moment(date).format("YYYY-MM-DD HH:mm:ss")

      },
      changePage:function (currentPage) {  //形参就是当前页码
        //
        this.params.page = currentPage;
        //调用query方法
        this.query();
      },
      // 导出
      export2Excel() {
        require.ensure([], () => {
          const { export_json_to_excel  } = require('../../../vendor/Export2Excel');
          const tHeader = ['用户id','登录名', '姓名', '用户类型', '量表名称', '提交时间'];
          // 上面设置Excel的表格第一行的标题
          const filterVal = ['userId', 'user_nickname', 'userName', 'role_name', 'scaleName', 'create_date'];
          // 上面的 goodsName、goodsId、是tableData里对象的属性
          const list = this.list;  //把data里的tableData存到list
          const data = this.formatJson(filterVal, list);
          export_json_to_excel (tHeader, data, '明细');
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
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
