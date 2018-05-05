<template lang="html">
  <div class="login">


    <div class="header clearfix">
      <img class='logo' src="../assets/images/utter/logo.png" alt="UTTER">

      <div class="rightTools pull-right">
        <div class="item" @click='back'><img src="../assets/images/login/back.png" alt="返回"></div>
      </div>

    </div>

    <!-- <button style='margin-top:100px;' type="button" name="button" @click='changeType'>changeType</button> -->

    <div class="main" :class='{"active":type == 1}'>
      <img class='logo' src="../assets/images/utter/logo.png" alt="UTTER">
      <div class="say">写下你的一生</div>

      <input type="text" placeholder='手机号或常用邮箱…'>

      <input type="text" placeholder='输入密码…'>

      <div class="btns clearfix">
        <el-tooltip effect="dark" content="注册" placement="bottom">
          <div @click='reg' class="reg pull-left"></div>
        </el-tooltip>

        <el-tooltip effect="dark" content="登录" placement="bottom">
          <div @click='login' class="loginicon pull-right"></div>
        </el-tooltip>

      </div>
    </div>

    <div class="main2" :class='{"active":type == 2}'>
        <div class="title">
          以简驭繁，只为<b>深度创造</b>
        </div>

        <input type="text" placeholder='笔名'>

        <input type="text" placeholder='站名'>

        <button @click='tourl("/createtemplate")' type="button" name="button" class='create'>创&nbsp;&nbsp;建</button>
    </div>

  </div>
</template>
<script>
export default {

  data() {
    return {
      type:1
    }
  },
  methods: {
    changeType(){
      if(this.type % 2 == 1){
        this.type = 2;
      }else{
        this.type = 1;
      }
    },
    reg(){
      if(Math.random() > 0.5){
        this.$message({
          message: '注册成功',
          type: 'success'
        });

        setTimeout(function(){
          this.type = 2;
        }.bind(this),500)
      }else{
        this.$message('注册失败');
      }
    },
    login(){
      if(Math.random() > 0.5){
        this.$message({
          message: '登录成功',
          type: 'success'
        });
      }else{
        this.$message('登录失败');
      }
    },
    back(){
      window.history.back()
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

<style scoped lang='scss'>@import "../assets/scss/tool.scss";
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
                &:hover {
                    @include whover;
                }
                height: 58px;
                display: inline-block;
                width: 58px;
                text-align: center;
                padding-top: 18px;
            }
        }
    }

    .main{
      position: fixed;
      top:-5%;
      left:-700px;
      bottom:0;
      right: 0;
      margin: auto;
      width:312px;
      height:374px;
      opacity: 0;
      transition: all 1s ease-out;

      &.active{
        // left:0;
        transform: translate3d(350px,0,0);
        opacity: 1;
      }

      .logo{
        width: 248px;
        display: block;
        margin: 0 auto 24px;
      }
      .say{
        font-size:24px;
        text-align: center;
        margin-bottom: 50px;
      }
      input{
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

        &:focus{
          outline: none;
          box-shadow: 0 5px 10px rgba(0,0,0,.2);
          top: -3px;
        }
      }

      .btns{
        width:100%;
        height:26px;
        margin-top: 6px;
        padding:0 62px;
      }
      .reg{
        width: 26px;
        height:26px;
        @include hand;
        background: url('../assets/images/login/reg.png') no-repeat;
        @include trans;
        background-size: 26px;

        &:hover{
          background: url('../assets/images/login/rega.png') no-repeat;
        }
      }

      .loginicon{
        width: 26px;
        height:26px;
        @include hand;
        background: url('../assets/images/login/login.png') no-repeat;
        @include trans;
        background-size: 26px;

        &:hover{
          background: url('../assets/images/login/logina.png') no-repeat;
        }
      }

    }

    .main2{
      position: fixed;
      top:-5%;
      left:0;
      bottom:0;
      right: -700px;
      margin: auto;
      width:312px;
      height:374px;
      opacity: 0;
      transition: all 1s ease-in;

      &.active{
        // right:0;
        transform: translate3d(-350px,0,0);
        opacity: 1;
      }

      .title{
        text-align: center;
        font-size: 28px;
        margin-bottom: 50px;
      }

      input{
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

        &:focus{
          outline: none;
          box-shadow: 0 5px 10px rgba(0,0,0,.2);
          top: -3px;
        }
      }

      .create{
        height:60px;
        line-height: 60px;
        text-align: center;
        background: #000;
        width:100%;
        border: none;
        color:#fff;
        font-size: 15px;
        @include hand;
        @include trans;

        &:hover{
          opacity: .8;
        }
      }


    }
}
</style>
