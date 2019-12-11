<template>
  <div>
    <p>这是一个测试页面！！！！！！！！！！</p>
    <el-input
      placeholder="请输入内容"
      v-model="warningId"
      clearable>
    </el-input>
    <el-row>
      <el-button  @click="test()" type="primary">
        发送预警消息
      </el-button>
    </el-row>
    <el-form label-width="90px">
      <el-form-item   label="量表名称：">
        <span>{{this.message}}</span>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
    import echarts from 'echarts'
    import * as warnApi from '../api/warn.js'

    export default {
        name: 'analyze',
        data() {
            return {
                  warningId:'',
                  message:[]
            }
        },
        methods: {
        test:function () {
            let id=this.warningId;
            let ws=new WebSocket("ws://localhost:40200/websocket/"+id)
            ws.onopen = function() {
                // Web Socket 已连接上，使用 send() 方法发送数据
                ws.send("测试客户端发送");
                console.log('调用第一个方法onopen');
            };
            ws.onmessage = function (e) {
                console.log('前端接收到的消息为', e.data);
                this.message=e.data;
                if(this.message==null)
                    alert("为空")
                else
                    alert("不为空")
            };
            ws.onclose = function() {
                console.log('关闭连接');
            };
            ws.onerror=function () {
                console.log("发生错误事件")
            }
        }
        },
        mounted() {
        },
    }
</script>
<style scoped>
  .el-row {
    margin-bottom: 20px;
    margin-left: 20px;
    text-align: center;
  }
  .divRight{
    margin-top: 15px;
    padding: 10px 10px 0 10px;
    float:left;
    width:700px;
    height:600px;
   /* background-color: #6d6d72;*/
  }
/*  .rightOne{
    background-color: #2ac845;
    width: 700px;
    height: 300px;
  }
  .rightTwo{
    background-color: #8a6de9;
    width: 700px;
    height: 300px;
  }*/

  .divleft{
    margin-top: 15px;
    padding: 10px 10px 0 10px;
    float:left;
    width:700px;
    height:600px;
  }
</style>
