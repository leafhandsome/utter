<template lang="html">
    <div class="userinfo">
          <!-- 私信   -->
          <div class="msg" v-show='showmsg'>
              <div class="mainItem">
        <textarea name="name" rows="8" cols="80" placeholder='写下你的私信...'></textarea>

        <el-tooltip effect="dark" content="发送" placement="bottom">
          <img src="../../assets/images/article/submit.png" class='submit' alt="发送">
        </el-tooltip>
        <el-tooltip effect="dark" content="删除" placement="bottom">
            <a class='del' href="javaScript:;">
            <img src="../../assets/images/userinfo/del-msg.png"  alt="删除" @click="showmsg=false">
            </a>
          </el-tooltip>
        </div>
          </div>
        <div class="user">

            <div class="user__photo">
                <img src="" alt="">
            </div>
            <div class="user__msg">
                <div class="msg__btn">
                    <div class="btn__line1">
                        <div class="btn__visited">
                            <img src="../../assets/images/userinfo/108 浏览.png" alt="">
                        </div>
                        <div class="btn__message">
                            <a href='javaScript:;'>
                            <img src="../../assets/images/userinfo/142 用户-私信-黑.png" alt=""  @click="showmsg=true">
                            </a>
                        </div>
                        <div class="btn__add">
                             <a href='javaScript:;'>
                            <img src="../../assets/images/userinfo/140 用户-加好友.png" alt="">
                            </a>
                        </div>
                    </div>

                    <div class="btn__edit">
                        <img v-show="showidea" src="../../assets/images/editor/88 编辑.png" alt="" @click='showidea=false'>
                        <img v-show='!showidea' src="../../assets/images/userinfo/112 提交.png" alt=""  @click='setusermsg'>
                        
                    </div>
                </div>
                <div :class='showidea?"usermsg":""' ref="usermsg">
                <div class="msg__name"> <input class="msg__name" type="text" v-model="user.name" placeholder='' :readonly='showidea'></div>
                <div class="msg__occupation"> <input class="msg__adress" type="text" v-model="user.adress" placeholder='' :readonly='showidea'>
                <i class='adress1'></i> 
                   <input class="msg__adress" type="text" v-model="user.adress" placeholder='' :readonly='showidea'></div>
                <div class="msg__identifier">00000009</div>
                <div class="msg__publish">  <input class="" type="text" v-model="user.nickname" placeholder='' :readonly='showidea'></div>
                </div>
            </div>
            <div class="user__correlation">
                <div class="correlation__item">
                    <strong>6110</strong>
                    <span>人气</span>
                </div>
                <div class="correlation__item">
                    <strong>6110</strong>
                    <span>好友</span>
                </div>
                <div class="correlation__item">
                    <strong>6110</strong>
                    <span>关注</span>
                </div>
                <div class="correlation__item">
                    <strong>6110</strong>
                    <span>读者</span>
                </div>
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="addup">
            <div class="addup__record">
                <div class="record__item record__writing" :class="{'record__item--active':recordIndex==0}" @click="gethostory(0)">创作记录</div>
                <div class="record__item record__visited" :class="{'record__item--active':recordIndex==1}" @click="gethostory(1)">访问记录</div>
                <div class="record__item record__read" :class="{'record__item--active':recordIndex==2}" @click="gethostory(2)">阅读记录</div>
            </div>
            <div class="addup__total">
                <div class="total__time">
                    2017.11.17
                    <br>
                    <span></span>
                    2018.01.09
                </div>
                <div class="total__list">
                    <div class="total__item">
                        <span>文章</span>
                        <span></span>
                        <strong>6</strong>
                    </div>
                    <div class="total__item">
                        <span>想法</span>
                        <span></span>
                        <strong>34</strong>
                    </div>
                    <div class="total__item">
                        <span>书籍</span>
                        <span></span>
                        <strong>34</strong>
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
      recordIndex: 0,
      showmsg: false,
      showidea: true,
      user: {
        adress: "广州",
        name: "utter",
        nickname: "最好的自己"
      }
    };
  },
  methods: {
      gethostory(value){
         this.recordIndex=value 
      },
    //保存用户信息
    setusermsg() {
      console.log(this.$refs.usermsg);
      this.showidea = true;
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
    this.$store.state.useType = "publish";
    this.$store.state.utstyle = "white";
    this.$store.state.showFooter = false;
  },
  components: {}
};
</script>

