<template lang="html">
<div class="container" @click="closepage">
  <div class="myarticle clearfix" v-show='!showartice'>
    <div class="leftCate pull-left utBorder" :style='height'>
      <div class="cateList utBorder">
        <div class="utBorder" :class="tab==index?'cate '+active:'cate '" @click='gettype(index,item.id)' v-for="(item, index) in typeList" :key="index">
          {{item.type}}
          <i class="fr delete" @click.stop="removetype(item.id)" v-show="!$route.query.userId"><img src="../assets/images/article/90 删除.png" alt="" ></i>
        </div>
        <!-- <div class="utBorder" :class="tab==2?'cate '+active:'cate '" @click='tab=2'>
          我的草稿
        </div>
        <div class="utBorder" :class="tab==3?'cate '+active:'cate '" @click='tab=3'>
          我的收藏
        </div> -->
        <div class="tools utBorder clearfix" v-show="!$route.query.userId">
          <div class="pull-left utBorder"  @click='openfun(1)'>
            <el-tooltip effect="dark" content="公开" placement="bottom">
                 <img v-if='showopen' src="../assets/images/article/open-c.png" alt="公开">
              <img v-if='(!showopen||opentab==1)&&$route.query.type=="white"'  src="../assets/images/article/open.png" alt="公开">
              <img v-if='(!showopen||opentab==1)&&$route.query.type=="black"'  src="../assets/images/article/open-w.png" alt="公开">
            </el-tooltip>

          </div>
          <div class="pull-right"  @click='closefun(2)'>
            <el-tooltip effect="dark" content="保密" placement="bottom">
             <img  v-if='showclose' src="../assets/images/article/close-c.png" alt="保密">
              <img  v-if='(!showclose||opentab==2)&&$route.query.type=="white"'  src="../assets/images/article/close.png" alt="保密">
              <img  v-if='(!showclose||opentab==2)&&$route.query.type=="black"'  src="../assets/images/article/close-w.png" alt="保密">
            </el-tooltip>
          </div>
        </div>

        <!-- <el-tooltip effect="dark" content="一键下载" placement="bottom">
          <img class='down' src="../assets/images/article/down.png" alt="一键下载">
        </el-tooltip> -->
      </div>
    </div>

    <div class="list pull-left utBorder" >
      <div class="item clearfix utBorder" @click='articleInfo(item)' v-for="(item, index) in articleList" :key="index"  v-show="item.open==(opentab==1)">
        
        <div class="leftSide pull-left">
          <div class="articleTitle">
            {{item.title}}
          </div>
          <div class="articleDesc"v-html="item.text">
           
          </div>
        </div>
        <div class="rightSide pull-right">
          <div class="time">
            {{item.lastUpdateTime}}
          </div>

          <el-tooltip effect="dark" content="更多" placement="bottom" v-if="!$route.query.userId">
            <img v-if="moreActive!=index" src="../assets/images/article/more-w.png" alt="更多" @click.stop="getmoretools(index)">
            <img v-if="pagecolor=='black'&&moreActive==index" src="../assets/images/article/135 书架-更多-白.png" alt="更多">
            <img v-if="pagecolor=='white'&&moreActive==index" src="../assets/images/article/more.png" alt="更多" >
          </el-tooltip>
        </div>

        <div class="itemTools utBorder" v-show="showtools==index" @click.stop="showtools=index">
          <div class="tools utBorder" @click="gettools(1)">
            <el-tooltip effect="dark" content="分享" placement="right">
              <img v-if="pagecolor=='white'&&tabactive==1" src="../assets/images/article/share.png" alt="分享">
              <img v-if="pagecolor=='black'&&tabactive==1" src="../assets/images/article/103 分享-白.png" alt="分享">
              <img v-if="tabactive!=1" src="../assets/images/article/87 分享.png" alt="分享">
            </el-tooltip>
          </div>
          <div class="tools utBorder"  @click="gettools(2,item)">
            <el-tooltip effect="dark" content="编辑" placement="right">
              <img  v-if="pagecolor=='white'&&tabactive==2" src="../assets/images/article/edit.png" alt="编辑">
              <img v-if="pagecolor=='black'&&tabactive==2" src="../assets/images/article/104 编辑-白.png" alt="编辑">
              <img v-if="tabactive!=2" src="../assets/images/article/88 编辑.png" alt="编辑">
            </el-tooltip>
          </div>
          <div class="tools utBorder" @click="gettools(3)">
            <el-tooltip effect="dark" content="下载" placement="right">
              <img  v-if="pagecolor=='white'&&tabactive==3" src="../assets/images/article/moredown.png" alt="下载">
              <img  v-if="pagecolor=='black'&&tabactive==3" src="../assets/images/article/105 下载-白.png" alt="下载">
              <img  v-if="tabactive!=3" src="../assets/images/article/89 下载.png" alt="下载">
            </el-tooltip>
          </div>
          <div class="tools utBorder" @click="gettools(4,item)">
            <el-tooltip effect="dark" content="删除" placement="right">
              <img  v-if="pagecolor=='white'&&tabactive==4" src="../assets/images/article/del.png" alt="删除">
              <img  v-if="pagecolor=='black'&&tabactive==4" src="../assets/images/article/105 删除-白.png" alt="删除">
              <img  v-if="tabactive!=4" src="../assets/images/article/90 删除.png" alt="删除">
            </el-tooltip>
          </div>
        </div>
      </div>

    </div>

    <div class="pageTools">
      <div class="innerbox clearfix">
        <div class="pull-left">
            <!-- <span>{{ideapage}}</span> -->
            <img v-show="ideapage==1" src="../assets/images/article/prev.png" alt="上一页">
            <img v-show="$route.query.type=='white'&&ideapage!=1" src="../assets/images/article/prev-black.png" alt="上一页" @click="prepage">
            <img  v-show="$route.query.type=='black'&&ideapage!=1" src="../assets/images/article/prev-w.png" alt="上一页" @click="prepage">
          </div>
          <div class="pageindex">{{ideapage}}</div>
          <div class="pull-right">
              <a href='javascript:;'>
              <img v-show="ideapage >=Math.ceil(this.ideaTotal / 3)" src="../assets/images/article/next-a.png" alt="">
            <img v-show="$route.query.type=='white'&&ideapage <Math.ceil(this.ideaTotal / 3)" src="../assets/images/article/next.png" alt=""  @click="nextpage">
            <img v-show="$route.query.type=='black'&&ideapage <Math.ceil(this.ideaTotal / 3)" src="../assets/images/article/next-w.png" alt="下一页" @click="nextpage">
            <!-- <span>{{Math.ceil(this.ideaTotal / 2)}}</span> -->
          </a>
          </div>
      </div>
    </div>

    </div>
    <articleinfo v-show='showartice' :message="itemInfo"></articleinfo>
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
                tab: 0,
                active: "",
                showclose: true,
                showopen: false,
                opentab: 1,
                tools: [],

                tabactive: 0,
                moreActive: -1,
                showtools: -1,
                articleList: [],
                typeList: [],
                typeid: '',
                itemInfo: {},
                deleteIcon: -1,
                ideapage: 1,
                ideaTotal: 1,
            };
        },
        created() {
            this.pagecolor = this.$route.query.type;
            this.active = this.$route.query.type == "white" ? "active-black" : "active-white";
            this.gettypeList()


        },
        methods: {
            // 文章翻页
            nextpage() {
                console.log(this.ideapage,this.ideaTotal)
                this.ideapage++
                    this.getarticle()

            },
            prepage() {
                if (this.ideapage > 1) {
                    this.ideapage--;
                    this.getarticle()
                } else {
                    this.ideapage = 1
                }

            },
            removetype(id) {
                this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.unitAjax('delete', 'v1/article/type/delete', {
                        id: id
                    }, res => {
                        if (res.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.gettypeList()
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //详情
            articleInfo(item) {
                this.showartice = true;
                this.itemInfo = item;
            },
            //分类列表
            gettypeList() {
                this.unitAjax('get', 'v1/article/type/list', {}, res => {
                    if (res.code == 200) {
                        this.typeList = res.data;
                        this.typeid = res.data[0].id;
                        if (res.data.length == 2) {
                            this.creatdefaultType()
                        }
                        if (this.typeid) {
                            this.getarticle()
                        }

                    }
                })
            },
            creatdefaultType() {
                this.unitAjax('post', 'v1/article/type/add', {
                    type: "默认分类",
                    isDefault: true
                }, res => {
                    if (res.code == 200) {
                        //调用
                        this.gettypeList()
                    }
                })
            },
            gettype(index, id) {
                this.ideapage = 1;
                this.tab = index;
                this.typeid = id;
                this.getarticle()
            },
            //获取列表信息
            getarticle() {
                let params = {
                    page: this.ideapage,
                    pageSize: 3,
                    typeId: this.typeid,
                    // userId: '',
                }
                this.unitAjax('get', 'v1/article/list', params, res => {
                    if (res.code == 200) {
                        this.articleList = res.data.rows;
                        this.ideaTotal = res.data.total;
                    }
                })
            },
            // 工具栏
            gettools(value, item) {
                this.tabactive = value;
                if (value == 2) {
                    // this.$store.state.articleText=item
                    this.$store.commit("articleText", item);
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
                    //删除文章
                    this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.unitAjax('delete', 'v1/article/delete', {
                            articleId: item.id
                        }, res => {
                            if (res.code == 200) {
                                if (res.code == 200) {
                                    this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
                                    this.getarticle()
                                }
                            }
                        })

                    }).catch(() => {

                        this.moreActive = -1;
                        this.showtools = -1;
                        this.tabactive = 0;
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });


                }
            },
            getmoretools(index) {
                if (this.morenum != index) {
                    this.moreActive = -1;
                    this.showtools = -1;
                    this.tabactive = 0;
                }
                this.morenum = index;
                this.moreActive = index;
                this.showtools = index;

            },
            //关闭页面
            closepage() {
                this.showtools = -1;
                this.moreActive = -1;
                this.tabactive = 0;
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
    /*     
    .whitecolor {
        background: #1b1b1b;
        color: white;
    } */
    
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
                .delete {
                    position: absolute;
                    right: 0;
                    width: 30px;
                    font-size: 30px;
                    // transform: rotate(45deg);
                    height: 80px;
                    line-height: 70px;
                    display: none;
                   img{
                        vertical-align: middle;
                   }
                }
                .cate:hover i {
                    display: inline;
                }
                .cate {
                    height: 80px;
                    border-bottom: 1px solid #e6e6e6;
                    line-height: 80px;
                    text-align: center;
                    font-size: 15px;
                    color: #a0a0a0;
                    vertical-align: middle;
                    @include hand;
                    @include trans;
                    /* &:hover {
                        background: rgba(0, 0, 0, 0.1);
                    } */
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
                        // &:hover {
                        //     background: rgba(0, 0, 0, 0.1);
                        // }
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
                /* &:hover {
                    .itemTools {
                        display: block;
                    }
                } */
                .leftSide {
                    // color: #000;
                    // overflow: hidden;
                    max-width: 70%;
                    .articleTitle {
                        margin-bottom: 30px;
                        font-size: 22px;
                        font-weight: bold;
                        @include hand;
                        @include trans;
                        @include copynone;
                        &:hover {
                            text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                        }
                    }
                    .articleDesc {
                        font-size: 15px;
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
                    /* display: none; */
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
                /* &:after {
                    content: "";
                    display: block;
                    position: absolute;
                    left: 50%;
                    top: 0;
                    width: 1px;
                    height: 100%;
                    background: #e6e6e6;
                } */
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
</style>