<template lang="html">
  <div class="articleinfo" @click="showmore=false">

    <div class="article">
      <div class="titleBox clearfix">
        <div class="pull-left">
         {{infolist.title}}
        </div>
        <div class="pull-right">
          <div class="time">{{infolist.lastUpdateTime}}</div>
          <div class="nickName">UTTER</div>
        </div>
      </div>
      <div class="desc" v-html="infolist.text">
      
      </div>

      <div class="tools clearfix">
        <div class="pull-left">
          <div class="tool">
            <img src="../assets/images/article/see.png" alt="关注"> <span>{{message.viewCount}}</span>
          </div>
          <div class="tool">
              <a href='javascript:;'>
            <img src="../assets/images/article/keep.png" alt="收藏"> 
            </a>
            <span>{{message.commentCount}}</span>
          </div>
          <div class="tool">
              <a href='javascript:;'>
              <img v-if="!message.like&&!showgood" src="../assets/images/publish/110 赞扬.png" alt="点赞" @click="setgood(message.id,message.likeCount)"> 
                <img v-if="$route.query.type=='white'&&(message.like||showgood)" src="../assets/images/article/good.png" alt="点赞">
                <img v-if="$route.query.type=='black'&&(message.like||showgood)" src="../assets/images/publish/120 赞扬-白.png" alt="点赞">
            </a>
            <span v-show="!showgood">{{message.likeCount}}</span>
            <span v-show="showgood">{{likeCount}}</span>
          </div>
        </div>
        <div class="pull-right">
          <div class="pageTools">
              <div class="itemTools utBorder" v-show='showmore' @click.stop="showmore=true">
                  <a href="javaScript:;" class="tools utBorder"  @click="gettools(1)">
                    <el-tooltip effect="dark" content="分享" placement="top">
                        <img v-if="pagecolor=='white'&&tabactive==1" src="../assets/images/article/share.png" alt="分享">
                        <img v-if="pagecolor=='black'&&tabactive==1" src="../assets/images/article/103 分享-白.png" alt="分享">
                        <img v-if="tabactive!=1" src="../assets/images/article/87 分享.png" alt="分享">
                    </el-tooltip>
                  </a>
                  <a href="javaScript:;" class="tools utBorder"  @click="gettools(2,message)">
                    <el-tooltip effect="dark" content="编辑" placement="top">
                        <img  v-if="pagecolor=='white'&&tabactive==2" src="../assets/images/article/edit.png" alt="编辑">
                        <img v-if="pagecolor=='black'&&tabactive==2" src="../assets/images/article/104 编辑-白.png" alt="编辑">
                        <img v-if="tabactive!=2" src="../assets/images/article/88 编辑.png" alt="编辑">
                    </el-tooltip>
                  </a>
                  <a href="javaScript:;" class="tools utBorder"  @click="gettools(3)">
                    <el-tooltip effect="dark" content="下载" placement="top">
                        <img  v-if="pagecolor=='white'&&tabactive==3" src="../assets/images/article/moredown.png" alt="下载">
                        <img  v-if="pagecolor=='black'&&tabactive==3" src="../assets/images/article/105 下载-白.png" alt="下载">
                        <img  v-if="tabactive!=3" src="../assets/images/article/89 下载.png" alt="下载">
                    </el-tooltip>
                  </a>
                  <a href="javaScript:;" class="tools utBorder"  @click="gettools(4)">
                    <el-tooltip effect="dark" content="删除" placement="top">
                        <img  v-if="pagecolor=='white'&&tabactive==4" src="../assets/images/article/del.png" alt="删除">
                        <img  v-if="pagecolor=='black'&&tabactive==4" src="../assets/images/article/105 删除-白.png" alt="删除">
                        <img  v-if="tabactive!=4" src="../assets/images/article/90 删除.png" alt="删除">
                    </el-tooltip>
                  </a>
                </div>
            <div class="innerbox clearfix">
               <div class="pull-left">
                <span>{{ideapage}}</span>
                <img v-show="ideapage==1" src="../assets/images/article/prev.png" alt="上一页">
                <img v-show="$route.query.type=='white'&&ideapage!=1" src="../assets/images/article/prev-black.png" alt="上一页" @click="prepage">
                <img  v-show="$route.query.type=='black'&&ideapage!=1" src="../assets/images/article/prev-w.png" alt="上一页" @click="prepage">
                </div>
              <a href='javaScript:;'>
                <img v-show="!showmore" class="more" src="../assets/images/article/more-w.png" alt="" @click.stop="showmore=true">
              <img v-show="$route.query.type=='white'&&showmore" class="more" src="../assets/images/article/more.png" alt="" @click.stop="showmore=true">
              <img v-show="$route.query.type=='black'&&showmore" class="more" src="../assets/images/article/135 书架-更多-白.png" alt="" @click.stop="showmore=true">
              </a>
                <div class="pull-right">
                <a href='javascript:;' v-if="message.details">
                <img v-show="ideapage ==message.details.length" src="../assets/images/article/next-a.png" alt="">
            <img v-show="$route.query.type=='white'&&ideapage !=message.details.length" src="../assets/images/article/next.png" alt=""  @click="nextpage">
            <img v-show="$route.query.type=='black'&&ideapage !=message.details.length" src="../assets/images/article/next-w.png" alt="下一页" @click="nextpage">
            <span>{{message.details.length}}</span>
            </a>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="comment">
      <div class="arrowBox">
        <div class="innerBox" :class="$route.query.type=='white'?'ut-white1':'ut-black1'">
          <img v-show="$route.query.type=='white'" src="../assets/images/article/commentl.png">
          <img  v-show="$route.query.type=='black'"  src="../assets/images/article/commentl-w.png">
        </div>
      </div>

      <div class="sendBox clearfix">
        <div class="cover pull-left"></div>
        <div class="info pull-left">
          <div class="nickName">用户名</div>
          <textarea name="name" placeholder="请发表你的见解或欣赏" v-model="commentText"></textarea>
        </div>
        <div  @click="submitactive=true">
        <img v-show="!submitactive" src="../assets/images/userinfo/112 提交.png" class='submit' @click="sendsayInfo">
        <img v-show="submitactive&&pagecolor=='white'" src="../assets/images/editor/issueb.png" class='submit'>
        <img v-show="submitactive&&pagecolor=='black'" src="../assets/images/editor/issuew.png" class='submit'>
       </div>
      </div>

      <div class="item clearfix" v-for="(item, index) in saylist" :key="index">
        <img src="../assets/images/article/del.png" class='del' alt="删除" @click="removeArticle(item.id)">

        <div class="clearfix">
          <div class="cover pull-left"></div>
          <div class="info pull-left">
            <div class="nickName">{{item.penName}}</div>
            <div class="content">
              {{item.comment}}
            </div>
          </div>
        </div>

        <div class="commentBottom clearfix">
          <div class="time pull-left">{{item.createTime}}</div>

          <div class="tools pull-right">
            <!-- <div class="tool">
              <img src="../assets/images/article/see.png" alt="关注"> <span>99</span>
            </div> -->
            <div class="tool">
              <img src="../assets/images/article/comments.png" alt="评论"> <span>03</span>
            </div>
            <div class="tool">
              <img src="../assets/images/article/good.png" alt="点赞"> <span>28</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        props: ["message"],
        data() {
            return {
                pagecolor: this.$route.query.type,
                showmore: false,
                tabactive: 0,
                submitactive: false,
                ideapage: 1,
                ideaTotal: '',
                infolist: [],
                commentText: "",
                pageinspriation: 50,
                saylist: [],
                showgood: false,
                likeCount: ''
            };
        },
        created() {

        },
        watch: {
            'message': function() {
                this.infolist = this.message.details[0]
                this.getsaylist()
            }
        },
        methods: {
            setgood(id, count) {
                this.unitAjax('post', 'v1/article/like/add', {
                    articleId: Number(id)
                }, res => {
                    if (res.code == 200) {
                        this.showgood = true;
                        this.likeCount = count++
                    }
                })
            },
            removeArticle(id) {
                this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.unitAjax('delete', 'v1/article/comment/delete', {
                        commentId: id
                    }, res => {
                        if (res.code == 200) {
                            if (res.code == 200) {

                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                this.getsaylist()
                            }
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            //获取评论列表
            getsaylist() {
                let params = {
                    page: "1",
                    pageSize: "50",
                    articleId: this.message.id
                }
                this.unitAjax('get', 'v1/article/comment/list', params, res => {
                    if (res.code == 200) {
                        this.saylist = res.data.rows
                    } else {

                    }
                })
            },
            // ·发表评论
            sendsayInfo() {
                if (this.commentText) {
                    let params = {
                        articleId: Number(this.message.id),
                        replyUserId: '',
                        commentText: this.commentText
                    }
                    this.submitactive = true
                    this.unitAjax('post', 'v1/article/comment/add', params, res => {
                        this.submitactive = false;
                        if (res.code == 200) {
                            this.commentText = "";

                            this.getsaylist()
                        } else {
                            this.$message.error(res.msg)
                        }
                    })

                }
            },
            // 翻页
            nextpage() {
                if (this.ideapage == this.ideaTotal) {
                    this.ideapage = this.ideaTotal
                } else {
                    this.ideapage++;
                    this.infolist = this.message.details[this.ideapage - 1]
                }

            },
            prepage() {
                if (this.ideapage > 1) {
                    this.ideapage--;
                    this.infolist = this.message.details[this.ideapage - 1]
                } else {
                    this.ideapage = 1
                }

            },
            // 工具栏
            gettools(value, item) {
                this.tabactive = value;
                if (value == 2) {
                    this.$store.state.articleText = item
                    this.$router.push({
                        path: '/editor',
                        query: {
                            editor: 'publish',
                            type: this.$route.query.type,
                            id: item.identify,
                            typeId: item.typeId
                        }
                    })
                }
                if (value == 4) {
                    console.log(44)
                        //删除文章
                    this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.unitAjax('delete', 'v1/article/delete', {
                            articleId: this.message.id
                        }, res => {
                            if (res.code == 200) {
                                if (res.code == 200) {

                                    this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
                                    history.go(0)
                                        // this.$router.push({
                                        //     path: '/whiterow/myarticle',
                                        //     query: {
                                        //         type: this.$route.query.type
                                        //     }
                                        // })
                                }
                            }
                        })

                    }).catch(() => {
                        this.showmore = false;
                        this.tabactive = 0;
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }

            },
            tourl(url, query) {
                tools.router.push({
                    path: url,
                    query: query
                });
            }
        },
        mounted() {
            var _this = this;
            this.$store.commit("changeFooter", false);
            this.$store.commit("changeHeader", true);
            this.$store.commit("changeType", "user");
        },
        components: {}
    };
</script>

<style scoped lang='scss'>
    @import "../assets/scss/tool.scss";
    .articleinfo {
        width: 1040px;
        margin: 0 auto;
        padding-top: 135px;
        .article {
            .titleBox {
                height: 100px;
                border-top: 1px solid #e6e6e6;
                border-bottom: 1px solid #e6e6e6;
                padding: 0 18px;
                .pull-left {
                    font-size: 25px;
                    font-weight: bold;
                    color: #000;
                    line-height: 100px;
                    @include copynone;
                }
                .pull-right {
                    height: 100px;
                    text-align: right;
                    padding-top: 26px;
                    .time {
                        margin-bottom: 10px;
                        font-size: 15px;
                    }
                    .nickName {
                        /* font-weight: bold; */
                    }
                }
            }
            .desc {
                padding: 40px 18px;
                line-height: 1.5;
                @include copynone;
            }
            .tools {
                padding: 0 18px;
                margin-top: 50px;
                .pull-left {
                    .tool {
                        height: 17px;
                        vertical-align: middle;
                        display: inline-block;
                        font-size: 15px;
                        margin-right: 10px;
                        span {
                            vertical-align: middle;
                        }
                    }
                }
                .pull-right {
                    .pageTools {
                        width: 200px;
                        height: 25px;
                        line-height: 25px;
                        position: relative;
                        .itemTools {
                            position: absolute;
                            top: -70px;
                            left: -10px;
                            width: 300px;
                            .tools {
                                margin: 0;
                                padding: 0;
                                float: left;
                                border: 1px solid;
                                width: 54px;
                                height: 54px;
                                line-height: 54px;
                                text-align: center;
                            }
                        }
                        .innerbox {
                            width: 200px;
                            height: 25px;
                            margin: 0 auto;
                            @include copynone;
                            position: relative;
                            .more {
                                position: absolute;
                                left: 50%;
                                top: 50%;
                                transform: translate3d(-50%, -50%, 0);
                                width: 20px;
                                height: 18px;
                            }
                            // &:after {
                            //     content: '';
                            //     display: block;
                            //     position: absolute;
                            //     left: 50%;
                            //     top: 50%;
                            //     transform: translate3d(-50%, -50%, 0);
                            //     width: 20px;
                            //     height: 18px;
                            //     background: url('../assets/images/article/more.png') no-repeat 0 0;
                            //     background-size: 20px 18px;
                            //     opacity: .6;
                            // }
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
                                vertical-align: middle;
                                margin: 0 10px;
                            }
                        }
                    }
                }
            }
        }
        .comment {
            margin-bottom: 200px;
            .arrowBox {
                height: 22px;
                margin-top: 25px;
                position: relative;
                &:after {
                    content: "";
                    width: 100%;
                    height: 1px;
                    position: absolute;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                    background: #e6e6e6;
                    z-index: -1;
                }
                .innerBox {
                    width: 100px;
                    height: 22px;
                    text-align: center;
                    margin: 0 auto;
                }
            }
            .sendBox {
                height: 178px;
                padding-left: 17px;
                padding-top: 29px;
                position: relative;
                border-bottom: 1px solid #e6e6e6;
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
                    textarea {
                        border: none;
                        resize: none;
                        outline: none;
                        width: 900px;
                        height: 100px;
                    }
                }
                .submit {
                    position: absolute;
                    right: 10px;
                    bottom: 15px;
                    @include hand;
                    padding: 5px 0;
                }
            }
            .item {
                padding: 29px 17px;
                position: relative;
                border-bottom: 1px solid #e6e6e6;
                .del {
                    position: absolute;
                    top: 26px;
                    right: 16px;
                    opacity: 0.6;
                    @include hand;
                }
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
                .commentBottom {
                    margin-top: 35px;
                    .time {
                        color: #9f9f9f;
                        font-size: 15px;
                    }
                    .tools {
                        opacity: 0.6;
                        .tool {
                            height: 17px;
                            vertical-align: middle;
                            display: inline-block;
                            font-size: 15px;
                            margin-right: 10px;
                            &:last-child {
                                margin-right: 0;
                            }
                            span {
                                vertical-align: middle;
                            }
                        }
                    }
                }
            }
        }
    }
</style>