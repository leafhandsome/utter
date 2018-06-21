<template lang="html">
    <div class='container'>
    <div class="publish" v-show='!showboks&&!showapply'>
        <div class="tab">
            <a href='javaScript:;' class="tab__item utBorder" :class="tabIndex==0?($route.query.type=='white'?'tab__item--active':'tab__item--active-w'):''" @click="changeTab(0)">作品</a>
            <a href='javaScript:;' class="tab__item utBorder"  :class="tabIndex==1?($route.query.type=='white'?'tab__item--active':'tab__item--active-w'):''" @click="changeTab(1)">已购</a>
            <a href='javaScript:;' class="tab__item lastitem"  :class="tabIndex==2?($route.query.type=='white'?'tab__item--active':'tab__item--active-w'):''" @click="changeTab(2)">收藏</a>
        </div>
        <div class="mywriting" v-show="tabIndex==0">
            <a href="javaScript:;" class="mywriting__btn" :class="$route.query.type=='white'?'ut-black1':'ut-white1'" v-if="isApplyBtn=true" @click='setshowtab'>
                申请独立出版
            </a>
            <div class="list clearfix">
                <div class="list__item" v-for="(item,idx) in mywritingBooks">
                    <div class="list__img cursor" @click="toBookInfo">
                        <img src="" alt="">
                    </div>
                    <div class="list__bottom utBorder">
                        <div class="list__icon"  @click="gettools1">
                            <strong>
                                <img src="../../assets//images/publish/books-c.png" alt="">
                                <!-- <img v-show="$route.query.type=='white'" src="../../assets/images/publish/129 书架-独立出版-黑.png" alt="">
                                <img v-show="$route.query.type=='black'" src="../../assets/images/publish/133 书架-独立出版-白.png" alt=""> -->
                            </strong>
                            <span>独立出版</span>
                        </div>
                        <div class="list__icon"  @click="gettools2()">
                            <a href='javascript:;'>
                            <strong>
                                <!-- //saved收藏过 -->
                                <span v-if="!saved">
                                <img v-show="!tools.save" src="../../assets/images/publish/109 收藏.png" alt="">
                            </span>
                            <span else>
                                <img v-show="$route.query.type=='white'&&(tools.save||saved)" src="../../assets/images/publish/130 书架-收藏-黑.png" alt="">
                                <img  v-show="$route.query.type=='black'&&(tools.save||saved)" src="../../assets/images/publish/134 书架-收藏-白.png" alt="">
                            </span>
                            </strong>
                           <span :class="!(tools.save||saved)?'fontColor':$route.query.type=='white'?'ut-white1':'ut-black1'">6546</span>
                        </a>
                        </div>
                        <div class="list__icon"  @click="gettools3">
                                <a href='javascript:;'>
                            <strong>
                                <img v-show="!tools.details" src="../../assets/images/article/more-w.png" alt="">
                                <img v-show="$route.query.type=='white'&&tools.details" src="../../assets/images/publish/131 书架-更多-黑.png" alt="">
                                <img  v-show="$route.query.type=='black'&&tools.details" src="../../assets/images/publish/135 书架-更多-白.png" alt="">
                            </strong>
                            <span>详情</span>
                        </a>
                        </div>
                        <div class="list__icon"  @click="gettools4">
                         <a href='javascript:;'>
                            <strong>
                                <img v-show="!tools.car" src="../../assets/images/publish/128 书架-购物车.png" alt="">
                                <img v-show="$route.query.type=='white'&&tools.car" src="../../assets/images/publish/132 书架-购物车-黑.png" alt="">
                                <img  v-show="$route.query.type=='black'&&tools.car" src="../../assets/images/publish/136 书架-购物车-白.png" alt="">
                            </strong>
                            <span>23.00￥</span>
                        </a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="purchased" v-show="tabIndex==1">
            <div class="list">
                <div class="list__item" v-for="(item,idx) in purchasedBooks">
                    <div class="list__img">
                        <img src="" alt="">
                    </div>
                    <div class="list__bottom utBorder">
                        <div class="list__icon">
                            <strong>
                                <img src="../../assets/images/publish/129 书架-独立出版-黑.png" alt="">
                            </strong>
                            <span>独立出版</span>
                        </div>
                        <div class="list__icon">
                            <strong>
                                <img src="../../assets/images/publish/130 书架-收藏-黑.png" alt="">
                            </strong>
                            <span>收藏</span>
                        </div>
                        <div class="list__icon">
                            <strong>
                                <img src="../../assets/images/publish/131 书架-更多-黑.png" alt="">
                            </strong>
                            <span>详情</span>
                        </div>
                        <div class="list__icon">
                            <strong>
                                <img src="../../assets/images/publish/132 书架-购物车-黑.png" alt="">
                            </strong>
                            <span>23.00￥</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="collection" v-show="tabIndex==2">
            <div class="list">
                <div class="list__item" v-for="(item,idx) in collectionBooks">
                    <div class="list__img">
                        <img src="" alt="">
                    </div>
                    <div class="list__bottom utBorder">
                        <div class="list__icon">
                            <strong>
                                <img src="../../assets/images/publish/129 书架-独立出版-黑.png" alt="">
                            </strong>
                            <span>独立出版</span>
                        </div>
                        <div class="list__icon">
                            <strong>
                                <img src="../../assets/images/publish/130 书架-收藏-黑.png" alt="">
                            </strong>
                            <span>收藏</span>
                        </div>
                        <div class="list__icon">
                            <strong>
                                <img src="../../assets/images/publish/131 书架-更多-黑.png" alt="">
                            </strong>
                            <span>详情</span>
                        </div>
                        <div class="list__icon">
                            <strong>
                                <img src="../../assets/images/publish/132 书架-购物车-黑.png" alt="">
                            </strong>
                            <span>23.00￥</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <bookinfo v-show='showboks'></bookinfo>
    <apply v-show='showapply'></apply>
    </div>
