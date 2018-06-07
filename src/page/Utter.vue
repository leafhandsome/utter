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
      <div class="item pull-left" :class='{"active":middleType == 1}' @click='middleType = 1'>首推</div>
      <div class="item pull-left" :class='{"active":middleType == 2}' @click='middleType = 2'>新声</div>
      <div class="item pull-left" :class='{"active":middleType == 3}' @click='middleType = 3'>热门</div>
    </div>
    <!-- 3个tab -->

    <!-- 书 -->
    <div class="books clearfix">
      <div class="item pull-left" v-for='i in 8'>

        <div class="forBook" v-if='i % 2 == 1' @click='bookspage'>
          <div class="title">
            写下你的一生
          </div>
          <div class="desc">
            写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生

            写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生

            写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生写下你的一生
          </div>
        </div>
        <div class="isBook" v-else>
          <img src="../assets/images/demo/book.jpg" alt="">
        </div>

        <div class="user clearfix">
          <div class="cover pull-left"></div>
          <div class="nickName pull-left">墨石</div>

          <div class="good pull-right">
            <img src="../assets/images/utter/good.png" alt="点赞"> 28
          </div>

          <div class="like pull-right">
            <img src="../assets/images/utter/like.png" alt="收藏"> 33
          </div>
        </div>
      </div>
    </div>
    <!-- 书 -->

  </div>
</template>
<script>


export default {

  data () {
    return {
      middleType:1
    }
  },
  methods:{
    bookspage(){
      this.$router.push({path:'/whiterow/publish',query:{type:"white",other:'books'}})
    },
  	tourl(url){
      tools.router.push({path:url})
    }
  },
  mounted(){
    var _this = this;
    this.$store.commit('changeFooter',true)
    this.$store.commit('changeHeader',true)
    this.$store.commit('changeType', '');

  },
   components:{
  }
}
</script>

<style scoped lang='scss'>
  @import "../assets/scss/tool.scss";
  .utter{
    // height: 100%;
    padding-top: 100px !important;
    @include cstyle();

    .newActive{
      margin-top: 35px;
      width: 100%;
      height: 206px;

      .item{
        width: 428px;
        height: 206px;
        background: #EEEEEE;
        margin-right: 33px;

        &:last-child{
          margin-right: 0;
        }

        img{
          width: 428px;
          height: 206px;
          cursor: pointer;
        }
      }
    }

    .middleTab{
      margin: 51px auto;
      width: 522px;

      .item{
        @include trans();
        &:hover{
          cursor: pointer;
          color: #000;
        }

        &.active{
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

    .books{
      .item{
        margin-right: 45px;
        margin-bottom: 64px;
        &:nth-child(4n){
          margin-right: 0;
        }
        .forBook{
          @include trans;
          @include hand;
          &:hover{
            @include bookAnimate;
          }
          width: 303px;
          height: 372px;
          border: 1px solid #E5E5E5;
          padding: 50px 34px;
          background: #fff;

          .title{
            font-size: 25px;
            font-weight: bold;
            margin-bottom: 30px;
            user-select:none;
          }
          .desc{
            max-height: 190px;
            font-size: 14px;
            overflow: hidden;
            user-select:none;
          }
        }
        .isBook{
          @include trans;
          @include hand;
          &:hover{
            @include bookAnimate;
          }
          border: 1px solid #E5E5E5;
          width: 303px;
          height: 372px;
          // background: #EEEEEE;
          position: relative;

          img{
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

      .user{
        height: 82px;
        line-height: 82px;
        border-bottom: 1px solid #E6E6E6;
        .cover{
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: #C9C9C9;
          margin: 19px 15px 0 0 ;
        }
        .nickName{
          font-size: 14px;
          color: #000;
        }

        .like{
          margin-right: 30px;
        }
        .like,.good{
          height: 82px;
          line-height: 82px;

          img{
            position: relative;
            top: 3px;
            margin-right: 9px;
            cursor: pointer;
          }
        }
      }

    }



  }
</style>
