<template>
  <div>
    <el-form  :model="categoryForm" label-width="80px"  ref="categoryForm" >
      <el-form-item label="分类名称" prop="category_name">
        <el-input v-model="categoryForm.category_name" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="创建者" prop="category_creater">
        <el-input v-model="categoryForm.category_creater" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="category_createtime">
        <el-date-picker type="datetime" placeholder="创建时间" v-model="categoryForm.category_createtime"></el-date-picker>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="go_back">返回</el-button>
      <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
    </div>
  </div>
</template>
<script>
  import * as categoryApi from '../../api/onlinetalk'
  export default{
    data(){
      return {
        //模版列表
        templateList:[],
        addLoading: false,//加载效果标记
        //新增界面数据
        categoryForm: {
          category_id:'',
          category_name:'',
          category_createtime:new Date(),
          category_creater:'',

        },

      }
    },
    methods:{
      go_back(){
        this.$router.push({
          path: '/category/list', query: {
            page: this.$route.query.page,
          }
        })
      },
      addSubmit(){
        this.$refs.categoryForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              categoryApi.category_add(this.categoryForm).then((res) => {
                  console.log(res);
                if(res.success){
                  this.addLoading = false;
                  //NProgress.done();
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  this.$refs['categoryForm'].resetFields();

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
        });
      }
    },
    created: function () {

    },
    mounted:function(){



    }
  }
</script>
<style>

</style>
