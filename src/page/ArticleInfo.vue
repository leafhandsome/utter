<template lang="html">
  <div class="articleinfo">

    <div class="article">
      <div class="titleBox clearfix">
        <div class="pull-left">
          写下你的一生
        </div>
        <div class="pull-right">
          <div class="time">2017-11-19 / 23:59</div>
          <div class="nickName">UTTER</div>
        </div>
      </div>
      <div class="desc">
        心的角落，没有垃圾桶能容下她的尘。<br>
        而写作，有时可以清洁内心。<br>
        UTTER/发声，至自己，或者给世界。<br><br><br>

        我们以简驭繁，只为深度创作<br>
        在UTTER，你可以创作并发表你的作品，也可以自由出版你的作品。<br>
        如果有人想要了解你，也许可以给他一个你的UTTER。
      </div>

      <div class="tools clearfix">
        <div class="pull-left">
          <div class="tool">
            <img src="../assets/images/article/see.png" alt="关注"> <span>99</span>
          </div>
          <div class="tool">
            <img src="../assets/images/article/keep.png" alt="收藏"> <span>03</span>
          </div>
          <div class="tool">
            <img src="../assets/images/article/good.png" alt="点赞"> <span>28</span>
          </div>
        </div>
        <div class="pull-right">
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
      </div>
    </div>

    <div class="comment">
      <div class="arrowBox">
        <div class="innerBox">
          <img src="../assets/images/article/commentl.png">
        </div>
      </div>

      <div class="sendBox clearfix">
        <div class="cover pull-left"></div>
        <div class="info pull-left">
          <div class="nickName">用户名</div>
          <textarea name="name" placeholder="请发表你的见解或欣赏"></textarea>
        </div>

        <img src="../assets/images/article/submit.png" class='submit'>
      </div>

      <div class="item clearfix">
        <img src="../assets/images/article/del.png" class='del' alt="删除">

        <div class="clearfix">
          <div class="cover pull-left"></div>
          <div class="info pull-left">
            <div class="nickName">用户名</div>
            <div class="content">
              请发表你的见解或欣赏
            </div>
          </div>
        </div>

        <div class="commentBottom clearfix">
          <div class="time pull-left">2017-11-19 / 23:59</div>

          <div class="tools pull-right">
            <div class="tool">
              <img src="../assets/images/article/see.png" alt="关注"> <span>99</span>
            </div>
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

  data () {
    return {

    }
  },
  methods:{
    tourl(url,query){
      tools.router.push({path:url,query:query})
    }
  },
  mounted(){
    var _this = this;
    this.$store.commit('changeFooter',false);
    this.$store.commit('changeHeader',true);
    this.$store.commit('changeType', 'user');
  },
   components:{

  }
}
</script>

<style scoped lang='scss'>
  @import "../assets/scss/tool.scss";
  .articleinfo{
    width: 1040px;
    margin: 135px auto 0;

    .article{
      .titleBox{
        height: 100px;
        border-top: 1px solid #E6E6E6;
        border-bottom: 1px solid #E6E6E6;
        padding: 0 18px;

        .pull-left{
          font-size: 25px;
          font-weight: bold;
          color: #000;
          line-height: 100px;
          @include copynone;
        }
        .pull-right{
          height: 100px;
          text-align: right;
          padding-top: 26px;

          .time{
            margin-bottom: 10px;
            font-size: 15px;
          }
          .nickName{
            font-weight: bold;
          }
        }
      }

      .desc{
        padding: 40px 18px;
        line-height: 1.5;
        @include copynone;
      }

      .tools{
        padding: 0 18px;
        margin-top: 50px;

        .pull-left{
          .tool{
            height: 17px;
            vertical-align: middle;
            display: inline-block;
            font-size: 15px;
            margin-right: 10px;

            span{
              vertical-align: top;
            }
          }
        }

        .pull-right{

          .pageTools{
            width: 200px;
            height: 25px;
            line-height: 25px;

            .innerbox{
              width: 200px;
              height: 25px;
              margin: 0 auto;
              @include copynone;
              position: relative;
              &:after{
                content: '';
                display: block;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate3d(-50%,-50%,0);
                width: 20px;
                height: 18px;
                background: url('../assets/images/article/more.png') no-repeat 0 0;
                background-size: 20px 18px;
                opacity: .6;
              }
            }

            .pull-left,.pull-right{
              height: 25px;
              line-height: 25px;
              @include hand;
              img{
                height: 25px;
              }

              span{
                display: inline-block;
                vertical-align: top;
                margin: 0 10px;
              }
            }
          }

        }
      }

    }

    .comment{
      margin-bottom: 200px;
      .arrowBox{
        height: 22px;
        margin-top: 25px;
        position: relative;
        &:after{
          content: '';
          width: 100%;
          height: 1px;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          background: #E6E6E6;
          z-index: -1;
        }

        .innerBox{
          width: 100px;
          height: 22px;
          text-align: center;
          margin: 0 auto;
          background: #fff;
        }
      }

      .sendBox{
        height: 178px;
        padding-left: 17px;
        padding-top: 29px;
        position: relative;
        border-bottom: 1px solid #E6E6E6;

        .cover{
          width: 44px;
          height: 44px;
          background: black;
        }

        .info{
          margin-left: 15px;
          position: relative;
          .nickName{
            line-height: 11px;
            margin-bottom: 13px;
          }
          textarea{
            border: none;
            resize: none;
            outline:none;
            width: 900px;
            height: 100px;
          }
        }
        .submit{
          position: absolute;
          right: 13px;
          bottom: 15px;
          @include hand;
          padding: 5px 0;
        }
      }

      .item{
        padding: 29px 17px;
        position: relative;
        border-bottom: 1px solid #E6E6E6;

        .del{
          position: absolute;
          top: 26px;
          right: 16px;
          opacity: .6;
          @include hand;
        }

        .cover{
          width: 44px;
          height: 44px;
          background: black;
        }

        .info{
          margin-left: 15px;
          position: relative;
          .nickName{
            line-height: 11px;
            margin-bottom: 13px;
          }
        }


        .commentBottom{
          margin-top: 35px;
          .time{
            color: #9F9F9F;
            font-size: 15px;
          }
          .tools{
            opacity: .6;

              .tool{
                height: 17px;
                vertical-align: middle;
                display: inline-block;
                font-size: 15px;
                margin-right: 10px;

                &:last-child{
                  margin-right: 0;
                }
                span{
                  vertical-align: top;
                }
              }
          }

        }


      }
    }


  }
</style>
