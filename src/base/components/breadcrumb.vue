<template>
<!--  1、el-breadcrumb 显示当前页面的路径，快速返回之前的任意页面。
      2、el-breadcrumb-item 标签表示从首页开始的每一级。
      3、Element 提供了一个separator属性，在el-breadcrumb标签中设置它来决定分隔符，它只能是字符串，默认为斜杠/-->
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item,index) in realList" :to="item.path" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script type="text/javascript">
  export default {
    data() {
      return {
        realList: []
      }
    },
    methods: {
    },
    mounted() {
      this.realList = this.$route.meta.routeList;
      console.log(this.realList)
    }
  }
</script>
<style scoped lang="scss">

</style>
