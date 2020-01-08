<template>
   <div>
     <br>
     <el-button type="primary" icon="el-icon-back" @click="go_back">返回列表</el-button>
     <br>
     <br>
     <el-form :model="extension" style="width:50%; " label-width="150px">
         <el-form-item label="推广方式">
           <el-radio-group v-model="extension.mode">
             <el-radio-button :label="0">邮件</el-radio-button>
            <!-- <el-radio-button :label="1">短信</el-radio-button>-->
             <el-radio-button :label="2">站内信</el-radio-button>

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
                       placeholder="示例：" id="content"></el-input>
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
       <div v-if="extension.usedFor == true">
         <el-form-item label="活动类型">
           <el-radio-group v-model="extension.activityType">
             <el-radio-button :label="1">线上/线下活动</el-radio-button>
             <el-radio-button :label="2">优惠活动</el-radio-button>
             <el-radio-button :label="3">积分活动</el-radio-button>
           </el-radio-group>
         </el-form-item>
       </div>
         <el-form-item label="资源id">
           <el-input v-model="extension.usedForId"></el-input>
         </el-form-item>
          <el-form v-model="searchUser" ref="searchUser" label-width="150px">
            <el-form-item label="选择用户创建时间">
              <el-row type="flex" :gutter="20">
                  <el-date-picker format="yyyy-MM-dd HH:mm:ss" v-model="searchUser.beforeTime" type="datetime" placeholder="...之后" style="width: 100%;"></el-date-picker>
                  <span>至</span>
                  <el-date-picker v-model="searchUser.afterTime" type="datetime" placeholder="...之前" style="width: 100%;"></el-date-picker>


              </el-row>
              <el-button type="primary" size="medium" @click="search()" plain>查询</el-button>
            </el-form-item>

            <div>
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
            </div>
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
                    userForId: 'baidu',
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
                                [u.userName, u.to] = [l.user_nickname, l.user_email];
                            } else if(this.extension.mode == 1){ //短信  to:手机号
                                [u.userName, u.to] = [l.user_nickname, l.user_phone];
                            } else if(this.extension.mode == 2){ //站内信  to：用户id
                                [u.userName, u.to] = [l.user_nickname, l.user_id];
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
                        this.extension.url = "http://localhost:12300/#/coupon/receive?id=" + this.extension.usedForId;
                    } else if(this.extension.usedFor == 'true'&& this.extension.activityType == 1){
                        this.extension.url = "http://localhost:12300/#/interactiveactivity/info?id=" + this.extension.usedForId;
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
            }
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
