<template lang="html">
  <div class="idea clearfix" @click="closeshow">
    <!-- <button type="button" @click='bold' name="button">加粗</button>
    <div id='container' class="ue">

    </div> -->

    <div class="leftCate pull-left utBorder" :style='height'>
      <div class="cateList utBorder">
        <div class="cate utBorder" :class="cateTab==0?($route.query.type=='white'? ' active':' active-w'):''" @click='catefun(0)'>
          想法
        </div>
        <div class="cate utBorder" :class="cateTab==1?($route.query.type=='white'? ' active':' active-w'):''" @click='catefun(1)'>
          灵感
        </div>

      </div>
    </div>
    <!-- 想法 -->
    <div class="list pull-left utBorder" v-show="cateTab==0">
      <div class="mainItem utBorder">
        <textarea :class="$route.query.type=='white'?'ut-white1':'ut-black1 '" name="name" rows="8" cols="100" placeholder='写下你的想法吧...'></textarea>
        <el-tooltip effect="dark" content="发表" placement="bottom">
                <img v-if="!submitactive" src="../assets/images/userinfo/112 提交.png" class='submit'  @click.stop="submitactive=true">
                <img v-if="submitactive&&pagecolor=='white'" src="../assets/images/editor/issueb.png" class='submit'  @click.stop="submitactive=true">
                <img v-if="submitactive&&pagecolor=='black'" src="../assets/images/editor/issuew.png" class='submit'  @click.stop="submitactive=true">
        </el-tooltip>
        <div class="itemTools utBorder">
          <div class="tools utBorder" @click='openfun(1)'>
            <el-tooltip effect="dark" content="公开" placement="right">
              <img v-if='showopen' src="../assets/images/article/open-c.png" alt="公开">
              <img v-if='(!showopen||opentab==1)&&$route.query.type=="white"'  src="../assets/images/article/open.png" alt="公开">
              <img v-if='(!showopen||opentab==1)&&$route.query.type=="black"'  src="../assets/images/article/open-w.png" alt="公开">
              
            </el-tooltip>
          </div>
          <div class="tools"  @click='closefun(2)'>
            <el-tooltip effect="dark" content="保密" placement="right">
               <img  v-if='showclose' src="../assets/images/article/close-c.png" alt="保密">
              <img  v-if='(!showclose||opentab==2)&&$route.query.type=="white"'  src="../assets/images/article/close.png" alt="保密">
              <img  v-if='(!showclose||opentab==2)&&$route.query.type=="black"'  src="../assets/images/article/close-w.png" alt="保密">
            </el-tooltip>
          </div>

        </div>
      </div>

      <div class="items">
        <div class="item clearfix utBorder">
          <div class="leftSide">
            <div class="content">
              如果有人想要了解你，也许可以给他一个你个UTTER。
            </div>
          </div>

          <div class="rightSide clearfix">
            <div class="time">
              2017-11-19 / 23:59
            </div>
            
            <div class="tools">
              <div class="tool utBorder">
                <!-- <img src="../assets/images/article/see.png" alt="关注"> -->
                 <img src="../assets/images/publish/108 浏览.png" alt="关注">
                 <span>99</span>
              </div>
              <div class="tool">
                 <img src="../assets/images/publish/111 评论回复.png" alt="评论">
                <!-- <img src="../assets/images/article/comments.png" alt="评论">  -->
                <span>03</span>
              </div>
              <div class="tool">
                  <img src="../assets/images/publish/110 赞扬.png" alt="点赞"> 
                <!-- <img src="../assets/images/article/good.png" alt="点赞"> -->
                 <span>28</span>
              </div>
            </div>
            <el-tooltip effect="dark" content="更多" placement="bottom" class="toolright tools">
            <img v-if="!moreActive" src="../assets/images/article/more-w.png" alt="更多" @click.stop="getmoretools">
            <img v-if="pagecolor=='black'&&moreActive" src="../assets/images/article/135 书架-更多-白.png" alt="更多" @click.stop="getmoretools">
            <img v-if="pagecolor=='white'&&moreActive" src="../assets/images/article/more.png" alt="更多" @click.stop="getmoretools">
          </el-tooltip>
          </div>

          <div class="itemTools remove utBorder" v-show="showtools" @click.stop="showtools=true">
            <div class="tools utBorder"  @click.stop="gettools(1)">
              <el-tooltip effect="dark" content="编辑" placement="right-end">
                <img v-if="toolactive!=1" src="../assets/images/article/88 编辑.png" alt="编辑">
                <img v-if="$route.query.type=='white'&&toolactive==1" src="../assets/images/article/edit.png" alt="编辑">
                <img v-if="$route.query.type=='black'&&toolactive==1" src="../assets/images/article/104 编辑-白.png" alt="编辑">
              </el-tooltip>
            </div>
            <div class="tools utBorder" @click.stop="gettools(2)">
              <el-tooltip effect="dark" content="删除" placement="right-end" >
                <img v-if="toolactive!=2" src="../assets/images/article/90 删除.png" alt="删除">
                <img v-if="$route.query.type=='white'&&toolactive==2" src="../assets/images/article/del.png" alt="删除">
                <img v-if="$route.query.type=='black'&&toolactive==2"  src="../assets/images/article/105 删除-白.png" alt="删除">
              </el-tooltip>
            </div>
          </div>
        </div>

        <div class="comments">
          <div class="comment utBorder">
            <el-tooltip effect="dark" content="删除" placement="bottom" class="fr">
                 <img v-if="" src="../assets/images/article/90 删除.png" alt="删除" class='del'>
              <!-- <img  v-if="$route.query.type=='white'" src="../assets/images/article/del.png" class='del' alt="删除">
              <img else src="../assets/images/article/105 删除-白.png" alt="删除" class='del'> -->
            </el-tooltip>
            <div class="leftSide clearfix">

              <div class="cover pull-left"></div>
              <div class="info pull-left">
                <div class="nickName">用户名</div>
                <div class="content">
                  请发表你的见解或欣赏
                </div>
              </div>
            </div>

            <div class="rightSide clearfix">
              <div class="time">
                2017-11-19 / 23:59
              </div>

              <div class="tools toolright">
                <div class="tool">
                  <!-- <img src="../assets/images/article/see.png" alt="关注"> -->
                   <img src="../assets/images/publish/108 浏览.png" alt="关注">
                   <span>99</span>
                </div>
                <div class="tool">
                  <!-- <img src="../assets/images/article/comments.png" alt="评论"> -->
                   <img src="../assets/images/publish/111 评论回复.png" alt="评论">
                   <span>03</span>
                </div>
                <div class="tool">
                  <!-- <img src="../assets/images/article/good.png" alt="点赞">  -->
                  <img src="../assets/images/publish/110 赞扬.png" alt="点赞"> 
                  <span>28</span>
                </div>
              </div>

              <!-- <el-tooltip effect="dark" content="更多" placement="bottom">
                <img v-if="$route.query.type=='white'" src="../assets/images/article/more.png" class='more' alt="更多">
                <img else src="../assets/images/article/more-w.png" class='more' alt="更多">
              </el-tooltip> -->
            </div>

          </div>
        </div>
      </div>

    </div>
        <!-- 灵感 -->
        <div class="list pull-left utBorder" v-show="cateTab==1">
            <div class="mainItem utBorder">
              <textarea :class="$route.query.type=='white'?'ut-white1':'ut-black1 '" name="name" rows="8" cols="100" placeholder='写下你的灵感吧...'></textarea>
              <el-tooltip effect="dark" content="发表" placement="bottom">
                      <img v-if="!submitactive" src="../assets/images/userinfo/112 提交.png" class='submit'  @click.stop="submitactive=true">
                      <img v-if="submitactive&&pagecolor=='white'" src="../assets/images/editor/issueb.png" class='submit'  @click.stop="submitactive=true">
                      <img v-if="submitactive&&pagecolor=='black'" src="../assets/images/editor/issuew.png" class='submit'  @click.stop="submitactive=true">
              </el-tooltip>
            </div>
      
            <div class="items">
              <div class="item clearfix utBorder"  @click.stop="toolactive==3" >
                <div class="leftSide" v-show="toolactive!=3">
                  <div class="content">
                    如果有人想要了解你，也许可以给他一个你个UTTER。
                  </div>
                </div>
                <textarea v-show="toolactive==3":class="$route.query.type=='white'?'ut-white1':'ut-black1 '" 
                 name="name" rows="5" cols="100" placeholder=''></textarea>
                <div class="rightSide clearfix">
                  <div class="time">
                    2017-11-19 / 23:59
                  </div>
               
                  <el-tooltip effect="dark" content="更多" placement="bottom" class="toolright tools">
                  <img v-if="!moreActive" src="../assets/images/article/more-w.png" alt="更多" @click.stop="getmoretools">
                  <img v-if="pagecolor=='black'&&moreActive" src="../assets/images/article/135 书架-更多-白.png" alt="更多" @click.stop="getmoretools">
                  <img v-if="pagecolor=='white'&&moreActive" src="../assets/images/article/more.png" alt="更多" @click.stop="getmoretools">
                </el-tooltip>
                </div>
      
                <div class="itemTools remove utBorder" v-show="showtools" @click.stop="showtools=true">
                  <div class="tools utBorder"  @click.stop="gettools(3)">
                    <el-tooltip effect="dark" content="编辑" placement="right-end">
                      <img v-if="toolactive!=3" src="../assets/images/article/88 编辑.png" alt="编辑">
                      <img v-if="$route.query.type=='white'&&toolactive==3" src="../assets/images/article/edit.png" alt="编辑">
                      <img v-if="$route.query.type=='black'&&toolactive==3" src="../assets/images/article/104 编辑-白.png" alt="编辑">
                    </el-tooltip>
                  </div>
                  <div class="tools utBorder" @click.stop="gettools(4)">
                    <el-tooltip effect="dark" content="删除" placement="right-end" >
                      <img v-if="toolactive!=4" src="../assets/images/article/90 删除.png" alt="删除">
                      <img v-if="$route.query.type=='white'&&toolactive==4" src="../assets/images/article/del.png" alt="删除">
                      <img v-if="$route.query.type=='black'&&toolactive==4"  src="../assets/images/article/105 删除-白.png" alt="删除">
                    </el-tooltip>
                  </div>
                </div>
              </div>
      
             
            </div>
      
          </div>
      
     <div class="pageTools">
      <div class="innerbox clearfix">
        <div class="pull-left">
          <span>0</span>
          <!-- <img v-show="" src="../assets/images/article/prev.png" alt="上一页"> -->
          <img v-show="$route.query.type=='white'" src="../assets/images/article/prev-black.png" alt="上一页">
          <img  v-show="$route.query.type=='black'" src="../assets/images/article/prev-w.png" alt="上一页">
        </div>
        <div class="pull-right">
          <img v-show="$route.query.type=='white'" src="../assets/images/article/next.png" alt="">
          <img v-show="$route.query.type=='black'" src="../assets/images/article/next-w.png" alt="下一页"><span>1</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import '../../static/ue/ueditor.config.js';
    import '../../static/ue/ueditor.all.min.js';
    import '../../static/ue/lang/zh-cn/zh-cn.js'
    export default {

        data() {
            return {
                editor: null,
                height: {
                    height: '0px'
                },
                height2: {
                    height: '0px'
                },
                cateTab: 0,
                showclose: true,
                showopen: false,
                opentab: 1,
                submitactive: false,
                pagecolor: this.$route.query.type,
                moreActive: false,
                showtools: false,
                toolactive: 0,
            }
        },
        created() {},
        methods: {
            gettools(value) {
                this.toolactive = value;
            },
            closeshow() {
                this.moreActive = false;
                this.showtools = false;
                this.submitactive = false;
                this.toolactive = 0;
            },
            // 更多
            getmoretools() {
                this.moreActive = true;
                this.showtools = true;

            },
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
            //切换想法
            catefun(value) {
                this.cateTab = value;
            },
            bold() {
                this.editor.execCommand('bold');
            },
            tourl(url, query) {
                tools.router.push({
                    path: url,
                    query: query
                })
            }
        },
        mounted() {
            var _this = this;
            this.$store.commit('changeFooter', false);
            this.$store.commit('changeHeader', true);
            this.$store.commit('changeType', 'user');
            this.height.height = window.innerHeight - 155 + 'px';
            this.height2.height = window.innerHeight - 155 - 50 + 'px';
            return
            this.editor = UE.getEditor('container', {
                toolbars: [],
                autosave: false,
                enableAutoSave: false,
                wordCount: false,
                elementPathEnabled: false
            });
        },
        components: {

        }
    }