<style scoped lang='scss'>
@import "../../assets/scss/tool.scss";
.userinfo {
  width: 1264px;
  margin: 0 auto;
  margin-top: 208px;
  position: relative;
  .msg {
    position: absolute;
    top: -20px;
    left: 300px;
    z-index: 50;
    width: 650px;
    height: 200px;
    background: white;
    border: 1px solid #e6e6e6;
    padding: 10px 20px;
    .mainItem {
      position: relative;
      textarea {
        margin-top: 30px;
        border: none;
        resize: none;
        outline: none;
      }
      .submit {
        position: absolute;
        bottom: 0;
        right: 0;
        @include hand;
      }
      .del {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
}

.user {
  padding-bottom: 74px;
  position: relative;
}

.user__photo {
  width: 240px;
  height: 240px;
  background: #eee;
  float: left;
}

.user__msg {
  float: left;
  margin-left: 72px;
  width: 880px;
  position: relative;
  .msg__btn {
    position: absolute;
    top: 0;
    right: 0;
    .btn__visited,
    .btn__message,
    .btn__add {
      float: left;
      margin-left: 40px;
    }
    .btn__edit {
      padding-top: 40px;
      float: right;
      img {
        width: 24px;
        // height: 16px;
        cursor: pointer;
      }
    }
  }
  .usermsg {
    input {
      border: none;
    }
    .adress1 {
        position: relative;
        height: 100%;
      &::after {
        content: "";
        height: 15px;
        position: absolute;
        top: 3px;
        right: 5px;
        border-right: 2px solid #ccc;
      }
    }

    .msg__adress {
      width: 40px;
    }
  }
  input {
    padding-left: 5px;
  }
  .msg__adress {
    width: 100px;
  }
  .msg__name {
    font-weight: bold;
    font-size: 30px;
  }
  .msg__occupation {
    margin-top: 20px;
  }
  .msg__identifier {
    margin-top: 10px;
  }
  .msg__publish {
    margin-top: 20px;

    input {
      font-size: 20px;
      font-weight: bold;
    }
  }
}

.user__correlation {
  float: left;
  margin-top: 40px;
  margin-left: 72px;
  .correlation__item {
    width: 220px;
    height: 54px;
    float: left;
    text-align: center;
    border-left: 1px solid #e6e6e6;
    color: #999;
    strong,
    span {
      display: block;
    }
    strong {
      font-size: 28px;
    }
    span {
      font-size: 14px;
      padding-top: 6px;
    }
  }
  .correlation__item:last-child {
    border-right: 1px solid #e6e6e6;
  }
}

.addup {
  margin-top: 74px;
}

.addup__record {
  color: #999;
  font-weight: bold;
  text-align: center;
  float: left;
}

.record__item {
  width: 240px;
  height: 80px;
  line-height: 80px;
  border-top: 1px solid #e6e6e6;
  cursor: pointer;
}

.record__item:last-child {
  border-bottom: 1px solid #e6e6e6;
}

.record__item--active {
  color: #000;
}

.addup__total {
  width: 880px;
  border-top: 1px solid #e6e6e6;
  float: left;
  margin-left: 72px;
}

.total__time {
  width: 220px;
  float: left;
  text-align: center;
  margin-top: 78px;
  font-size: 20px;
  span {
    width: 35px;
    height: 1px;
    background: #000;
    display: block;
    margin: 25px auto;
  }
}

.total__item {
  width: 660px;
  float: left;
  border-bottom: 1px solid #e6e6e6;
  span,
  strong {
    display: block;
    float: left;
    width: 220px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-weight: bold;
  }
  strong {
    font-size: 36px;
    font-weight: normal;
  }
}
</style>