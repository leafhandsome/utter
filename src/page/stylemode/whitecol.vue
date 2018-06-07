<template>
<div>
  <div class="header clearfix" :class='utstyle'>
    <!-- 纵向header -->
    <img @click='change' v-if='utstyle == "white"' class='logo' src="../../assets/images/utter/logo.png" alt="UTTER">
    <img @click='change' v-else class='logo' src="../../assets/images/utter/logow.png" alt="UTTER">


    <div class="middleTab ">
      <router-link to="/whitecol/modex">
      <div class="pull-left">
        <div class="tab">首页</div>
      </div>
      </router-link>
      <router-link to="/whitecol/myarticle">
      <div class="pull-left" >
        <div class="tab">文章</div>
      </div>
      </router-link>
      <router-link to="/whitecol/idea">
      <div class="pull-left">
        <div class="tab">想法</div>
      </div>
      </router-link>
      <router-link to="/whitecol/publish">
      <div class="pull-left" >
        <div class="tab">出版</div>
      </div>
      </router-link>
      <router-link to="/whitecol/userinfo">
      <div class="pull-left">
        <div class="tab">用户名</div>
      </div>
      </router-link>
    </div>


    <div class="rightTools">
      <div class="item">
        <img v-if='utstyle == "white"' src="../../assets/images/utter/search.png" alt="搜索">
        <img v-else src="../../assets/images/utter/searchw.png" alt="搜索">
      </div>
      <div class="item">
        <img v-if='utstyle == "white"' src="../../assets/images/utter/create.png" alt="创作">
        <img v-else src="../../assets/images/utter/createw.png" alt="创作">
      </div>
      <div class="item">
        <img v-if='utstyle == "white"' src="../../assets/images/utter/music.png" alt="音乐">
        <img v-else src="../../assets/images/utter/musicw.png" alt="音乐">
      </div>
      <div class="item">
        <img v-if='utstyle == "white"' src="../../assets/images/utter/msg.png" alt="消息">
        <img v-else src="../../assets/images/utter/msgw.png" alt="消息">
      </div>
      <div class="item">
        <img v-if='utstyle == "white"' src="../../assets/images/utter/user.png" @click='tourl("/login")' alt="个人中心">
        <img v-else src="../../assets/images/utter/userw.png" @click='tourl("/login")' alt="个人中心">
      </div>
    </div>
    <div class="personshow" v-show="showPersonal">
      <personal :UTstyle="utstyle"></personal>
    </div>
   
  </div>
   <router-view></router-view>
   </div>
</template>

<script>
  import personal from '../../components/Personal'
  export default {
    data() {
      return {
        utstyle: 'white',
        tab: 1,
        showPersonal: false
      }
    },
    props: ['type', 'activeTab'],
    created(){
        console.log(this.$route.params)
    },
    methods: {
      changeTab(tab, url) {
        this.tab = tab;
        if (url)
          // window.open('#/' + url)
          this.$router.push('/whitecol/'+url)
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
      '$store.state.utstyle': function (val) {
        this.utstyle = val;
      }
    },
    components: {
      personal
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  @import "../../assets/scss/tool.scss";
 
  .header {
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    width: 176px;
    z-index: 1000;
    padding-top: 76px;
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
      .middleTab {
        height: 100px;
          .active {
            .tab {

              color: #fff;
              font-weight: bold;
              border-right: 1px solid #fff;
              @include trans;
            }
          }
        .tab {
          color: #B8B8B8;
        }
        .pull-left {
          &:hover {
            @include bhover();
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
      display: block;
      margin: 0 auto;
    }
    .rightTools {
      // height: 58px;
      position: absolute;
      width: 100%;
      bottom: 60px;
      left: 0;
      .item {
        @include trans();
        height: 54px;
        width: 54px;
        width: 100%;
        text-align: center;
        padding-top: 18px;
      }
    }

    .middleTab {
      width: 176px;
       height: 100px;
      margin-top: 58px;
       .active {
         .pull-left{
            .tab {
            color: #000;
            font-weight: bold;
            border-right: 2px solid #000;
            @include trans;
          }
         }
         
        }
      .pull-left {
        width: 176px;
        height: 58px;
        line-height: 58px;
        text-align: center;
        vertical-align: top;
        @include hand;
        @include trans;
        &:hover {
          background: rgba(0, 0, 0, .1);
        }

       
      }
      .tab {
        width: 100%;
        box-sizing: border-box;
        display: inline-block;
        height: 27px;
        line-height: 27px;
        color: #898989;
        font-size: 15px;
        margin: 0 auto;
      }
    }
  }
  .personshow{
    position: fixed;
    left: 176px;
    top: 0;
    bottom:0;
    .personal{
      position: absolute;
      bottom: 0;
    }
  }
</style>

    