<template lang="html">
  <div class="login"  v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">


    <div class="header clearfix">
        <router-link to="/index">
      <img class='logo' src="../assets/images/utter/logo.png" alt="UTTER">
    </router-link>   
      <div class="rightTools pull-right">
        <div class="item" @click='back'><img src="../assets/images/login/back.png" alt="返回"></div>
      </div>

    </div>

    <!-- <button style='margin-top:100px;' type="button" name="button" @click='changeType'>changeType</button> -->
    <!-- 登录 -->
    <div class="main" :class='{"active":type == 1}' @keydown="loginDown">
      <img class='logo' src="../assets/images/utter/logo.png" alt="UTTER">
      <div class="say">写下你的一生</div>
      <div class="message">
      <input type="text" placeholder='请输入电话号码…' maxlength="24" v-model="login.email"  @focus="loginFs">
      <p class="err" v-text="err.login">*错误提示</p>
        </div> 
      <div class="message">
      <input type="password" placeholder='输入密码…' maxlength="20" @focus="loginPwdFs" v-model="login.password">
      <a href='javascript:;' class="loginPass" @click="type=5">忘记密码</a>
      <p class="err" v-text="err.loginpwd">*错误提示</p>
      </div>
      <div class="btns clearfix">
        <el-tooltip effect="dark" content="注册" placement="bottom">
          <div @click='type=2' :class="type==2?'activeReg':''" class="reg pull-left"></div>
        </el-tooltip>

        <el-tooltip effect="dark" content="登录" placement="bottom">
          <div @click='getlogin' :class="type==1?'activelogin':''" class="loginicon pull-right"></div>
        </el-tooltip>

      </div>
    </div>

    <!-- 注册 -->
    <div class="main" :class='{"active":type == 2}' @keydown="regDown">
      <img class='logo' src="../assets/images/utter/logo.png" alt="UTTER">
      <div class="say">写下你的一生</div>
        <div class="mobile">
      <input type="text" placeholder='请输入常用电话号码…' maxlength="24" v-model="register.email"  @focus="regFs" @blur="$refs.msg1.style.top='0px'">
      <a href='javascript:;' class="msg" ref="msg1" >
      <span  @click="sendMsg" v-show="showkuaijie" class="getcode">发送验证</span>
      <span v-show="!showkuaijie" :class="{success:!showkuaijie}" class="getcode">{{countkuaijie}}s</span>
    </a>
    <p class="err" v-if="type == 2" v-text="err.regEmail">*错误提示</p>
    </div>
        <div class="message">
      <input type="text" placeholder='输入验证码' maxlength="6" @focus="regCodeFs" @blur="$refs.msg.style.top='0px'" v-model="register.msgCode">
         <a href='javascript:;' class="msg" ref="msg"  @click="nextmsg">验证</a>
         <p class="err" v-if="type == 2" v-text="err.msfCode">*错误提示</p>   
    </div>    
      <div class="btns clearfix">
        <el-tooltip effect="dark" content="注册" placement="bottom">
          <div @click='reg' :class="type==2?'activeReg':''" class="reg pull-left"></div>
        </el-tooltip>

        <el-tooltip effect="dark" content="登录" placement="bottom">
          <div  :class="type==1?'activelogin':''" class="loginicon pull-right" @click='type=1'></div>
        </el-tooltip>

      </div>
    </div>
    <!-- 设置密码 -->
      <div class="main2" :class='{"active":type == 3}' @keydown="setpwdDown">
        <div class="title">
            设置密码
        </div>
        <div class="message">
        <input type="password" placeholder='密码' maxlength="20" v-model="password.pwd" @focus="err.pwd=''">
        <p class="err" v-text="err.pwd">*错误提示</p>
        </div> 
        <div class="message">   
        <input type="password" placeholder='确认密码' maxlength="20" v-model="password.confirm"  @focus="err.confirm=''">
        <p class="err" v-text="err.confirm">*错误提示</p>
        </div>     
        <button @click='setpassword' type="button" name="button" class='create'>确&nbsp;&nbsp;定</button>
    </div>

  <!-- 设置新密码 -->
  <div class="main2" :class='{"active":type == 6}' @keydown="setnewspwdDown">
        <div class="title">
            设置新密码
        </div>
        <div class="message">
        <input type="password" placeholder='新密码' maxlength="20" v-model="password.newspwd" @focus="err.newspwd=''">
        <p class="err" v-text="err.newspwd">*错误提示</p>
        </div> 
        <div class="message">
        <input type="password" placeholder='确认密码' maxlength="20" v-model="password.newsconfirm"  @focus="err.newsconfirm=''">
        <p class="err" v-text="err.newsconfirm">*错误提示</p>
        </div>  
        <button @click='setnewsPwd' type="button" name="button" class='create'>确&nbsp;&nbsp;定</button>
    </div>

     <!-- 找回密码 -->
     <div class="main2 main" :class='{"active":type == 5}' @keydown="fondpwdDown">
            <div class="title">
                找回密码
            </div>
    
            <div class="mobile">
                    <input type="text" placeholder='输入注册电话号码…' maxlength="24" v-model="fond.email" @focus="fondpwdFs" @blur="$refs.msg2.style.top='0px'">
                    <a href='javascript:;' class="msg" ref="msg2">
                            <span  @click="sendMsgPass" v-show="showtime" class="getcode">发送验证</span>
                            <span v-show="!showtime" :class="{success:!showtime}" class="getcode">{{count}}s</span>
                    </a>
                    <p class="err" v-text="err.fondEmail">*错误提示</p>
            </div> 
            <div class="message">
                    <input type="text" placeholder='输入验证码' maxlength="8" v-model="fond.code" @focus="fondcodeFs">
                       <!-- <a href='javascript:;' class="msg" @click="nextmsg">验证</a>    -->
                    <p class="err" v-text="err.fondCode">*错误提示</p>  
                  </div> 
            <button @click='fondpassword' type="button" name="button" class='create'>下&nbsp;&nbsp;一&nbsp;&nbsp;步</button>
        </div>

    <div class="main2" :class='{"active":type == 4}' @keydown="setnameDown">
        <div class="title">
          以简驭繁，只为<b>深度创造</b>
        </div>
        <div class="message">
        <input type="text" placeholder='笔名' maxlength="12" v-model="username" @focus="err.penName=''">
          <p class="err" v-text="err.penName">*错误提示</p>  
        </div> 
        <div class="message">
        <input type="text" placeholder='站名' maxlength="15" v-model="nickname"  @focus="err.siteName=''">
          <p class="err" v-text="err.siteName">*错误提示</p>  
         </div> 
        <button @click='setname' type="button" name="button" class='create'>创&nbsp;&nbsp;建</button>
    </div>

  </div>
