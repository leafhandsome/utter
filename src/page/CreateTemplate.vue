<template lang="html">
  <div class="ct">
    <div class="header clearfix">
      <img class='logo' src="../assets/images/utter/logo.png" alt="UTTER">

      <div class="rightTools pull-right">
        <div class="item" @click='back'><img src="../assets/images/login/back.png" alt="返回"></div>
      </div>

    </div>

    <div class="main">
      <div class="regSuccess">
        创建成功！<br>
        选择模板开始创作！
      </div>

      <div class="box">
        <img src="../assets/images/login/wy.jpg" class='wy' @click='tourl("/modey",{type:"white"})'>
        <img src="../assets/images/login/wx.jpg" class='wx' @click='tourl("/modex",{type:"white"})'>
        <img src="../assets/images/login/by.jpg" class='by' @click='tourl("/modey",{type:"black"})'>
        <img src="../assets/images/login/bx.jpg" class='bx' @click='tourl("/modex",{type:"black"})'>
      </div>
    </div>

  </div>
</template>
<script>
export default {

  data () {
    return {

    }
  },
  methods:{
    back(){
      window.history.back()
    },
  	tourl(url,query){
      tools.router.push({path:url,query:query});
      //window.open('#/modey?type=black')
    }
  },
  mounted(){
    var _this = this;
    this.$store.commit('changeFooter', false)
    this.$store.commit('changeHeader', false)
    this.$store.commit('changeStyle','white')
  },
   components:{

  }
}
</script>

<style scoped lang='scss'>
  @import "../assets/scss/tool.scss";
  .ct{
    margin: 0 auto;
    min-height: 100vh;
    padding-top: 166px;

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
      height: 715px;
      width: 1140px;
      position: fixed;
      top: 0;
      left:0;
      right: 0;
      bottom: 0;
      margin: auto;
    }

    .regSuccess{
      text-align: center;
      line-height: 1.7;
      font-size: 30px;
      opacity: 0;

      animation:mymove 1s;
      animation-fill-mode :forwards;
    }

    .box{
      height: 568px;
      width: 100%;
      position: relative;
      margin-top: 55px;

      &:after{
        content: '';
        height:572px;
        width: 1px;
        background: #E6E6E6;
        position: absolute;
        left: 50%;
        top: 0;
      }

      img{
        width: 464px;
        height:260px;
        position: absolute;
        box-shadow: 0 5px 10px rgba(0,0,0,.3);
        @include trans;
        @include hand;
        opacity: 0;

        &:hover{
          box-shadow: 0 5px 30px rgba(0,0,0,.6);
        }
      }

      .wy{
        top: 0;
        left: 0;
        animation:mymove 2s;
        animation-delay:.6s;
        animation-fill-mode :forwards;
      }
      .wx{
        top: 0;
        right: 0;
        animation:mymove 2s;
        animation-delay:.8s;
        animation-fill-mode :forwards;
      }
      .by{
        bottom: 0;
        left: 0;
        animation:mymove 2s;
        animation-delay:.2s;
        animation-fill-mode :forwards;
      }
      .bx{
        bottom: 0;
        right: 0;
        animation:mymove 2s;
        animation-delay:.4s;
        animation-fill-mode :forwards;
      }
    }
  }

  @keyframes mymove{
    from {
      transform: translate3d(0,-200px,0);
      opacity: 0;
    }
    to {
      transform: translate3d(0,0,0);
      opacity: 1;
    }
  }

  @-webkit-keyframes mymove{
    from {
      transform: translate3d(0,-200px,0);
      opacity: 0;
    }
    to {
      transform: translate3d(0,0,0);
      opacity: 1;
    }
  }
</style>
