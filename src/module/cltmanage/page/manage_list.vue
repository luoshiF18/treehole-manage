<template>
  <!--编写页面静态部分，即view部分-->
  <div>
    <!--查询表单-->
    <el-form :model="params" style="padding: 10px">
      <el-input v-model="params.cltId" placeholder="请输入咨询师ID..." style="width: 200px"></el-input>
      <!--<el-select v-model="value" placeholder="请选择"  style="width: 100px">-->
        <!--<el-option-->
          <!--v-for="item in options"-->
          <!--:key="item.value"-->
          <!--:label="item.label"-->
          <!--:value="item.value">-->
        <!--</el-option>-->
      <!--</el-select>-->
      <!--<el-input v-if="value == '选项1' "v-model="params.id" placeholder="请输入查询条件..." style="width: 200px"></el-input>-->
      <!--<el-input v-if="value == '选项2' "v-model="params.cltId" placeholder="请输入查询条件..." style="width: 200px"></el-input>-->
      <!--<el-input v-if="value == '选项3' "v-model="params.userId" placeholder="请输入查询条件..." style="width: 200px"></el-input>-->
      <el-button type="primary" icon="el-icon-search" v-on:click="query">查询</el-button>
      <router-link :to="{path:'/appointment/cltmanage/add'}">
        <el-button type="success" icon="el-icon-edit">新增</el-button>
      </router-link>
    </el-form>

    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="cltId" label="咨询师ID" width="160">
      </el-table-column>
      <el-table-column prop="leftTime" label="预约开始时间" width="180" :formatter="formatCreatetime1">
      </el-table-column>
      <el-table-column prop="rightTime" label="预约结束时间" width="180" :formatter="formatCreatetime2" >
      </el-table-column>
      <el-table-column prop="appNumber" label="可预约人数" width="180">
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="list">
          <el-button
            size="small"type="text"
            @click="edit(list.row.id)">编辑
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
            size="small"type="text"
            @click="del(list.row.id)">删除
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

</template>
<script>
  import * as cmsApi from '../api/cltmanage';
  import utilApi from '@/common/utils';

  export default {
    data() {
      return {
        list: [],
        total: 0,
        params: {  //这里和上面的查询表单做了双向绑定
          page:1,
          size:10,
          cltId: '',
        }
      }
    },
    methods:{
      formatCreatetime1(row, column){
        var createTime = new Date(row.leftTime);
        if (createTime) {
          return utilApi.formatDate(createTime, 'yyyy-MM-dd hh:mm:ss');
        }
      },
      formatCreatetime2(row, column){
        var createTime = new Date(row.rightTime);
        if (createTime) {
          return utilApi.formatDate(createTime, 'yyyy-MM-dd hh:mm:ss');
        }
      },
      //查询咨询师预约管理单
      queryList:function () {
        // alert('查询')
        //调用服务端的接口
        cmsApi.manage_list(this.params.page,this.params.size,this.params).then((res)=>{
          //将res结果数据赋值给数据模型对象
          this.list = res.queryResult.list;
          this.total = res.queryResult.total;
        })
      },
      query(){
        this.params.page = 1;
        this.queryList();
      },
      changePage:function (currentPage) {  //形参就是当前页码
        this.params.page = currentPage;
        //调用query方法
        this.queryList();
      },
      //删除咨询师预约管理单
      del:function (id) {
        this.$confirm('你确认删除吗?', '提示', {}).then(() => {
          //调用服务端接口
          cmsApi.cltmanage_del(id).then((res)=>{
            if (res.success){
              this.$message.success('删除成功')
              //刷新页面
              this.queryList();
            }else{
              this.$message.error('删除失败')
            }
          })
        })
      },
      //修改咨询师预约管理单
      edit:function (id) {
        //打开咨询师预约管理单页面
        this.$router.push({
          path: '/appointment/cltmanage/edit/'+id,
          page: this.$route.query.page,
        })
      }
    },
    created(){
      //取出路由中的参数,赋值给数据对象
      //this.params.page = Number.parseInt(this.$route.query.page || 1);
      // this.params.id = this.$route.query.id || '';
    },
    mounted() {
      //当dom元素全部渲染完成后,调用query
      this.queryList();
    }
  }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
