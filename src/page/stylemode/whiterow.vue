<template>
<div  @click="showhideset" class="ut-view">
  <div class="header clearfix" :class="pagecolr=='white'?'content pagecolr-white':'content pagecolr-black'">
    <!-- 横向header -->
    <img @click='change' v-if='pagecolr == "white"' class='logo' src="../../assets/images/utter/logo.png" alt="UTTER">
    <img @click='change' v-else class='logo' src="../../assets/images/utter/logow.png" alt="UTTER">

    <div class="middleTab clearfix">
      <router-link :to="{path:'/whiterow/modey',query:{type:pagecolr,userId:$route.query.userId,userName:$route.query.userName}}" :class="$route.path=='/whiterow/modey'?'active':''">
      <div class="pull-left"  @mouseover="moveEle(0)" @mouseout="moveoOut(0)" @mousedown="moveEle(0,'none')" @click="moveoOut(0,'block')">
        <div :class="pagecolr=='white'?'tab':'tab tab-black'">首页<i></i></div>
      </div>
      </router-link>
        <router-link :to="{path:'/whiterow/myarticle',query:{type:pagecolr,userId:$route.query.userId,userName:$route.query.userName}}" :class="$route.path=='/whiterow/myarticle'?'active':''">
      <div class="pull-left"  @mouseover="moveEle(1)" @mouseout="moveoOut(1)"  @mousedown="moveEle(1,'none')" @mouseup="moveoOut(1,'block')">
        <div :class="pagecolr=='white'?'tab':'tab tab-black'">文章<i></i></div>
      </div>
       </router-link>
        <router-link :to="{path:'/whiterow/idea',query:{type:pagecolr,userId:$route.query.userId,userName:$route.query.userName}}" :class="$route.path=='/whiterow/idea'?'active':''">
      <div class="pull-left" @mouseover="moveEle(2)"  @mouseout="moveoOut(2)"  @mousedown="moveEle(2,'none')" @mouseup="moveoOut(2,'block')">
        <div :class="pagecolr=='white'?'tab':'tab tab-black'">想法<i></i></div>
      </div>
       </router-link>
        <router-link  :to="{path:'/whiterow/publish',query:{type:pagecolr,userId:$route.query.userId,userName:$route.query.userName}}" :class="$route.path=='/whiterow/publish'?'active':''">
      <div class="pull-left" @mouseover="moveEle(3)" @mouseout="moveoOut(3)"  @mousedown="moveEle(3,'none')" @mouseup="moveoOut(3,'block')">
        <div :class="pagecolr=='white'?'tab':'tab tab-black'" >书籍<i></i></div>
      </div>
       </router-link>
        <router-link  :to="{path:'/whiterow/userinfo',query:{type:pagecolr,userId:$route.query.userId,userName:$route.query.userName}}" :class="$route.path=='/whiterow/userinfo'?'active':''">
      <div class="pull-left"  @mouseover="moveEle(4)" @mouseout="moveoOut(4)"  @mousedown="moveEle(4,'none')" @mouseup="moveoOut(4,'block')">
        <div :class="pagecolr=='white'?'tab':'tab tab-black'">{{$route.query.userName||getValue('userName')}}<i></i></div>
      </div>
       </router-link>
    </div>

 
      <div class="rightTools pull-right">
          
        <div class="item"  @click.stop="getactivenave(1)">
          <img v-show="styleimg.showimg1" src="../../assets/images/utter/nav-search.png" alt="搜索">
          <img v-show="(!styleimg.showimg1||tabactive==1)&&$route.query.type=='white'" src="../../assets/images/utter/search.png" alt="搜索">
          <img v-show="(!styleimg.showimg1||tabactive==1)&&$route.query.type=='black'" src="../../assets/images/utter/searchw.png" alt="搜索">
          <input v-show="tabactive==1" type="text" :class="$route.query.type=='white'?'search white':'search black'" placeholder="寻找作者或文章...">
        </div>
        <div class="item"   @click.stop="getactivenave(2)">
          <img v-show="styleimg.showimg2" src="../../assets/images/utter/nav-creat.png" alt="创作">
          <img v-show="(!styleimg.showimg2||tabactive==2)&&$route.query.type=='white'" src="../../assets/images/utter/create.png" alt="创作">
          <img v-show="(!styleimg.showimg2||tabactive==2)&&$route.query.type=='black'" src="../../assets/images/utter/createw.png" alt="创作">
        </div>
        <!-- <div class="item"  @mouseenter="styleimg.showimg3=false" @mouseleave='styleimg.showimg3=true'>
          <img v-show="styleimg.showimg3" src="../../assets/images/utter/music.png" alt="音乐">
          <img v-show="!styleimg.showimg3" src="../../assets/images/utter/musicw.png" alt="音乐">
        </div> -->
        
        <div class="item"  @click.stop="getactivenave(4)">
          <img v-show="styleimg.showimg4" src="../../assets/images/utter/nav-msg.png" alt="消息">
          <img v-show="(!styleimg.showimg4||tabactive==4)&&$route.query.type=='white'" src="../../assets/images/utter/msg.png" alt="消息">
          <img v-show="(!styleimg.showimg4||tabactive==4)&&$route.query.type=='black'" src="../../assets/images/utter/msgw.png" alt="消息">
        </div>
        <div class="item"  @click.stop='getactivenave(5)'>
          <img v-show="styleimg.showimg5" src="../../assets/images/utter/nav-user.png" alt="个人中心">
          <img v-show="(!styleimg.showimg5||tabactive==5)&&$route.query.type=='white'" src="../../assets/images/utter/user.png" alt="个人中心">
          <img v-show="(!styleimg.showimg5||tabactive==5)&&$route.query.type=='black'" src="../../assets/images/utter/userw.png" alt="个人中心">
        </div>
      </div>


    <div class="personshow" v-show="showPersonal" @click.stop="showPersonal=true">
      <personal :UTstyle="utstyle"></personal>
    </div>
    <div class="personshow" v-show="showmsg" @click.stop="showmsg=true">
      <msg ></msg>
    </div>
  </div>
  <!-- 文章出版编辑入口 -->
  <div class="linkIdea" v-show="showlink">
      <linkIdea></linkIdea>
  </div>
   <router-view></router-view>
   <!-- <div>sdffd</div> -->
   <!-- <footer></footer> -->
   </div>
