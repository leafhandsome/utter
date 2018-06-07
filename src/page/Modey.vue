<template lang="html">
  <div class="modey" ref='modey' :class='className' @click='closeshow'>

    <div class="ing" ref='align' :class='{"active":ingActive}' v-show='!hiddenArrow'>
      <div class="big" ref='titile'>
        UTTER - 你的独立出版
      </div>
      <div class="sub" ref='content'>
        发声，致自己、或者给世界
      </div>
    </div>
    <!-- //设置 -->
    <div class="setting" :class='stylecolor=="white"?"active-white":"active-black"' v-show='showset' @click.stop='showset=true'>
          <div v-show='!rightimgshow'>
          <div class="left">
            <img src="../assets//images/module/53 个人首页-横版左对齐.png" alt="" @click="setrowalign('left')">
            <img src="../assets//images/module/56 个人首页-竖版上对齐.png" alt=""  @click="setrowalign('top','30px')">
            <img src="../assets//images/module/54 个人首页-横版居中.png" alt="" @click="setrowalign('center')">
            <img src="../assets//images/module/57 个人首页-竖版居中.png" alt=""  @click="setrowalign('center','30px')">
            <img src="../assets//images/module/55 个人首页-横版右对齐.png" alt="" @click="setrowalign('right')">
            <img src="../assets//images/module/58 个人首页-竖版下对齐.png" alt=""  @click="setrowalign('bottom','30px')">
          </div>
          <div class="center">
            <div class='slider'>
              <el-slider v-model="fontvalue" :max='60' :min='30'></el-slider>
              <el-slider v-model="fontvalue2" :max='30' :min='12'></el-slider>
              </div>
              <span>{{fontvalue}}</span><span>{{fontvalue2}}</span>
          </div>
          </div>
          <div v-show='rightimgshow' class='setimgwidth'>
            <span :class='stylecolor=="white"?"ut-black":"ut-white"'>推荐壁纸</span>
            <span :class='stylecolor=="black"?"ut-black":"ut-white"'>上传壁纸</span>
          </div>
          <div class="right">
            <a href='javaScript:;' @click="gettitleactiveimg(1)">
            <img v-show='settitleimgshow' src="../assets//images/module/50 个人首页-标题设置.png" alt="" >
            <img v-show='(!settitleimgshow||settab==1)&&$route.query.type=="white"' src="../assets//images/module/60 个人首页-标题设置-黑.png" alt="" >
            <img v-show='(!settitleimgshow||settab==1)&&$route.query.type=="black"' src="../assets//images/module/69 个人首页-标题设置-白.png" alt="">
            </a>
            <a href='javaScript:;' @click="getactiveimg(2)">
            <img v-show='setimgshow' src="../assets//images/module/51 个人首页-壁纸设置.png" alt="" >
            <img  v-show='(!setimgshow||settab==2)&&$route.query.type=="white"' src="../assets//images/module/61 个人首页-壁纸设置-黑.png" alt="">
            <img v-show='(!setimgshow||settab==2)&&$route.query.type=="black"'  src="../assets//images/module/70 个人首页-壁纸设置-白.png" alt="">
            </a>
          </div>
    </div>
    <div class="set" @click.stop='settingfun'>
      <a href='javaScript:;'>
      <img v-if='stylecolor=="white"' src="../assets//images/module//49 个人首页-首页设置-黑.png" alt="">
      <img v-if='stylecolor=="black"' src="../assets//images/module/59 个人首页-首页设置-白.png" alt="">
      </a>
      </div>
      <!-- 右边壁纸 -->
    <!-- <img :src="imgurl" alt=""> -->
      <div class="rihgtimgs" :class='stylecolor=="white"?"active-white":"active-black"' v-show='rightimgshow'>
        <span class="initcolor"></span>
        <img src="../../static/img/3.jpg" alt="" @click='setbackgroundimg("../../static/img/3.jpg")'>
        <img src="../../static/img/2.jpg" alt="" @click='setbackgroundimg("../../static/img/2.jpg")'>
        <img src="../../static/img/4.jpg" alt="" @click='setbackgroundimg("../../static/img/4.jpg")'>
        <img src="../../static/img/5.jpg" alt="" @click='setbackgroundimg("../../static/img/5.jpg")'>
        <img src="../../static/img/1.jpg" alt="" @click='setbackgroundimg("../../static/img/1.jpg")'>
      </div>
    <div class="module" :class='{"active":showAll}' @click.stop='show'>
      <div class="out">
      <img src="../assets/images/module/down.png" class='down' v-show='!hiddenArrow && className== "white"' :class='{"active":showAll}' @click.stop='show'>
      <img src="../assets/images/module/downw.png" class='down' v-show='!hiddenArrow && className== "black"' :class='{"active":showAll}' @click.stop='show'>
      <div class="inner" :class='{"active":hiddenArrow}'  v-show='showbooks'>
        <div class="arw">
          <div class="box">
            <img src="../assets/images/module/arrow.png" v-show='className == "white"'>
            <img src="../assets/images/module/arroww.png" v-show='className == "black"'>
          </div>
        </div>

        <p>设置您的海报样式</p>

        <div class="moduleSelect">

          <div class="line">
            <img src="../assets/images/module/m1.png" class='m1' @click='setstyle(1)'>
            <img src="../assets/images/module/m2.png" class='m2' @click='setstyle(2)'>
            <img src="../assets/images/module/m3.png" class='m3'  @click='setstyle(3)'>
          </div>
          
          <!-- <div class="line">
            <img src="../assets/images/module/m4.png" class='m4'>
            <img src="../assets/images/module/m5.png" class='m5'>
            <img src="../assets/images/module/m6.png" class='m6'>
          </div> -->

        </div>
      </div>
    </div>
      <!-- 海报图片设置 -->
      <div  v-show='!showbooks' class="outbooks" :ref="'styletwo'+index"  v-for='(item,index) in stylelist' :key='index'>
            <div class="sendimg" >
              <a href="javaScript:;" @click="changeImge">
              <img class="linkimg" src="../assets/images//module/37 个人首页-海报区上传图片.png" alt="">
              <!-- <input type="text" ref="updatedimg"> -->
            </a>
            <div class="rihgtdiv">
            <a href="javaScript:;" @click='getbtnshow(index)' :ref="'linkborder'+index">
              <img src="../assets/images//module/38 个人首页-海报区超链接.png" alt="">
             
            </a>
            <input type="text" :ref='"btnshow"+index'  placeholder="请输入超链接地址...">
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
      className: "white",
      showAll: false,
      hiddenArrow: false,
      ingActive: false,
      showmodule: true,
      showbooks: true,
      stylelist: 1,
      fontvalue: 12,
      fontvalue2: 12,
      showset: false,
      stylecolor: "white", //背景色
      setimgshow: true,
      settitleimgshow: false,
      settab: 1,
      imgurl: "",
      rightimgshow: false
    };
  },
  watch: {
    "$store.state.utstyle": function(val) {
      this.className = val;
    },
    fontvalue: function(val) {
      this.$refs.titile.style.fontSize = val + "px";
    },
    fontvalue2: function(val) {
      this.$refs.content.style.fontSize = val + "px";
    }
  },
  created() {
    this.stylecolor = this.$route.query.type;
  },
  methods: {
    settingfun() {
      this.showset = true;
    },
    //切换皮肤
    setbackgroundimg(value) {
      // this.imgurl='/static/img/6.jpg'
      this.$refs.modey.style.background = "url(" + value + ")";
    },
    gettitleactiveimg(num) {
      this.settitleimgshow = false;
      this.setimgshow = true;
      this.settab = num;
      this.rightimgshow = false;
    },
    getactiveimg(num) {
      this.settab = num;
      this.setimgshow = false;
      this.settitleimgshow = true;
      this.rightimgshow = true;
    },
    //设置横排对齐方式
    setrowalign(align, px) {
      if (px) {
        this.$refs.align.style.marginTop = "100px";
        this.$refs.align.style.width = "100px";
        this.$refs.align.style.height = "600px";

        this.$refs.titile.style.width = px;

        //  this.$refs.titile.style.height="400px";
        this.$refs.titile.style.float = "right";
        this.$refs.content.style.float = "right";
        this.$refs.content.style.width = "10px";
        this.$refs.content.style.content = "400px";
        this.$refs.content.style.marginRight = "40px";
        if (align == "center") {
          //  this.$refs.align.style.top = "50%";
          this.$refs.titile.style.transform = "translateY(75%)";
          this.$refs.content.style.transform = "translateY(100%)";
        } else if (align == "top") {
          this.$refs.titile.style.transform = "translateY(0%)";
          this.$refs.content.style.transform = "translateY(0%)";
          this.$refs.content.style.height = "initial";
          this.$refs.titile.style.height = "initial";
        } else if (align == "bottom") {
          this.$refs.titile.style.transform = "translateY(133%)";
          this.$refs.content.style.transform = "translateY(180%)";
          this.$refs.content.style.height = "initial";
          this.$refs.titile.style.height = "initial";
        }
      } else {
        this.$refs.align.style.margin = "auto";
        this.$refs.align.style.textAlign = align;
        this.$refs.content.style.marginRight = "0";
        this.$refs.align.style.width = "1200px";
        // this.$refs.titile.style.transform = "translateY(0%)";
        // this.$refs.content.style.transform = "translateY(0%)";
        this.$refs.align.style.height = "98px";
        this.$refs.align.style.top = "0";
        this.$refs.titile.style.height = "42px";
        this.$refs.titile.style.width = "100%";
        this.$refs.titile.style.marginBottom = "32px";
        this.$refs.content.style.height = "24px";
        this.$refs.content.style.width = "100%";
      }
    },
    // 风格样式
    setstyle(num) {
      this.showbooks = false;
      if (num == 1) {
        this.stylelist = 1;
      } else if (num == 2) {
        this.stylelist = 2;
        setTimeout(() => {
          this.$refs.styletwo0[0].style.width = "50%";
          this.$refs.styletwo0[0].style.float = "left";
          this.$refs.styletwo0[0].style.borderRight = "1px solid #efefef";
          this.$refs.styletwo1[0].style.width = "50%";
          this.$refs.styletwo1[0].style.float = "left";
        }, 20);
      } else if (num == 3) {
        this.stylelist = 2;
        setTimeout(() => {
          this.$refs.styletwo0[0].style.height = "50%";
          // this.$refs.styletwo0[0].style.float = "left";
          this.$refs.styletwo0[0].style.borderBottom = "1px solid #efefef";
          this.$refs.styletwo1[0].style.height = "50%";
          // this.$refs.styletwo1[0].style.float = "left";
        }, 20);
      }
    },
    getbtnshow(index) {
      setTimeout(() => {
        if (index == 0) {
          this.$refs.btnshow0[0].style.display = "inline";
          this.$refs.linkborder0[0].style.border = "1px solid #a7a7a6";
          this.$refs.linkborder0[0].style.height = "38px";
        } else {
          this.$refs.btnshow1[0].style.display = "inline";
          this.$refs.linkborder1[0].style.border = "1px solid #a7a7a6";
          this.$refs.linkborder1[0].style.height = "38px";
        }
      }, 20);
    },
    changeImge() {
      // this.$refs.updatedimg
    },
    closeshow() {
      this.showAll = false;
      this.showset = false;
      this.rightimgshow = false;
      this.settab = 1;
      this.setimgshow = true;
      this.settitleimgshow = false;
      setTimeout(() => {
        this.hiddenArrow = false;
      }, 1000);
    },
    tourl(url) {
      tools.router.push({
        path: url
      });
    },
    show() {
      var _this = this;
      this.showAll = true;
      this.showPersonal = false;
      setTimeout(function() {
        _this.hiddenArrow = true;
      }, 1000);
    }
  },
  mounted() {
    var _this = this;
    this.$store.commit("changeFooter", false);
    this.$store.commit("changeHeader", true);
    this.$store.commit("changeType", "user");
    setTimeout(function() {
      _this.ingActive = true;
    }, 200);

    try {
      this.className = this.$route.query.type;

      if (this.className == "black") {
        this.$store.commit("changeStyle", "black");
      } else {
        this.$store.commit("changeStyle", "white");
      }
    } catch (e) {
      this.className = "white";
      this.$store.commit("changeStyle", "white");
    }
  },
  components: {}
};
</script>

