<template>
<div class="edit" :class='{black:utstyle != "white"}' :style='{height:height + "px"}'>

  <div class="header">
    <img @click='change' v-if='utstyle == "white"' class='logo' src="../assets/images/utter/logo.png" alt="UTTER">
    <img @click='change' v-else class='logo' src="../assets/images/utter/logow.png" alt="UTTER">

    <div class="toolsView clearfix">

      <div class="icon pull-left"
        @click.self='handleTool(i.key)'
        :style="{'background-image': utstyle == 'white' ? 'url('+ i.bicon +')' : 'url('+ i.wicon +')' }" 
        v-for='i in toolsList'>

        <div class="fontsizeTools" v-if='activeTools == "fontsize" && i.key == "fontsize"'>
          <div class="item" v-for='i in 21'>{{7 + i}}</div>
        </div>

        <div class="fontfamilyTools" v-if='activeTools == "fontfamily" && i.key == "fontfamily"'>
          <div class="item" v-for='i in 10'>圆体-简体 字体样式</div>
        </div>

        <div class="forecolorTools" v-if='activeTools == "forecolor" && i.key == "forecolor"'>
          <div class="item" v-for='i in colorList'>
            <div class="color" :style='{"background-color":i}'></div>
          </div>
        </div>

        
        <div class="fontsizeTools" v-if='activeTools == "lineheight" && i.key == "lineheight"'>
          <div class="item" v-for='i in 21'>{{7 + i}}</div>
        </div>

        <div class="fontsizeTools" v-if='activeTools == "rowspacing" && i.key == "rowspacing"'>
          <div class="item" v-for='i in 10'>{{i - 1}}</div>
        </div>

        <div class="linkTools" v-if='activeTools == "link" && i.key == "link"'>
          <input placeholder='输入超链接地址…  '>
        </div>

        <div class="draftTools" v-if='activeTools == "draft" && i.key == "draft"'>
          <div class="item" v-for='i in 10'>不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕</div>
        </div>

        <div class="ideaTools" v-if='activeTools == "idea" && i.key == "idea"'>
          <div class="item" v-for='i in 5'>不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕</div>
        </div>
        

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
      activeTools:'',
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
          key:'justifyl',
          wicon:require('../assets/images/editor/justifyleftw.png'),
          bicon:require('../assets/images/editor/justifyleftb.png')
        },
        {//字间距 中
          key:'justifym',
          wicon:require('../assets/images/editor/justifymidw.png'),
          bicon:require('../assets/images/editor/justifymidb.png')
        },
        {//字间距 右
          key:'justifyr',
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
      colorList:[
        '#1B1B1B',
        '#434343',
        '#A40035',
        '#FE0000',
        '#EB6100',
        '#FFF100',
        '#5A493F',
        '#D0A972',
        '#001C58',
        '#1D2089',
        '#00A0EA',
        '#F29C9F',
        '#E5007F',
        '#8C98CC',
        '#22AB37',
        '#ACD697',
        '#019E95',
        '#898989'
      ],
      height:0
    }
  },
  methods: {
    handleTool(key){
      this.activeTools = this.activeTools == key ? '' : key;

      console.log(key)
    },
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

    .fontsizeTools,.fontfamilyTools,.forecolorTools,.linkTools input,.draftTools{
      background: rgba(0,0,0,.5);
      color: #fff;
    }

    .draftTools,.ideaTools{
      .item{
        &:hover{
          color: #fff;
        }
      }
    }
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
      position: relative;
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
  @mixin tool(){
    border: 1px solid #E6E6E6;
    position: absolute;
    top: 54px;
    left: -1px;
    background: rgba(255,255,255,.5);
  }
  // 字号工具
  .fontsizeTools{
    @include tool;
    width: 56px;
    transition: all .3s ease;

    .item{
      height: 35px;
      font-size: 13px;
      text-align: center;
      line-height: 35px;
      transition: all .3s ease;

      &:hover{
        background: #E6E6E6;
      }
    }
  }

  // 字体工具
  .fontfamilyTools{
    @include tool;
    width: 172px;
    color: #AEAEAE;
    font-size: 13px;
    line-height: 35px;
    text-align: center;

    .item{
      transition: all .3s ease;
      &:hover{
        background: #E6E6E6;
      }
    }
    .item.active{
      color: #000;
    }
  }

  // 字体颜色
  .forecolorTools{
    @include tool;
    width: 56px;
    transition: all .3s ease;

    .item{
      transition: all .3s ease;
      height: 35px;
      padding-top: 10px;
      &:hover{
        background: #E6E6E6;
      }

      .color{
        width: 24px;
        height: 13px;
        margin: 0 auto;
      }
    }
  }

  .linkTools{
    border: 1px solid #E6E6E6;
    position: absolute;
    top: 54px;
    left: -1px;

    input{
      padding: 0 20px;
      line-height: 56px;
      border: none;
      width: 334px;
      height: 56px;
      background: rgba(255,255,255,.5);
    }
  }

  .draftTools{
    width: 286px;
    height: 286px;
    overflow-y: auto;
    border: 1px solid #E6E6E6;
    position: absolute;
    top: 54px;
    right: -1px;

    .item{
      height: 46px;
      line-height: 46px;
      width: 266px;
      white-space: nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
      padding: 0 15px;
      border-bottom: 1px solid #E6E6E6;
      color: #A0A0A0;

      &:hover{
        color: #000;
      }
    }
  }

  .ideaTools{
    width: 343px;
    height: 343px;
    overflow-y: auto;
    border: 1px solid #E6E6E6;
    position: absolute;
    top: 54px;
    right: -1px;

    .item{
      padding: 15px;
      font-size: 13px;
      line-height: 1.5;
      border-bottom: 1px solid #E6E6E6;
      color: #A0A0A0;

      &:hover{
        color: #000;
      }
    }
  }

}
</style>
