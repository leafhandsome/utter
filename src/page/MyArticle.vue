<template lang="html">
<div :class='pagecolor=="white"?"":"whitecolor"' class="container">
  <div class="myarticle clearfix" v-show='!showartice'>
    <div class="leftCate pull-left" :style='height'>
      <div class="cateList">
        <div :class="tab==1?'cate '+active:'cate '" @click='tab=1'>
          默认分类
        </div>
        <div :class="tab==2?'cate '+active:'cate '" @click='tab=2'>
          我的草稿
        </div>
        <div :class="tab==3?'cate '+active:'cate '" @click='tab=3'>
          我的收藏
        </div>
        <div class="tools clearfix">
          <div class="pull-left"  @click='openfun(1)'>
            <!-- <el-tooltip effect="dark" content="公开" placement="bottom"> -->
                 <img v-show='showopen' src="../assets/images/article/open-c.png" alt="公开">
              <img v-show='(!showopen||opentab==1)&&$route.query.type=="white"'  src="../assets/images/article/open.png" alt="公开">
              <img v-show='(!showopen||opentab==1)&&$route.query.type=="black"'  src="../assets/images/article/open-w.png" alt="公开">
            <!-- </el-tooltip> -->

          </div>
          <div class="pull-right"  @click='closefun(2)'>
            <!-- <el-tooltip effect="dark" content="保密" placement="bottom"> -->
             <img  v-show='showclose' src="../assets/images/article/close-c.png" alt="保密">
              <img  v-show='(!showclose||opentab==2)&&$route.query.type=="white"'  src="../assets/images/article/close.png" alt="保密">
              <img  v-show='(!showclose||opentab==2)&&$route.query.type=="black"'  src="../assets/images/article/close-w.png" alt="保密">
            <!-- </el-tooltip> -->
          </div>
        </div>

        <!-- <el-tooltip effect="dark" content="一键下载" placement="bottom">
          <img class='down' src="../assets/images/article/down.png" alt="一键下载">
        </el-tooltip> -->
      </div>
    </div>

    <div class="list pull-left" >
      <div class="item clearfix" @click='showartice=true'>
        <div class="leftSide pull-left">
          <div class="articleTitle" @click='tourl("articleinfo")'>
            写下你的一生
          </div>
          <div class="articleDesc">
            心的角落，没有垃圾桶能容下她的尘。<br>
            而写作，有时可以清洁内心。<br>
            UTTER/发声，至自己，或者给世界。
          </div>
        </div>
        <div class="rightSide pull-right">
          <div class="time">
            2017-11-19 / 23:59
          </div>

          <el-tooltip effect="dark" content="更多" placement="bottom">
            <img src="../assets/images/article/more.png" alt="更多" >
          </el-tooltip>
        </div>

        <div class="itemTools">
          <div class="tools">
            <el-tooltip effect="dark" content="分享" placement="right-end">
              <img src="../assets/images/article/share.png" alt="分享">
            </el-tooltip>
          </div>
          <div class="tools" @click='showartice=true'>
            <el-tooltip effect="dark" content="编辑" placement="right-end">
              <img src="../assets/images/article/edit.png" alt="编辑">
            </el-tooltip>
          </div>
          <div class="tools">
            <el-tooltip effect="dark" content="下载" placement="right-end">
              <img src="../assets/images/article/moredown.png" alt="下载">
            </el-tooltip>
          </div>
          <div class="tools">
            <el-tooltip effect="dark" content="删除" placement="right-end">
              <img src="../assets/images/article/del.png" alt="删除">
            </el-tooltip>
          </div>
        </div>
      </div>

      <div class="item clearfix">
        <div class="leftSide pull-left">
          <div class="articleTitle" @click='tourl("articleinfo")'>
            欢迎来到UTTER
          </div>
          <div class="articleDesc">
            我们以简驭繁，只为深度创作<br>
            在UTTER，你可以创作并发表你的作品，也可以自由出版你的作品。<br>
            如果有人想要了解你，也许可以给他一个你的UTTER。
          </div>
        </div>
        <div class="rightSide pull-right">
          <div class="time">
            2017-11-19 / 23:59
          </div>

          <el-tooltip effect="dark" content="更多" placement="bottom">
            <img src="../assets/images/article/more.png" alt="更多" @click='tourl("articleinfo")'>
          </el-tooltip>
        </div>

        <div class="itemTools">
          <div class="tools">
            <el-tooltip effect="dark" content="分享" placement="right-end">
              <img src="../assets/images/article/share.png" alt="分享">
            </el-tooltip>
          </div>
          <div class="tools">
            <el-tooltip effect="dark" content="编辑" placement="right-end">
              <img src="../assets/images/article/edit.png" alt="编辑">
            </el-tooltip>
          </div>
          <div class="tools">
            <el-tooltip effect="dark" content="下载" placement="right-end">
              <img src="../assets/images/article/moredown.png" alt="下载">
            </el-tooltip>
          </div>
          <div class="tools">
            <el-tooltip effect="dark" content="删除" placement="right-end">
              <img src="../assets/images/article/del.png" alt="删除">
            </el-tooltip>
          </div>
        </div>
      </div>

    </div>

    <div class="pageTools">
      <div class="innerbox clearfix">
        <div class="pull-left">
          <span>0</span><img src="../assets/images/article/prev.png" alt="上一页">
        </div>
        <div class="pull-right">
          <img src="../assets/images/article/next.png" alt="下一页"><span>1</span>
        </div>
      </div>
    </div>

    </div>
    <articleinfo v-show='showartice'></articleinfo>
  </div>