</template>
<script>
    import bookinfo from './BookInfo'
    import apply from './Apply'
    export default {

        data() {
            return {
                tabIndex: 0,
                isApplyBtn: false,
                mywritingBooks: [],
                purchasedBooks: [],
                collectionBooks: [],
                showboks: false,
                showapply: false,
                tools: {
                    publish: false,
                    save: false,
                    details: false,
                    car: false,
                },
                saved: true,
            }
        },
        created() {
            this.showboks = this.$route.query.other == 'books' ? true : false
        },
        methods: {
            // 工具栏
            //  出版   
            gettools1() {
                this.tools.publish = true;
            },
            // 收藏
            gettools2() {

                this.tools.save = true;
            },
            // 详情
            gettools3() {
                this.tools.details = true;
            },
            // 购物车
            gettools4() {
                this.tools.car = true;
            },
            setshowtab() {
                this.showapply = true;

            },
            tourl(url, query) {
                tools.router.push({
                    path: url,
                    query: query
                })
            },
            changeTab(idx) {
                this.tabIndex = idx;
                // this.tourl('/publish', { tab: 4, index: idx });
            },
            toBookInfo() {
                this.showboks = true;
                if (this.showboks) {
                    window.scrollTo(0, 0);
                }
            }
        },
        mounted() {
            var _this = this;
            this.$store.state.useType = 'publish';
            this.$store.state.utstyle = 'white';
            this.$store.state.showFooter = false;
            this.tabIndex = this.$route.query && this.$route.query.index || 0;
            let arr = []
            for (let i = 0; i < 10; i++) {
                arr.push(i)
            }
            this.mywritingBooks = arr
            this.purchasedBooks = arr
            this.collectionBooks = arr
        },
        components: {
            bookinfo,
            apply
        }
    }
</script>

<style scoped lang='scss'>
    @import "../../assets/scss/tool.scss";
    .publish {
        /* margin-top: 58px; */
        overflow: hidden;
    }
    
    .tab {
        margin: 0 auto;
        margin-top: 140px;
        overflow: hidden;
        width: 540px;
    }
    
    .tab__item {
        float: left;
        width: 170px;
        text-align: center;
        height: 60px;
        line-height: 60px;
        box-sizing: border-box;
        border-right: 1px solid #fdfdfd;
        color: #898989;
    }
    
    .lastitem {
        border: none;
    }
    
    .tab__item--active {
        color: #000;
        font-weight: 700;
    }
    
    .tab__item--active-w {
        color: white;
        font-weight: 700;
    }
    
    .mywriting {}
    
    .mywriting__btn {
        display: block;
        width: 304px;
        height: 58px;
        line-height: 58px;
        // background: #000;
        // color: #ffffff;
        text-align: center;
        margin: 0 auto;
        margin-top: 320px;
    }
    
    .list {
        width: 1246px;
        margin: 0 auto;
        margin-top: 50px;
    }
    
    .list__item {
        width: 330px;
        height: 514px;
        float: left;
        // background: #eeeeee;
        margin-right: 128px;
        margin-bottom: 100px;
    }
    
    .list__item:nth-child(3n) {
        margin-right: 0;
    }
    
    .list__img {
        width: 100%;
        height: 414px;
        background-color: #898989;
    }
    
    .list__img img {
        width: 100%;
        height: 100%;
    }
    
    .list__bottom {
        width: 100%;
        height: 100px;
        // background: #fff;
        border-bottom: 1px solid #e6e6e6;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .list__icon {
        text-align: center;
        padding: 0 16px;
        strong,
        span {
            display: block;
        }
        .fontColor{
             color: #aaa;
        }
        strong {
            padding-bottom: 10px;
        }
    }
</style>