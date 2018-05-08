<template>
<div class="edit" :class='{black:utstyle != "white"}' :style='{height:height + "px"}'>

  <div class="header">
    <img @click='change' v-if='utstyle == "white"' class='logo' src="../assets/images/utter/logo.png" alt="UTTER">
    <img @click='change' v-else class='logo' src="../assets/images/utter/logow.png" alt="UTTER">

    <div class="toolsView clearfix">

      <div class="icon pull-left" 
        :style="{'background-image': utstyle == 'white' ? 'url('+ i.bicon +')' : 'url('+ i.wicon +')' }" 
        v-for='i in toolsList'>
      </div>

    </div>

    <div class="rightTools clearfix">
      <div class="set pull-left" :class='{b:utstyle == "white",w:utstyle != "white"}'></div>

      <div class="back pull-left" :class='{b:utstyle == "white",w:utstyle != "white"}'></div>
    </div>
  </div>

</div>
</template>

<script>
export default {
  data() {
    return {
      utstyle:'white',
      toolsList:[
        {//字体大小
          key:'fontsize',
          wicon:require('../assets/images/editor/fontsizew.png'),
          bicon:require('../assets/images/editor/fontsizeb.png')
        },
        {//字体
          key:'fontfamily',
          wicon:require('../assets/images/editor/fontfamilyw.png'),
          bicon:require('../assets/images/editor/fontfamilyb.png')
        },
        {//字体颜色
          key:'forecolor',
          wicon:require('../assets/images/editor/forecolorw.png'),
          bicon:require('../assets/images/editor/forecolorb.png')
        },
        {//字体倾斜
          key:'italic',
          wicon:require('../assets/images/editor/italicw.png'),
          bicon:require('../assets/images/editor/italicb.png')
        },
        {//下划线
          key:'underline',
          wicon:require('../assets/images/editor/underlinew.png'),
          bicon:require('../assets/images/editor/underlineb.png')
        },
        {//行高
          key:'lineheight',
          wicon:require('../assets/images/editor/lineheightw.png'),
          bicon:require('../assets/images/editor/lineheightb.png')
        },
        {//字间距
          key:'rowspacing',
          wicon:require('../assets/images/editor/rowspacingw.png'),
          bicon:require('../assets/images/editor/rowspacingb.png')
        },
        {//字间距 左
          key:'justify',
          wicon:require('../assets/images/editor/justifyleftw.png'),
          bicon:require('../assets/images/editor/justifyleftb.png')
        },
        {//字间距 中
          key:'justify',
          wicon:require('../assets/images/editor/justifymidw.png'),
          bicon:require('../assets/images/editor/justifymidb.png')
        },
        {//字间距 右
          key:'justify',
          wicon:require('../assets/images/editor/justifyrightw.png'),
          bicon:require('../assets/images/editor/justifyrightb.png')
        },
        {//超链接
          key:'link',
          wicon:require('../assets/images/editor/linkw.png'),
          bicon:require('../assets/images/editor/linkb.png')
        },
        {//图片
          key:'insertimage',
          wicon:require('../assets/images/editor/insertimagew.png'),
          bicon:require('../assets/images/editor/insertimageb.png')
        },
        {//草稿
          key:'draft',
          wicon:require('../assets/images/editor/draftw.png'),
          bicon:require('../assets/images/editor/draftb.png')
        },
        {//灵感
          key:'idea',
          wicon:require('../assets/images/editor/ideaw.png'),
          bicon:require('../assets/images/editor/ideab.png')
        },
        {//垃圾桶
          key:'ashcan',
          wicon:require('../assets/images/editor/ashcanw.png'),
          bicon:require('../assets/images/editor/ashcanb.png')
        },
        {//发表
          key:'issue',
          wicon:require('../assets/images/editor/issuew.png'),
          bicon:require('../assets/images/editor/issueb.png')
        }
      ],
      height:0
    }
  },
  methods: {
    change() {
      this.$store.commit('changeStyle')
    },
    tourl(url) {
      tools.router.push({
        path: url
      })
    }
  },
  watch:{
    '$store.state.utstyle':function(val){
      this.utstyle = val;
    }
  },
  mounted(){
    var _this = this;
    this.height = window.innerHeight;

    window.onresize = function(){
      _this.height = window.innerHeight;
    }
  }
}
</script>

<style scoped lang='scss'>
@import "../assets/scss/tool.scss";
.edit {
  width: 100%;
  height: 100%;
  transition: background .3s ease;
  &.black{
    background: #000;
  }

  .header{
    height: 56px;
    position: relative;
  }

  .logo {
    position: absolute;
    height: 26px;
    top: 16px;
    left: 35px;
    @include hand;
  }

  .toolsView{
    width: 928px;
    margin: 0 auto;
    .icon{
      width: 56px;
      height: 56px;
      border: 1px solid transparent;
      background-position: 50% 50%;
      background-repeat: no-repeat;
      @include hand;
      transition: border-color .3s ease;

      &:hover{
        border-color: #E6E6E6;
      }
    }
  }

  .rightTools{
    position: absolute;
    right:  30px;
    top: 0;
    height: 56px;

    div{
      width: 56px;
      height: 56px;
      border: 1px solid transparent;
      background-position: 50% 50%;
      background-repeat: no-repeat;
      @include hand;
      transition: border-color .3s ease;
      &:hover{
        border-color: #E6E6E6;
      }
    }

    .set{
      background-size: 19px 23px;
      &.w{
        background-image: url('../assets/images/editor/setw.png');
      }
      &.b{
        background-image: url('../assets/images/editor/setb.png');
      }
      &:hover{
        background-image: url('../assets/images/editor/seta.png') !important;
      }
    }

    .back{
      &.w{
        background-image: url('../assets/images/editor/backw.png');
      }
      &.b{
        background-image: url('../assets/images/editor/backb.png');
      }
      &:hover{
        background-image: url('../assets/images/editor/backa.png') !important;
      }
    }

  }
}
</style>
