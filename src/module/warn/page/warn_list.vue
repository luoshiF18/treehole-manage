<template>
  <div>
    <h1>预警列表</h1>
    <el-form ref="form" :model="params" label-width="80px">
      <el-row :gutter="20">
        <el-date-picker
          v-model="params.date"
          type="daterange"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
        <el-col class="col" :span="4">
          <el-input v-model="params.userNickName" placeholder="登录名">
          </el-input>
        </el-col>
        <el-col class="col" :span="3">
          <el-input v-model="params.scaleName" placeholder="量表名"></el-input>
        </el-col>
        <el-col :span="3">
          <el-select v-model="params.warningLevel" placeholder="预警等级" clearable >
            <el-option label="关注" value="2"></el-option>
            <el-option label="追踪" value="3"></el-option>
            <el-option label="高危" value="4"></el-option>
            <el-option label="警戒" value="5"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" size="mini" v-on:click="condition">查询按钮</el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table
      v-loading="loading"
      :data="list"
      border
      style="width: 100%"
      class="el-row"
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" type="selection" width="55"></el-table-column>
      <el-table-column label="序号"
                       width="50" align="center">
        <template scope="scope"><span v-text="getIndex(scope.$index)"></span></template>
      </el-table-column>
      <el-table-column align="center" prop="userNickName" label="登录名"></el-table-column>
      <el-table-column align="center" prop="userName" label="姓名"></el-table-column>
      <el-table-column align="center" prop="sex" label="性别">
        <template slot-scope="scope">
          {{ scope.row.sex === 0 ? '男' : '女' }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="scaleName" label="量表名称"></el-table-column>
      <el-table-column align="center" prop="warningLevel" label="预警等级"  >
        <template slot-scope="scope">
          <span v-if="scope.row.warningLevel==2" style="color: #0062cc">关注</span>
          <span v-if="scope.row.warningLevel==3" style="color: #ffe51a">追踪</span>
          <span v-if="scope.row.warningLevel==4" style="color: #ff7e0c">高危</span>
          <span v-if="scope.row.warningLevel==5" style="color: red">警戒</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createTime" label="提交时间" :formatter="dateFormat"></el-table-column>
      <el-table-column align="center"  fixed="right" label="操作">
        <template slot-scope="page">
          <el-button type="primary" size="mini"
                     @click="look(page.row.id)">查看
          </el-button>
          <el-button
            size="danger" type="mini"
            @click="del(page.row.id)">删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="params.size"
      :current-page="params.page"
      @current-change="changePage"
      style="float: right">
    </el-pagination>
    <el-button
      size="danger" type="mini"
      @click="delMore()">批量删除
    </el-button>
  </div>
</template>
<script>
    import moment from 'moment'
    import * as warnApi from '../api/warn.js'

    export default {
        name: 'warn_list',
        data() {
            return {
                list: [],
                total: 0,
                intervene:{
                    userName:'',
                    way:'',
                    context:'',
                    reason:'',
                    effect:'',
                    advisoryName:'',
                    recordTime:'',
                    status:''
                },
                params: {
                    page: 1,
                    size: 10,
                    userNickName: '',
                    scaleName: '',
                    warningLevel: '',
                    startTime: '',
                    endTime: '',
                    date: '',
                },
                loading: true,
                delarr: [], //存放删除的数据
                multipleSelection: [], //多选的数据
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
            };


        },
        methods: {
            query: function () {
                //查询页面列表
                warnApi.page_list(this.params.page, this.params.size).then((res) => {
                    //将res结果数据赋值给数据模型对象
                    this.list = res.queryResult.list;
                    this.total = res.queryResult.total;
                    this.loading=false;
                })
            },
            //动态分页显示，形参为当前页码
            changePage: function (page) {
                this.params.page = page;
                this.query();
            },
            //表格序号
            getIndex($index) {
                return (this.params.page - 1) * this.params.size + $index + 1
            },
            //删除一条记录
            del: function (id) {
                if (id == null) {
                    alert("id为空无法删除")
                }
                this.$confirm('你确认删除吗?', '提示', {}).then(() => {
                    //调用服务端接口
                    warnApi.page_del(id).then((res) => {
                        if (res.success) {
                            this.$message.success('删除成功')
                            //刷新页面
                            this.query();
                        } else {
                            this.$message.error('删除失败')
                        }
                    })
                })
            },
            //打开查看页面，查看预警详细信息
            look: function (warningId) {
                if (warningId == null) {
                    alert("id为空")
                }
                this.$router.push({
                    path: '/warn/page/preview/' + warningId
                })
            },
            //条件查询
            condition: function () {
                if(this.params.date!=null){
                    let startDate=this.params.date.toString();
                    this.params.startTime=startDate.substring(0,10);
                    this.params.endTime=startDate.substring(11)
                }
                warnApi.condition_list(this.params.page, this.params.size, this.params).then((res) => {
                    //将res结果数据赋值给数据模型对象
                    this.list = res.queryResult.list;
                    this.total = res.queryResult.total;
                })
            },
            //批量删除
            delMore: function () {
                const length = this.multipleSelection.length;
                for (let i = 0; i < length; i++) {
                    this.delarr.push(this.multipleSelection[i].id);
                    console.log(this.delarr[i])
                }
                this.$confirm('你确认删除吗?', '提示', {}).then(() => {
                    //调用服务端接口
                    warnApi.page_delMore(this.delarr).then((res) => {
                        if (res.success) {
                            this.$message.success('删除成功')
                            //刷新页面
                            this.query();
                        } else {
                            this.$message.error('删除失败')
                        }
                    })
                })
            },
            //批量删除得到行号
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //编写日期格式化的方法
            dateFormat: function (row, column) {
                console.log(row, column)
                const date = row[column.property]
                if (date == undefined) {
                    return ''
                }
                return moment(date).format("YYYY-MM-DD")
            },
        },

        mounted() {
            this.query();
        },
    }
</script>
<style scoped>
  .el-row {
    margin-bottom: 20px;
    margin-left: 20px;
    text-align: center;
  }
  .attention{
      background:url("/static/images/attention.PNG")no-repeat;
  }
  .guard{
    background:url("/static/images/guard.PNG")no-repeat;
  }
  .highRisk{
    background:url("/static/images/highRisk.PNG")no-repeat;
  }
  .trace{
    background:url("/static/images/trace.PNG")no-repeat;
  }

</style>
