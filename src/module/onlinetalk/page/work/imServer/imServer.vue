<!-- im服务端入口 -->
<template>
  <div class="imServer-wrapper">
    <main class="imServer-main">
      <im-record class="item im-record" @selectedChat="selectedChat()"></im-record>
      <im-chat v-if="storeSelectedChatEn!=null":serverChatEn1="serverChatEn"  :oprRoleName="server" ref="im_chat" class="item im-chat"></im-chat>

      <!--  <im-record class="item im-record1" @selectedChat="selectedChat()"></im-record>-->
    </main>
  </div>
</template>

<script >
  import imRecord from './imRecord.vue';
  import imChat from './imChat.vue';
  import utilApi from '../../../../../common/utils'
  export default {
    components: {
      imRecord: imRecord,
      imChat: imChat
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
          clientChatId: '789',
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
          { title: '今天周几', content: '今天周一' },
          { title: '今天周几', content: '今天周二' },
          { title: '今天周几', content: '今天周三' },
          { title: '今天周几', content: '今天周四' },
          { title: '今天周几', content: '今天周五' }
        ],
        faqSelected: '-1',
        inputContent_setTimeout: null, // 输入文字时在输入结束才修改具体内容
        selectionRange: null, // 输入框选中的区域
        shortcutMsgList: [], // 聊天区域的快捷回复列表
        logoutDialogVisible: false, // 结束会话显示
        transferDialogVisible: false, // 转接人工dialog
        rateDialogVisible: false, // 评价dialog
        leaveDialogVisible: false, // 留言dialog







      };
    },
    computed: {
      storeSelectedChatEn() {
        return this.$store.imServerStore.getters.selectedChatEn;
      }
    },
    watch: {},
    methods: {
      /**
       * 选中了会话
       */
      selectedChat: function() {}
    },
    mounted() {
      //alert("22222")
     // this.$store.serverChatEn.serverChatName = utilApi.getActiveUser().username;
      //this.$store.serverChatEn.serverChatId = utilApi.getActiveUser().userid;
      //this.$store.imServerStore.initServer;
      //alert("12345")
      this.$store.imServerStore.dispatch('SERVER_ON');

      //this.$store.imServerStore.dispatch('SERVER_ON');

    },
    created(){
      //this.$store.imServerStore.serverChatEn.serverChatName = utilApi.getActiveUser().username;
      //this.$store.imServerStore.serverChatEn.serverChatId = utilApi.getActiveUser().userid;
    },
    destroyed() {
      this.$store.imServerStore.dispatch('SERVER_OFF');
    }
  };
</script>

<style lang="less">
  @import '../../../../../common/css/base.less';

  .imServer-wrapper {
    #common-wrapper();
  }

  .imServer-wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
  .imServer-main {
    height: 100%;
    max-width: 100%;
    position: relative;
  & > .item {
      float: left;
      border-right: 1px solid #e6e6e6;
      height: 100%;
    }
  & > .im-record {
      width: 280px;
    }
  & > .im-reply {
      width: 560px;
      float: right;
    }
  & > .im-chat {
      width: calc(~'99% - 550px');
  }
  /*& > .im-chat {
      width: calc(~'99% - 280px');
    }*/
  }
  }
</style>