</script>

<style scoped lang='scss'>
    @import "../assets/scss/tool.scss";
    .idea {
        width: 1264px;
        margin: 0 auto;
        padding-top: 135px;
        position: relative;
        .leftCate {
            // height: 886px;
            width: 310px;
            border-right: 1px solid #E6E6E6;
            margin-right: 70px;
            position: fixed;
            top: 135px;
            .cateList {
                width: 244px;
                height: 100%;
                border-top: 1px solid #E6E6E6;
                position: relative;
                .cate {
                    height: 80px;
                    border-bottom: 1px solid #E6E6E6;
                    line-height: 80px;
                    text-align: center;
                    font-size: 15px;
                    color: #A0A0A0;
                    @include hand;
                    @include trans;
                    /* &:hover {
                        background: rgba(0, 0, 0, .1);
                    } */
                    &.active {
                        color: #000;
                        font-weight: bold;
                    }
                    &.active-w {
                        color: white;
                        font-weight: bold;
                    }
                }
            }
        }
        .list {
            width: 880px;
            // overflow-y: auto;
            margin-left: 380px;
            border-top: 1px solid #E6E6E6;
            padding-bottom: 100px;
            position: relative;
            .mainItem {
                position: relative;
                textarea {
                    border: none;
                    resize: none;
                    outline: none;
                }
                .submit {
                    position: absolute;
                    bottom: 30px;
                    right: 19px;
                    @include hand;
                }
            }
            .item,
            .mainItem,
            .comment {
                height: 218px;
                width: 100%;
                border-bottom: 1px solid #E6E6E6;
                padding: 40px 19px;
                position: relative;
                &:hover {
                    .itemTools {
                        display: block;
                    }
                }
                .rightSide {
                    color: #A0A0A0;
                    font-size: 15px;
                    position: absolute;
                    height: 25px;
                    width: 100%;
                    bottom: 30px;
                    right: 19px;
                    padding-left: 38px;
                    .more {
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        @include hand;
                    }
                    .tools {
                        position: absolute;
                        // opacity: .6;
                        bottom: 0;
                        right: 50px;
                        .tool {
                            height: 17px;
                            vertical-align: middle;
                            display: inline-block;
                            font-size: 15px;
                            margin-right: 10px;
                            @include hand;
                            &:last-child {
                                margin-right: 0;
                            }
                            span {
                                vertical-align: top;
                            }
                        }
                    }
                    .toolright {
                        right: 0;
                        cursor: pointer;
                    }
                }
                .itemTools {
                    border: 1px solid #E6E6E6;
                    position: absolute;
                    right: -54px;
                    width: 54px;
                    height: 110px;
                    bottom: -1px;
                    display: none;
                    .tools {
                        width: 54px;
                        height: 54px;
                        line-height: 54px;
                        text-align: center;
                        @include hand;
                        border-bottom: 1px solid #E6E6E6;
                        &:last-child {
                            border-bottom: none;
                        }
                    }
                }
                .remove {
                    display: block;
                }
            }
            .comments {
                position: relative;
                .del {
                    position: absolute;
                    @include hand;
                    top: 30px;
                    right: 19px;
                }
                .leftSide {
                    margin-bottom: 60px;
                    position: relative;
                    .cover {
                        width: 44px;
                        height: 44px;
                        background: black;
                    }
                    .info {
                        margin-left: 15px;
                        position: relative;
                        .nickName {
                            line-height: 11px;
                            margin-bottom: 13px;
                        }
                    }
                }
                .rightSide {}
                .comment {
                    height: auto;
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
                    content: '';
                    display: block;
                    position: absolute;
                    left: 50%;
                    top: 0;
                    width: 1px;
                    height: 100%;
                    background: #E6E6E6;
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