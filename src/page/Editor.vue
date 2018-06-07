<template lang="html">
  <div class="editor">
    <!-- <br><br><br><br> -->
    <edittools></edittools>
  </div>
</template>
<script>
import edittools from "../components/EditTools";
export default {
  data() {
    return {};
  },
  methods: {
    tourl(url, query) {
      tools.router.push({ path: url, query: query });
    }
  },
 
  mounted() {
    var _this = this;
    this.$store.state.showHeader = false;
    this.$store.state.showFooter = false;
  },

  components: {
    edittools
  }
};
</script>

<style scoped lang='scss'>
@import "../assets/scss/tool.scss";
.editor {
}
</style>
