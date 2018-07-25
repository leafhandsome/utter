<template lang="html">
  <div class="utter">
    <!-- 轮播 -->
    <el-carousel indicator-position="none" height='412px'>
      <el-carousel-item v-for="(item, index) in centerBanner" :key="index">
          <a :href='item.url'>
        <img :src="item.poster" style="width:100%;cursor:pointer;">
    </a>
      </el-carousel-item>
    </el-carousel>
    <!-- 轮播 -->

    <!-- 3个图 -->
    <div class="newActive clearfix">
      <div class="item pull-left" v-for="(item, index) in rotateBanner" :key="index">
          <a :href='item.url'>
        <img :src="item.poster">
         </a>
      </div>

     
    </div>
    <!-- 3个图 -->

    <!-- 3个tab -->
    <div class="middleTab clearfix">
      <!-- <div class="item pull-left" :class='{"active":middleType == 1}' @click='middleType = 1'>首推</div> -->
      <div class="item pull-left" :class='{"active":middleType == 3}' @click='getnewsbook(3)'>热门</div>
      <div class="item pull-left" :class='{"active":middleType == 2}' @click='getnewsbook(2)'>新声</div>
     
    </div>
    <!-- 3个tab -->

    <!-- 书 -->
    <div v-show="middleType == 3" class="books clearfix">
      <div class="item pull-left" v-for='(item,index) in hotlist' :key="index">

        <div class="forBook" v-if='item.type==1' @click='bookspage(item.userId,item.userName)'>
          <div class="title">
           {{item.name}}
          </div>
          <div class="desc" v-html="item.cover">
          </div>
        </div>
        <div class="isBook" v-if="item.type==2">
          <img :src="item.cover" alt="">
        </div>

        <div class="user clearfix"  v-if="tools.length>0">
        <router-link :to="'/whiterow/userinfo'+'?type=white&userId='+item.userId+'&'+item.userName">
          <div class="cover pull-left">
              <img :src="item.userAvatar" alt="">
          </div>
          
          <div class="nickName pull-left">{{item.userName}}</div>
        </router-link>
          <div class="good pull-right"  >
            <!-- <img src="../assets/images/utter/good.png" alt="点赞">  -->
            <img v-if="!item.like&&!tools[index].save" src="../assets/images/publish/110 赞扬.png" alt="点赞"  @click="addgoodbook(item.id,item.type,index)"> 
                <img v-if="item.like||tools[index].save" src="../assets/images/article/good.png" alt="点赞">
           {{tools[index].save? Number(item.likeCount)+1:item.likeCount}}
          </div>

          <div class="like pull-right">
             <img v-show="tools[index].favority||item.favority" src="../assets/images/publish/130 书架-收藏-黑.png" alt="">
               <!-- <img  v-show="$route.query.type=='black'&&(tools.save||item.favority)" src="../../assets/images/publish/134 书架-收藏-白.png" alt=""> -->
            <img v-show="!tools[index].favority&&!item.favority" src="../assets/images/publish/109 收藏.png" alt="收藏" @click="addfavority(item.id,item.type,index)"> 
            {{tools[index].favority?Number(item.favorityCount)+1:item.favorityCount}}
          </div>
        </div>
      </div>
    </div>
    <!-- 书 -->
    <div v-show="middleType == 2" class="books clearfix">
            <div class="item pull-left" v-for='(item,index) in newslist' :key="index">
      
              <div class="forBook" v-if='item.type==1' @click='bookspage(item.userId,item.userName)'>
                <div class="title">
                 {{item.name}}
                </div>
                <div class="desc" v-html="item.cover">
                </div>
              </div>
              <div class="isBook" v-if="item.type==2">
                <img :src="item.cover" alt="">
              </div>
      
              <div class="user clearfix" v-if="tools.length>0">
              <router-link :to="'/whiterow/userinfo'+'?type=white&userId='+item.userId+'&'+item.userName">
                <div class="cover pull-left">
                    <img :src="item.userAvatar" alt="">
                </div>
                
                <div class="nickName pull-left">{{item.userName}}</div>
              </router-link>
                <div class="good pull-right">
                  <!-- <img src="../assets/images/utter/good.png" alt="点赞">  -->
                  <img v-if="!item.like&&!tools[index].save" src="../assets/images/publish/110 赞扬.png" alt="点赞" @click="addgoodbook(item.id,item.type,index)"> 
                   <img v-if="item.like||tools[index].save" src="../assets/images/article/good.png" alt="点赞">
                {{tools[index].save? Number(item.likeCount)+1:item.likeCount}}
                </div>
      
                <div class="like pull-right">
                     <img v-show="tools[index].favority||item.favority" src="../assets/images/publish/130 书架-收藏-黑.png" alt="">
                  <img v-show="!tools[index].favority&&!item.favority" src="../assets/images/publish/109 收藏.png" alt="收藏" @click="addfavority(item.id,item.type,index)"> 
                  {{tools[index].favority?Number(item.favorityCount)+1:item.favorityCount}}
                </div>
              </div>
            </div>
          </div>
  </div>
