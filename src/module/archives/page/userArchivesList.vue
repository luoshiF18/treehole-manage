<template>
  <!--编写页面静态部分，即view部分-->

  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="用户基本信息" name="first">

      <el-card  class="box-card">
        <el-form ref="form"
                 :model="form"
                 v-loading="loading1"
                 label-width="80px">
          <el-form-item label="姓名:">
            <span>{{form.user_name}}</span>
          </el-form-item>
          <el-form-item label="昵称:">
            <span>{{form.user_nickname}}</span>
          </el-form-item>
          <el-form-item label="角色:">
            <span>{{form.role_name}}</span>
          </el-form-item>
          <el-form-item label="性别:">
            <span>{{form.gender == 0 ? '男': '女'}}</span>
          </el-form-item>
          <el-form-item label="出生日期:">
            <span>{{form.user_birth}}</span>
          </el-form-item>
          <el-form-item label="电子邮箱:">
            <span>{{form.user_email}}</span>
          </el-form-item>
          <el-form-item label="联系电话:">
            <span>{{form.user_phone}}</span>
          </el-form-item>
          <el-form-item label="qq:">
            <span>{{form.user_qq}}</span>
          </el-form-item>
          <el-form-item label="微信:">
            <span>{{form.user_wechat}}</span>
          </el-form-item>
          <el-form-item label="籍贯:">
            <span>{{form.user_region}}</span>
          </el-form-item>
          <el-form-item label="公司:">
            <span>{{form.company_id}}</span>
          </el-form-item>
        </el-form>
      </el-card>


    </el-tab-pane>
    <el-tab-pane label="心理量表测评记录" name="second">
      <el-card  class="box-card">
        <el-table
          :data="list2"
          stripe
          v-loading="loading2"
          style="width: 100%">
          <el-table-column type="index" label="序号" width="60">
          </el-table-column>
          <el-table-column prop="scaleName" label="量表名称" width="300">
          </el-table-column>
          <el-table-column prop="answerCount" label="作答次数" width="300">
          </el-table-column>
          <el-table-column prop="lateFinishDate" label="最新作答时间" width="300" :formatter="formatScoleTime">
          </el-table-column>
          <el-table-column label="操作" width="300">
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
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          layout="prev, pager, next"
          :total="total2"
          :page-size="params2.size"
          :current-page="params2.page"
          @current-change="changePage2"
          style="float: right;">
        </el-pagination>
      </el-card>
    </el-tab-pane>

    <el-tab-pane label="心理咨询记录" name="third">
      心理咨询记录
      <el-card  class="box-card">
        <el-table
          :data="list3"
          stripe
          v-loading="loading3"
          style="width: 100%">
          <el-table-column type="index" label="序号" width="60">
          </el-table-column>
          <el-table-column prop="psychologist_name" label="咨询师名称" width="300">
          </el-table-column>
          <el-table-column prop="consultation_time" label="咨询时间" width="300" :formatter="formatPsyTime">
          </el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="page">
              <el-button
                size="small"type="info">详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          layout="prev, pager, next"
          :total="total3"
          :page-size="params3.size"
          :current-page="params3.page"
          @current-change="changePage3"
          style="float: right;">
        </el-pagination>
      </el-card>
    </el-tab-pane>

    <el-tab-pane label="客服咨询记录" name="fourth">
      客服咨询记录
      <el-card  class="box-card">
        <!--列表-->
        <el-table :data="list4" highlight-current-row v-loading="this.loading4" style="width: 100%;">
          <el-table-column type="index" label="序号" width="60">
          </el-table-column>
          <el-table-column prop="agent_name" label="客服姓名" width="120">
          </el-table-column>
          <el-table-column prop="user_name" label="用户姓名" width="150">
          </el-table-column>
          <el-table-column prop="serv_title" label="服务标题" width="150">
          </el-table-column>
          <el-table-column prop="serv_content" label="服务内容" width="500">
          </el-table-column>
          <el-table-column prop="serv_time" label="服务时间" width="180" :formatter="formatCreatetime">
          </el-table-column>
        </el-table>
        <el-pagination
          layout="prev, pager, next"
          :total="total4"
          :page-size="params4.size"
          :current-page="params4.page"
          @current-change="changePage4"
          style="float: right;">
        </el-pagination>
        <!--分页-->
        <!--<el-col :span="24" class="toolbar">-->

          <!--<el-pagination background layout="prev, pager, next" @current-change="changePage4" :current-size="this.params4.size"-->
                         <!--:total=this.total*2 :current-page="this.params4.page"-->
                         <!--style="float:right;">-->
          <!--</el-pagination>-->
        <!--</el-col>-->

      </el-card>

    </el-tab-pane>

    <el-tab-pane label="咨询师预约记录" name="five">
      咨询师预约记录
      <el-card  class="box-card">
        <!--列表-->
        <el-table
          :data="list5"
          stripe
          style="width: 100%">
          <el-table-column label="序号" type="index" width="60">
          </el-table-column>
          <el-table-column prop="id" label="订单ID" width="120" align="center">
          </el-table-column>
          <el-table-column prop="userId" label="用户ID" width="80" align="center">
          </el-table-column>
          <el-table-column prop="cltId" label="咨询师ID" width="80" align="center">
          </el-table-column>
          <el-table-column prop="appDate" label="预约日期" width="120" align="center" :formatter="formatAppDate2">
          </el-table-column>
          <el-table-column prop="appStartTime" label="开始时间" width="80" align="center">
          </el-table-column>
          <el-table-column prop="appEndTime" label="结束时间" width="80" align="center">
          </el-table-column>
          <el-table-column prop="appMode" label="咨询方式" width="80" align="center">
          </el-table-column>
          <el-table-column prop="appPrice" label="价格" width="80" align="center">
          </el-table-column>
          <el-table-column prop="appNote" label="备注" width="80" align="center">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="110" align="center" :formatter="formatCreatetime2">
          </el-table-column>
          <el-table-column prop="updateTime" label="更新时间" width="110" align="center" :formatter="formatUpdateTime2">
          </el-table-column>
          <el-table-column prop="appStatus" label="状态" width="80" align="center">
          </el-table-column>
        </el-table>

        <el-pagination
          layout="prev, pager, next"
          :total="total5"
          :page-size="params5.size"
          :current-page="params5.page"
          @current-change="changePage5"
          style="float: right;">
        </el-pagination>
      </el-card>

    </el-tab-pane>

  </el-tabs>


