<template>
<div>
  <el-upload
    class="upload-demo"
    :action="doUpload"
    :data="documentExt"
    :on-success="handleSuccess"
    :on-error="handleError"
    :on-change="handleChange"
    :file-list="fileList">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>

  <div slot="footer" class="dialog-footer">
    <el-button @click="go_back">返回</el-button>
  </div>
</div>
</template>
<script>
  export default {
    data() {
      return {
        doUpload:"api/train/document/uploadDoc",
        documentExt:{
            describe:"hehe",
            folderId:"1",
            userId:"",
            classCourseId:"",
            studentId:"",
        },
      };
    },
    methods: {
      //给参数赋值
      voluation(){
        this.documentExt.userId =JSON.parse(sessionStorage.getItem("login"));
        this.documentExt.studentId =JSON.parse(sessionStorage.getItem("login"));
        this.documentExt.classCourseId  = this.$route.params.classCourseId;
      },
      // 文件上传成功时的钩子
      handleSuccess(res, file, fileList) {
        if(res.code == 10000){
          this.$notify.success({
            title: '成功',
            message: `文件上传成功`
          });
        }else {
          this.$notify.error({
            title: '错误',
            message: `文件上传失败`
          });
        }
      },
      // 文件上传失败时的钩子
      handleError(err, file, fileList) {
        if(res.code == 10000){
          this.$notify.success({
            title: '成功',
            message: `文件上传成功`
          });
        }else {
          this.$notify.error({
            title: '错误',
            message: `文件上传失败`
          });
        }
      },
      //返回
      go_back(){
        this.$router.push({
          path: '/courseinformation/page/student_course_list', query: {

          }
        })
      },
    },
    mounted(){
      this.voluation();
    }

  }
</script>

<style lang="scss" scoped>

</style>
