<template>
<div class="footer" :class="utstyle">
  <div class='info'>
    <a href="#">关于UTTER</a>
    <a href="#">服务协议</a>
    <a href="#">联系我们</a>
    <a href="#">侵权投诉</a>
    <a href="#" @click='tourl("/editor")'>编辑器入口</a>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      utstyle:'white'
    }
  },
  methods: {
    tourl(url) {
      tools.router.push({
        path: url
      })
    }
  },
  watch:{
    '$store.state.utstyle':function(val){
      this.utstyle = val;
    }
  }
}
</script>

<style scoped lang='scss'>
.footer {
    // position: fixed;
    // bottom: 0;
    // left: 0;
    width: 100vw;
    min-width: 1350px;
    transition: all .3s ease;

    &.white{
      background: #FBFBFB;
      color: #727272;
      a{
        color: #727272;
      }
    }
    &.black{
      background: #000;
      color: #fff;
      a{
        color: #fdfdfd;
      }
    }

    .info {
        text-align: center;
        line-height: 100px;
        font-size: 15px;
        padding: 0 30px;

        a {
            text-decoration: none;
            margin:0 9px;
            font-size: 13px;
        }
    }
}

</style>
