<template>
<div class="header clearfix" :class='utstyle'>
  <!-- 横向header -->
  <img @click='change' v-if='utstyle == "white"' class='logo' src="../assets/images/utter/logo.png" alt="UTTER">
  <img @click='change' v-else class='logo' src="../assets/images/utter/logow.png" alt="UTTER">


  <div class="middleTab clearfix" v-if='type'>
    <div class="pull-left" :class='{"active":tab == 1}' @click='changeTab(1)'>
      <div class="tab">首页</div>
    </div>
    <div class="pull-left" :class='{"active":tab == 2}' @click='changeTab(2,"myarticle")'>
      <div class="tab">文章</div>
    </div>
    <div class="pull-left" :class='{"active":tab == 3}' @click='changeTab(3,"idea")'>
      <div class="tab">想法</div>
    </div>
    <div class="pull-left" :class='{"active":tab == 4}' @click='changeTab(4)'>
      <div class="tab">出版</div>
    </div>
    <div class="pull-left" :class='{"active":tab == 5}' @click='changeTab(5)'>
      <div class="tab">用户名</div>
    </div>
  </div>

  <template v-if='!type'>
    <div class="rightTools pull-right" v-if='utstyle == "white"'>
      <div class="item"><img src="../assets/images/utter/search.png" alt="搜索"></div>
      <div class="item"><img src="../assets/images/utter/user.png" @click='tourl("/login")' alt="个人中心"></div>
    </div>

    <div class="rightTools pull-right" v-else>
      <div class="item">
        <img src="../assets/images/utter/searchw.png" alt="搜索">
      </div>
      <div class="item" @click='tourl("/login")'>
        <img src="../assets/images/utter/userw.png" alt="个人中心">
      </div>
    </div>
</template>
  <template v-else>
<div class="rightTools pull-right">

  <div class="item">
    <img v-if='utstyle == "white"' src="../assets/images/utter/search.png" alt="搜索">
    <img v-else src="../assets/images/utter/searchw.png" alt="搜索">
  </div>
  <div class="item">
    <img v-if='utstyle == "white"' src="../assets/images/utter/create.png" alt="创作">
    <img v-else src="../assets/images/utter/createw.png" alt="创作">
  </div>
  <div class="item">
    <img v-if='utstyle == "white"' src="../assets/images/utter/music.png" alt="音乐">
    <img v-else src="../assets/images/utter/musicw.png" alt="音乐">
  </div>
  <div class="item">
    <img v-if='utstyle == "white"' src="../assets/images/utter/msg.png" alt="消息">
    <img v-else src="../assets/images/utter/msgw.png" alt="消息">
  </div>
  <div class="item">
    <img v-if='utstyle == "white"' src="../assets/images/utter/user.png" @click='tourl("/login")' alt="个人中心">
    <img v-else src="../assets/images/utter/userw.png" @click='tourl("/login")' alt="个人中心">
  </div>
</div>
</template>


</div>
</template>

<script>
export default {
  data() {
    return {
      utstyle: 'white',
      tab: 1
    }
  },
  props: ['type','activeTab'],
  methods: {
    changeTab(tab,url){
      // this.tab = tab;
      if(url)
      window.open('#/'+url+'?tab='+tab)
    },
    change() {
      this.$store.commit('changeStyle')
    },
    tourl(url) {
      tools.router.push({
        path: url
      });
    }
  },
  watch: {
    '$store.state.utstyle': function(val) {
      this.utstyle = val;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>@import "../assets/scss/tool.scss";
.header {
    height: 58px;
    position: fixed;
    top: 0;
    left: 0;
    padding: 0 30px;
    width: 100vw;
    min-width: 1350px;
    z-index: 1000;
    @include trans();
    &.black {
        background: #000000;
        .rightTools {
            .item {
                &:hover {
                    @include bhover();
                }
            }
        }
        .middleTab{
          .tab{
            color: #B8B8B8;
          }
          .pull-left {
            &.active {
                .tab {
                    color: #fff;
                    font-weight: bold;
                    border-bottom: 1px solid #fff;
                    @include trans;
                }
            }
          }
        }
    }
    &.white {
        background: #FFFFFF;
        .rightTools {
            .item {
                &:hover {
                    @include whover();
                }
            }
        }
    }

    .logo {
        height: 26px;
        margin-top: 16px;
        cursor: pointer;
    }
    .rightTools {
        height: 58px;

        .item {
            @include trans();
            height: 58px;
            display: inline-block;
            width: 58px;
            text-align: center;
            padding-top: 18px;
        }
    }

    .middleTab {
        width: 500px;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        height: 58px;
        .pull-left {
            width: 100px;
            text-align: center;
            vertical-align: top;
            @include hand;
            @include trans;
            &:hover {
                background: rgba(0,0,0,.1);
            }

            &.active {
                .tab {
                    color: #000;
                    font-weight: bold;
                    border-bottom: 1px solid #000;
                    @include trans;
                }
            }
        }
        .tab {
            box-sizing: border-box;
            display: inline-block;
            height: 58px;
            line-height: 58px;
            color: #898989;
            font-size: 15px;
            margin: 0 auto;
        }
    }
}
</style>
