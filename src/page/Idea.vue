<template lang="html">
  <div class="idea clearfix">
    <!-- <button type="button" @click='bold' name="button">加粗</button>
    <div id='container' class="ue">

    </div> -->

    <div class="leftCate pull-left" :style='height'>
      <div class="cateList">
        <div :class="cateTab==0? 'cate active':'cate'" @click='catefun(0)'>
          想法
        </div>
        <div :class="cateTab==1? 'cate active':'cate'" @click='catefun(1)'>
          灵感
        </div>

      </div>
    </div>

    <div class="list pull-left">
      <div class="mainItem">
        <textarea name="name" rows="8" cols="80" placeholder='写下你的想法吧...'></textarea>

        <el-tooltip effect="dark" content="发表" placement="bottom">
          <img src="../assets/images/article/submit.png" class='submit' alt="发表">
        </el-tooltip>

        <div class="itemTools">
          <div class="tools" @click='openfun(1)'>
            <!-- <el-tooltip effect="dark" content="公开" placement="bottom"> -->
              <img v-show='showopen' src="../assets/images/article/open-c.png" alt="公开">
              <img v-show='(!showopen||opentab==1)&&$route.query.type=="white"'  src="../assets/images/article/open.png" alt="公开">
              <img v-show='(!showopen||opentab==1)&&$route.query.type=="black"'  src="../assets/images/article/open-w.png" alt="公开">
              
            <!-- </el-tooltip> -->
          </div>
          <div class="tools"  @click='closefun(2)'>
            <!-- <el-tooltip effect="dark" content="保密" placement="bottom"> -->
               <img  v-show='showclose' src="../assets/images/article/close-c.png" alt="保密">
              <img  v-show='(!showclose||opentab==2)&&$route.query.type=="white"'  src="../assets/images/article/close.png" alt="保密">
              <img  v-show='(!showclose||opentab==2)&&$route.query.type=="black"'  src="../assets/images/article/close-w.png" alt="保密">
            <!-- </el-tooltip> -->
          </div>

        </div>
      </div>

      <div class="items">
        <div class="item clearfix">
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

            <el-tooltip effect="dark" content="更多" placement="bottom">
              <img src="../assets/images/article/more.png" class='more' alt="更多">
            </el-tooltip>
          </div>

          <div class="itemTools">
            <div class="tools">
              <el-tooltip effect="dark" content="编辑" placement="right-end">
                <img src="../assets/images/article/edit.png" alt="编辑">
              </el-tooltip>
            </div>
            <div class="tools">
              <el-tooltip effect="dark" content="删除" placement="right-end">
                <img src="../assets/images/article/del.png" alt="删除">
              </el-tooltip>
            </div>
          </div>
        </div>

        <div class="comments">
          <div class="comment">
            <el-tooltip effect="dark" content="删除" placement="bottom">
              <img src="../assets/images/article/del.png" class='del' alt="删除">
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

              <div class="tools">
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

              <el-tooltip effect="dark" content="更多" placement="bottom">
                <img src="../assets/images/article/more.png" class='more' alt="更多">
              </el-tooltip>
            </div>

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
</template>
<script>
import '../../static/ue/ueditor.config.js';
import '../../static/ue/ueditor.all.min.js';
import '../../static/ue/lang/zh-cn/zh-cn.js'
export default {

  data () {
    return {
      editor:null,
      height:{
        height:'0px'
      },
      height2:{
        height:'0px'
      },
      cateTab:0,
      showclose:true,
      showopen:false,
      opentab:1,
    }
  },
  created(){
  },
  methods:{
    //是否公开
    openfun(value){
      this.showopen=false;
      this.showclose=true;
      this.opentab=value;
    },
    closefun(value){
      this.showclose=false;
       this.showopen=true;
      this.opentab=value;
    },
    //切换想法
    catefun(value){
        this.cateTab=value;
    },
    bold(){
       this.editor.execCommand( 'bold' );
    },
    tourl(url,query){
      tools.router.push({path:url,query:query})
    }
  },
  mounted(){
    var _this = this;
    this.$store.commit('changeFooter',false);
    this.$store.commit('changeHeader',true);
    this.$store.commit('changeType', 'user');
    this.height.height = window.innerHeight - 155 + 'px';
    this.height2.height = window.innerHeight - 155 - 50 + 'px';
    return
    this.editor = UE.getEditor('container',{
      toolbars:[],
      autosave:false,
      enableAutoSave:false,
      wordCount:false,
      elementPathEnabled:false
    });
  },
   components:{

  }
}
</script>