</template>
<script>
    const TIME_COUNT = 60;
    export default {

        data() {
            return {
                type: 1,
                showkuaijie: true,
                countkuaijie: '',
                count: '',
                showtime: true,
                register: {
                    email: '',
                    msgCode: '',
                },
                err: {
                    reg: '',
                    loginpwd: '',
                    login: '',
                    msfCode: '',
                    regEmail: '',
                    fondCode: '',
                    fondEmail: '',
                    newspwd: '',
                    newsconfirm: '',
                    siteName: '',
                    penName: '',
                    pwd: '',
                    confirm: '',
                },
                login: {
                    email: '',
                    password: '',
                },
                password: {
                    pwd: '',
                    confirm: '',
                    newsconfirm: "",
                    newspwd: '',
                },
                fond: {
                    email: '',
                    code: '',
                },
                nickname: '',
                username: '',
                loading: false,
            }
        },
        watch: {},
        created() {
            document.querySelector("body").style.background = 'white';
            // if (this.$route.query.penName) {
            if (this.$route.query.penName == false) {
                this.type = 4
            }
            // }

        },
        methods: {

            //设置笔名站名
            setname() {
                let parms = {
                    penName: this.username,
                    siteName: this.nickname
                }
                if (/[\u4e00-\u9fa5]/.test(this.username) && this.username.length > 6) {
                    this.err.penName = "中文笔名只能输入1-6个字符"
                } else {

                }
                if (this.username && this.nickname) {
                    this.unitAjax('post', 'v1/me/userNameSetting', parms, res => {
                        if (res.code == 200) {
                            this.setValue({
                                name: 'userName',
                                value: this.username
                            })
                            this.tourl("/createtemplate")
                        } else {
                            this.err.siteName = res.msg
                        }
                    })
                } else {
                    if (this.nickname == "") {
                        this.err.siteName = '站名不能为空'
                    }
                    if (!this.username) {
                        this.err.penName = "笔名不能为空"
                    }
                }

            },

            //设置新密码
            setnewsPwd() {
                let parms = {
                    mobile: this.fond.email,
                    code: this.fond.code,
                    confirmPassword: this.password.newsconfirm,
                    password: this.password.newspwd,
                }
                if (/^[a-zA-Z0-9]{6,20}$/.test(this.password.newspwd) && this.password.newsconfirm == this.password.newspwd) {
                    this.unitAjax('post', 'v1/user/resetPassword', parms, res => {
                        if (res.code == 200) {
                            this.type = 1;
                        } else {
                            this.err.newsconfirm = res.msg
                        }
                    })
                } else {
                    if (this.password.newsconfirm != this.password.newspwd) {
                        this.err.newsconfirm = '两次密码输入不一致'
                    } else if (!/^[a-zA-Z0-9]{6,20}$/.test(this.password.newspwd)) {
                        this.err.newsconfirm = '请输入6-20密码和数字'
                    }
                }

            },
            // 找回密码
            fondpassword() {
                let parms = {
                    mobile: this.fond.email,
                    code: this.fond.code
                }

                if (/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.fond.email) && this.fond.code) {
                    this.unitAjax('post', 'v1/verify/verifyCode', parms, res => {
                        if (res.code == 200) {
                            this.type = 6;
                        } else {
                            this.err.fondCode = res.msg
                        }
                    })
                } else {
                    if (this.fond.code == "") {
                        this.err.fondCode = '验证码不能为空'
                    } else if (!/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.fond.email)) {
                        this.err.fondEmail = "请输入正确的电话号码"
                    } else if (this.fond.email == '') {
                        this.err.fondEmail = "邮箱不能为空"
                    }
                }
            },
            // 找回密码发送验证码
            sendMsgPass() {
                let parms = {
                    mobile: this.fond.email
                }
                if (/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.fond.email)) {
                    this.unitAjax('post', 'v1/verify/registerSendCode', parms, res => {
                        if (res.code == 200) {
                            if (!this.timer) {
                                this.count = TIME_COUNT;
                                this.showtime = false;
                                this.timer = setInterval(() => {
                                    if (this.count > 0 && this.count <= TIME_COUNT) {
                                        this.count--;
                                    } else {
                                        this.showtime = true;
                                        clearInterval(this.timer);
                                        this.timer = null;
                                    }
                                }, 1000)
                            }
                        } else {
                            this.err.fondEmail = res.msg
                        }
                    })
                } else {
                    if (!/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.fond.email)) {
                        this.err.fondEmail = "请输入正确的电话号码"
                    } else if (this.fond.email == '') {
                        this.err.fondEmail = "邮箱不能为空"
                    }
                }


            },
            fondpwdFs() {
                this.$refs.msg2.style.top = '-3px';
                this.err.fondEmail = ''
            },
            fondcodeFs() {
                this.err.fondCode = ''
            },
            setpassword() {

                if (/^[a-zA-Z0-9]{6,20}$/.test(this.password.pwd) && this.password.confirm == this.password.pwd) {
                    let params = {
                        mobile: this.register.email,
                        password: this.password.pwd,
                        confirmPassword: this.password.confirm,
                        verifyCode: this.register.msgCode
                    }
                    this.unitAjax('post', "v1/user/register", params, res => {
                        if (res.code == 200) {
                            this.type = 4;
                        } else {
                            this.err.confirm = res.msg
                        }

                    })
                } else {
                    if (!/^[a-zA-Z0-9]{6,20}$/.test(this.password.pwd)) {
                        this.err.pwd = '请输入6-20位字母和数字'
                    } else if (this.password.confirm != this.password.pwd) {
                        this.err.confirm = '两次密码输入不一致'
                    }
                }
            },
            //注册验证
            nextmsg() {

                if (/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.register.email) && this.register.msgCode) {
                    this.unitAjax('post', "v1/verify/verifyCode", {
                        mobile: this.register.email,
                        code: this.register.msgCode
                    }, res => {

                        if (res.code == 200) {
                            this.type = 3;
                        } else {
                            this.err.msfCode = res.msg;
                        }
                    })
                } else {
                    if (this.register.msgCode == "") {
                        this.err.msfCode = '验证码不能为空'
                    } else if (!/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.register.email)) {
                        this.err.regEmail = "请输入正确的电话号码"
                    } else if (this.register.email == '') {
                        this.err.regEmail = "邮箱不能为空"
                    }
                }
            },
            //发送注册验证码
            sendMsg() {

                if (/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.register.email)) {
                    this.unitAjax("post", "v1/user/verifyUserExists", {
                        mobile: this.register.email
                    }, (res) => {
                        if (res.code == 404) {
                            this.sendemail()
                        } else {
                            if (res.code == 200) {
                                this.err.regEmail = res.data
                            } else {
                                this.err.regEmail = res.msg
                            }

                        }

                    })

                } else {
                    this.err.regEmail = '请输入正确的电话号码'
                }
            },
            //发到邮箱code
            sendemail() {

                this.unitAjax('post', "v1/verify/registerSendCode", {
                    mobile: this.register.email
                }, (res) => {
                    if (res.code == 200) {
                        if (!this.timerkuaijie) {
                            this.countkuaijie = TIME_COUNT;
                            this.showkuaijie = false;
                            this.timerkuaijie = setInterval(() => {
                                if (this.countkuaijie > 0 && this.countkuaijie <= TIME_COUNT) {
                                    this.countkuaijie--;
                                } else {
                                    this.showkuaijie = true;
                                    clearInterval(this.timerkuaijie);
                                    this.timerkuaijie = null;
                                }
                            }, 1000)
                        }
                    }

                })
            },
            reg() {
                this.type = 2;

            },
            //登录
            getlogin() {

                if (/^[a-zA-Z0-9]{6,21}$/.test(this.login.password) && /^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.login.email)) {
                    this.loading = true;
                    this.unitAjax('post', "v1/user/login", {
                        mobile: this.login.email,
                        password: this.login.password
                    }, res => {
                        this.loading = false;
                        if (res.code == 200) {
                            this.setValue({
                                name: 'userId',
                                value: res.data.uid
                            })
                            this.setValue({
                                name: 'userName',
                                value: res.data.penName
                            })
                            this.setValue({
                                name: 'avatar',
                                value: res.data.certifiedAuthor
                            })

                            this.$router.push({
                                path: '/whiterow/modey',
                                query: {
                                    type: 'white'
                                }
                            })
                        } else {
                            this.err.loginpwd = res.msg
                        }
                    })
                } else {
                    if (!(/^[a-zA-Z0-9]{6,21}$/.test(this.login.password))) {
                        this.err.loginpwd = '请输入6-20位字母和数字'
                    }
                    if (!/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.login.email)) {
                        this.err.login = '请输入正确的电话号码'
                    }

                }

            },
            loginDown(e) {
                if (e.keyCode == 13) {
                    this.getlogin()
                }
            },
            regDown(e) {
                if (e.keyCode == 13) {
                    this.nextmsg()
                }
            },
            setpwdDown(e) {
                if (e.keyCode == 13) {
                    this.setpassword()
                }
            },

            setnameDown(e) {
                if (e.keyCode == 13) {
                    this.setname()
                }
            },
            fondpwdDown(e) {
                if (e.keyCode == 13) {
                    this.fondpassword()
                }
            },
            setnewspwdDown(e) {
                if (e.keyCode == 13) {
                    this.setnewsPwd()
                }
            },
            regCodeFs() {
                this.$refs.msg.style.top = '-3px';
                this.err.msfCode = "";
            },
            regFs() {
                this.$refs.msg1.style.top = '-3px';
                this.err.regEmail = "";
            },
            loginFs() {
                this.err.login = ''
            },
            loginPwdFs() {
                this.err.loginpwd = ''
            },
            back() {
                if (this.type == 1) {
                    window.history.back()
                } else {
                    this.type = 1
                }
            },
            tourl(url) {
                tools.router.push({
                    path: url
                })
            }
        },
        mounted() {
            var _this = this;
            this.$store.commit('changeFooter', false)
            this.$store.commit('changeHeader', false)
        },
        components: {

        }
    }
