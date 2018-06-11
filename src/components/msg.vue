<template>
  <div class="container" :class="$route.query.type=='white'?'ut-white1':'ut-black1'">
    <!-- 消息 -->
    <div class="msg" v-show='checkTab==1'>
      <div class="header">
        <img v-show="$route.query.type=='white'" src="../assets/images/editor/backb.png" alt="">
        <img v-show="$route.query.type=='black'" src="../assets/images/editor/backw.png" alt="">
      </div>
      <div class="msglist">
        <ul>
          <li>
            <p class="title"><span class="user-name">会飞的鱼</span><span class="time">13:26</span></p>
            <p>hi,书的封面怎么样了</p>
          </li>
           <li>
            <p class="title"><span class="user-name">会飞的鱼-me</span><span class="time">13:26</span></p>
            <p>hi,书的封面怎么样了</p>
          </li>
        </ul>
       
        
      </div>
       <div class="sendmsg">
          <input type="text" placeholder="请输入您的消息">
          <a href="javaScript:;">
          <img v-show="stylecolor=='white'" src="../assets/images/article/submit.png" alt="">
          <img v-show="stylecolor=='black'" src="../assets/images/editor/issuew.png" alt="">
          </a>
        </div>
    </div>
    <!-- 通知 -->
    <div class="Info" v-show="checkTab==2">
        <ul>
          <li><span class="imgbox"><img src="../assets/images/utter/userw.png" alt=""></span><span class="name">天空</span><span class="fr msgcontent">评论了您的消息</span></li>
          <li>
            <span class="imgbox"><img src="../assets/images/utter/userw.png" alt=""></span><span class="name">咖啡</span>
            <a href="javascript:;" class="fr istrue"> 
              <img v-show="stylecolor=='white'" src="../assets/images/article/submit.png" alt="">
          <img v-show="stylecolor=='black'" src="../assets/images/editor/issuew.png" alt="">
          </a>
          <span class="fr msgcontent">申请成为您的好友</span>
          </li>
        </ul>
    </div>
    <!-- 底部 -->
    <div class="footer">
        <div class="pull-left masgbox" @click="checkmsg(1)">
          <img v-show="showmsg" src="../assets/images/personal/150 消息-对话信息.png" alt="">
          <img  v-show="(!showmsg||checkTab==1)&&stylecolor=='white'" src="../assets/images/personal/158 消息-对话信息-黑.png" alt="">
          <img v-show="(!showmsg||checkTab==1)&&stylecolor=='black'" src="../assets/images/personal/166 消息-对话信息-白.png" alt="">
          <p :class="checkTab==1?'activecolor':''">消息</p>
        </div>
        <div class="pull-right userInfo" @click="checkinfo(2)">
            <img v-show="showinfo" src="../assets/images/personal/151 消息-打开喇叭.png" alt="">
            <img v-show="(!showinfo||checkTab==2)&&stylecolor=='white'" src="../assets/images/personal/159 消息-打开喇叭-黑.png" alt="">
            <img  v-show="(!showinfo||checkTab==2)&&stylecolor=='black'"  src="../assets/images/personal/167 消息-打开喇叭-白.png" alt="">
            <p :class="checkTab==2?'activecolor':''">通知</p>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      stylecolor: "white",
      checkTab: 1,
      showmsg: false,
      showinfo: true
    };
  },
  created() {
    this.stylecolor = this.$route.query.type;
  },
  methods: {
    //消息切换
    checkmsg(value) {
      this.checkTab = value;
      this.showmsg = false;
      this.showinfo = true;
    },
    checkinfo(value) {
      this.checkTab = value;
      this.showmsg = true;
      this.showinfo = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 320px;
  height: 100%;
  border: 1px solid #dcdddd;
  font-size: 14px;
  position: relative;
  .activecolor {
    font-weight: 700;
  }
  .msg {
    height: 100%;
    .header {
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-bottom: 1px solid #dcdddd;
      img {
        vertical-align: middle;
      }
    }
    .msglist {
      padding: 0 10px;
      li {
        margin: 20px 0;
        line-height: 25px;
        .title {
          color: #a0a0a0;
        }
      }
    }
    .sendmsg {
      width: 100%;
      height: 50px;
      position: absolute;
      bottom: 65px;
      left: 0;
      border-top: 1px solid #dcdddd;
      input {
        width: 80%;
        height: 100%;
        padding-left: 5px;
      }
      img {
        vertical-align: middle;
      }
    }
  }
  .Info {
    li {
      // height: 80px;
      padding: 10px;
      border-bottom: 1px solid #dcdddd;
      .imgbox {
        display: inline-block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        background-color: #ccc;
        text-align: center;
        vertical-align: middle;
      }
      .name {
        margin-left: 10px;
        font-weight: 700;
      }
      .istrue{
        line-height: 30px;
        padding-left: 10px;
      }
      .msgcontent {
        line-height: 30px;
        color: #b3b3b3;
      }
    }
  }
  .footer {
    width: 100%;
    height: 65px;
    position: absolute;
    right: 0;
    bottom: 0;
    border-top: 1px solid #dcdddd;
    .masgbox {
      border-right: 1px solid #dcdddd;
    }
    .masgbox,
    .userInfo {
      width: 50%;
      height: 100%;
      text-align: center;
      padding-top: 15px;
      cursor: pointer;
    }
  }
}
</style>