</template>
<script>
  import * as archivesApi from '../api/archives.js'
  import ElRow from "element-ui/packages/row/src/row";
  import utilApi from '../../../common/utils';
  import servApi from '../../onlinetalk/api/onlinetalk';


  export default {
    components: {ElRow},
    data() {
      return {
        activeName: 'first',  //当前tabs标签所在的位置
        list2: [],
        list3: [],
        list4: [],
        list5: [],
        total2: 0,
        total3: 0,
        total4: 0,
        total5: 0,
        params2: {  //这里和上面的查询表单做了双向绑定
          page:1,
          size:5,
        },
        params3: {  //这里和上面的查询表单做了双向绑定
          page:1,
          size:5,
        },
        params4: {  //这里和上面的查询表单做了双向绑定
          page: 1,
          size: 10,
          user_id:'',
        },
        params5: {  //这里和上面的查询表单做了双向绑定
          page:1,
          size:10,
          id:'',
          cltId: '',
          userId:''
        },
        loading1: true,
        loading2: true,
        loading3: true,
        loading4: true,
        loading5: true,
        reque:{
          userId: ''  //1和2标签查询的请求条件,用户id
        },
        reply:{
          reply_id:'',
          reply_title:'',
          reply_content:'',
          reply_createtime:'',
          reply_creater:'',
          category:''
        },
        form: {} //1标签表单表单数据
      }
    },
    methods:{
      //查询用户的基本信息 标签1
      queryOne:function () {
        // alert('查询')
        //调用服务端的接口
        archivesApi.user_basic(this.reque.userId).then((res)=>{
            //将res结果数据赋值给数据模型对象
            this.form = res;
            this.loading1 = false;
        })
      },
      //查询心理量表测评记录
      queryTwo:function () {  //查询页面列表
        // alert('查询')
        //调用服务端的接口
        archivesApi.archivesList_list(this.params2.page,this.params2.size,this.reque).then((res)=>{
          console.log(res.success)
          if(res.success == true){
            //将res结果数据赋值给数据模型对象
            this.list2 = res.queryResult.list;
            this.total2 = res.queryResult.total;
          }else{
            this.$message('当前用户无心理量表测评记录');
          }
          this.loading2 = false;
        })
      },
      //查询咨询心理咨询师记录
      queryThree:function () {  //查询页面列表
        // alert('查询')
        //调用服务端的接口
        archivesApi.psy_consultation_list(this.params3,this.reque.userId).then((res)=>{
          if(res.success == true) {
            //将res结果数据赋值给数据模型对象
            this.list3 = res.queryResult.list;
            this.total3 = res.queryResult.total;
          }else{
            this.$message('当前用户无心理咨询记录');
          }
          this.loading3 = false;
        })
      },
      queryFour:function () {
        /*     alert("查询")*/
        archivesApi.serv_list(this.params4).then((res)=>{
          if(res.success == true) {
            //将res结果数据赋值给数据模型对象
            this.total4 = res.queryResult.total
            this.list4 = res.queryResult.list
          }else{
            this.$message('当前用户无客服咨询记录');
          }
          this.loading4 = false;
          //alert(this.total)
        })
      },
      queryFive:function () {
        /*     alert("查询")*/
        archivesApi.page_list(this.params5.page,this.params5.size,this.params5).then((res)=>{
          if(res.success == true) {
            //将res结果数据赋值给数据模型对象
            this.list5 = res.queryResult.list;
            this.total5 = res.queryResult.total;
          }else{
            this.$message('当前用户无咨询师预约记录');
          }
          this.loading5 = false;
        })
      },
      changePage2:function (currentPage) {  //形参就是当前页码
        //
        this.params2.page = currentPage;
        //调用query方法
        this.queryTwo();
      },
      changePage3:function (currentPage) {  //形参就是当前页码
        //
        this.params3.page = currentPage;
        //调用query方法
        this.queryThree();
      },
      changePage4:function (currentPage) {  //形参就是当前页码
        //
        this.params4.page = currentPage;
        //调用query方法
        this.queryFour();
      },
      changePage5:function (currentPage) {  //形参就是当前页码
        //
        this.params5.page = currentPage;
        //调用query方法
        this.queryFive();
      },
      formatCreatetime(row, column){
        var createTime = new Date(row.serv_time);
        if (createTime) {
          return utilApi.formatDate(createTime, 'yyyy-MM-dd');
        }
      },
      // 预约日期格式化
      formatAppDate2(row, column){
        var date = new Date(row.appDate);
        if (date) {
          return utilApi.formatDate(date, 'yyyy-MM-dd');
        }
      },
      // 创建时间格式化
      formatCreatetime2(row, column){
        var date = new Date(row.createTime);
        if (date) {
          return utilApi.formatDate(date, 'yyyy-MM-dd hh:mm:ss');
        }
      },
      // 更新时间格式化
      formatUpdateTime2(row, column){
        var date = new Date(row.updateTime);
        if (date) {
          return utilApi.formatDate(date, 'yyyy-MM-dd hh:mm:ss');
        }
      },
      // 时间格式化
      formatScoleTime(row, column){
        var date = new Date(row.lateFinishDate);
        if (date) {
          return utilApi.formatDate(date, 'yyyy-MM-dd hh:mm:ss');
        }
      },
      formatPsyTime(row, column){
        var date = new Date(row.consultation_time);
        if (date) {
          return utilApi.formatDate(date, 'yyyy-MM-dd hh:mm:ss');
        }
      },
      //切换tabs标签时动态加载数据
      handleClick(tab, event) {
        if(tab.name == 'first'){
          //触发1事件
          this.queryOne();
        }else if(tab.name == 'second'){
          //触发2事件
          this.queryTwo();
        }else if(tab.name == 'third'){
          //触发3事件
          this.queryThree();
        }else if(tab.name == 'fourth'){
          //触发4事件
          this.queryFour();
        }else if(tab.name == 'five'){
          //触发5事件
          this.queryFive();
        }
      }
    },
    created(){
      //取出路由中的参数,赋值给数据对象
      // this.params.page = Number.parseInt(this.$route.query.page || 1);
      if(this.$route.query.flag == '1'){
        //说明是管理员查看
        this.reque.userId = this.$route.query.userId || '';
      }else{
        //当前用户直接查看
        let activeUser= utilApi.getActiveUser();
        this.reque.userId = activeUser.userid;
        this.params4.user_id = activeUser.userid;
        this.params5.userId = activeUser.userid;
      }


    },
    mounted() {
      this.queryOne();
    }
  }
</script>
<style>
  /*编写页面样式，不是必须*/

</style>
