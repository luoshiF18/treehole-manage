<template>
  <!--编写页面静态部分，即view部分-->
  <div>
    <!--查询表单-->
    <el-form :model="params" style="padding: 10px">
      <!--<el-input v-model="params.id" placeholder="请输入查询条件..." style="width: 200px"></el-input>-->
      <el-select v-model="value" clearable placeholder="请选择" style="width: 100px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input v-if="value == '选项1' "v-model="params.id" placeholder="请输入查询条件..." style="width: 200px"></el-input>
      <el-input v-if="value == '选项2' "v-model="params.cltId" placeholder="请输入查询条件..." style="width: 200px"></el-input>
      <el-input v-if="value == '选项3' "v-model="params.userId" placeholder="请输入查询条件..." style="width: 200px"></el-input>
      <el-button type="primary" icon="el-icon-search" v-on:click="query">查询</el-button>
    </el-form>

    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="id" label="订单ID" width="120" align="center">
      </el-table-column>
      <el-table-column prop="userId" label="用户ID" width="120" align="center">
      </el-table-column>
      <el-table-column prop="cltId" label="咨询师ID" width="120" align="center">
      </el-table-column>
      <el-table-column prop="appDate" label="预约时间" width="110" align="center" :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="appMode" label="咨询方式" width="80" align="center">
      </el-table-column>
      <el-table-column prop="appPrice" label="价格" width="80" align="center">
      </el-table-column>
      <el-table-column prop="appNote" label="备注" width="120" align="center">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="110" align="center" :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间" width="110" align="center" :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="appStatus" label="状态" width="80" align="center">
      </el-table-column>
      <el-table-column label="操作" width="120" align="center">
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
  import * as cmsApi from '../api/appointment';
  import moment from 'moment'
  export default {
    data() {
      return {
        list: [],
        total: 0,
        params: {  //这里和上面的查询表单做了双向绑定
          page:1,
          size:10,
          id:'',
          cltId: '',
          userId:''
        },
        options: [{
          value: '选项1',
          label: '订单ID'
        }, {
          value: '选项2',
          label: '咨询师ID'
        }, {
          value: '选项3',
          label: '用户ID'
        }],
        value: ''
      }
    },
    methods:{
      //编写日期格式化的方法
      dateFormat:function (row,column) {

        const date=row[column.property]
        if(date == null){
          return null
        }
        if(date==undefined){
          return''
        }
        return moment(date).format("YYYY-MM-DD  HH:mm:ss")
      },
      //查询预约订单列表
      queryList:function () {
        // alert('查询')
        //调用服务端的接口
        cmsApi.page_list(this.params.page,this.params.size,this.params).then((res)=>{
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
    //删除预约订单
      del:function (id) {
        this.$confirm('你确认删除吗?', '提示', {}).then(() => {
          //调用服务端接口
          cmsApi.page_del(id).then((res)=>{
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
      //修改预约订单页面
      edit:function (id) {
        //打开修改预约订单页面
        this.$router.push({
          path: '/appointment/order/edit/'+id
        })
      }
    },
    created(){
      //取出路由中的参数,赋值给数据对象
      // this.params.page = Number.parseInt(this.$route.query.page || 1);
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
