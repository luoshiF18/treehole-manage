<template>
    <div>
      <el-button type="primary" size="medium" @click="addCouponType()" plain>添加优惠类型</el-button>
      <el-card class="main_container">
        <!--<ul class="infinite-list" :data="types">
          <li v-for="(type, index) in types" :key="type.id"  @click="toSeeDetail(activity.id)">
            {{type.usedType}}
          </li>
        </ul>-->
        <el-collapse v-model="types">

            <el-collapse-item  v-for="(type, index) in types" :key="index" :title="type.usedType">
              <span>
                <div :data="type">
                <span>规则:</span>
               <!-- <el-divider></el-divider>-->
                <div>
                  {{type.rule}}
                </div>

              </div>
              </span>
              <span>

                <el-button @click="del(type.id)" type="text" size="medium" class="del">删除</el-button>
                <el-button @click="updateCouponType(type.id)" type="text" size="medium">修改</el-button>

              </span>

            </el-collapse-item>

        </el-collapse>
      </el-card>
      <el-card v-if="show" >
        <el-form  :model="typeToDo" ref="typeForm">
            <el-form-item label="类型名称">
              <el-input v-model="typeToDo.usedType"></el-input>
            </el-form-item>
            <el-form-item label="是否可叠加">
              <el-radio-group v-model="typeToDo.superposition">
                <el-radio-button label="true">可</el-radio-button>
                <el-radio-button label="false">不可</el-radio-button>
              </el-radio-group>
            </el-form-item>
          <el-form-item label="是否能同时使用">
            <el-radio-group v-model="typeToDo.simultaneousUse">
              <el-radio-button label="true">可</el-radio-button>
              <el-radio-button label="false">不可</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="规则">
            <el-input v-model="typeToDo.rule"></el-input>
          </el-form-item>
          <el-form-item style="float: right">
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button type="primary" @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
</template>

<script>
    import * as marketingApi from '../../../api/marketing'
    export default {
        name: "coupontype",
        data(){
            return {
                types: [],
                show: false,
                isEdit: false,
                typeToDo: {},
            }
        },

        methods:{
            getDataFromServer() {
                marketingApi.coupontype_all().then((res) => {
                    if(res.success){
                        this.types = res.queryResult.list;
                    }
                })
            },
            //删除
            del: function (id) {
                this.$confirm('确认删除吗?', '提示', {}).then(() => {
                    this.$confirm('再次确认，该操作不可撤销？', '提示', {}).then(() => {
                        marketingApi.coupontype_del(id).then((res) => {
                            if (res.success) {
                                this.$message.success("删除成功！")
                                this.getDataFromServer();
                            } else if(res.message){
                                this.$message.error(res.message);


                            }
                        });
                    });
                });
            },
            addCouponType(){
                this.show = true;
                this.isEdit = false;

            },
            updateCouponType(id){
                this.show = true;
                this.isEdit = true;
                this.getUsedTypeInfo(id);
            },
            getUsedTypeInfo(id){
               marketingApi.coupontype_info(id).then((res) => {
                   this.typeToDo = res;
               })
            },
            submit(){
                if (!this.isEdit) {
                    //确认提示
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        marketingApi.coupontype_add(this.typeToDo).then((res) => {
                            //    解析响应内容
                            if (res.success) {
                                this.show = false;
                                this.$message.success('提交成功！');
                                this.getDataFromServer();
                            } else {
                                this.$message.error(res.message);
                            }
                        });
                    });
                } else {
                    //确认提示
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        marketingApi.coupontype_update(this.typeToDo).then((res) => {
                            //    解析响应内容
                            if (res.success) {
                                this.show = false;
                                this.$message.success('提交成功！');
                                this.getDataFromServer();
                            } else {
                                this.$message.error(res.message);
                            }
                        });
                    });
                }
            },
            cancel() {
                this.show = false;
            },
        },

        mounted() {
            this.getDataFromServer();
        }

    }
</script>

<style scoped>
  .del{
    color: #f5354c;
  }
</style>