</template>
<script>
    export default {

        data() {
            return {
                middleType: 3,
                hotlist: [],
                newslist: [],
                tools: [],
                newstools: [],
                centerBanner: [],
                rotateBanner: []
            }
        },

        created() {
            document.querySelector("body").style.background = 'white';
            this.getbooks()
            this.getbanner()
        },
        mounted() {
            var _this = this;
            this.$store.commit('changeFooter', true)
            this.$store.commit('changeHeader', true)
            this.$store.commit('changeType', '');

        },
        methods: {
            //banner
            getbanner() {
                this.unitAjax('get', 'v1/index/banner', {}, res => {
                    if (res.code == 200) {
                        this.centerBanner = res.data.centreBannerList;
                        this.rotateBanner = res.data.rotationBannerList
                    }
                })
            },
            //点赞
            addgoodbook(id, type, index) {
                if (type == 2) {
                    this.unitAjax('post', "v1/book/like/add", {
                        bookId: Number(id)
                    }, res => {
                        if (res.code == 200) {
                            this.tools[index].save = true;
                            // this.$message('成功')
                            this.getnewsbook(this.middleType)
                        } else {
                            this.$message(res.msg)
                        }
                    })
                } else if (type == 1) {
                    this.unitAjax('post', "v1/article/like/add", {
                        articleId: Number(id)
                    }, res => {
                        if (res.code == 200) {
                            this.tools[index].save = true;
                            // this.$message('成功')
                            //    this.getnewsbook(this.middleType)
                        } else {
                            this.$message(res.msg)
                        }
                    })
                }

            },
            //收藏
            addfavority(id, type, index) {
                if (type == 2) {
                    this.unitAjax('post', "v1/book/favority/add", {
                        bookId: Number(id)
                    }, res => {
                        if (res.code == 200) {
                            this.tools[index].favority = true;
                            // this.
                            // this.$message('收藏成功')
                            // this.getnewsbook(this.middleType)
                        } else {
                            this.$message(res.msg)
                        }
                    })
                } else if (type == 1) {
                    this.unitAjax('post', "v1/article/favority/add", {
                        articleId: Number(id)
                    }, res => {
                        if (res.code == 200) {
                            this.tools[index].favority = true;
                            // this.
                            // this.$message('收藏成功')
                            // this.getnewsbook(this.middleType)
                        } else {
                            this.$message(res.msg)
                        }
                    })
                }

            },
            getnewsbook(num) {
                this.middleType = num;
                this.tools = [];
                if (this.middleType == 2) {
                    this.unitAjax('get', 'v1/index/new', {}, res => {
                        if (res.code == 200) {
                            this.newslist = res.data;
                            for (let i = 0; i < res.data.length; i++) {
                                this.tools.push({
                                    "save": false,
                                    "favority": false
                                })
                            }
                        }
                    })
                } else if (this.middleType == 3) {
                    this.getbooks()
                }
            },
            getbooks() {
                this.unitAjax('get', 'v1/index/hot', {}, res => {
                    if (res.code == 200) {
                        this.hotlist = res.data;
                        for (let i = 0; i < res.data.length; i++) {
                            this.tools.push({
                                "save": false,
                                "favority": false
                            })
                        }
                    }
                })
            },
            bookspage(userId, userName) {
                this.$router.push({
                    path: '/whiterow/publish',
                    query: {
                        type: "white",
                        userId: userId,
                        userName: userName,
                    }
                })
            },
            tourl(url) {
                tools.router.push({
                    path: url
                })
            }
        },
        components: {}
    }
</script>

<style scoped lang='scss'>
    @import "../assets/scss/tool.scss";
    .utter {
        // height: 100%;
        padding-top: 100px !important;
        @include cstyle();
        .newActive {
            margin-top: 35px;
            width: 100%;
            height: 206px;
            .item {
                width: 428px;
                height: 206px;
                background: #EEEEEE;
                margin-right: 33px;
                &:last-child {
                    margin-right: 0;
                }
                img {
                    width: 428px;
                    height: 206px;
                    cursor: pointer;
                }
            }
        }
        .middleTab {
            margin: 51px auto;
            width: 352px;
            .item {
                @include trans();
                &:hover {
                    cursor: pointer;
                    color: #000;
                }
                &.active {
                    color: #000;
                    font-weight: bold;
                }
                color: #717171;
                text-align: center;
                width: 174px;
                height: 57px;
                line-height: 57px;
                font-size: 14px;
            }
        }
        .books {
            .item {
                margin-right: 45px;
                margin-bottom: 64px;
                &:nth-child(4n) {
                    margin-right: 0;
                }
                .forBook {
                    @include trans;
                    @include hand;
                    &:hover {
                        /* @include bookAnimate; */
                        background-color:rgb(241, 238, 238);
                    }
                    width: 303px;
                    height: 372px;
                    border: 1px solid #E5E5E5;
                    padding: 50px 34px;
                    background: #fff;
                    .title {
                        font-size: 25px;
                        font-weight: bold;
                        margin-bottom: 30px;
                        user-select: none;
                    }
                    .desc {
                        max-height: 190px;
                        font-size: 14px;
                        overflow: hidden;
                        user-select: none;
                    }
                }
                .isBook {
                    @include trans;
                    @include hand;
                    &:hover {
                        @include bookAnimate;
                    }
                    border: 1px solid #E5E5E5;
                    width: 303px;
                    height: 372px;
                    // background: #EEEEEE;
                    position: relative;
                    img {
                        max-width: 303px;
                        max-height: 372px;
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        margin: auto;
                        display: block;
                    }
                }
            }
            .user {
                height: 82px;
                line-height: 82px;
                border-bottom: 1px solid #E6E6E6;
                .cover {
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    background: #C9C9C9;
                    cursor: pointer;
                    margin: 19px 15px 0 0;
                }
                .nickName {
                    font-size: 14px;
                    color: #000;
                    cursor: pointer;
                }
                .like {
                    margin-right: 30px;
                }
                .like,
                .good {
                    height: 82px;
                    line-height: 82px;
                    img {
                        position: relative;
                        /* top: 3px; */
                        margin-right: 9px;
                        cursor: pointer;
                        vertical-align: middle;
                    }
                }
            }
        }
    }
</style>