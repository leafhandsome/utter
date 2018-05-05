<template lang="html">
  <div class="xx">

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

  },
   components:{

  }
}
</script>

<style scoped lang='scss'>
  @import "../assets/scss/tool.scss";
  .xx{

  }
</style>
