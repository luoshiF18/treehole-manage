<template>
  <div>
    <el-form   :model="cardForm" label-width="120px"  ref="cardForm" >
      <el-form-item label="卡ID" prop="card_id">
      <el-input v-model="cardForm.card_id" auto-complete="off" :disabled="true"></el-input>
    </el-form-item>
      <el-form-item label="用户ID" prop="user_id">
      <el-input v-model="cardForm.user_id" auto-complete="off" :disabled="true"></el-input>
    </el-form-item>

      <el-form-item label="用户等级" prop="freegrade_id">
      <!--<el-input  v-model="cardForm.freegrade" auto-complete="off" ></el-input>-->
        <el-select  v-model="cardForm.freegrade"
                    filterable
                    style="width:120px"
                    clearable placeholder="选择分类">
          <el-option
            v-for="item in freetype"
            :key="item.freegrade_id"
            :label="item.freegrade_name"
            :value="item.freegrade_name">
          </el-option>
        </el-select>
    </el-form-item>
      <!--<el-form-item label="VIP等级" prop="paygrade_id">
        <el-input v-model="cardForm.paygrade" auto-complete="off" ></el-input>
      </el-form-item>-->
      <el-form-item label="VIP等级" prop="paygrade">
      <el-select  v-model="cardForm.paygrade" filterable style="width:120px" clearable placeholder="选择分类">
        <el-option
          v-for="item in viptype"
          :key="item.paygrade_id"
          :label="item.paygrade_name"
          :value="item.paygrade_name">
        </el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="总消费(元)" prop="consum_all">
        <el-input  v-model="cardForm.consum_all" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="使用起止时间">
        <el-col :span="8">
          <el-date-picker v-model="cardForm.paygrade_start" type="datetime" placeholder="选择使用开始时间"
                          style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col :span="1">至</el-col>
        <el-col :span="8">
          <el-date-picker v-model="cardForm.paygrade_end" type="datetime" placeholder="选择使用结束时间"
                          style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
     <!-- <el-form-item label="付费会员开始时间" prop="paygrade_start">
        <el-date-picker v-model="cardForm.paygrade_start" type="datetime" placeholder="开始时间" ></el-date-picker>
      </el-form-item>
      <el-form-item label="付费会员结束时间" prop="paygrade_end">
        <el-date-picker  v-model="cardForm.paygrade_end" type="datetime" placeholder="结束时间"></el-date-picker>
      </el-form-item>-->
      <el-form-item label="现有积分" prop="points_now">
        <el-input v-model="cardForm.points_now" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="累计积分" prop="points_sum">
        <el-input v-model="cardForm.points_sum" auto-complete="off" ></el-input>
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
        viptype: [

        ],
        freetype: [],
        //新增界面数据
        params: {  //  数据对象 这里和上面的查询表单做了双向绑定
          page: 1, //  当前页
          size: 6, //  每页显示数据的条数
        },
        cardForm: {
          card_id:'',
          user_id:'',
          freegrade:'',
          paygrade:'',
          consum_all:'',
          paygrade_start:'',
          paygrade_end:'',
          points_now:'',
          points_sum:''
        },
        pageFormRules: { // 添加界面必填选项+不填警告 rules
          paygrade: [{required: true,trigger: 'blur'}],
         // paygrade:[{required: true, validator: checkPhone ,   trigger: 'blur'}],
          //password:  [{required: true, validator: validatePass , trigger: 'blur'}],
         // checkPass: [{required: true, validator: validatePass2, trigger: 'blur' }],
        },
      }
    },
    methods:{
    //返回
      go_back(){
        this.$router.push({
          path: '/member/page/cards', query: {
            prepage: this.$route.query.page,
          }
        })
      },
      //查询用户等级
      queryFreeName: function(){
        userApi.card_freelist().then((res) =>{
          this.freetype = res.queryResult.list;
        })
      },
    //查询VIP等级
      queryVipName: function(){
        userApi.card_viplist().then((res) =>{
          this.viptype = res.queryResult.list;
        })
      },
      //提交
      editSubmit(){
        this.$refs.cardForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              userApi.card_edit(this.cardForm).then((res) => {
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
      this.card_id=this.$route.params.card_id;
      //this.prepage = this.$route.query.page || '';

      //根据主键查询页面信息
      userApi.card_get(this.card_id).then((res) => {
        console.log(res);
        if(res){
          this.cardForm = res;
        }
      });
      this.queryVipName();
      this.queryFreeName();
    },
    mounted:function(){

    }
  }
</script>
<style>

</style>
