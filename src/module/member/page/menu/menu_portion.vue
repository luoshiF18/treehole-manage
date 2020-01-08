<template>
  <div>
    <el-form   v-model="menuForm" label="角色" label-width="80px"  >


      <el-form-item label="角色">
      <el-select v-model="params.role_id"
                 clearable placeholder="角色"
                 filterable
                 size="medium"
                 style="width:110px;text-align:center;">
        <el-option
          v-for="item in roletype"
          :key="item.role_id"
          :label="item.role_name"
          :value="item.role_id">
        </el-option>
      </el-select>
      </el-form-item>

      <el-form-item label="父菜单">
        <el-select v-model="params.menu_pid"
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
        <el-button @click="queryMenuName">确定</el-button>
      </el-form-item>


      <el-form-item label="菜单">
        <el-select v-model="params.menu_id"
                   clearable placeholder="菜单"
                   filterable
                   size="medium"
                   style="width:110px;text-align:center;">
          <el-option label="选择所有" value='-1'></el-option>
          <el-option
            v-for="item in menutype"
            :key="item.id"
            :label="item.menuName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="创建时间">
        <el-date-picker type="datetime" placeholder="创建时间" v-model="params.create_time"></el-date-picker>
      </el-form-item>

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
        roletype:[],
        menutype:[],
        menutypef:[],
        templateList:[],
        addLoading: false,//加载效果标记
        //新增界面数据
        params: {  //  数据对象 这里和上面的查询表单做了双向绑定
          role_id:'',
          menu_id:'',
          menu_pid:'',
          create_time:new Date(),
        },

        menuForm: {
          menuName:'',
          createTime:new Date(),
          code:'',
        },
        goback_params: {
          page: this.$route.query.page,
          siteId:this.$route.query.siteId,
        }
      }
    },
    methods:{

      //查询所有角色
      queryRoleName: function(){
        Api.user_rolelist().then((res) =>{
          this.roletype = res.queryResult.list;
        })
      },
      //查询所有父菜单
      queryMenuNamef: function(){
        Api.user_menulistf().then((res) =>{
          this.menutypef= res.queryResult.list;

        })

      },
      //查询所有菜单
      queryMenuName: function(){
        Api.user_menulist(this.params.menu_pid).then((res) =>{
         // alert(this.params.menu_pid)
          this.menutype = res.queryResult.list;
        })
      },

      go_back(){
        this.$router.push({
          path: '/member/page/menu/menuList', query: {
            page: this.$route.query.page,
          }
        })
      },
      addSubmit(){
        //this.$refs.pageForm.validate((valid) => {
          //if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              Api.permission_add(this.params).then((res) => {
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
          //}
        ;
      }
    },
    created: function () {
      this.queryRoleName();

      this.queryMenuNamef();
    },
    mounted:function(){



    }
  }
</script>
<style>

</style>
