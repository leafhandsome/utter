<template lang="html">
    <div class="userinfo" :class="$route.query.type=='white'?'ut-input-white':'ut-input-white'">
          <!-- 私信   -->
          <div class="msg" v-show='showmsg'>
              <div class="mainItem">
        <textarea name="name" rows="8" cols="80" placeholder='写下你的私信...' v-model="msg"></textarea>

        <el-tooltip effect="dark" content="发送" placement="bottom">
          <img src="../../assets/images/article/submit.png" class='submit' alt="发送" @click="sendMsg(user.userId)">
        </el-tooltip>
        <el-tooltip effect="dark" content="删除" placement="bottom">
            <a class='del' href="javaScript:;">
            <img src="../../assets/images/userinfo/del-msg.png"  alt="删除" @click="showmsg=false">
            </a>
          </el-tooltip>
        </div>
          </div>
        <div class="user">

            <div class="user__photo">
                    <el-upload
                    class="avatar-uploader"
                    action="v1/upload/uploadFile"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
            </div>
            <div class="user__msg" :class="$route.query.type=='white'?'ut-input-white':'ut-input-black'">
                <div class="msg__btn">
                    <div class="btn__line1" v-show="$route.query.userId">
                        <div class="btn__visited">
                            <a href='javascript:;' v-if="!showsee"  @click="addFollow(1)">
                            <img  src="../../assets/images/userinfo/108 浏览.png" alt="">
                            </a>
                            <a href='javascript:;' v-else>
                            <img v-show="$route.query.type=='black'" src="../../assets/images/article/seeover-w.png" alt="" @click="removeFollow(1)">
                            <img v-show="$route.query.type=='white'" src="../../assets/images/article/seeover-b.png" alt="" @click="removeFollow(1)">
                            </a>
                        </div>
                        <div class="btn__message">
                            <a href='javaScript:;'>
                            <img v-show="!showmsg" src="../../assets/images/userinfo/139 用户-私信.png" alt=""  @click="showmsg=true">
                            <img v-show="showmsg&&$route.query.type=='white'" src="../../assets/images/userinfo/142 用户-私信-黑.png" alt=""  @click="showmsg=true">
                            <img v-show="showmsg&&$route.query.type=='black'" src="../../assets/images/userinfo/145 用户-私信-白.png" alt=""  @click="showmsg=true">
                            </a>
                        </div>
                        <div class="btn__add">
                             <a href='javaScript:;' @click="addfriend(1)">
                            <img src="../../assets/images/userinfo/140 用户-加好友.png" alt="">
                            </a>
                        </div>
                    </div>

                    <div class="btn__edit"  v-show="!$route.query.userId">
                        <img v-show="showidea" src="../../assets/images/editor/88 编辑.png" alt="" @click='showidea=false'>
                        <img class="img" v-show='!showidea' src="../../assets/images/userinfo/112 提交.png" alt=""  @click='setusermsg'>
                        
                    </div>
                </div>
                <div :class='showidea?"usermsg":"bordermsg"' ref="usermsg">
                <div class="msg__name"> <input class="msg__name" type="text" v-model="user.penName" placeholder='请输入笔名' :readonly='showidea'></div>
                <div class="msg__occupation" v-show="!showidea"> <input class="msg__adress"  type="text" v-model="user.area" placeholder='地点' :readonly='showidea'>
               
                   <input class="msg__adress" type="text" v-model="user.job" placeholder='职业' :readonly='showidea'></div>
                   <div class="msg__occupation" v-show="showidea">
                       <span>{{user.area||"地点"}}</span>
                        <i class='adress1'></i> 
                        <span>{{user.job||'职业'}}</span>
                   </div>
                <div class="msg__identifier"></div>
                <div class="msg__publish">  <input class="" type="text" v-model="user.userSiteName" placeholder='个性签名' :readonly='showidea'></div>
                </div>
            </div>
            <div class="user__correlation">
                <div class="correlation__item utBorder">
                    <strong>{{user.hotCount}}</strong>
                    <span>人气</span>
                </div>
                <div class="correlation__item utBorder">
                    <strong>{{user.friendCount}}</strong>
                    <span>好友</span>
                </div>
                <div class="correlation__item utBorder">
                    <strong>{{user.followCount}}</strong>
                    <span>关注</span>
                </div>
                <div class="correlation__item utBorder">
                    <strong>{{user.readerCount}}</strong>
                    <span>读者</span>
                </div>
            </div>
        </div>
      
        <div class="clearfix"></div>
        <div class="addup">
            <div class="addup__record">
                <div class="record__item utBorder record__writing" :class="recordIndex==0?($route.query.type=='white'?'record__item--active':'record__item--active-w'):''" @click="gethostory(0)">创作记录</div>
                <div class="record__item utBorder record__visited" :class="recordIndex==1?($route.query.type=='white'?'record__item--active':'record__item--active-w'):''" @click="gethostory(1)">访问记录</div>
                <div class="record__item utBorder record__read" :class="recordIndex==2?($route.query.type=='white'?'record__item--active':'record__item--active-w'):''" @click="gethostory(2)">阅读记录</div>
            </div>
            <div class="addup__total utBorder">
                <div class="total__time">
                    {{userInfo.startTime}}
                    <br>
                    <span :class="$route.query.type=='white'?'pagecolr-black':'pagecolr-white'"></span>
                    {{userInfo.endTime}}
                </div>
                <div class="total__list">
                    <div class="total__item utBorder fr">
                        <span>文章</span>
                        <span></span>
                        <strong>{{userInfo.articleCount}}</strong>
                    </div>
                    <div class="total__item utBorder fr">
                        <span>想法</span>
                        <span></span>
                        <strong>{{userInfo.ideaCount}}</strong>
                    </div>
                    <div class="total__item utBorder fr">
                        <span>书籍</span>
                        <span></span>
                        <strong>{{userInfo.bookCount}}</strong>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                recordIndex: 0,
                showmsg: false,
                showidea: true,
                user: {
                    area: "地点",
                    penName: "笔名",
                    userSiteName: "个性签名",
                    job: '职业',
                },
                imageUrl: '',
                showsee: true, //是否关注
                userInfo: {},
                msg: '',
            };
        },
        created() {
            this.getuserInfo()
        },
        methods: {
            //发送消息
            sendMsg(userId) {
                this.unitAjax('post', 'v1/me/alert/message/send', {
                    userId: Number(userId),
                    msg: this.msg
                }, res => {
                    if (res.code == 200) {
                        this.showmsg = false;
                        this.msg = "";
                        this.$message('消息发送成功')
                    }
                })
            },
            // 取消关注
            removeFollow(id) {
                this.unitAjax('delete', 'v1/me/deleteFollow', {
                    userId: Number(id)
                }, res => {
                    if (res.code == 200) {
                        this.showsee = true
                    }
                })
            },
            // 添加关注
            addFollow(id) {

                this.unitAjax('post', 'v1/me/addFollow', {
                    userId: Number(id)
                }, res => {
                    if (res.code == 200) {
                        this.showsee = false;
                    } else {
                        this.$message(res.msg)
                    }
                })
            },
            // 添加好友
            addfriend(userid) {
                this.unitAjax('post', 'v1/user/friend/add', {
                    userId: Number(userid)
                }, res => {
                    if (res.code == 200) {
                        this.$message('申请成功')
                    }
                })
            },
            // 用户信息
            getuserInfo() {
                this.unitAjax('get', 'v1/user/info', {
                    userId: this.$route.query.userId || this.getValue('userId')
                }, res => {
                    if (res.code == 200) {
                        this.user = res.data;
                        this.userInfo = res.data.writtenRecord;
                        this.showsee = res.data.follow;
                    }
                })
            },
            //上传头像
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                console.log(file)
            },
            beforeAvatarUpload(file) {

                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG/png 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            gethostory(value) {
                this.recordIndex = value
                if (value == 0) {
                    this.userInfo = this.user.writtenRecord
                } else if (value == 1) {
                    this.userInfo = this.user.visitRecord
                } else if (value == 2) {
                    this.userInfo = this.user.readRecord
                }
            },
            //保存用户信息
            setusermsg() {
                if (this.user.userSiteName && this.user.penName && this.user.job && this.user.area) {
                    let params = {
                        personalitySignature: this.user.userSiteName, //string	是	站名		
                        penName: this.user.penName, //	string	是	笔名		
                        job: this.user.job, //	string	是	职业		
                        area: this.user.area, //	string	是	区域  
                    }
                    this.unitAjax('post', 'v1/me/userInfoSetting', params, res => {
                        if (res.code == 200) {
                            this.showidea = true;
                        } else {
                            this.$message(res.msg)
                        }
                    })
                } else {
                    if (this.user.penName == "") {
                        this.$message('笔名不能为空')
                    } else if (this.user.area == "") {
                        this.$message('职业不能为空')
                    } else if (this.user.area == "") {
                        this.$message('地名不能为空')
                    } else if (this.user.userSiteName == "") {
                        this.$message('个性签名不能为空')
                    }
                }


            },
            tourl(url, query) {
                tools.router.push({
                    path: url,
                    query: query
                });
            }
        },
        mounted() {
            var _this = this;
            this.$store.state.useType = "publish";
            this.$store.state.utstyle = "white";
            this.$store.state.showFooter = false;
        },
        components: {}
    };
