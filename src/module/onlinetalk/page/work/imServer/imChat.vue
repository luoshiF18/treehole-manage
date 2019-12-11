<!-- 聊天记录 -->
<template>
    <div class="imChat-wrapper">
        <!-- 头部 -->
        <header class="imChat-header">
            <span class="name">{{storeSelectedChatEn.clientChatName}}</span>
            <span class="time">{{getAccessTimeStr(storeSelectedChatEn.accessTime)}}</span>
            <span v-show="storeSelectedChatEn.state=='on' " class="on-line">在线</span>
            <span v-show="storeSelectedChatEn.state=='off' " class="off-line ">离线</span>
          <i style="margin-right: 20px"></i>
          <router-link tag="spanbutton" :to="{path:'/reply/list'}">
            <el-button type="primary">常用回复查询</el-button>
          </router-link>
          <i style="margin-right: 1px"></i>
          <router-link tag="spanbutton" :to="{path:'/serv/add'}">
            <el-button type="primary">添加服务小结</el-button>
          </router-link>

        </header>
        <main class="imChat-main">
            <!-- 聊天框区域 -->
            <common-chat ref="common_chat" :serverChatEn1="serverChatEn" :clientChatEn1="clientChatEn" :chatInfoEn="storeSelectedChatEn" :oprRoleName="'server'" @sendMsg="sendMsg"></common-chat>
        </main>
    </div>
</template>

<script>
import commonChat from '@/module/onlinetalk/page/work/common/common_chat.vue';

export default {
    components: {
        commonChat: commonChat
    },
  data() {
    return {
      socket: null,
      chatInfoEn: {
        chatState: 'robot', // chat状态；robot 机器人、agent 客服
        inputContent: '', // 输入框内容
        msgList: [], // 消息列表
        state: 'on', // 连接状态;on ：在线；off：离线
        lastMsgShowTime: null // 最后一个消息的显示时间
      }, // 会话信息，包括聊天记录、状态
      clientChatEn: {
        clientChatId: '',
        clientChatName: '',
        avatarUrl: 'static/images/im_client_avatar.png'
      }, // 当前账号的信息
      serverChatEn: {
        serverChatName: '',
        avatarUrl: ''
      }, // 服务端chat信息
      robotEn: {
        robotName: '小旺',
        avatarUrl: 'static/images/im_robot_avatar.png'
      }, // 机器人信息
      faqList: [
        {title: '今天周几', content: '今天周一'},
        {title: '今天周几', content: '今天周二'},
        {title: '今天周几', content: '今天周三'},
        {title: '今天周几', content: '今天周四'},
        {title: '今天周几', content: '今天周五'}
      ],
      faqSelected: '-1',
      inputContent_setTimeout: null, // 输入文字时在输入结束才修改具体内容
      selectionRange: null, // 输入框选中的区域
      shortcutMsgList: [], // 聊天区域的快捷回复列表
      logoutDialogVisible: false, // 结束会话显示
      transferDialogVisible: false, // 转接人工dialog
      rateDialogVisible: false, // 评价dialog
      leaveDialogVisible: false, // 留言dialog


    }
  },
    computed: {
        storeSelectedChatEn() {
            return this.$store.imServerStore.getters.selectedChatEn;
        },
        storeHaveNewMsgDelegate() {
            return this.$store.imServerStore.getters.haveNewMsgDelegate;
        },
        storeServerChatEn() {
            return this.$store.imServerStore.getters.serverChatEn;
        }
    },
    watch: {
        storeSelectedChatEn(value) {
            this.$refs.common_chat.goEnd();
        },
        storeHaveNewMsgDelegate(value) {
            this.$refs.common_chat.goEnd();
        }
    },
    methods: {


        /**
         * 发送消息
         * @param {Object} rs 回调对象
         */



        sendMsg: function(rs) {
            var msg = rs.msg;

            msg.role = 'server';
            msg.avatarUrl = this.storeServerChatEn.avatarUrl;
            // 1.socket发送消息
            this.$store.imServerStore.dispatch('sendMsg', {
                clientChatId: this.storeSelectedChatEn.clientChatId,
                msg: msg

            });
           /* alert(this.storeSelectedChatEn.clientChatId)
          alert(msg)*/
            // 2.附加到此chat对象的msg集合里
            this.$store.imServerStore.dispatch('addChatMsg', {
                clientChatId: this.storeSelectedChatEn.clientChatId,
                msg: msg,
                successCallback: function() {
                    rs.successCallbcak && rs.successCallbcak();
                }
            });
        },

        goEnd: function() {
            this.$refs.common_chat.goEnd();
        },

        /**
         * 获取chat的访问时间
         * @param {Date} accessTime 问时间
         */
        getAccessTimeStr: function(accessTime) {
            return this.$ak.Utils.getDateTimeStr(accessTime, 'Y-m-d H:i:s');
        }
    },
    mounted() {}
};
</script>
<style lang="less">
.imChat-wrapper {
    .imChat-header {
        display: flex;
        align-items: center;
        width: 100%;
        height: 60px;
        padding-left: 100px;
        border-bottom: 2px solid #e6e6e6;
        font-size: 16px;
        span {
            margin-right: 15%;
        }
        spanbutton {
            margin-right: 5%;
        }
        .on-line {
            color: #70ed3a;
        }
        .off-line {
            color: #bbbbbb;
        }
    }
    .imChat-main {
        height: calc(~'100% - 150px');
    }
}
</style>