</template>

<script>
    import utheadery from "../components/Headery";
    import articleinfo from "./ArticleInfo";
    export default {
        data() {
            return {
                height: {
                    height: "0px"
                },
                height2: {
                    height: "0px"
                },
                pagecolor: "white",
                showartice: false,
                tab: 1,
                active: "",
                showclose: true,
                showopen: false,
                opentab: 1
            };
        },
        methods: {
            //是否公开
            openfun(value) {
                this.showopen = false;
                this.showclose = true;
                this.opentab = value;
            },
            closefun(value) {
                this.showclose = false;
                this.showopen = true;
                this.opentab = value;
            },
            tourl(url, query) {
                tools.router.push({
                    path: url,
                    query: query
                });
            }
        },
        created() {
            this.pagecolor = this.$route.query.type;
            this.active =
                this.$route.query.type == "white" ? "active-black" : "active-white";
        },
        mounted() {
            var _this = this;
            this.$store.commit("changeFooter", false);
            this.$store.commit("changeHeader", true);
            this.$store.commit("changeType", "user");

            this.height.height = window.innerHeight - 155 + "px";
            this.height2.height = window.innerHeight - 155 - 50 + "px";
        },
        components: {
            articleinfo
        }
    };
</script>

<style scoped lang='scss'>
    @import "../assets/scss/tool.scss";
    .container {
        height: 100%;
        /* overflow: hidden; */
    }
    
    .whitecolor {
        background: #1b1b1b;
        color: white;
    }
    
    .myarticle {
        width: 1264px;
        margin: 0 auto;
        padding-top: 135px;
        position: relative;
        .leftCate {
            // height: 886px;
            width: 310px;
            border-right: 1px solid #e6e6e6;
            margin-right: 70px;
            position: fixed;
            top: 135px;
            .cateList {
                width: 244px;
                height: 100%;
                border-top: 1px solid #e6e6e6;
                position: relative;
                .cate {
                    height: 80px;
                    border-bottom: 1px solid #e6e6e6;
                    line-height: 80px;
                    text-align: center;
                    font-size: 15px;
                    color: #a0a0a0;
                    @include hand;
                    @include trans;
                    &:hover {
                        background: rgba(0, 0, 0, 0.1);
                    }
                    &.active-white {
                        color: white;
                        font-weight: bold;
                    }
                    &.active-black {
                        color: #000;
                        font-weight: bold;
                    }
                }
                .tools {
                    border-bottom: 1px solid #e6e6e6;
                    div {
                        width: 50%;
                        height: 80px;
                        line-height: 80px;
                        text-align: center;
                        @include hand;
                        @include trans;
                        &:hover {
                            background: rgba(0, 0, 0, 0.1);
                        }
                        &:first-child {
                            border-right: 1px solid #e6e6e6;
                        }
                    }
                }
                .down {
                    position: absolute;
                    bottom: 30px;
                    left: 50%;
                    transform: translateX(-50%);
                    @include hand;
                }
            }
        }
        .list {
            width: 880px;
            // overflow-y: auto;
            margin-left: 380px;
            border-top: 1px solid #e6e6e6;
            padding-bottom: 100px;
            position: relative;
            .item {
                height: 218px;
                width: 100%;
                border-bottom: 1px solid #e6e6e6;
                padding: 40px 19px;
                position: relative;
                cursor: pointer;
                &:hover {
                    .itemTools {
                        display: block;
                    }
                }
                .leftSide {
                    // color: #000;
                    // overflow: hidden;
                    max-width: 70%;
                    .articleTitle {
                        margin-bottom: 30px;
                        font-size: 23px;
                        font-weight: bold;
                        @include hand;
                        @include trans;
                        @include copynone;
                        &:hover {
                            text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                        }
                    }
                    .articleDesc {
                        font-size: 18px;
                        line-height: 1.6;
                    }
                }
                .rightSide {
                    color: #a0a0a0;
                    font-size: 15px;
                    height: 100%;
                    position: relative;
                    img {
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        @include hand;
                    }
                }
                .itemTools {
                    border: 1px solid #e6e6e6;
                    position: absolute;
                    right: -54px;
                    width: 54px;
                    height: 219px;
                    top: -1px;
                    display: none;
                    .tools {
                        width: 54px;
                        height: 54px;
                        line-height: 54px;
                        text-align: center;
                        @include hand;
                        border-bottom: 1px solid #e6e6e6;
                        &:last-child {
                            border-bottom: none;
                        }
                    }
                }
            }
        }
        .pageTools {
            width: 880px;
            position: fixed;
            bottom: 0;
            padding-bottom: 50px;
            // background: #fff;
            height: 25px;
            line-height: 25px;
            margin-left: 380px;
            .innerbox {
                width: 200px;
                height: 25px;
                margin: 0 auto;
                @include copynone;
                position: relative;
                &:after {
                    content: "";
                    display: block;
                    position: absolute;
                    left: 50%;
                    top: 0;
                    width: 1px;
                    height: 100%;
                    background: #e6e6e6;
                }
            }
            .pull-left,
            .pull-right {
                height: 25px;
                line-height: 25px;
                @include hand;
                img {
                    height: 25px;
                }
                span {
                    display: inline-block;
                    vertical-align: top;
                    margin: 0 10px;
                }
            }
        }
    }
</style>