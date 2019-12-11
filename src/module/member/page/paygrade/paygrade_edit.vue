<template>
  <div>
    <el-form   :model="gradeForm" label-width="80px"  ref="gradeForm" >
      <el-form-item label="等级ID" prop="paygrade_id">
        <el-input v-model="gradeForm.paygrade_id" auto-complete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="等级序号" prop="rank">
        <el-input  v-model="gradeForm.rank" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="等级名称" prop="paygrade_name">
        <el-input v-model="gradeForm.paygrade_name" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="有效期" prop="card_legality" style="width: 200px;">
        <el-input v-model="gradeForm.card_legality" auto-complete="off" ><span slot="suffix">天</span></el-input>
      </el-form-item>

      <el-form-item label="会员折扣" prop="discount"  style="width: 200px">
        <el-input v-model="gradeForm.discount" auto-complete="off" ><span slot="suffix">折</span></el-input>
      </el-form-item>
      <el-form-item label="权益描述" prop="card_desc">
        <el-input v-model="gradeForm.card_desc" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="初始储值" prop="initial_money">
        <el-input v-model="gradeForm.initial_money" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="初始积分" prop="initial_points">
        <el-input v-model="gradeForm.initial_points" auto-complete="off" ></el-input>
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
        prepage: 1,
        addLoading: false,//加载效果标记
        //新增界面数据
        params: {  //  数据对象 这里和上面的查询表单做了双向绑定
          page: 1, //  当前页
          size: 6, //  每页显示数据的条数
        },
        gradeForm: {
          paygrade_id:'',
          rank:'',
          paygrade_name:'',
          card_legality:'',
          card_desc:'',
          initial_money:'',
          initial_points:'',
          discount:''
        }
      }
    },
    methods:{

      go_back(){
        this.$router.push({
          path: '/member/page/paygrade', query: {
            prepage: this.$route.query.page,
          }
        })
      },
      editSubmit(){
        this.$refs.gradeForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              userApi.paygrade_edit(this.gradeForm).then((res) => {
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
      this.paygrade_id=this.$route.params.paygrade_id;

      //根据主键查询页面信息
      userApi.paygrade_get(this.paygrade_id).then((res) => {
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