<style scoped lang='scss'>
  @import "../assets/scss/tool.scss";
  .idea{
    width: 1264px;
    margin:0 auto;
    padding-top: 135px;
    position: relative;

    .leftCate{
      // height: 886px;
      width: 310px;
      border-right: 1px solid #E6E6E6;
      margin-right: 70px;
      position: fixed;
      top: 135px;
      .cateList{
        width: 244px;
        height: 100%;
        border-top: 1px solid #E6E6E6;
        position: relative;
        .cate{
          height: 80px;
          border-bottom: 1px solid #E6E6E6;
          line-height: 80px;
          text-align: center;
          font-size: 15px;
          color:#A0A0A0;
          @include hand;
          @include trans;
          &:hover{
            background: rgba(0,0,0,.1);
          }

          &.active{
            color: #000;
            font-weight: bold;
          }
        }

      }
    }

    .list{
      width: 880px;
      // overflow-y: auto;
      margin-left: 380px;
      border-top: 1px solid #E6E6E6;
      padding-bottom: 100px;
      position: relative;

      .mainItem{
        position: relative;

        textarea{
          border: none;
          resize: none;
          outline:none;
        }

        .submit{
          position: absolute;
          bottom: 30px;
          right: 19px;
          @include hand;
        }
      }
      .item,.mainItem,.comment{
        height: 218px;
        width:100%;
        border-bottom: 1px solid #E6E6E6;
        padding: 40px 19px;
        position: relative;
        &:hover{
          .itemTools{
            display: block;
          }
        }

        .rightSide{
          color: #A0A0A0;
          font-size: 15px;
          position: absolute;
          height: 25px;
          width: 100%;
          bottom: 30px;
          right: 19px;
          padding-left: 38px;
          .more{
            position: absolute;
            bottom: 0;
            right: 0;
            @include hand;
          }

          .tools{
            position: absolute;
            opacity: .6;
            bottom: 0;
            right: 50px;

              .tool{
                height: 17px;
                vertical-align: middle;
                display: inline-block;
                font-size: 15px;
                margin-right: 10px;
                @include hand;
                &:last-child{
                  margin-right: 0;
                }
                span{
                  vertical-align: top;
                }
              }
          }

        }

        .itemTools{
          border: 1px solid #E6E6E6;
          position: absolute;
          right:-54px;
          width: 54px;
          height: 110px;
          bottom: -1px;
          display: none;

          .tools{
            width: 54px;
            height: 54px;
            line-height: 54px;
            text-align: center;
            @include hand;
            border-bottom: 1px solid #E6E6E6;

            &:last-child{
              border-bottom: none;
            }
          }
        }
      }

      .comments{
        position: relative;
        .del{
          position: absolute;
          @include hand;
          top: 30px;
          right: 19px;
        }

        .leftSide{
          margin-bottom: 60px;
          position: relative;
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
        }
        .rightSide{

        }
        .comment{
          height: auto;
        }
      }

    }

    .pageTools{
      width: 880px;
      position: fixed;
      bottom: 0;
      padding-bottom: 50px;
      background: #fff;
      height: 25px;
      line-height: 25px;
      margin-left: 380px;

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
          top: 0;
          width: 1px;
          height: 100%;
          background: #E6E6E6;
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
</style>
