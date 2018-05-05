<template lang="html">
  <div class="modey" :class='className'>

    <div class="ing" :class='{"active":ingActive}' v-show='!hiddenArrow'>
      <div class="big">
        UTTER - 你的独立出版
      </div>
      <div class="sub">
        发声，致自己、或者给世界
      </div>
    </div>

    <div class="module" :class='{"active":showAll}'>
      <img src="../assets/images/module/down.png" class='down' v-show='!hiddenArrow && className== "white"' :class='{"active":showAll}' @click='show'>
      <img src="../assets/images/module/downw.png" class='down' v-show='!hiddenArrow && className== "black"' :class='{"active":showAll}' @click='show'>
      <div class="inner" :class='{"active":hiddenArrow}'>
        <div class="arw">
          <div class="box">
            <img src="../assets/images/module/arrow.png" v-show='className == "white"'>
            <img src="../assets/images/module/arroww.png" v-show='className == "black"'>
          </div>
        </div>

        <p>设置您的海报样式</p>

        <div class="moduleSelect">

          <div class="line">
            <img src="../assets/images/module/m1.png" class='m1'>
            <img src="../assets/images/module/m2.png" class='m2'>
            <img src="../assets/images/module/m3.png" class='m3'>
          </div>

          <div class="line">
            <img src="../assets/images/module/m4.png" class='m4'>
            <img src="../assets/images/module/m5.png" class='m5'>
            <img src="../assets/images/module/m6.png" class='m6'>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {

  data () {
    return {
      className:'',
      showAll:false,
      hiddenArrow:false,
      ingActive:false
    }
  },
  watch:{
    '$store.state.utstyle': function(val) {
      this.className = val;
    },
  },
  methods:{
  	tourl(url){
      tools.router.push({path:url})
    },
    show(){
      var _this = this;
      this.showAll = true;
      setTimeout(function(){
        _this.hiddenArrow = true;
      },1000)
    }
  },
  mounted(){
    var _this = this;
    this.$store.commit('changeFooter',false);
    this.$store.commit('changeHeader',true);
    this.$store.commit('changeType', 'user');

    setTimeout(function(){
      _this.ingActive = true;
    },200)

    try{
      this.className = this.$route.query.type;

      if(this.className == 'black'){
        this.$store.commit('changeStyle','black')
      }else{
        this.$store.commit('changeStyle','white')
      }
    }catch(e){
      this.className = 'white';
      this.$store.commit('changeStyle','white')
    }

  },
   components:{

  }
}
</script>

<style scoped lang='scss'>
  @import "../assets/scss/tool.scss";
  .modey{
    min-height: 100vh;
    position: relative;
    &.white{
      background: #EFEFEF;
    }

    &.black{
      .ing{
        color: #fff;
      }
      .box{
        background: #000 !important;
      }
      .module{
        background: #000;
        .moduleSelect{
          .line{
            [class^=m]{
              &:hover{
                box-shadow: 0 5px 30px rgba(255,255,255,.3) !important;
              }
            }
          }
        }


      }
    }


    .ing{
      width: 384px;
      height:98px;
      @include automid;
      text-align: center;
      transition: all 1s ease;
      opacity: 0;
      transform: translateY(-100px);
      &.active{
        opacity: 1;
        transform: translateY(0);
      }
      .big{
        font-size: 35px;
        font-weight: 600;
        margin-bottom: 32px;
      }
      .sub{
        font-size: 20px;
      }
    }

    .module{
      width: 1354px;
      height: 747px;
      background: #FFFFFF;
      position: fixed;
      left: 50%;
      bottom: -610px;
      transform: translate3d(-50%,0,0);
      transition: all 1s ease-in-out;

      &.active{
        transform: translate3d(-50%,-92%,0);
      }

      .down{
        width: 44px;
        height: 44px;
        margin: 47px auto 0;
        display: block;
        transition: all 1s ease-in-out;
        @include hand;

        &.active{
          transform: rotate(180deg);
          opacity: 0;
        }
      }

      .inner{
        width: 1040px;
        height: 28px;
        margin: 104px auto 0;
        text-align: center;
        opacity: 0;
        transition: all 1s linear;
        &.active{
          opacity: 1;
        }
        .arw{
          width: 100%;
          height: 28px;
          margin-bottom:27px;
          position: relative;


          &:after{
            content: '';
            width: 100%;
            height: 1px;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            background: #E6E6E6;
            z-index: -1;
          }

          .box{
            width: 100px;
            height: 28px;
            margin: 0 auto;
            background: #fff;

            img{
              height: 28px;
              width: 23px;
              display: block;
              margin: 0 auto;
            }
          }
        }

        .moduleSelect{
          width: 1040px;
          height: 374px;
          position: relative;
          margin: 70px auto 0;
          .line{
            width: 100%;
            position: relative;
            [class^=m]{
              @include hand;
              @include trans;

              &:hover{
                box-shadow: 0 5px 30px rgba(0,0,0,.3);
              }
            }
            .m2,.m5{
              margin: 0 auto;
              display: block;
            }
            .m1{
              position: absolute;
              top: 0;
              left: 0;
            }
            .m3{
              position: absolute;
              top: 0;
              right: 0;
            }
            .m4{
              position: absolute;
              bottom: 0;
              left: 0;
            }
            .m6{
              position: absolute;
              bottom: 0;
              right: 0;
            }

            &:last-child{
              position: absolute;
              left: 0;
              bottom: 0;
            }
          }
        }

      }

    }

  }
</style>
