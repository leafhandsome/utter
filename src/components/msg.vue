<template>
  <div class="container utBorder" :class="$route.query.type=='white'?'ut-white1':'ut-black1'">
    <!-- 消息 -->
    <div class="msg" v-show='checkTab==1&&!showfirend'>
      <div class="header utBorder" @click="showfirend=true">
        <a href="javaScript:;">
        <img v-show="$route.query.type=='white'" src="../assets/images/editor/backb.png" alt="">
        <img v-show="$route.query.type=='black'" src="../assets/images/editor/backw.png" alt="">
        </a>
      </div>
      <div class="msglist">
        <ul>
          <li v-for="(item, index) in msgDetail" :key="index">
            <p class="title"><span class="user-name">{{item.sendPenName}}</span><span class="time">{{item.createTime}}</span></p>
            <p>{{item.message}}</p>
          </li>
        </ul>
       
        
      </div>
       <div class="sendmsg utBorder" :class="$route.query.type=='white'?'ut-input-white':'ut-input-black'">
          <input type="text" placeholder="请输入您的消息" v-model="msg">
          <a href="javaScript:;" @click="sendMsg">
          <img v-show="stylecolor=='white'" src="../assets/images/article/submit.png" alt="">
          <img v-show="stylecolor=='black'" src="../assets/images/editor/issuew.png" alt="">
          </a>
        </div>
    </div>
    <!-- 消息列表 -->
      <div class="Info" v-show="showfirend">
        <ul>
            <a href="javaScript:;" @click.stop="friendMsgInfo(item.userId)" v-for="(item, index) in friendMsglist" :key="index">
          <li class="utBorder"><span class="imgbox">
              <img v-if="item.avatar" src="item.avatar" alt="">
              <img v-if="!item.avatar" src="../assets/images/utter/userw.png" alt="">
              </span>
          <span class="name">{{item.penName}}</span>
          <span class="fr msgcontent">{{item.message}}</span></li>
          </a>
        </ul>
    </div>
    <!-- 通知 -->
    <div class="Info" v-show="checkTab==2">
        <ul v-show="!showMsgDetail">
            
            <a href='javascript:;' v-for="(item, index) in msglist" :key="index">
          <li  class="utBorder" @click="getMsgDetail(item.id)">
            <span class="imgbox"><img v-show="!item.sendAvatar" src="../assets/images/utter/userw.png" alt="">
            <img v-show="item.sendAvatar" :src="item.sendAvatar" alt="">
            </span><span class="name">{{item.sendPenName}}</span>
            <a href="javascript:;" v-if="item.type==9" class="fr istrue" @click="setfriend(item.id)" > 
              <img v-show="stylecolor=='white'" src="../assets/images/article/submit.png" alt="">
          <img v-show="stylecolor=='black'" src="../assets/images/editor/issuew.png" alt="">
          </a>
          <span class="fr msgcontent firend">{{item.title}}</span>
          </li>
        </a>
        </ul>
        <!-- 通知详情 -->
        <div v-show="showMsgDetail">
        <div class="header utBorder"  @click="showMsgDetail=false">
        <a href="javaScript:;">
        <img v-show="$route.query.type=='white'" src="../assets/images/editor/backb.png" alt="">
        <img v-show="$route.query.type=='black'" src="../assets/images/editor/backw.png" alt="">
        </a>
      </div>
      <div class="msglist">
        <ul>
          <li  >
            <p class="title"><span class="user-name">{{noticeDetail.sendPenName}}</span><span class="time">{{noticeDetail.createTime}}</span></p>
            <p>{{noticeDetail.msg}}</p>
            <a href="javascript:;" v-if="noticeDetail.type==9" class="fr target istrue" @click="setfriend(noticeDetail.id)" > 
                <img v-show="stylecolor=='white'" src="../assets/images/article/submit.png" alt="">
            <img v-show="stylecolor=='black'" src="../assets/images/editor/issuew.png" alt="">
            </a>
          </li>
        </ul>
       
        
      </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="footer utBorder">
        <div class="pull-left masgbox utBorder" @click="checkmsg(1)">
          <img v-show="showmsg" src="../assets/images/personal/150 消息-对话信息.png" alt="">
          <img  v-show="(!showmsg||checkTab==1)&&stylecolor=='white'" src="../assets/images/personal/158 消息-对话信息-黑.png" alt="">
          <img v-show="(!showmsg||checkTab==1)&&stylecolor=='black'" src="../assets/images/personal/166 消息-对话信息-白.png" alt="">
          <p :class="checkTab==1?'activecolor':''">消息</p>
           <i v-show="friendMsglist.length>0"></i>
        </div>
        <div class="pull-right userInfo" @click="checkinfo(2)">
            <img v-show="showinfo" src="../assets/images/personal/151 消息-打开喇叭.png" alt="">
            <img v-show="(!showinfo||checkTab==2)&&stylecolor=='white'" src="../assets/images/personal/159 消息-打开喇叭-黑.png" alt="">
            <img  v-show="(!showinfo||checkTab==2)&&stylecolor=='black'"  src="../assets/images/personal/167 消息-打开喇叭-白.png" alt="">
            <p :class="checkTab==2?'activecolor':''">通知</p>
            <i v-show="msglist.length>0"></i>
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
                showinfo: true,
                showfirend: true,
                msglist: [],
                friendMsglist: [],
                msgDetail: [],
                showMsgDetail: false, //通知详情显示
                noticeDetail: {},
                msg: '',
                sendUserId: '',
            };
        },
        created() {
            this.stylecolor = this.$route.query.type;
            // this.getmsg();
            // this.get
        },
        mounted() {
            this.getfriendMsg();
            this.getmsg();
        },
        methods: {
            //发送消息
            sendMsg() {
                this.unitAjax('post', 'v1/me/alert/message/send', {
                    userId: Number(this.sendUserId),
                    msg: this.msg
                }, res => {
                    if (res.code == 200) {
                        this.getfriendMsg();
                        this.msg = "";
                        this.$message('消息发送成功')
                    }
                })
            },
            getMsgDetail(id) {
                this.showMsgDetail = true
                this.unitAjax('get', 'v1/me/alert/notice/detail', {
                    id: Number(id),
                    userId: this.getValue('userId')
                }, res => {
                    if (res.code == 200) {
                        this.noticeDetail = res.data
                    }
                })
            },
            //同意好友
            setfriend(id) {
                this.$confirm("是否同意成为好友?", "提示", {
                        confirmButtonText: "同意",
                        cancelButtonText: "拒绝",
                        type: "warning"
                    })
                    .then(() => {
                        this.unitAjax(
                            "post",
                            "v1/user/friend/confirmFriend", {
                                id: Number(id),
                                confirm: true
                            },
                            res => {
                                if (res.code == 200) {
                                    //   this.$message('添加成功')

                                }
                            }
                        );
                    })
                    .catch(() => {
                        this.unitAjax(
                            "post",
                            "v1/user/friend/confirmFriend", {
                                id: Number(id),
                                confirm: false
                            },
                            res => {
                                if (res.code == 200) {}
                            }
                        );
                        //   this.$message({
                        //     type: "info",
                        //     message: "已ju"
                        //   });
                    });
            },
            // 消息对话
            friendMsgInfo(id) {
                this.showfirend = false;
                this.sendUserId = id;
                this.unitAjax(
                    "get",
                    "v1/me/alert/message/detail", {
                        userId: id,
                        page: 1,
                        pageSize: 10
                    },
                    res => {
                        if (res.code == 200) {
                            this.msgDetail = res.data.rows;
                        }
                    }
                );
            },
            getfriendMsg() {
                this.unitAjax(
                    "get",
                    "v1/me/alert/messages", {
                        page: 1,
                        pageSize: 20,
                        userId: this.getValue('userId')
                    },
                    res => {
                        if (res.code == 200) {
                            this.friendMsglist = res.data.rows;
                        }
                    }
                );
            },
            // 获取通知
            getmsg() {
                this.unitAjax(
                    "get",
                    "v1/me/alert/notices", {
                        page: 1,
                        pageSize: 20,
                        userId: this.getValue('userId')
                    },
                    res => {
                        if (res.code == 200) {
                            this.msglist = res.data.rows;
                        }
                    }
                );
            },
            //消息切换
            checkmsg(value) {
                this.checkTab = value;
                this.showmsg = false;
                this.showinfo = true;
                this.showfirend = true;
                this.getfriendMsg();
            },
            checkinfo(value) {
                this.checkTab = value;
                this.showmsg = true;
                this.showinfo = false;
                this.showfirend = false;
                this.getmsg();
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
        opacity: 0.9;
        .activecolor {
            font-weight: 700;
        }
        .msg {
            height: 100%;
        }
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
                    .time {
                        margin-left: 15px;
                    }
                }
                 :nth-child(2) {
                    word-wrap: break-word;
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
        .Info {
            height: 900px;
            overflow-y: auto;
            li {
                // height: 80px;
                padding: 10px;
                border-bottom: 1px solid #dcdddd;
                position: relative;
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
                    display: inline-block;
                    width: 80px;
                    height: 30px;
                    line-height: 30px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    vertical-align: middle;
                }
                .istrue {
                    line-height: 30px;
                    padding-left: 10px;
                }
                .target {
                    position: absolute;
                    top: 10px;
                    right: 0;
                }
                .msgcontent {
                    width: 150px;
                    height: 30px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    line-height: 30px;
                    color: #b3b3b3;
                }
                .firend {
                    width: 130px;
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
                position: relative;
                i {
                    position: absolute;
                    top: 10px;
                    right: 61px;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background-color: red;
                }
            }
        }
    }
</style>