</script>

<style scoped lang='scss'>
    @import "../assets/scss/tool.scss";
    .login {
        min-height: 100vh;
        .header {
            height: 58px;
            position: fixed;
            top: 0;
            left: 0;
            padding: 0 30px;
            width: 100vw;
            .logo {
                height: 26px;
                margin-top: 16px;
                cursor: pointer;
            }
            .rightTools {
                height: 58px;
                .item {
                    @include trans();
                    /* &:hover {
                    @include whover;
                } */
                    cursor: pointer;
                    height: 58px;
                    display: inline-block;
                    width: 58px;
                    text-align: center;
                    padding-top: 18px;
                }
            }
        }
        .err {
            position: absolute;
            top: 0;
            right: -250px;
            height: 60px;
            line-height: 60px;
            color: red;
            width: 200px;
        }
        .message {
            position: relative;
        }
        .main {
            position: fixed;
            top: -5%;
            left: -700px;
            bottom: 0;
            right: 0;
            margin: auto;
            width: 312px;
            height: 374px;
            opacity: 0;
            transition: all 1s ease-out;
            .mobile {
                position: relative;
            }
            .msg {
                position: absolute;
                top: 0;
                right: -18px;
                height: 60px;
                line-height: 60px;
                width: 90px;
                text-align: center;
                border-left: 1px solid #000000;
                @include trans;
            }
            .loginPass {
                position: absolute;
                top: 0;
                right: 0;
                height: 60px;
                line-height: 60px;
                color: #CBCBCB;
                text-decoration: underline;
            }
            &.active {
                // left:0;
                transform: translate3d(350px, 0, 0);
                opacity: 1;
            }
            .logo {
                width: 248px;
                display: block;
                margin: 0 auto 24px;
            }
            .say {
                font-size: 24px;
                text-align: center;
                margin-bottom: 50px;
            }
            input {
                border: 1px solid #000000;
                height: 58px;
                line-height: 58px;
                padding-left: 18px;
                width: 100%;
                margin-bottom: 27px;
                font-size: 15px;
                position: relative;
                top: 0;
                @include trans;
                &:focus {
                    outline: none;
                    box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
                    top: -3px;
                }
            }
            .btns {
                width: 100%;
                height: 26px;
                margin-top: 6px;
                padding: 0 62px;
            }
            .reg {
                width: 26px;
                height: 26px;
                @include hand;
                background: url('../assets/images/login/reg.png') no-repeat;
                @include trans;
                background-size: 26px;
                &:hover {
                    background: url('../assets/images/login/rega.png') no-repeat;
                }
            }
            .activeReg {
                background: url('../assets/images/login/rega.png') no-repeat;
            }
            // .active:hover{
            // background: url('images/ico.gif') no-repeat center bottom!important;
            // }
            .loginicon {
                width: 26px;
                height: 26px;
                @include hand;
                background: url('../assets/images/login/login.png') no-repeat;
                @include trans;
                background-size: 26px;
                &:hover {
                    background: url('../assets/images/login/logina.png') no-repeat;
                }
            }
            .activelogin {
                background: url('../assets/images/login/logina.png') no-repeat;
            }
        }
        .main2 {
            position: fixed;
            top: -5%;
            left: 0;
            bottom: 0;
            right: -700px;
            margin: auto;
            width: 312px;
            height: 374px;
            opacity: 0;
            transition: all 1s ease-in;
            &.active {
                // right:0;
                transform: translate3d(-350px, 0, 0);
                opacity: 1;
            }
            .title {
                text-align: center;
                font-size: 24px;
                margin-bottom: 50px;
                /* color: #848484;
                b {
                    color: #000;
                } */
            }
            input {
                border: 1px solid #000000;
                height: 58px;
                line-height: 58px;
                padding-left: 18px;
                width: 100%;
                margin-bottom: 27px;
                font-size: 15px;
                position: relative;
                top: 0;
                @include trans;
                &:focus {
                    outline: none;
                    box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
                    top: -3px;
                }
            }
            .create {
                height: 60px;
                line-height: 60px;
                text-align: center;
                background: #000;
                width: 332px;
                border: none;
                color: #fff;
                font-size: 15px;
                @include hand;
                @include trans;
                &:hover {
                    opacity: .8;
                }
            }
        }
    }
</style>