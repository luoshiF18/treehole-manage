<template>
  <div>
    <el-form   :model="menuForm" label-width="80px"  ref="pageForm" >

      <el-form-item label="父菜单">
        <el-select v-model="menuForm.pid"
                   clearable placeholder="父菜单"
                   filterable
                   size="medium"
                   style="width:110px;text-align:center;">
          <el-option
            v-for="item in menutypef"
            :key="item.id"
            :label="item.menuName"
            :value="item.id">
          </el-option>
        </el-select>
        父节点则不用填
      </el-form-item>
      <el-form-item label="权限名称" prop="agent_name">
        <el-input v-model="menuForm.menuName" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="权限code" prop="agent_name">
        <el-input v-model="menuForm.code" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="创建时间">
        <el-date-picker type="datetime" placeholder="创建时间" v-model="menuForm.createTime"></el-date-picker>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="go_back">返回</el-button>
      <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
    </div>
  </div>
</template>
<script>
  import * as Api from '../../api/member'
  export default{
    data(){
      return {
        //模版列表
        //templateList:[],
        menutypef:[],
        addLoading: false,//加载效果标记
        //新增界面数据
        menuForm: {
          pid:'',
          menuName:'',
          createTime:new Date(),
          code:'',


        },
        goback_params: {
          page: this.$route.query.page,
          //siteId:this.$route.query.siteId,
        }
      }
    },
    methods:{
      go_back(){
        this.$router.push({
          path: '/member/page/menu/menuList', query: {
            page: this.$route.query.page,
          }
        })
      },
      //查询所有父菜单
      queryMenuNamef: function(){
        Api.user_menulistf().then((res) =>{
          this.menutypef= res.queryResult.list;

        })

      },
      addSubmit(){

       // alert(this.menuForm.pId)
        //this.$refs.pageForm.validate((valid) => {
         // if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              Api.menu_add(this.menuForm).then((res) => {
                  console.log(res);
                if(res.success){
                  this.addLoading = false;
                  //NProgress.done();
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  //this.$refs['agentForm'].resetFields();

                }else if(res.message){
                  this.addLoading = false;
                  this.$message.error(res.message);
                }else{
                  this.addLoading = false;
                  this.$message.error('提交失败');
                }
              });
            });
          }
       // });
      //}
    },
    created: function () {
      this.queryMenuNamef();
    },
    mounted:function(){



    }
  }
</script>
<style>

</style>
