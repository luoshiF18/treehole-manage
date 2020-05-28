<template>
   <div>
     <br>
     <el-button type="primary" icon="el-icon-back" @click="go_back">返回列表</el-button>
     <br>
     <br>
     <el-form :model="extension" style="width:50%; " label-width="150px">
         <el-form-item label="推广方式">
           <el-radio-group v-model="extension.mode">
             <el-radio-button :label="0" v-if="extension.mode == 0">邮件</el-radio-button>
            <!-- <el-radio-button :label="1">短信</el-radio-button>-->
             <el-radio-button :label="2" v-if="extension.mode == 2">站内信</el-radio-button>

           </el-radio-group>
         </el-form-item>
         <div v-if="extension.mode == 0">
           <el-form-item label="标题">
             <el-input v-model="extension.title"></el-input>
           </el-form-item>
           <el-form-item>
             插入<span ><el-button type="text" size="medium" @click="addUserName()">用户姓名</el-button></span>
             <span ><el-button type="text" size="medium" @click="addUrl()">链接</el-button></span>
           </el-form-item>
           <el-form-item label="邮件模板">
             <el-input type="textarea"
                       v-model="extension.content"
                       placeholder="示例：亲爱的：${userName}，送您一张优惠券，点击${url} 查看详情" id="content"></el-input>
           </el-form-item>
         </div>
         <div v-if="extension.mode == 1">
           <el-form-item label="短信内容">
             <el-input type="textarea"
                       v-model="extension.content"
                       placeholder="示例：" id="content"></el-input>
           </el-form-item>
         </div>
         <div v-if="extension.mode == 2">
           <el-form-item label="标题">
             <el-input v-model="extension.title"></el-input>
           </el-form-item>
           <el-form-item>
             插入
             <span ><el-button type="text" size="medium" @click="addUrl()">链接</el-button></span>
           </el-form-item>
           <el-form-item label="站内信内容">
             <el-input type="textarea"
                       v-model="extension.content"
                        id="content"></el-input>
           </el-form-item>
         </div>
         <el-form-item label="资源类型">
           <el-radio-group v-model="extension.usedFor">
             <el-radio-button label="true">活动</el-radio-button>
             <el-radio-button label="false">优惠券</el-radio-button>
           </el-radio-group>
         </el-form-item>
       <div v-if="extension.usedFor == 'true'">
         <el-form-item label="活动类型">
           <el-radio-group v-model="extension.activityType">
             <el-radio-button :label="1">线上/线下活动</el-radio-button>
             <el-radio-button :label="2">优惠活动</el-radio-button>
             <el-radio-button :label="3">积分活动</el-radio-button>
           </el-radio-group>
         </el-form-item>
       </div>
        <el-form v-model="pagination" label-width="150px" ref="resForm">
          <el-form-item label="输入优惠券名称" v-if="extension.usedFor=='false'">
              <el-input v-model="pagination.key"> </el-input>

            <el-button type="primary" size="medium" @click="searchResForCoupon()" plain>查询</el-button>
          </el-form-item>
          <el-form-item label="输入活动名称" v-if="extension.usedFor=='true' && extension.activityType=='1'">
            <el-input v-model="pagination.key"> </el-input>

            <el-button type="primary" size="medium" @click="searchResForInteractive()" plain>查询</el-button>
          </el-form-item>

          <el-form-item label="输入活动名称" v-if="extension.usedFor=='true' && extension.activityType!='1'">
            <el-input v-model="pagination.key"> </el-input>

            <el-button type="primary" size="medium" @click="searchResForActivity()" plain>查询</el-button>
          </el-form-item>
          <div>
            <el-table :data="res"
                      class="table1" height="250" ref="resForm">
              <template  slot="empty" >
                <div>暂无数据
                </div>
              </template>
              <el-table-column prop="id" align="center" width="90">
                <template scope="scope">
                  <el-radio :label="scope.row.id"   v-model="extension.usedForId"></el-radio>
                </template>


              </el-table-column>

              <el-table-column prop="title" align="center" label="名称" width="180"></el-table-column>
              <el-table-column prop="statusName" align="center" label="状态" width="150"></el-table-column>
            </el-table>
          </div>
        </el-form>
         <!--<el-form-item label="资源id">
           <el-input v-model="extension.usedForId"></el-input>
         </el-form-item>-->
          <el-form v-model="searchUser" ref="searchUser" label-width="150px">
            <el-form-item label="选择用户创建时间">
              <el-row type="flex" :gutter="20">
                  <el-date-picker format="yyyy-MM-dd HH:mm:ss" v-model="searchUser.beforeTime" type="datetime" placeholder="...之后" style="width: 100%;"></el-date-picker>
                  <span>至</span>
                  <el-date-picker v-model="searchUser.afterTime" type="datetime" placeholder="...之前" style="width: 100%;"></el-date-picker>


              </el-row>
              <el-button type="primary" size="medium" @click="search()" plain>查询</el-button>
            </el-form-item>

              <el-table :data="user"
                        class="table1" @selection-change="handleSelectionChange" height="250" ref="userTable">
                <template  slot="empty" >
                  <div>暂无数据
                  </div>
                </template>
                <el-table-column type="selection" align="center" width="60"></el-table-column>
                <el-table-column prop="userName" align="center" label="用户名" width="180"></el-table-column>
                <el-table-column prop="to" align="center" label="联系方式/ID" width="150"></el-table-column>
              </el-table>
          </el-form>

         <!--<el-form-item label="收件人信息">

           <el-checkbox-group v-model="extension.to">
             <el-checkbox label="1261361118@qq.com"></el-checkbox>
             <el-checkbox label="2539282842@qq.com"></el-checkbox>
             <el-checkbox label="2031866592@qq.com"></el-checkbox>
           </el-checkbox-group>
         </el-form-item>-->
       <el-form-item style="float: right">
         <el-button type="primary" @click="submit">提交</el-button>

       </el-form-item>
     </el-form>
   </div>
