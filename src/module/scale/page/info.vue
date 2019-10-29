<template>
  <div>
    <el-button type="primary" @click="go_back">返回列表</el-button>
    <h1 align="center">量表详细信息</h1>
    <dev>
      <el-card class="box-outCard" v-loading="loading">
        <!--        <el-card class="box-card">
                  量表id： <span v-text="scaleDesc.id"></span>
                </el-card>-->
        <el-card class="box-card">
          量表图片： <img src="https://www.agri35.com/UploadFiles/img_0_3350240698_1000634026_26.jpg"
                     class="image">
          <!--          量表图片： <span v-text="scaleDesc.images"></span>-->
        </el-card>
        <el-card class="box-card">
          量表名称：<span class="color" style="margin-right: 220px" v-text="scaleDesc.scaleName"></span>
          量表缩写： <span class="color" v-text="scaleDesc.shortName"></span>
        </el-card>
        <el-card class="box-card">
          量表状态： <span class="color" style="margin-right: 120px" v-text="scaleDesc.statusName"></span>
          量表分类： <span class="color" style="margin-right: 120px" v-text="scaleDesc.type"></span>
          量表类型： <span class="color" style="margin-right: 120px" v-text="scaleDesc.scaleTypeName"></span>
          量表价格： ￥<span class="color" v-text="scaleDesc.price"></span>
        </el-card>
        <el-card class="box-card">
          话题描述： <span class="color" v-text="scaleDesc.topicDescription"></span>
        </el-card>
        <el-card class="box-card">
          话题背景： <span class="color" v-text="scaleDesc.topicBackground"></span>
        </el-card>
        <el-card class="box-card">
          话题建议： <span class="color" v-text="scaleDesc.topicSuggest"></span>
        </el-card>
        <el-card class="box-card">
          量表功能： <span class="color" v-text="scaleDesc.scaleFunction"></span>
        </el-card>
        <el-card class="box-card">
          测评指导： <span class="color" v-text="scaleDesc.guide"></span>
        </el-card>
        <el-card class="box-card">
          创建时间： <span class="color" style="margin-right: 220px" v-text="scaleDesc.createTime"></span>
          创建人姓名： <span class="color" v-text="scaleDesc.createUserId"></span>
        </el-card>
        <el-card class="box-card">
          更新时间： <span class="color" style="margin-right: 220px" v-text="scaleDesc.updateTime"></span>
          更新人姓名： <span class="color" v-text="scaleDesc.updateUserId"></span>
        </el-card>
        <el-card class="box-card">
          量表备注： <span class="color" v-text="scaleDesc.remark"></span>
        </el-card>
      </el-card>
    </dev>
  </div>
</template>

<script>
    import * as scaleApi from '../api/scaleApi'

    export default {
        name: 'editInfo',
        data() {
            return {
                scaleId: '',
                scaleDesc: {},
                loading: true
            }
        },
        methods: {
            queryDesc: function () {
                scaleApi.scale_desc(this.scaleId).then((res) => {
                    this.scaleDesc = res.scaleDetail;
                    this.loading = false;
                })
            },
            go_back() {
                this.$router.push({
                    path: '/scale/page/list'
                });
            },
        },
        created() {
            //取出路由中的参数,赋值给数据对象
            this.scaleId = this.$route.query.scaleId;
            this.queryDesc();
        }
    }
</script>
<style scoped>
  .box-outCard {
    width: 1243px;
  }

  .box-card {
    width: 1200px;
  }

  .color {
    color: #4059ad;
  }

  .image {
    width: 12%;
    display: inline;
  }
</style>
