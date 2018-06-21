<template>
  <div class="personal utBorder" :class="{'personal--white':UTstyle =='white','personal--black':UTstyle =='black'}">
    <div class="personal__box">
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
        <div class="happen__show" v-show="happenTab==0">
          <div class="show__item">
            <div class="item__userphoto">
              <img src="" alt="">
            </div>
            <div class="item__username">一笑而过</div>
            <div class="item__usermsg">石头的话</div>
          </div>
        </div>
        <div class="attention__show" v-show="happenTab==1">
          <div class="attention__item">
            <div class="item__userphoto">
              <img src="" alt="">
            </div>
            <div class="item__username">一笑而过
              <span class="item__time">23:56</span>
            </div>
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
                <el-carousel class="books__list"  trigger="click" height="160px" indicator-position="none">
                        <el-carousel-item v-for="(item, index) in 5" :key="index">
                  <div class="books__item fl">
                    <div class="books__img">
                      <img src="" alt="">
                    </div>
                    <div class="books__name">沉默的青春</div>
                  </div>
                  <div class="books__item fr">
                    <div class="books__img">
                      <img src="" alt="">
                    </div>
                    <div class="books__name">沉默的青春</div>
                  </div>
                </el-carousel-item>
                </el-carousel>
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
                <div class="list__item" v-for="(item, index) in 8" :key="index">
                  <div class="list__name">青海之行</div>
                  <div class="list__author">一笑而过</div>
                </div>
              </div>
              <div class="lastvisited__list" v-show="lastvisitedTab==1">
                <el-carousel class="books__list"  trigger="click"  height="160px" indicator-position="none">
                    <el-carousel-item v-for="(item, index) in 3" :key="index">
                  <div class="books__item fl">
                    <div class="books__img">
                      <img src="" alt="">
                    </div>
                    <div class="books__name">沉默的青春</div>
                  </div>
                  <div class="books__item fr">
                    <div class="books__img">
                      <img src="" alt="">
                    </div>
                    <div class="books__name">沉默的青春</div>
                  </div>
                    </el-carousel-item>
                </el-carousel>
              </div>
              <div class="lastvisited__list" v-show="lastvisitedTab==2">
                <div class="lastvisited__show">
                  <div class="show__item">
                    <div class="item__userphoto">
                      <img src="" alt="">
                    </div>
                    <div class="item__username">一笑而过</div>
                    <div class="item__usermsg">石头的话</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="person__btnitem" :class="{'person__btnitem--active':personTab==2}" @click="changePersonTab(2)">我的账户</div>
            <div class="person__account" v-show="personTab == 2">
              <div class="account__money">
                <div class="money__total">360.00￥</div>
                <div class="money__btn">
                  <div class="money__recharge">充值</div>
                  <div class="money__cash">提现</div>
                </div>
              </div>
              <div class="account__buyrecord" @click="changeAccountTab(0)">购书记录
                <span class="account__recordprice">20￥</span>
              </div>
              <div class="account__buylist" v-show="accountTab==0">
                <div class="account__item">
                  <div class="account__bookname">沉默的青春</div>
                  <div class="account__time">购于2018.01.21
                    <span>10￥</span>
                  </div>
                </div>
              </div>
              <div class="account__incomerecord" @click="changeAccountTab(1)">收益记录
                <span class="account__recordprice">20￥</span>
              </div>
              <div class="account__incomelist" v-show="accountTab==1">
                <div class="account__item">
                  <div class="account__bookname">沉默的青春
                    <span>写下你的一生</span>
                  </div>
                  <div class="account__time">购于2018.01.21
                    <span>10￥</span>
                  </div>
                </div>
                <div class="account__item">
                  <div class="account__bookname">沉默的青春
                    <span>写下你的一生</span>
                  </div>
                  <div class="account__time">购于2018.01.21
                    <span>10￥</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="person__btnitem" :class="{'person__btnitem--active':personTab==3}" @click="changePersonTab(3)">密码设置</div>
            <div class="person__pwdset" v-show="personTab == 3">
              <div class="pwdset__item">
                <input type="text" placeholder="新密码" class="pwdset__input">
              </div>
              <div class="pwdset__item">
                <input type="text" placeholder="旧密码" class="pwdset__input">
              </div>

              <div class="pwdset__item">
                <input type="text" placeholder="验证手机或邮箱" class="pwdset__input">
              </div>
              <div class="pwdset__yzm">
                <div class="pwdset__code">
                  <input type="text" placeholder="验证码" class="pwdset__input">
                </div>
                <div class="pwdset__btn">确认提交</div>
              </div>
            </div>
            <div class="person__btnend">
              <!-- <div class="person__homepage" v-show="personTab == 4">返回我的主页</div>             -->
              <div class="person__btnitem" :class="{'person__btnitem--active':personTab==4}" @click="changePersonTab(4)">返回我的主页</div>


              <div class="person__utstatus" v-show="personTab == 5">
                <div class="utstatus__show">
                  <div class="show__item">
                    <div class="item__userphoto">
                      <img src="" alt="">
                    </div>
                    <div class="item__username">一笑而过</div>
                    <div class="item__status">开放</div>
                  </div>
                </div>
                <div class="utstatus__btns">
                  <div class="utstatus__btn" :class="{'utstatus__btn--active':statusBtn==0}" @click="changeStatus(0)">公开</div>
                  <div class="utstatus__btn" :class="{'utstatus__btn--active':statusBtn==1}" @click="changeStatus(1)">半开放</div>
                  <div class="utstatus__btn" :class="{'utstatus__btn--active':statusBtn==2}" @click="changeStatus(2)">保密</div>
                </div>
              </div>
              <div class="person__btnitem" :class="{'person__btnitem--active':personTab==5}" @click="changePersonTab(5)">UTTER状态</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="personal__footer">
      <div class="footer__tab" @click="changeTab(0)" :class="{'footer__tab--active':footTab == 0 }">
        <strong>
          <i class="tab__quanzi"></i>
        </strong>
        <span>
          圈子
        </span>
      </div>
      <div class="footer__tab" @click="changeTab(1)" :class="{'footer__tab--active':footTab == 1}">
        <strong>
          <i class="tab__happen"></i>
        </strong>
        <span>
          发生
        </span>
      </div>
      <div class="footer__tab" @click="changeTab(2)" :class="{'footer__tab--active':footTab == 2}">
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
                // UTstyle: 'white',
                footTab: 2,
                quanziTab: 0,
                happenTab: 0,
                personTab: -1,
                lastvisitedTab: 0,
                accountTab: -1,
                statusBtn: 0
            };
        },
        props: ["UTstyle"],
        methods: {
            change() {
                this.$store.commit("changeStyle");
            },
            tourl(url) {
                tools.router.push({
                    path: url
                });
            },
            changeTab(idx) {
                this.footTab = idx;
            },
            changeQuanziTab(idx) {
                this.quanziTab = idx;
            },
            changeHappenTab(idx) {
                this.happenTab = idx;
            },
            changePersonTab(idx) {
                this.personTab = idx;
                if (idx == 4) {
                    this.$router.push({
                        path: '/whiterow/modey',
                        query: {
                            type: this.$route.query.type
                        }
                    })
                }
            },
            changeLastVisitTab(idx) {
                this.lastvisitedTab = idx;
            },
            changeAccountTab(idx) {
                this.accountTab = idx;
            },
            changeStatus(idx) {
                this.statusBtn = idx;
            }
        }
        // watch: {
        //   '$store.state.UTstyle': function (val) {
        //     this.UTstyle = val;
        //   }
        // }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
    @import "../assets/scss/tool.scss";
    .personal {
        width: 320px;
        border-width: 1px;
        border-style: solid;
        border-color: #e6e6ee;
        font-size: 14px;
        opacity: .9;
        .tab__item {
            cursor: pointer;
        }
    }
    
    input:focus {
        border: none;
    }
    
    .personal--white {
        background: #fff;
    }
    
    .personal--black {
        background: #000;
        color: #fff;
        border-color: #666666 !important;
        border-top-color: #666666 !important;
        border-bottom-color: #666666 !important;
        border-right-color: #666666 !important;
        border-left-color: #666666 !important;
        .quanzi__tab {
            border-bottom-color: #666666 !important;
        }
        .happen__tab {
            border-bottom-color: #666666 !important;
        }
        .person__btnitem {
            border-color: #fff !important;
        }
        .buyplan__books {
            border-top-color: #666666 !important;
            border-bottom-color: #666666 !important;
        }
        .lastvisited__tab {
            border-bottom-color: #666666 !important;
            .tab__item {
                border-color: #fff !important;
            }
        }
        .account__incomelist {
            border-color: #666666 !important;
        }
        .account__buylist {
            border-color: #666666 !important;
        }
        .footer__tab {
            border-top-color: #666666 !important;
            border-right-color: #666666 !important;
        }
        .utstatus__show {
            border-top-color: #666666 !important;
        }
        .lastvisited__list .list__item {
            border-bottom-color: #666666 !important;
        }
        .show__item {
            border-bottom-color: #666666 !important;
        }
        .attention__item {
            border-bottom-color: #666666 !important;
        }
        .footer__tab--active {
            color: #fff !important;
            .tab__quanzi {
                background: url("../assets/images/personal/170 用户中心-圈子-白.png") no-repeat !important;
                background-size: 100% !important;
            }
            .tab__happen {
                background: url("../assets/images/personal/171 用户中心-发生-白.png") no-repeat !important;
                background-size: 100% !important;
            }
            .tab__person {
                width: 19px;
                background: url("../assets/images/personal/172 用户中心-个人中心-白.png") no-repeat !important;
                background-size: 100% !important;
            }
        }
        .personal__quanzi {
            .tab__item--active {
                color: #fff !important;
            }
        }
        .personal__happen {
            .happen__tab {
                .tab__item--active {
                    color: #fff !important;
                }
            }
        }
        .personal__person {
            .person__lastvisited {
                .lastvisited__tab {
                    .tab__item--active {
                        background: #fff !important;
                        color: #000 !important;
                    }
                }
            }
            .person__btnitem--active {
                background: #fff !important;
                color: #000 !important;
            }
        }
        .pwdset__item {
            background: #fff;
        }
        .pwdset__code {
            background: #fff;
        }
        .pwdset__btn {
            background: #fff;
        }
        .utstatus__btn {
            border-color: #fff !important;
        }
        .utstatus__btn--active {
            background: #fff !important;
            color: #000 !important;
        }
        .account__money {
            border-bottom-color: #666666 !important;
        }
        .money__total {
            border-color: #fff !important;
        }
        .money__btn {
            background: #fff !important;
            color: #000 !important;
        }
    }
    
    .personal__box {
        width: 100%;
        overflow: hidden;
    }
    
    .personal__quanzi,
    .personal__happen,
    .personal__person {
        width: 338px;
        height: 720px;
        overflow-y: scroll;
    }
    
    .show__item {
        overflow: hidden;
        line-height: 40px;
        padding: 8px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #e6e6ee;
        font-size: 12px;
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
            overflow: hidden;
        }
        .item__usermsg {
            float: right;
            color: #999;
        }
        .item__status {
            float: right;
            display: block;
        }
    }
    
    .attention__show {
        font-size: 12px;
        .attention__item {
            overflow: hidden;
            padding: 8px;
            border-bottom-width: 1px;
            border-bottom-style: solid;
            border-bottom-color: #e6e6ee;
            line-height: 22px;
            .item__userphoto {
                width: 40px;
                height: 40px;
                float: left;
                background: #ccc;
                margin-right: 10px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .item__username {
                margin-left: 6px;
                overflow: hidden;
            }
            .item__time {
                display: block;
                float: right;
                color: #999;
            }
            .item__usermsg {}
        }
    }
    
    .personal__quanzi {
        .quanzi__tab {
            height: 60px;
            width: 100%;
            line-height: 60px;
            text-align: center;
            /* border-bottom: 1px solid #e6e6ee; */
            border-bottom-width: 1px;
            border-bottom-style: solid;
            border-bottom-color: #e6e6ee;
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
            /* border-bottom: 1px solid #e6e6ee; */
            border-bottom-width: 1px;
            border-bottom-style: solid;
            border-bottom-color: #e6e6ee;
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
                /* position: absolute;
        bottom: 36px;
        left: 0;
        right: 0; */
                margin: 0 auto;
                margin-top: 264px;
            }
        }
        .person__btnitem {
            width: 245px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            /* border: 1px solid #000000; */
            border-width: 1px;
            border-style: solid;
            border-color: #000;
            margin: 0 auto;
            margin-bottom: 20px;
            cursor: pointer;
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
                width: 108px;
                overflow: hidden;
                /* margin-right: 24px; */
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
                /* border-top: 1px solid #e6e6e6;
        border-bottom: 1px solid #e6e6e6; */
                border-top-width: 1px;
                border-top-style: solid;
                border-top-color: #e6e6e6;
                border-bottom-width: 1px;
                border-bottom-style: solid;
                border-bottom-color: #e6e6e6;
            }
        }
        .person__lastvisited {
            overflow: hidden;
            padding-bottom: 20px;
            .lastvisited__tab {
                padding-bottom: 20px;
                /* border-bottom: 1px solid #e6e6e6; */
                border-bottom-width: 1px;
                border-bottom-style: solid;
                border-bottom-color: #e6e6e6;
                overflow: hidden;
                .tab__item {
                    width: 74px;
                    height: 52px;
                    /* border: 1px solid #000; */
                    border-width: 1px;
                    border-style: solid;
                    border-color: #000;
                    line-height: 52px;
                    text-align: center;
                    float: left;
                    margin-right: 10px;
                    cursor: pointer;
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
                max-height: 250px;
                overflow-y: auto;
                .books__list {
                    padding-top: 20px;
                }
                .list__item {
                    width: 100%;
                    padding: 14px 0;
                    /* border-bottom: 1px solid #e6e6e6; */
                    border-bottom-width: 1px;
                    border-bottom-style: solid;
                    border-bottom-color: #e6e6e6;
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
        .person__account {
            padding-bottom: 20px;
            .account__money {
                padding-bottom: 20px;
                overflow: hidden;
                border-bottom-width: 1px;
                border-bottom-style: solid;
                border-bottom-color: #e6e6e6;
                .money__total {
                    float: left;
                    width: 114px;
                    height: 48px;
                    line-height: 48px;
                    border-width: 1px;
                    border-style: solid;
                    border-color: #000;
                    text-align: center;
                }
                .money__btn {
                    float: right;
                    width: 114px;
                    height: 48px;
                    line-height: 48px;
                    background: #000;
                    color: #fff;
                    text-align: center;
                }
                .money__recharge {
                    float: left;
                    position: relative;
                    width: 50%;
                    cursor: pointer;
                }
                .money__recharge::after {
                    display: block;
                    content: "";
                    float: left;
                    width: 1px;
                    background: #666;
                    height: 14px;
                    position: absolute;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    margin: auto 0;
                }
                .money__cash {
                    float: left;
                    width: 50%;
                    cursor: pointer;
                }
            }
            .account__buyrecord,
            .account__incomerecord {
                width: 100%;
                height: 50px;
                line-height: 50px;
                padding: 0 10px;
                .account__recordprice {
                    display: block;
                    float: right;
                }
            }
            .account__buylist,
            .account__incomelist {
                overflow: hidden;
                border-width: 1px;
                border-style: solid;
                border-color: #e6e6ee;
                .account__item {
                    margin: 10px;
                    padding-bottom: 10px;
                    line-height: 20px;
                    span {
                        display: block;
                        float: right;
                    }
                }
                .account__time {
                    color: #999;
                    margin-top: 2px;
                }
            }
        }
        .person__pwdset {
            .pwdset__item {
                width: 100%;
                padding: 2px 5px;
                height: 50px;
                border: 1px solid #666;
                margin-top: 20px;
            }
            .pwdset__input {
                width: 100%;
                height: 100%;
                color: #666;
                border: none;
                outline: none;
            }
            .pwdset__yzm {
                margin-top: 20px;
            }
            .pwdset__code {
                width: 114px;
                float: left;
                padding: 12px;
                border: 1px solid #666;
            }
            .pwdset__btn {
                width: 114px;
                float: right;
                background: #000;
                color: #fff;
                padding: 11px;
                border: 1px solid #666;
                text-align: center;
            }
        }
        .person__utstatus {
            .utstatus__show {
                border-top-width: 1px;
                border-top-style: solid;
                border-top-color: #e6e6ee;
                .show__item {
                    padding: 10px 0;
                }
            }
            .utstatus__btns {
                overflow: hidden;
                padding: 20px 0;
                .utstatus__btn {
                    width: 75px;
                    height: 50px;
                    line-height: 50px;
                    text-align: center;
                    float: left;
                    border-width: 1px;
                    border-style: solid;
                    border-color: #000;
                    margin-right: 10px;
                }
                .utstatus__btn:last-child {
                    margin-right: 0;
                }
                .utstatus__btn--active {
                    background: #000;
                    color: #fff;
                }
            }
        }
    }
    
    .personal__footer {
        width: 100%;
        overflow: hidden;
        .footer__tab {
            width: 33.33%;
            height: 70px;
            float: left;
            cursor: pointer;
            border-right-width: 1px;
            border-right-style: solid;
            border-right-color: #e6e6ee;
            font-size: 12px;
            text-align: center;
            padding-top: 15px;
            color: #999;
            /* border-top: 1px solid #e6e6ee; */
            border-top-width: 1px;
            border-top-style: solid;
            border-top-color: #e6e6ee;
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
                background: url("../assets/images/personal/154 用户中心-圈子.png") no-repeat;
                background-size: 100%;
            }
            .tab__happen {
                background: url("../assets/images/personal/155 用户中心-发生.png") no-repeat;
                background-size: 100%;
            }
            .tab__person {
                width: 19px;
                background: url("../assets/images/personal/156 用户中心-个人中心.png") no-repeat;
                background-size: 100%;
            }
        }
        .footer__tab:last-child {
            border-right: none;
        }
        .footer__tab--active {
            color: #000;
            .tab__quanzi {
                background: url("../assets/images/personal/162 用户中心-圈子-黑.png") no-repeat;
                background-size: 100%;
            }
            .tab__happen {
                background: url("../assets/images/personal/163 用户中心-发生-黑.png") no-repeat;
                background-size: 100%;
            }
            .tab__person {
                width: 19px;
                background: url("../assets/images/personal/164 用户中心-个人中心-黑.png") no-repeat;
                background-size: 100%;
            }
        }
    }
</style>