</template>

<script>
    import * as marketingApi from '../../api/marketing';
    import moment from 'moment'
    export default {
        name: "extension_info",
        data() {
            return {
                extension: {
                    mode: 0,
                    title: '',
                    content: '',
                    usedFor: 'false',
                    activityType: 1,
                    usedForId: '',
                    url: "",
                    values: [
                       // {userName: '', to: '',}
                        ],
                },
                searchUser: {
                    beforeTime: '',
                    afterTime: '',
                },
                searchUsedFor: {
                    usedFor: '',
                    usedForId: '',
                },
                user: [],
                pagination: {//资源名字
                    key: "",
                    page: 1,
                    size: 1000,
                },
                res: [],  //查到的资源

                multipleSelection: [],// 选中的项
            }
        },
        methods: {
            go_back() {
               this.$router.push({
                   path: '/marketing/extension/list',
                   query: {
                   }
               });


            },
            //查询用户
            search: function () {
                marketingApi.searchUserInfo(this.searchUser.beforeTime, this.searchUser.afterTime).then((res) => {
                    let list = [];
                    if(res.list != null){
                        for (let i = 0; i < res.list.length; i++){
                            let u  = {};
                            let l = res.list[i];    //本次循环的对象
                            if(this.extension.mode == 0){//邮件  to:联系方式 邮件
                                [u.userId, u.userName, u.to] = [l.user_id, l.user_nickname, l.user_email];
                            } else if(this.extension.mode == 1){ //短信  to:手机号
                                [u.userId, u.userName, u.to] = [l.user_id, l.user_nickname, l.user_phone];
                            } else if(this.extension.mode == 2){ //站内信  to：用户id
                                [u.userId, u.userName, u.to] = [l.user_id, l.user_nickname, l.user_id];
                            }
                            //console.log(JSON.stringify(u));
                            list = list.concat(u);    //list加上u之后赋给list
                        }
                        this.user = list;
                        //console.log(JSON.stringify(this.user = list));
                    } else {
                        this.user = [];
                    }

                });
            },
            submit() {
                this.$confirm('确认提交吗？', '提示', {}).then(() => {
                    if(this.extension.usedFor == 'false'){
                        //this.extension.url = "http://www.treehole.com/coupon/receive?id=" + this.extension.usedForId;
                        this.extension.url = "www.treehole.com/#/coupon/receive?id=" + this.extension.usedForId;
                    } else if(this.extension.usedFor == 'true'&& this.extension.activityType == 1){
                        this.extension.url = "www.treehole.com/#/interactiveactivity/info?id=" + this.extension.usedForId;
                    }
                    marketingApi.extension_add(this.extension).then((res) => {
                        //    解析响应内容
                        if (res.success) {
                            this.$message.success('提交成功！');
                            this.go_back();
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                });

            },
            /*以下方法为按照名称（模糊）来查询资源：coupon或activity的信息*/
            searchResForCoupon() {
                this.res = [];
                marketingApi.coupon_list(this.pagination).then((res)=>{
                    if(res.success){
                        let lists = res.queryResult.list;
                        for (let i = 0; i < lists.length; i++) {
                            if(lists[i].status !=0 ){
                                this.res = this.res.concat(lists[i]);
                            }
                        }
                       // this.res = res.queryResult.list;

                    } else {//显示暂无数据
                        this.res = [];
                    }


                })
            },
            searchResForInteractive() {
                this.res = [];
                marketingApi.interactiveactivity_list(this.pagination).then((res)=>{
                    if(res.success){
                       // this.res = res.queryResult.list;
                        let lists = res.queryResult.list;
                        for (let i = 0; i < lists.length; i++) {
                            if(lists[i].status !=0 ){
                                this.res = this.res.concat(lists[i]);
                            }
                        }
                    } else {
                        this.res = [];
                    }
                })
            },
            searchResForActivity() {
                this.res = [];
                if(this.extension.activityType == 1){
                    this.pagination.typeId=  "_1";
                } else {
                    this.pagination.typeId = '_0';
                }
                marketingApi.activity_list(this.pagination).then((res)=>{
                    if(res.success){
                        //this.res = res.queryResult.list;
                        let lists = res.queryResult.list;
                        for (let i = 0; i < lists.length; i++) {
                            if(lists[i].status !=0 ){
                                this.res = this.res.concat(lists[i]);
                            }
                        }
                    } else {
                        this.res = [];
                    }
                })
            },
            addUserName() {
              let con = this.extension.content;
              this.extension.content = con + "${userName}";
            },
            addUrl() {
              let con = this.extension.content;
              this.extension.content = con + "${url} ";
            },
            handleSelectionChange(val) {
                //选中项添加到extension
                this.multipleSelection = val;
                let lists = [];
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    lists = lists.concat(this.multipleSelection[i]);

                }
                this.extension.values = lists;
            },

        },

        created(){
            this.extension.mode = this.$route.params.mode;
        },
        computed:{
            modeVal: function () {
                return this.extension.mode;
            }
        },
        watch: {
            /*'extension.mode'(){
                this.searchUser = {};
                this.user = [];
                this.extension.title = '';
                this.extension.content = '';
                this.extension.values = [];
                this.multipleSelection = [];
            }*/
            modeVal:{
                handler(){
                    this.searchUser = {};
                    this.user = [];
                    this.extension.title = '';
                    this.extension.content = '';
                    this.extension.values = [];
                    this.multipleSelection = [];
                }
            },
            /* 问题情境：当点击左侧menu菜单路由参数发生改变，想让右侧的数据随着改变。
         处理方法：在点击左侧菜单时重新加载页面传递参数获取不同数据从而实现。
         遇到的问题：路由发生改变，页面没有重新加载进created钩子函数
         出现的原因：当路由参数改变时，组件会被复用，因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会再被调用。

         解决方法： 设置路由监听，重新调用方法*/
            $route(to, from) {  //
                this.extension.mode = this.$route.params.mode;
            },

        }

    }
</script>

<style scoped>
  .table1 {
    float: left;
    width: 500px;
    height: 250px;
    margin-left: 100px;

  }
</style>
