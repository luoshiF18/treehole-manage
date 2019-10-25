<template>
    <div>
      <h1><{{}}>测评档案</h1>
      <div></div>
    </div>
</template>


<script>
  import * as archivesApi from '../api/archives.js'


  export default {
    data() {
      return {
        siteList: [],//量表列表
        list: [],
        total: 0,
        params: {  //这里和上面的查询表单做了双向绑定
          page:1,
          size:8,
          userId: '2',
          scaleName: '生活事件量表'
        },
        reque:{
          userId: '2',
          scaleName: '生活事件量表'
        }
      }
    },
    methods:{
      query:function () {  //查询页面列表
        // alert('查询')
        //调用服务端的接口
        archivesApi.page_list(this.params.page,this.params.size,this.reque).then((res)=>{
          //将res结果数据赋值给数据模型对象
          this.list = res.queryResult.list;
          this.total = res.queryResult.total;
        })
      },
      querySite:function(){  //查询站点
        cmsApi.page_site().then((res)=>{
          //将res结果数据赋值给模型对象
          this.siteList = res.queryResult.list;
        })
      },
      changePage:function (currentPage) {  //形参就是当前页码
        //
        this.params.page = currentPage;
        //调用query方法
        this.query();
      },
      //档案查看
      look:function (userId,scaleName) {
        alert(userId)
        alert(scaleName)
        //打开修改页面
        this.$router.push({
          path: '/cms/page/edit/'+pageId
        })
      },
      //页面删除
      del:function (pageId) {
        this.$confirm('你确认删除吗?', '提示', {}).then(() => {
          //调用服务端接口
          cmsApi.page_del(pageId).then((res)=>{
            if (res.success){
              this.$message.success('删除成功')
              //刷新页面
              this.query();
            }else{
              this.$message.error('删除失败')
            }
          })
        })
      }
    },
    created(){
      //取出路由中的参数,赋值给数据对象
      this.params.page = Number.parseInt(this.$route.query.page || 1);
      // this.params.siteId = this.$route.query.siteId || '';
    },
    mounted() {
      //当dom元素全部渲染完成后,调用query
      this.query();
      //this.querySite();
    }
  }
</script>

<style>
  /*编写页面样式，不是必须*/
</style>
