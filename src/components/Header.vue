<template>
  <div class="header clearfix"  @click="tabactive=0">
    <!-- 横向header -->
    <img v-if='utstyle == "white"' class='logo' src="../assets/images/utter/logo.png" alt="UTTER">
    <img  v-else class='logo' src="../assets/images/utter/logow.png" alt="UTTER">


      <div class="rightTools pull-right">
        <div class="item"  @click.stop="getactivenave(1)">
          <img v-show="styleimg.showimg1" src="../assets/images/utter/nav-search.png" alt="搜索">
          <img v-show="(!styleimg.showimg1||tabactive==1)" src="../assets/images/utter/search.png" alt="搜索">
          <!-- <img v-show="(!styleimg.showimg1||tabactive==1)&&$route.query.type=='black'" src="../assets/images/utter/searchw.png" alt="搜索"> -->
          <input v-show="tabactive==1" type="text" class="search white" placeholder="寻找作者或文章...">
        </div>
        <div class="item"  @click.stop="getactivenave(5)">
          <img v-show="styleimg.showimg5" src="../assets/images/utter/nav-user.png" alt="个人中心">
          <img v-show="(!styleimg.showimg5||tabactive==5)&&$route.query.type=='white'" src="../assets/images/utter/user.png" alt="个人中心">
          <!-- <img v-show="(!styleimg.showimg5||tabactive==5)&&$route.query.type=='black'" src="../assets/images/utter/userw.png" alt="个人中心"> -->
        </div>
      </div>

</div>
</template>

<script>
    export default {
        data() {
            return {
                utstyle: "white",
                tab: 1,
                showPersonal: false,
                styleimg: {
                    showimg1: true,
                    showimg2: true,
                    showimg3: true,
                    showimg4: true,
                    showimg5: true,
                },
                tabactive: 0,
            };
        },
        props: ["type", "activeTab"],

        created() {

        },
        methods: {
            getactivenave(num) {
                this.tabactive = num;

                if (num == 5) {
                    this.styleimg.showimg5 = false;
                    // 如果没有登录
                    if (this.getValue('userId')) {
                        this.$router.push({
                            path: "/whiterow/modey",
                            query: {
                                type: 'white'
                            }
                        })
                    } else {
                        this.$router.push('/login')
                    }

                } else if (num == 1) {
                    this.styleimg.showimg1 = false;

                }
            },
            changeTab(tab, url) {
                this.tab = tab;
                if (url)
                // window.open('#/' + url + '?tab=' + tab)
                    this.$router.push(url + "?tab=" + tab);
            },
            change() {
                this.$store.commit("changeStyle");
            },
            tourl(url) {
                tools.router.push({
                    path: url
                });
            }
        },
        activeted() {
            console.log(this.tab)
            this.tab = 1
        },
        watch: {
            "$store.state.utstyle": function(val) {
                this.utstyle = val;
            }
        },

    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
    @import "../assets/scss/tool.scss";
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
                    // &:hover {
                    //     @include bhover();
                    // }
                }
            }
            .middleTab {
                .tab {
                    color: #b8b8b8;
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
            background: #ffffff;
            .rightTools {
                .item {
                    // &:hover {
                    //     @include whover();
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
                // @include trans();
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
            .pull-left {
                width: 100px;
                text-align: center;
                vertical-align: top;
                @include hand;
                @include trans;
                // &:hover {
                //     background: rgba(0, 0, 0, 0.1);
                // }
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
    
    .personshow {
        position: fixed;
        right: 0;
        top: 58px;
        bottom: 0;
    }
</style>