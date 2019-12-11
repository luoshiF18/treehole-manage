<template>
  <div>
    <el-form   :model="gradeForm" label-width="80px"  ref="gradeForm" >
      <el-form-item label="等级ID" prop="freegrade_id">
      <el-input v-model="gradeForm.freegrade_id" auto-complete="off" :disabled="true"></el-input>
    </el-form-item>
      <el-form-item label="等级序号" prop="rank">
        <el-input  v-model="gradeForm.rank" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="等级名称" prop="freegrade_name">
      <el-input v-model="gradeForm.freegrade_name" auto-complete="off" ></el-input>
    </el-form-item>
      <el-form-item label="积分界线" prop="points_judge">
      <el-input  v-model="gradeForm.points_judge" auto-complete="off" ></el-input>
    </el-form-item>
      <el-form-item label="消费界线(元)" prop="consum_judge">
        <el-input v-model="gradeForm.consum_judge" auto-complete="off" ></el-input>
      </el-form-item>

         </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="go_back">返回</el-button>
      <el-button type="primary" @click.native="editSubmit" :loading="addLoading">提交</el-button>
    </div>
  </div>
</template>
<script>
  import * as userApi from '../../api/member'
  export default{
    data(){
      return {
        //user_id:'',
        prepage: 1,
        addLoading: false,//加载效果标记
        //新增界面数据
        params: {  //  数据对象 这里和上面的查询表单做了双向绑定
          page: 1, //  当前页
          size: 6, //  每页显示数据的条数
        },
        gradeForm: {
          freegrade_id:'',
          freegrade_name:'',
          points_judge:'',
          consum_judge:'',
          rank:''
        }
      }
    },
    methods:{

      go_back(){
        this.$router.push({
          path: '/member/page/freegrade', query: {
            prepage: this.$route.query.page,
          }
        })
      },
      editSubmit(){
        this.$refs.gradeForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              userApi.freegrade_edit(this.gradeForm).then((res) => {
                console.log(res);
                if(res.success){
                  this.addLoading = false;
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  //返回
                  this.go_back();

                }else{
                  this.addLoading = false;
                  this.$message.error('提交失败!'+ res.message);
                }
              });
            });
          }
        });
      }
    },
    created: function () {
      this.freegrade_id=this.$route.params.freegrade_id;

      //根据主键查询页面信息
      userApi.freegrade_get(this.freegrade_id).then((res) => {
        console.log(res);
        if(res){
          this.gradeForm = res;
        }
      });
    },
    mounted:function(){



    }
  }
</script>
<style>

</style>
