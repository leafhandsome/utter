<template>
  <div id="app" :class='utstyle' :showseach="showseach" @seach="fun">
    <utheader :type='type' v-show='showHeader'></utheader>
    <!-- {{$store.state.prevModule}}123 -->
    <transition name="fade" mode="out-in">
        <router-view></router-view>
    </transition>

    <utfooter v-show='showFooter'></utfooter>
  </div>
</template>

<script>
    import utheader from '../components/Header';
    import utfooter from '../components/Footer';
    export default {
        name: 'app',
        data() {
            return {
                utstyle: 'white',
                showFooter: true,
                showHeader: true,
                type: '',
                showseach: false
            }
        },
        methods: {
            fun() {
                this.showseach = true
                console(this.showseach)
            }
        },
        components: {
            utheader,
            utfooter
        },
        mounted() {

        },
        watch: {
            '$route' (val) {
                console.log(val)
            },
            '$store.state.utstyle': function(val) {
                this.utstyle = val;
            },
            '$store.state.showHeader': function(val) {
                this.showHeader = val;
            },
            '$store.state.showFooter': function(val) {
                this.showFooter = val;
            },
            '$store.state.useType': function(val) {
                this.type = val;
            }
        }
    }
</script>

<style>
    #app {
        /*font-family: Helvetica Neue,Roboto Light,PingFang SC,Lantinghei SC,Hiragino Sans GB,Microsoft Yahei,Arial;*/
        /*font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;*/
    }
    
    #app.black {
        background: #1b1b1b;
        transition: all .3s ease;
    }
    
    html,
    body,
    #app {
        /*height:100%;*/
        min-height: 100%;
    }
    
    body {
        margin: 0;
    }
</style>