<style scoped lang='scss'>
@import "../assets/scss/tool.scss";
.modey {
  overflow: hidden;
  min-height: 100vh;
  position: relative;
  .set {
    position: absolute;
    right: 41px;
    bottom: 20px;
    z-index: 101;
  }
  .active-white {
    background: white;
  }
  .active-black {
    background: black;
  }
  .rihgtimgs {
    position: absolute;
    right: 0;
    bottom: 136px;
    width: 300px;
    height: 720px;
    overflow-y: scroll;
    text-align: center;
    img,
    .initcolor {
      width: 250px;
      margin-top: 20px;
      cursor: pointer;
    }
    .initcolor {
      display: inline-block;
      background-color: #efefef;
      height: 140px;
      margin-top: 50px;
    }
  }
  .setimgwidth {
    width: 200px;
    height: 200px;
    float: left;
    span {
      display: inline-block;
      width: 75px;
      height: 40px;
      text-align: center;
      font-size: 14px;
      line-height: 40px;
      cursor: pointer;
      margin: 50px 0 0 20px;
    }
  }
  .setting {
    width: 300px;
    height: 136px;
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 100;
    img {
      cursor: pointer;
    }
    .left {
      float: left;
      width: 80px;
      img {
        margin-right: 15px;
        margin-top: 18px;
      }
    }
    .center {
      float: left;
      width: 100px;
      margin-left: 20px;
      .slider {
        margin-top: 10px;
      }
      span {
        display: inline-block;
        width: 50%;
        text-align: center;
        margin-top: 15px;
      }
    }
    .right {
      float: left;
      width: 30px;
      margin-left: 40px;
      img {
        margin-top: 20px;
      }
    }
  }
  .outbooks {
    height: 100%;
    position: relative;
    a {
      display: inline-block;
      width: 40px;
      height: 40px;
      img {
        margin: 0 auto;
        vertical-align: middle;
      }
    }
    .sendimg {
      position: absolute;
      left: 0;
      bottom: 20px;
      text-align: center;
      width: 100%;
      height: 40px;
      line-height: 40px;
      .linkimg {
        margin-right: 20px;
      }
      .rihgtdiv {
        display: inline-block;
        position: relative;
      }
      input {
        width: 265px;
        height: 34px;
        position: absolute;
        top: 0;
        left: 40px;
        padding-left: 10px;
        display: none;
        /* border: none; */
      }
    }
  }
  &.white {
    background: #efefef;
  }
  &.black {
    background: #1b1b1b;
    .ing {
      color: #fff;
    }
    .box {
      background: #000 !important;
    }
    .module {
      background: #000;
      .moduleSelect {
        .line {
          [class^="m"] {
            &:hover {
              box-shadow: 0 5px 30px rgba(255, 255, 255, 0.3) !important;
            }
          }
        }
      }
    }
  }
  .ing {
    width: 1200px;
    height: 98px;
    @include automid;
    text-align: center;
    transition: transform 1s ease;
    opacity: 0;
    transform: translateY(-100px);
    &.active {
      opacity: 1;
      transform: translateY(0);
    }
    .big {
      font-size: 35px;
      font-weight: 600;
      margin-bottom: 32px;
      // word-wrap:break-word;
    }
    .sub {
      font-size: 20px;
      word-break: break-all;
      word-wrap: break-word;
    }
  }
  .module {
    width: 1354px;
    height: 747px;
    background: #ffffff;
    position: fixed;
    left: 50%;
    bottom: -610px;
    transform: translate3d(-50%, 0, 0);
    transition: all 1s ease-in-out;
    z-index: 10;
    &.active {
      transform: translate3d(-50%, -92%, 0);
    }
    .down {
      width: 44px;
      height: 44px;
      margin: 47px auto 0;
      display: block;
      transition: all 1s ease-in-out;
      @include hand;
      &.active {
        transform: rotate(180deg);
        opacity: 0;
      }
    }
    .inner {
      width: 1040px;
      height: 28px;
      margin: 104px auto 0;
      text-align: center;
      opacity: 0;
      transition: all 1s linear;
      &.active {
        opacity: 1;
      }
      .arw {
        width: 100%;
        height: 28px;
        margin-bottom: 27px;
        position: relative;
        &:after {
          content: "";
          width: 100%;
          height: 1px;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          background: #e6e6e6;
          z-index: -1;
        }
        .box {
          width: 100px;
          height: 28px;
          margin: 0 auto;
          background: #fff;
          img {
            height: 28px;
            width: 23px;
            display: block;
            margin: 0 auto;
          }
        }
      }
      .moduleSelect {
        width: 1040px;
        height: 200px;
        position: relative;
        margin: 70px auto 0;
        .line {
          width: 100%;
          position: relative;
          [class^="m"] {
            @include hand;
            @include trans;
            &:hover {
              box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
            }
          }
          .m2,
          .m5 {
            margin: 0 auto;
            display: block;
          }
          .m1 {
            position: absolute;
            top: 0;
            left: 0;
          }
          .m3 {
            position: absolute;
            top: 0;
            right: 0;
          }
          .m4 {
            position: absolute;
            bottom: 0;
            left: 0;
          }
          .m6 {
            position: absolute;
            bottom: 0;
            right: 0;
          }
          &:last-child {
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