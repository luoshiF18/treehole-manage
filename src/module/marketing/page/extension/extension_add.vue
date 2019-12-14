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
             <el-radio-button :label="1">短信</el-radio-button>
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
          <el-form :model="searchUser" label-width="150px">
            <el-form-item label="用户创建时间">
              <el-row type="flex" :gutter="20">
                <el-col :span="10">
                  <el-date-picker v-model="search.afterTime" type="datetime" placeholder="选择使用开始时间"
                                  style="width: 100%;">
                    <span slot="prefix">在</span><span slot="suffix">之前</span>
                  </el-date-picker>
                </el-col>
                <el-col :span="1" style="margin-right: 10px">至</el-col>
                <el-col :span="12">
                  <el-date-picker v-model="search.beforeTime" type="datetime" placeholder="选择使用结束时间"
                                  style="width: 100%;"></el-date-picker>
                </el-col>
              </el-row>
            </el-form-item>
            <el-button type="primary" size="medium" @click="search()" plain>查询</el-button>
            <div>
              <el-table :data="user"
                        class="table1" @selection-change="handleSelectionChange" height="250" ref="userTable">
                <el-table-column type="selection" align="center" width="60"></el-table-column>
                <el-table-column prop="userName" align="center" label="用户名" width="180"></el-table-column>
                <el-table-column prop="to" align="center" label="联系方式" width="150"></el-table-column>
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
    export default {
        name: "extension_info",
        data() {
            return {
                extension: {
                    mode: 0,
                    title: '',
                    content: '',
                    usedFor: 'false',
                    userForId: 'baidu',
                    url: "wwwbaiducom",
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
                user: [{
                    userName: '',
                    to: '',
                }],
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
            search(searchUser) {
                alert("查询出User")
                if(this.extension.mode == 0){
                    this.user = [{userName: 'wll',to:'2031866592@qq.com'},
                        {userName: 'wwll',to:'1261361118@qq.com'}];
                } else {
                    this.user = [{userName: 'wll',to:'13721638838'},
                        {userName: 'wwll',to:'15236268769'}];
                }

               //this.extension.info = [{userName: 'wangnannan',to:'857202982@qq.com'},{userName: 'wwll',to:'1261361118@qq.com'}];
               //marketingApi.searchUserInfo(searchUser).then((res) => {
               //   this.user = res
               //});
            },
            submit() {
                this.$confirm('确认提交吗？', '提示', {}).then(() => {
                    marketingApi.extension_add(this.extension).then((res) => {
                        //    解析响应内容
                        if (res.success) {
                            this.$message.success('提交成功！');
                            //进行下一步，添加问题和选项
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
                const values = this.extension.values;
                let lists = [];
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    lists = lists.concat(this.multipleSelection[i]);

                }
                this.extension.values = values.concat(lists);
            },

        },
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
