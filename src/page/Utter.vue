<template lang="html">
  <div class="utter">
    <!-- 轮播 -->
    <el-carousel indicator-position="none" height='412px'>
      <el-carousel-item>
        <img src="../assets/images/demo/1.jpg" style="width:100%;cursor:pointer;">
      </el-carousel-item>
      <el-carousel-item>
        <img src="../assets/images/demo/2.jpg" style="width:100%;cursor:pointer;">
      </el-carousel-item>
      <el-carousel-item>
        <img src="../assets/images/demo/3.jpg" style="width:100%;cursor:pointer;">
      </el-carousel-item>
    </el-carousel>
    <!-- 轮播 -->

    <!-- 3个图 -->
    <div class="newActive clearfix">
      <div class="item pull-left">
        <img src="../assets/images/demo/1.jpg">
      </div>

      <div class="item pull-left">
        <img src="../assets/images/demo/2.jpg">
      </div>

      <div class="item pull-left">
        <img src="../assets/images/demo/3.jpg">
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
      <div class="item pull-left" v-for='item in hotlist'>

        <div class="forBook" v-if='item.type==1' @click='bookspage'>
          <div class="title">
           {{item.name}}
          </div>
          <div class="desc">{{item.cover}}
          </div>
        </div>
        <div class="isBook" v-if="item.type==2">
          <img :src="item.cover" alt="">
        </div>

        <div class="user clearfix">
        <router-link :to="'/whiterow/userinfo'+'?type=white&userId='+item.userId">
          <div class="cover pull-left">
              <img :src="item.userAvatar" alt="">
          </div>
          
          <div class="nickName pull-left">{{item.userName}}</div>
        </router-link>
          <div class="good pull-right">
            <!-- <img src="../assets/images/utter/good.png" alt="点赞">  -->
            <img src="../assets/images/publish/110 赞扬.png" alt="点赞"> 
           {{item.favorityCount}}
          </div>

          <div class="like pull-right">
            <img src="../assets/images/utter/like.png" alt="收藏"> {{item.favorityCount}}
          </div>
        </div>
      </div>
    </div>
    <!-- 书 -->
    <div v-show="middleType == 2" class="books clearfix">
            <div class="item pull-left" v-for='item in newslist'>
      
              <div class="forBook" v-if='item.type==1' @click='bookspage'>
                <div class="title">
                 {{item.name}}
                </div>
                <div class="desc">{{item.cover}}
                </div>
              </div>
              <div class="isBook" v-if="item.type==2">
                <img :src="item.cover" alt="">
              </div>
      
              <div class="user clearfix">
              <router-link :to="'/whiterow/userinfo'+'?type=white&userId='+item.userId">
                <div class="cover pull-left">
                    <img :src="item.userAvatar" alt="">
                </div>
                
                <div class="nickName pull-left">{{item.userName}}</div>
              </router-link>
                <div class="good pull-right">
                  <!-- <img src="../assets/images/utter/good.png" alt="点赞">  -->
                  <img src="../assets/images/publish/110 赞扬.png" alt="点赞"> 
                 {{item.favorityCount}}
                </div>
      
                <div class="like pull-right">
                  <img src="../assets/images/utter/like.png" alt="收藏"> {{item.favorityCount}}
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
            }
        },

        created() {
            document.querySelector("body").style.background = 'white';
            this.getbooks()
        },
        mounted() {
            var _this = this;
            this.$store.commit('changeFooter', true)
            this.$store.commit('changeHeader', true)
            this.$store.commit('changeType', '');

        },
        methods: {
            getnewsbook(num) {
                this.middleType = num;
                if (this.middleType == 2) {
                    this.unitAjax('get', 'v1/index/new', {}, res => {
                        if (res.code == 200) {
                            this.newslist = res.data
                        }
                    })
                }
                //    else if(this.middleType ==3){
                //        this.getbooks()
                //    }
            },
            getbooks() {
                this.unitAjax('get', 'v1/index/hot', {}, res => {
                    if (res.code == 200) {
                        this.hotlist = res.data;
                    }
                })
            },
            bookspage() {
                this.$router.push({
                    path: '/whiterow/publish',
                    query: {
                        type: "white",
                        userId: '1'
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
                        @include bookAnimate;
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