</template>

<script>
    import personal from "../../components/Personal.vue";
    import msg from "../../components/msg.vue";
    import linkIdea from "../../components/linkIdea.vue";
    // import footer from "../../components/Footer.vue";
    export default {
        data() {
            return {
                utstyle: "white",
                tab: 1,
                showPersonal: false,
                showmsg: false,
                styleimg: {
                    showimg1: true,
                    showimg2: true,
                    showimg3: true,
                    showimg4: true,
                    showimg5: true
                },
                tabactive: 0,
                pagecolr: "white", //背景颜色
                showlink: false,
                tabnum:0,
            };
        },
        props: ["type", "activeTab"],
        created() {
            this.pagecolr = this.$route.query.type;
            document.querySelector("body").style.background = this.pagecolr == "white" ? "" : "black";
            document.querySelector("#app").style.color = this.pagecolr == "white" ? "black" : "white";
            // document.querySelector("#app").style.borderColor = this.pagecolr == "white" ? "#dcdddd" : "#1b1b1b";
            console.log(document.querySelector('.active'))
        },
        mounted() {},
        methods: {
            // tab hover
            moveEle(index, dis) {
                     var tab = document.querySelector('.active>.pull-left').children[0];
               
                var tabElement = document.querySelectorAll('.tab');
                for (var i = 0; i < tabElement.length; i++) {
                    if (tabElement[i] == tab) {
                        var tabi = tab.children[0]
                        if (dis) {
                            tabi.style.display = dis;
                        } else {
                            tabi.style.transform = 'translateX(' + 100 * (index - i) + 'px)';
                        }

                    }
                }

            },
            moveoOut(index, dis) {
                if (dis) {
                    this.$store.commit('showbox', false)
                }
                var tab = document.querySelector('.active>.pull-left').children[0];
                var tabElement = document.querySelectorAll('.tab');
                for (var i = 0; i < tabElement.length; i++) {
                    if (tabElement[i] == tab) {
                        var tabi = tab.children[0];
                        if (dis) {
                            setTimeout(() => {
                                tabi.style.display = dis;
                            }, 600);

                        }
                        //   tabi.style.width=tabElement[index].offsetWidth+"px";
                        tabi.style.transform = 'translateX(0px)';
                        tabi.style.transtion = 'all 0.1s';
                    }
                }
            },
            //控制右边个人中心显示隐藏
            showhideset() {
                this.showPersonal = false;
                this.tabactive = 0;
                this.showmsg = false;
                this.showlink = false;
            },
            getuseractive() {
                this.showPersonal = true;
                this.tabactive = 5;
            },
            getactivenave(num) {
                this.tabactive = num;
                this.showlink = false;
                this.showPersonal = false;
                this.showmsg = false;
                if (num == 2) {
                    this.showlink = true;
                } else if (num == 4) {
                    this.showmsg = true;
                } else if (num == 5) {

                    this.showPersonal = true;
                    this.utstyle = this.$route.query.type;
                }
            },
            changeTab(tab, url) {
                this.tab = tab;
                if (url)
                // window.open('#/' + url + '?tab=' + tab)
                    this.$router.push(url + "?tab=" + tab);
            },
            change() {
                // this.$store.commit("changeStyle");
                this.$router.push("/index");
            },
            tourl(url) {
                tools.router.push({
                    path: url
                });
            }
        },
        activeted() {
            this.tab = 1;
        },
        watch: {
            "$store.state.utstyle": function(val) {
                this.utstyle = val;
            }
        },
        components: {
            personal,
            msg,
            linkIdea,
            // footer
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
    @import "../../assets/scss/tool.scss";
    .content {
        overflow: hidden;
        height: 100%;
    }
    
    .ut-view {
        height: 100%;
    }
    
    .header {
        height: 58px;
        position: fixed;
        top: 0;
        left: 0;
        padding: 0 30px;
        width: 100vw;
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
            .middleTab {
                .tab {
                    color: #b8b8b8;
                }
                // .active {
                //     .tab {
                //         color: #fff;
                //         font-weight: bold;
                //         border-bottom: 1px solid #fff;
                //         @include trans;
                //     }
                //     .tab-black {
                //         color: white;
                //         font-weight: bold;
                //         border-bottom: 1px solid white;
                //         @include trans;
                //     }
                // }
                .pull-left {}
            }
        }
        &.white {
            background: #ffffff;
            .rightTools {
                .item {
                    // &:hover {
                    //   @include whover();
                    // }
                    cursor: pointer;
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
                position: relative;
                cursor: pointer;
                .search {
                    width: 275px;
                    height: 35px;
                    position: absolute;
                    top: 10px;
                    right: 0;
                    outline: none;
                    padding-left: 10px;
                    border: none;
                    z-index: 15px;
                }
                .white {
                    color: black;
                    background-color: #eee;
                }
                .black {
                    color: white;
                    background-color: #1b1b1b;
                }
                img {
                    position: absolute;
                    top: 18px;
                    right: 10px;
                    z-index: 20;
                }
            }
        }
        .middleTab {
            width: 500px;
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            height: 58px;
            .tab {
                //    &:hover{
                //          &::after{
                //             
                //          }
                //     }
            }
            .active {
                .tab {
                    position: relative;
                    font-weight: bold;
                    color: #000;
                    @include trans;
                    //  transition: all 3s;
                }
                .tab-black {
                    color: white;
                }
                i {
                    width: 100%;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    border-bottom: 1px solid #000;
                    transition: all .3s;
                }
                .tab-black i {
                    color: white;
                    border-bottom: 1px solid white;
                    @include trans;
                }
            }
            .pull-left {
                width: 100px;
                text-align: center;
                vertical-align: top;
                @include hand;
                @include trans;
                // &:hover {
                //     background: rgba(0, 0, 0, 0.1);
                // }
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
    
    .personshow {
        position: fixed;
        right: 0;
        top: 58px;
        bottom: 0;
        z-index: 5;
    }
</style>