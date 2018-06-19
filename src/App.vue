<template>
  <div id="app" class="clearfix" :class="$route.query.type=='black'?'borderblack':'borderwhite'">
    <!-- <utheader :type='type' v-show='showHeader'></utheader> -->
    <!-- {{$store.state.prevModule}}123 -->
    <transition name="fade" mode="out-in">
        <router-view></router-view>
    </transition>

    <!-- <utfooter v-show='showFooter'></utfooter> -->
  </div>
</template>

<script>
    import utheader from "./components/Header";
    import utfooter from "./components/Footer";
    export default {
        name: "app",
        data() {
            return {
                utstyle: "white",
                showFooter: true,
                showHeader: true,
                type: ""
            };
        },
        methods: {},
        components: {
            utheader,
            utfooter
        },
        mounted() {},
        watch: {
            $route(val) {
                // console.log(val);
            },
            "$store.state.utstyle": function(val) {
                this.utstyle = val;
            },
            "$store.state.showHeader": function(val) {
                this.showHeader = val;
            },
            "$store.state.showFooter": function(val) {
                this.showFooter = val;
            },
            "$store.state.useType": function(val) {
                this.type = val;
            }
        }
    };
</script>

<style>
    #app {
        overflow: auto;
        /*font-family: Helvetica Neue,Roboto Light,PingFang SC,Lantinghei SC,Hiragino Sans GB,Microsoft Yahei,Arial;*/
        /*font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;*/
    }
    
    #app.black {
        background: #1b1b1b;
        transition: all 0.3s ease;
    }
    
    html,
    body,
    #app {
        height: 100%;
        min-height: 100%;
    }
    
    body {
        margin: 0;
    }
    
    div,
    span,
    p {
        box-sizing: border-box !important;
    }
    
    a {
        color: inherit;
        text-decoration: none;
    }
    /* .clearfix{
  zoom:1;
} */
    
    .clearfix:after {
        content: "";
        display: block;
        clear: both;
    }
    
    .pull-left {
        float: left;
    }
    
    .pull-right {
        float: right;
    }
    
    .edui-editor.edui-default {
        border: none !important;
    }
    
    .edit.black .edui-default .edui-editor-iframeholder {
        color: #fff !important;
        background-color: #000;
    }
    
    .edit.black .edui-default .edui-editor-iframeholder .view {
        color: #fff !important;
    }
</style>