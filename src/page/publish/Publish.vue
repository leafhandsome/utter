<template lang="html">
    <div class="publish">
        <div class="tab">
            <div class="tab__item" :class="{'tab__item--active':tabIndex==0}" @click="changeTab(0)">作品</div>
            <div class="tab__item" :class="{'tab__item--active':tabIndex==1}" @click="changeTab(1)">已购</div>
            <div class="tab__item" :class="{'tab__item--active':tabIndex==2}" @click="changeTab(2)">收藏</div>
        </div>
        <div class="mywriting" v-show="tabIndex==0">
            <div class="mywriting__btn" v-if="isApplyBtn">
                申请独立出版
            </div>
            <div class="list">
                <div class="list__item" v-for="(item,idx) in mywritingBooks" @click="toBookInfo">
                    <div class="list__img">
                        <img src="" alt="">
                    </div>
                    <div class="list__bottom">
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
        <div class="purchased" v-show="tabIndex==1">
            <div class="list">
                <div class="list__item" v-for="(item,idx) in purchasedBooks">
                    <div class="list__img">
                        <img src="" alt="">
                    </div>
                    <div class="list__bottom">
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
                    <div class="list__bottom">
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
</template>
<script>
    export default {

        data() {
            return {
                tabIndex: 0,
                isApplyBtn: false,
                mywritingBooks: [],
                purchasedBooks: [],
                collectionBooks: []

            }
        },
        methods: {
            tourl(url, query) {
                tools.router.push({ path: url, query: query })
            },
            changeTab(idx) {
                this.tabIndex = idx;
                this.tourl('/publish', { tab: 4, index: idx });
            },
            toBookInfo() {
                this.tourl('/bookinfo', {});
            }
        },
        mounted() {
            var _this = this;
            this.$store.state.useType = 'publish';
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

        }
    }
</script>

<style scoped lang='scss'>
    @import "../../assets/scss/tool.scss";
    .publish {
        margin-top: 58px;
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
    }

    .tab__item--active {
        color: #000;
        font-weight: bold;
    }

    .mywriting {}

    .mywriting__btn {
        width: 304px;
        height: 58px;
        line-height: 50px;
        background: #000;
        color: #ffffff;
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
        background: #eeeeee;
        margin-right: 128px;
        margin-bottom: 100px;
    }

    .list__item:nth-child(3n) {
        margin-right: 0;
    }

    .list__img {
        width: 100%;
        height: 414px;
    }

    .list__img img {
        width: 100%;
        height: 100%;
    }

    .list__bottom {
        width: 100%;
        height: 100px;
        background: #fff;
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
        strong {
            padding-bottom: 10px;
        }
    }
</style>