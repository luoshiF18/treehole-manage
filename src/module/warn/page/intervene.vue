<template>
  <div>
    <h1>预警干预记录列表</h1>
    <el-form ref="form" :model="params" label-width="80px">
      <el-row :gutter="20">
        <el-date-picker
          v-model="params.date"
          type="daterange"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          align="left"
          unlink-panels
          range-separator="至"
          start-placeholder="记录开始日期"
          end-placeholder="记录结束日期"
          :picker-options="pickerOptions"
          :span="5">
        </el-date-picker>
        <el-col class="col" :span="4">
          <el-input v-model="params.userNickName" placeholder="用户名">
          </el-input>
        </el-col>
        <el-col class="col" :span="3">
          <el-input v-model="params.advisoryName" placeholder="咨询员姓名"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" size="mini" v-on:click="condition">查询</el-button>
        </el-col>
        <el-col :span="1">
          <el-button type="primary" size="mini" v-on:click="addIntervene">新增记录表</el-button>

          <el-dialog title="新增干预记录"
                     :width="dialogWidth"
                     :visible.sync="dialogFormVisible"
                     :modal=false>
            <div class="smallDiv">
            <el-form  :model="intervene" ref="form"  label-width="120px" >
              <el-form-item prop="userName" p :span="1" label="干预对象名称" >
                <el-input  v-model="intervene.userName"></el-input>
              </el-form-item>
              <el-form-item label="干预方式"  prop="way" style="margin-right:0 ">
                <el-select style="margin-left: 0"  v-model="intervene.way" placeholder="请选择干预方式">
                  <el-option label="面谈" value="面谈"></el-option>
                  <el-option label="家访" value="家访"></el-option>
                  <el-option label="送医" value="送医"></el-option>
                  <el-option label="其他" value="其他"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="干预的时间"  prop="recordTime" required>
                <el-col :span="11" >
                  <el-form-item >
                    <el-date-picker v-model="intervene.recordTime" type="date" placeholder="选择日期"  style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="干预原因" prop="reason" >
                <el-input type="textarea"
                          autosize
                          :rows="7"
                          v-model="intervene.reason">
                </el-input>
              </el-form-item>
              <el-form-item label="干预内容" prop="context" >
                <el-input type="textarea"
                          autosize
                          :rows="6"
                          v-model="intervene.context">
                </el-input>
              </el-form-item>
              <el-form-item label="干预后的效果" prop="effect" >
                <el-input type="textarea"
                          :rows="5"
                          v-model="intervene.effect">
                </el-input>
              </el-form-item>
               <el-form-item label="干预后状态" prop="status">
                 <el-radio-group v-model="intervene.status" >
                   <el-radio :label="0">良好</el-radio>
                   <el-radio :label="1">待观察</el-radio>
                   <el-radio :label="2">仍需干预</el-radio>
                 </el-radio-group>
              </el-form-item>
              <el-form-item label="咨询员" prop="advisoryName">
                <el-input size="small"  v-model="intervene.advisoryName" ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('intervene')">立即提交</el-button>
              </el-form-item>
            </el-form>
            </div>
          </el-dialog>
        </el-col>
      </el-row>
    </el-form>

    <el-table
      :data="list"
      border
      style="width: 100%"
      class="el-row"
      stripe
      v-loading="loading"
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" type="selection" width="55"></el-table-column>
      <el-table-column label="序号"
                       width="50" align="center">
        <template slot-scope="scope"><span v-text="getIndex(scope.$index)"></span></template>
      </el-table-column>
      <el-table-column align="center" prop="userName" label="用户名"></el-table-column>
      <el-table-column align="center" prop="user_name" label="姓名"></el-table-column>
      <el-table-column align="center" prop="gender" label="性别">
        <template slot-scope="scope">
          {{ scope.row.sex === 0 ? '男' : '女' }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="user_phone" label="电话"  >
      </el-table-column>
      <el-table-column align="center" prop="company_id" label="机构" >
      </el-table-column>
      <el-table-column align="center" prop="advisoryName" label="咨询员姓名"></el-table-column>
      <el-table-column align="center" prop="recordTime" label="创建时间" :formatter="dateFormat"></el-table-column>
      <el-table-column align="center" prop="status" label="干预后效果">
          <template slot-scope="scope">
            <span v-if="scope.row.status==0" style="color: #2ac845">良好</span>
            <span v-if="scope.row.status==1" style="color: #ec971f">仍需观察</span>
            <span v-if="scope.row.status==2" style="color: red">还需干预</span>
          </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" >
        <template slot-scope="page" >
          <el-button type="primary" size="mini"
                     @click="look(page.row.id)">详情
          </el-button>

          <el-dialog
                     title="预警干预记录表"
                     :modal=false
                     :visible.sync="dialogTableVisible"
                     :width="dialogWidth">
          <div class="BigDiv">
            <table cellspacing="0"  id="pdfCentent" v-loading="loadingOne" >
              <!--第一行-->
            <tr>
              <td class="one">干预时间</td>
              <td class="tow">{{dateFormatRow(detail.recordTime)}}</td>
              <td class="tow">干预方式</td>
              <td style="text-align: center">{{detail.way}}</td>
            </tr>
              <!--第二行-->
             <tr>
               <td class="one">干预的对象</td>
               <td colspan="4" >{{detail.userName}}</td>
             </tr>
              <!--第三行-->
              <tr>
                <td class="one">干预的内容</td>
                <td class="three" colspan="3">{{detail.context}}</td>
              </tr>
              <!--第四行-->
              <tr>
                <td colspan="4"  class="four">&nbsp;干预的缘由：{{detail.reason}}</td>
              </tr>
              <!--第五行-->
              <tr>
                <td colspan="4"    class="four">&nbsp;干预后的效果：{{detail.effect}}</td>
              </tr>
              <!--第六行-->
              <tr>
                <td colspan="4" align="left" height="50">&nbsp;咨询员:&nbsp;{{detail.advisoryName}}</td>
              </tr>
            </table>
            <el-button
              class="five"
              size="primary" type="mini"
              @click="ExportSavePdf(htmlTitle,nowTime)">导出
            </el-button>
          </div>
          </el-dialog>
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
  </div>
</template>
<script>
    import moment from 'moment'
    import * as warnApi from '../api/warn.js'
    import { Loading } from 'element-ui';
    export default {
        name: 'warn_list',
        data() {
            return {
                list: [],
                detail:{
                    userName:'',
                    way:'',
                    context:'',
                    reason:'',
                    effect:'',
                    advisoryName:'',
                    recordTime:''
                },
                dialogVisible:false,
                dialogWidth: '',
                intervene:{
                    userName:'',
                    way:'',
                    context:'',
                    reason:'',
                    effect:'',
                    advisoryName:'',
                    recordTime:''
                },
                total: 0,
                params: {
                    page: 1,
                    size: 10,
                    userNickName: '',
                    advisoryName:'',
                    startTime: '',
                    endTime: '',
                    organizationName:'',
                    date:''
                },
                dialogFormVisible: false,
                dialogTableVisible:false,
                loading: true,
                loadingOne:true,
                htmlTitle:'干预记录表',
                nowTime: "",
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
            dateFormatRow:function(time) {
                let date=new Date(time);
                let year=date.getFullYear();
                /* 在日期格式中，月份是从0开始的，因此要加0
                 * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
                 * */
                let month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
                let day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
                // 拼接
                return year+"-"+month+"-"+day;
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
            del: function (interveneId) {
                if (interveneId == null) {
                    alert("id为空无法删除")
                }
                this.$confirm('你确认删除吗?', '提示', {}).then(() => {
                    //调用服务端接口
                    warnApi.interveneDel(interveneId).then((res) => {
                        if (res.success) {
                            this.$message.success('删除成功')
                            //刷新页面
                            this.condition();
                        } else {
                            this.$message.error('删除失败')
                        }
                    })
                })
            },
            //打开查看页面，查看预警干预的详细信息
            look: function (interveneId) {
                if (interveneId == null) {
                    alert("id为空")
                }
                this.dialogTableVisible = true;
                this.loadingOne=true;
                warnApi.getDetailIntevene(interveneId).then((res) => {
                this.detail=res;
                this.loadingOne=false;
                })
            },
            //新增干预记录表
            addIntervene:function(){
                this.dialogFormVisible = true;
                this.resetForm('form');
            },
            resetForm(form){
                if (this.$refs[form]!==undefined) {
                    this.$refs[form].resetFields();
                }
            },
            //新增干预记录表
            submitForm:function(){
                this.$confirm('确定提交?', '提示', {}).then(() => {
                    //调用服务端接口
                    warnApi.addIntervene(this.intervene).then((res) => {
                        if(res.code==11113){
                            this.$message.error('该用户没有预警记录，无法添加干预表！')
                        }
                        else if(res.code==11114){
                            this.$message.error('该用户干预记录表已存在！')
                        }
                        else if (res.success) {
                            this.$message.success('提交成功')
                            //销毁元素
                            this.destroy=true;
                            //关闭模态框

                            //刷新页面
                            this.condition();
                        } else {
                            this.$message.error('提交失败')
                        }
                    })
                })
            },
            //导出为ptf
            derive:function(){



            },

            //宽度自适应
            setDialogWidth() {
                console.log(document.body.clientWidth)
                var val = document.body.clientWidth
                const def = 800 // 默认宽度
                if (val < def) {
                    this.dialogWidth = '100%'
                } else {
                    this.dialogWidth = def + 'px'
                }
            },
            //综合查询
            condition: function () {
                if(this.params.date!=null){
                    let startDate=this.params.date.toString();
                    this.params.startTime=startDate.substring(0,10);
                    this.params.endTime=startDate.substring(11)
                }
                warnApi.getIntevene(this.params.page, this.params.size, this.params).then((res) => {
                    //将res结果数据赋值给数据模型对象
                    this.list = res.queryResult.list;
                    this.total = res.queryResult.total;
                    this.loading=false;
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
        created() {
            this.setDialogWidth()
        },
        mounted() {
            this.condition();
            window.onresize = () => {
                return (() => {
                    this.setDialogWidth()
                })()
            };
        },
    }
</script>
<style scoped>
  .el-row {
    margin-bottom: 20px;
    margin-left: 20px;
    text-align: center;
  }
    table{
    width: 600px;
    height: 600px;
    border: 1px solid black;
    border-collapse: collapse;
   }

   tr td{
    border: 1px solid black;
    margin: 0;
    padding: 0;
  }
   /deep/ .smallDiv{
     padding: 5px;
     margin-left: 40px;
     width: 600px;
   }
  /deep/ .BigDiv{

    width: 700px;
    height: 700px;
    margin-left: 30px;
    padding:50px 50px 50px 50px;
  }
  /deep/ .one{
    text-align: center;
    width: 90px;
    height: 50px;
  }
  /deep/ .tow{
    text-align: center;
    width: 140px;
    height: 50px;
  }
  /deep/ .three{
  height: 80px;
  }
  /deep/ .four{
    valign:top;
    text-align: left;
    height: 150px;
    vertical-align: top;
  }
  /deep/ .five{
    text-align: left;
    margin-left: 10px;
    margin-top: 5px;
  }
</style>
<style>


</style>
