<template>
  <div class="personal" :class="{'personal--white':utstyle =='white','personal--black':utstyle =='black'}">
    <div class="personal__quanzi" v-show="footTab == 0">
      <div class="quanzi__tab">
        <div class="tab__item" :class="{'tab__item--active':quanziTab==0}" @click="changeQuanziTab(0)">好友</div>
        <div class="tab__item" :class="{'tab__item--active':quanziTab==1}" @click="changeQuanziTab(1)">群组</div>
        <div class="tab__item" :class="{'tab__item--active':quanziTab==2}" @click="changeQuanziTab(2)">观者</div>
        <div class="tab__item" :class="{'tab__item--active':quanziTab==3}" @click="changeQuanziTab(3)">关注</div>
      </div>
      <div class="quanzi__show">
        <div class="show__item">
          <div class="item__userphoto">
            <img src="" alt="">
          </div>
          <div class="item__username">一笑而过</div>
          <div class="item__usermsg">石头的话</div>
        </div>
      </div>
    </div>
    <div class="personal__happen" v-show="footTab == 1">
      <div class="happen__tab">
        <div class="tab__item" :class="{'tab__item--active':happenTab==0}" @click="changeHappenTab(0)">我的好友</div>
        <div class="tab__item" :class="{'tab__item--active':happenTab==1}" @click="changeHappenTab(1)">我的关注</div>
      </div>
      <div class="happen__show">
        <div class="show__item">
          <div class="item__userphoto">
            <img src="" alt="">
          </div>
          <div class="item__username">一笑而过</div>
          <div class="item__usermsg">石头的话</div>
        </div>
      </div>
    </div>
    <div class="personal__person" v-show="footTab == 2">
      <div class="person__index">
        <div class="person__btn">
          <div class="person__btnitem" :class="{'person__btnitem--active':personTab==0}" @click="changePersonTab(0)">购书计划</div>
          <div class="person__buyplan" v-show="personTab == 0">
            <div class="buyplan__books">
              <div class="books__list">
                <div class="books__item">
                  <div class="books__img">
                    <img src="" alt="">
                  </div>
                  <div class="books__name">沉默的青春</div>
                </div>
                <div class="books__item">
                  <div class="books__img">
                    <img src="" alt="">
                  </div>
                  <div class="books__name">沉默的青春</div>
                </div>
              </div>
            </div>
          </div>
          <div class="person__btnitem" :class="{'person__btnitem--active':personTab==1}" @click="changePersonTab(1)">最近浏览</div>
          <div class="person__lastvisited" v-show="personTab == 1">
            <div class="lastvisited__tab">
              <div class="tab__item" :class="{'tab__item--active':lastvisitedTab==0}" @click="changeLastVisitTab(0)">文章</div>
              <div class="tab__item" :class="{'tab__item--active':lastvisitedTab==1}" @click="changeLastVisitTab(1)">书籍</div>
              <div class="tab__item" :class="{'tab__item--active':lastvisitedTab==2}" @click="changeLastVisitTab(2)">用户</div>
            </div>
            <div class="lastvisited__list" v-show="lastvisitedTab==0">
              <div class="list__item">
                <div class="list__name">青海之行</div>
                <div class="list__author">一笑而过</div>
              </div>
            </div>
            <div class="lastvisited__list" v-show="lastvisitedTab==1">
              <div class="books__list">
                <div class="books__item">
                  <div class="books__img">
                    <img src="" alt="">
                  </div>
                  <div class="books__name">沉默的青春</div>
                </div>
                <div class="books__item">
                  <div class="books__img">
                    <img src="" alt="">
                  </div>
                  <div class="books__name">沉默的青春</div>
                </div>
              </div>
            </div>
          </div>
          <div class="person__btnitem" :class="{'person__btnitem--active':personTab==2}" @click="changePersonTab(2)">我的账户</div>
          <div class="person__account" v-show="personTab == 2">

          </div>
          <div class="person__btnitem" :class="{'person__btnitem--active':personTab==3}" @click="changePersonTab(3)">密码设置</div>
          <div class="person__pwdset" v-show="personTab == 3">密码设置</div>
          <div class="person__btnend">
            <div class="person__btnitem" :class="{'person__btnitem--active':personTab==4}" @click="changePersonTab(4)">返回我的主页</div>
            <div class="person__homepage" v-show="personTab == 4">返回我的主页</div>
            <div class="person__btnitem" :class="{'person__btnitem--active':personTab==5}" @click="changePersonTab(5)">UTTER状态</div>
            <div class="person__utstatus" v-show="personTab == 5">UTTER状态</div>
          </div>
        </div>
      </div>
    </div>
    <div class="personal__footer">
      <div class="footer__tab" @click="changeTab(0)" :class="{'footer__tab--white':footTab == 0 && utstyle =='white','footer__tab--black':footTab == 0 && utstyle =='black'}">
        <strong>
          <i class="tab__quanzi"></i>
        </strong>
        <span>
          圈子
        </span>
      </div>
      <div class="footer__tab" @click="changeTab(1)" :class="{'footer__tab--white':footTab == 1 && utstyle =='white','footer__tab--black':footTab == 1 && utstyle =='black'}">
        <strong>
          <i class="tab__happen"></i>
        </strong>
        <span>
          发生
        </span>
      </div>
      <div class="footer__tab" @click="changeTab(2)" :class="{'footer__tab--white':footTab == 2 && utstyle =='white','footer__tab--black':footTab == 2 && utstyle =='black'}">
        <strong>
          <i class="tab__person"></i>
        </strong>
        <span>
          个人中心
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        utstyle: 'white',
        footTab: 2,
        quanziTab: 0,
        happenTab: 0,
        personTab: -1,
        lastvisitedTab: 0

      }
    },
    props: ['type', 'activeTab'],
    methods: {
      change() {
        this.$store.commit('changeStyle')
      },
      tourl(url) {
        tools.router.push({
          path: url
        });
      },
      changeTab(idx) {
        this.footTab = idx
      },
      changeQuanziTab(idx) {
        this.quanziTab = idx
      },
      changeHappenTab(idx) {
        this.happenTab = idx
      },
      changePersonTab(idx) {
        this.personTab = idx
      },
      changeLastVisitTab(idx) {
        this.lastvisitedTab = idx
      }
    },
    watch: {
      '$store.state.utstyle': function (val) {
        this.utstyle = val;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  @import "../assets/scss/tool.scss";
  .personal {
    margin-top: 100px;
    width: 320px;
    border: 1px solid #e6e6ee;
    margin-left: 100px;
    font-size: 14px;
  }

  .personal--white {
    background: #fff;
  }

  .personal--black {
    background: #000;
  }

  .personal__quanzi,
  .personal__happen,
  .personal__person {
    width: 100%;
    height: 750px;
  }

  .show__item {
    overflow: hidden;
    line-height: 40px;
    padding: 8px;
    .item__userphoto {
      width: 40px;
      height: 40px;
      float: left;
      background: #ccc;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .item__username {
      float: left;
      margin-left: 6px;
    }
    .item__usermsg {
      float: right;
      color: #999;
    }
  }

  .personal__quanzi {
    .quanzi__tab {
      height: 60px;
      width: 100%;
      line-height: 60px;
      text-align: center;
      border-bottom: 1px solid #e6e6ee;
      color: #aaa;
      .tab__item {
        width: 25%;
        float: left;
      }
      .tab__item--active {
        color: #000;
      }
    }
    .quanzi__show {}

  }

  .personal__happen {
    .happen__tab {
      width: 100%;
      height: 60px;
      line-height: 60px;
      text-align: center;
      border-bottom: 1px solid #e6e6ee;
      color: #aaa;
      .tab__item {
        width: 50%;
        float: left;

      }
      .tab__item--active {
        color: #000;
      }
    }
  }

  .personal__person {
    .person__index {
      padding-top: 40px;
      height: 100%;
      position: relative;
      .person__btn {
        overflow: hidden;
      }
      .person__btnend {
        position: absolute;
        bottom: 36px;
        left: 0;
        right: 0;
        margin: 0 auto;
        /* margin-top: 264px; */
      }
    }
    .person__btnitem {
      width: 245px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      border: 1px solid #000000;
      margin: 0 auto;
      margin-bottom: 20px;
      +div {
        width: 245px;
        margin: 0 auto;
      }

    }
    .books__list {
      overflow: hidden;
      text-align: center;
      font-size: 12px;
      font-weight: bold;
      .books__item {
        float: left;
        width: 108px;
        overflow: hidden;
        margin-right: 24px;
        .books__img {
          width: 100%;
          height: 134px;
          background: #ccc;
        }
        .books__name {
          padding-top: 10px;
        }
      }
      .books__item:nth-child(2) {
        margin-right: 0;
      }
    }
    .person__buyplan {
      padding-bottom: 20px;
      .buyplan__books {
        padding: 20px 0;
        border-top: 1px solid #e6e6e6;
        border-bottom: 1px solid #e6e6e6;
      }
    }
    .person__lastvisited {
      overflow: hidden;
      padding-bottom: 20px;
      .lastvisited__tab {
        padding-bottom: 20px;
        border-bottom: 1px solid #e6e6e6;
        overflow: hidden;
        .tab__item {
          width: 74px;
          height: 52px;
          border: 1px solid #000;
          line-height: 52px;
          text-align: center;
          float: left;
          margin-right: 10px;
        }
        .tab__item:last-child {
          margin-right: 0;
        }
        .tab__item--active {
          background: #000;
          color: #fff;

        }
      }
      .lastvisited__list {
        .books__list{
          padding-top: 20px;
        }
        .list__item {
          width: 100%;
          padding: 14px 0;
          border-bottom: 1px solid #e6e6e6;
          overflow: hidden;
          font-size: 12px;
          font-weight: bold;
        }
        .list__name {
          float: left;
        }
        .list__author {
          float: right;
        }
      }
    }
    .person__btnitem:last-child {
      margin-bottom: 0;
    }
    .person__btnitem--active {
      background: #000;
      color: #fff;
    }
  }

  .personal__footer {
    width: 100%;
    overflow: hidden;
    .footer__tab {
      width: 33.33%;
      height: 70px;
      float: left;
      border-right: 1px solid #e6e6ee;
      font-size: 12px;
      text-align: center;
      padding-top: 15px;
      color: #999;
      border-top: 1px solid #e6e6ee;
      strong,
      span {
        display: block;
        letter-spacing: 3px;
        i {
          width: 22px;
          height: 22px;
          display: inline-block;

        }
      }
      span {
        text-indent: 2px;
      }
      .tab__quanzi {
        background: url('../assets/images/personal/154 用户中心-圈子.png') no-repeat;
        background-size: 100%;
      }
      .tab__happen {
        background: url('../assets/images/personal/155 用户中心-发生.png') no-repeat;
        background-size: 100%;
      }
      .tab__person {
        width: 19px;
        background: url('../assets/images/personal/156 用户中心-个人中心.png') no-repeat;
        background-size: 100%;
      }
    }
    .footer__tab:last-child {
      border-right: none;
    }

    .footer__tab--white {
      color: #000;
      .tab__quanzi {
        background: url('../assets/images/personal/162 用户中心-圈子-黑.png') no-repeat;
        background-size: 100%;
      }
      .tab__happen {
        background: url('../assets/images/personal/163 用户中心-发生-黑.png') no-repeat;
        background-size: 100%;
      }
      .tab__person {
        width: 19px;
        background: url('../assets/images/personal/164 用户中心-个人中心-黑.png') no-repeat;
        background-size: 100%;
      }
    }
    .footer__tab--black {
      color: #fff;
      .tab__quanzi {
        background: url('../assets/images/personal/170 用户中心-圈子-白.png') no-repeat;
        background-size: 100%;
      }
      .tab__happen {
        background: url('../assets/images/personal/171 用户中心-发生-白.png') no-repeat;
        background-size: 100%;
      }
      .tab__person {
        width: 19px;
        background: url('../assets/images/personal/172 用户中心-个人中心-白.png') no-repeat;
        background-size: 100%;
      }
    }
  }
</style>