</script>

<style scoped lang='scss'>
    @import "../../assets/scss/tool.scss";
    .userinfo {
        width: 1264px;
        margin: 0 auto;
        padding-top: 208px;
        position: relative;
        height: 100%;
        .msg {
            position: absolute;
            // top: 0;
            left: 300px;
            z-index: 50;
            width: 650px;
            height: 200px;
            background: white;
            border: 1px solid #e6e6e6;
            padding: 10px 20px;
            .mainItem {
                position: relative;
                textarea {
                    margin-top: 30px;
                    border: none;
                    resize: none;
                    outline: none;
                }
                .submit {
                    position: absolute;
                    bottom: 20px;
                    right: 0;
                    @include hand;
                }
                .del {
                    position: absolute;
                    top: 0;
                    right: 0;
                }
            }
        }
    }
    
    .user {
        padding-bottom: 74px;
        position: relative;
    }
    
    .user__photo {
        width: 240px;
        height: 240px;
        background: #eee;
        float: left;
        .avatar {
            width: 240px;
            height: 240px;
        }
    }
    
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 240px;
        height: 240px;
        line-height: 240px;
        text-align: center;
    }
    
    .user__msg {
        float: left;
        margin-left: 72px;
        width: 880px;
        position: relative;
        .msg__btn {
            position: absolute;
            top: 0;
            right: 0;
            .btn__visited,
            .btn__message,
            .btn__add {
                float: left;
                margin-left: 40px;
            }
            .btn__edit {
                // padding-top: 40px;
                float: right;
                img {
                    cursor: pointer;
                }
                .img {
                    width: 24px;
                    // height: 16px;
                }
            }
        }
        .usermsg {
            input {
                border: none;
                padding-left: 0;
            }
            .adress1 {
                position: relative;
                height: 100%;
                &::after {
                    content: "";
                    height: 15px;
                    position: absolute;
                    top: 3px;
                    right: 5px;
                    border-right: 2px solid #ccc;
                }
            }
            .msg__adress {
                width: 40px;
                color: #A7A7A7;
            }
        }
        input {
            padding: 5px;
        }
        .msg__adress {
            width: 100px;
        }
        .msg__name {
            font-size: 24px;
        }
        .msg__occupation {
            margin-top: 5px;
            color: #A7A7A7;
            span {
                margin-right: 10px;
            }
        }
        .msg__identifier {
            margin-top: 10px;
            color: #A7A7A7;
            height: 15px;
        }
        .msg__publish {
            margin-top: 20px;
            input {
                font-size: 15px;
                // font-weight: bold;
            }
        }
    }
    
    .user__correlation {
        float: left;
        margin-top: 50px;
        margin-left: 72px;
        .correlation__item {
            width: 220px;
            height: 54px;
            float: left;
            text-align: center;
            border-left: 1px solid #e6e6e6;
            color: #999;
            strong,
            span {
                display: block;
            }
            strong {
                font-weight: 400;
                font-size: 28px;
            }
            span {
                font-size: 14px;
                // padding-top: 6px;
            }
        }
        .correlation__item:last-child {
            border-right: 1px solid #e6e6e6;
        }
    }
    
    .addup {
        margin-top: 74px;
    }
    
    .addup__record {
        color: #999;
        font-weight: bold;
        text-align: center;
        float: left;
    }
    
    .record__item {
        width: 240px;
        height: 80px;
        line-height: 80px;
        border-top: 1px solid #e6e6e6;
        cursor: pointer;
    }
    
    .record__item:last-child {
        border-bottom: 1px solid #e6e6e6;
    }
    
    .record__item--active {
        color: #000;
    }
    
    .record__item--active-w {
        color: white;
    }
    
    .addup__total {
        width: 880px;
        border-top: 1px solid #e6e6e6;
        float: left;
        margin-left: 72px;
    }
    
    .total__time {
        width: 220px;
        float: left;
        text-align: center;
        margin-top: 78px;
        font-size: 20px;
        span {
            width: 35px;
            height: 1px;
            /* background: #000; */
            display: block;
            margin: 25px auto;
        }
    }
    
    .total__item {
        width: 660px;
        border-bottom: 1px solid #e6e6e6;
        span,
        strong {
            display: block;
            float: left;
            width: 220px;
            height: 80px;
            line-height: 80px;
            text-align: center;
            font-weight: bold;
        }
        strong {
            font-size: 28px;
            font-weight: normal;
        }
    }
</style>