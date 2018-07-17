<template lang="html">
  <div class="forbid">
    <div class="forbid__icon"><img src="../assets/images/userinfo/147 禁止访问-禁止符.png" alt=""></div>
    <p class="forbid__p1">您访问的站点为私人所有！</p>
    <p class="forbid__p2">仍要访问请向创建者留言，若创建者同意将单独为您发送专属访问密钥。</p>
    <p class="forbid__p3">永久开放需成为好友，并请好友为您设置单独开放。</p>
    <div class="forbid__toudi">
      <a href='javascript:;' @click="sendmsg">
        <img src="../assets/images/148 禁止访问-投递.png" alt="">
      </a>
      <textarea name="" id="" v-model="msg" v-show="showbox" cols="55" rows="10"  v-focus="showbox==true"></textarea>
    </div>
     <div class="back " @click="$router.go(-2)">
   <a href="javascript:;"><img src="../assets//images//editor/backa.png" alt=""></a>
  </div>
  </div>
</template>
<script>
    export default {

        data() {
            return {
              showbox:false,
              msg:'',
            }
        },
           //自定指令
        directives: {
            focus: {
                update: function(el, {
                    value
                }) {
                    if (value) {
                        el.focus()
                    }
                }
            }
        },
        methods: {
          sendmsg(){
            if(this.showbox){
              this.unitAjax('post','v1/me/alert/message/send',{userId:Number(this.$route.query.userId),msg:this.msg},res=>{
                if(res.code==200){
                  this.msg="";
                  this.showbox=false;
                }
              })
            }else{
              this.showbox=true
            }
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
            this.$store.state.showFooter = false;
        },
        components: {

        }
    }
</script>

<style scoped lang='scss'>
    @import "../assets/scss/tool.scss";
    .forbid {
        text-align: center;
        margin: auto;
        margin-top: 250px;
        p {
            font-size: 18px;
        }
    }
    
    .forbid__p1 {
        margin-top: 80px;
        font-size: 32px;
    }
    
    .forbid__p2 {
        margin-top: 30px;
    }
    
    .forbid__p3 {
        margin-top: 12px;
    }
    
    .forbid__toudi {
        margin: 0 auto;
        width: 420px;
        height: 200px;
        position: relative;
        textarea {
            position: absolute;
            top: 20px;
            left: 0;
            border: 1px solid #999;
            padding: 10px;
        }
        a {
            position: absolute;
            top: 188px;
            z-index: 5;
        }
    }
    .back{
      position: absolute;
      top: 0;
      right:0;
      margin:50px;
    }
</style>