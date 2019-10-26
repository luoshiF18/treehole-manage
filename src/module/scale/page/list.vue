<template>
  <div>
    <h1>量表列表</h1>
    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column prop="id" label="id" width="120">
      </el-table-column>
      <el-table-column prop="scaleName" label="量表名称" width="120">
      </el-table-column>
      <el-table-column prop="pageAliase" label="别名" width="120">
      </el-table-column>
      <el-table-column prop="pageType" label="页面类型" width="180">
      </el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径" width="250">
      </el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径" width="250">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
    import * as scaleApi from '../api/scaleApi'

    export default {
        data() {
            return {
                list: [],
                total: 0,
                params: {  //这里和上面的查询表单做了双向绑定
                    page: 1,
                    size: 10,
                    desc: false
                }
            }
        },
        methods: {
            query: function () {
                scaleApi.page_list(this.params).then((res) => {
                    //将res结果数据赋值给数据模型对象
                    this.list = res.queryResult.list;
                    console.log(this.list)
                    this.total = res.queryResult.total;
                })
            },

        },
        created() {
            //当dom元素全部渲染完成后,调用query
            this.query();
        }
    }
</script>
<style scoped>

</style>
