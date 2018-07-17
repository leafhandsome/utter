<template>
  <div class="linkIdea" :class="$route.query.type=='white'?'ut-white1':'ut-black'">
      <div class="pull-left leftlink" @click="gotoIdea">
        <router-link :to="{path:'/editor',query:{editor:'publish',type:$route.query.type}}">
        <img v-show="$route.query.type=='black'" src="../assets/images/module/47 导航栏-创作文章-白.png" alt="">
        <img v-show="$route.query.type=='white'" src="../assets/images/module/45 导航栏-创作文章-黑.png" alt="">
        <p>文章</p>
        </router-link>
      </div>
      <div class="pull-right rightlink">
        <router-link :to="{path:'/editor',query:{editor:'idea',type:$route.query.type}}">
        <img  v-show="$route.query.type=='black'" src="../assets/images/module/48 导航栏-创作出版-白.png" alt="">
        <img  v-show="$route.query.type=='white'" src="../assets/images/module/46 导航栏-创作出版-黑.png" alt="">
        <p>书籍</p>
        </router-link>
      </div>
  </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            gotoIdea() {

            }
        }

    }
</script>
<style lang="scss" scoped>
    .linkIdea {
        position: fixed;
        width: 375px;
        height: 230px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 100;
        opacity: .9;
        text-align: center;
        padding: 60px 0;
        .leftlink,
        .rightlink {
            width: 50%;
            cursor: pointer;
        }
        p {
            margin-top: 20px;
        }
    }
</style>