<template lang="html">
    <div class="userinfo">

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
                            <img src="../../assets/images/userinfo/142 用户-私信-黑.png" alt="">
                        </div>
                        <div class="btn__add">
                            <img src="../../assets/images/userinfo/140 用户-加好友.png" alt="">
                        </div>
                    </div>

                    <div class="btn__edit">
                        <img src="../../assets/images/userinfo/112 提交.png" alt="">
                    </div>
                </div>
                <div class="msg__name">UTTER</div>
                <div class="msg__occupation">广州 设计师</div>
                <div class="msg__identifier">00000009</div>
                <div class="msg__publish">你的独立出版</div>
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
                <div class="record__item record__writing" :class="{'record__item--active':recordIndex==0}">创作记录</div>
                <div class="record__item record__visited" :class="{'record__item--active':recordIndex==1}">访问记录</div>
                <div class="record__item record__read" :class="{'record__item--active':recordIndex==2}">阅读记录</div>
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
                recordIndex: 0
            }
        },
        methods: {
            tourl(url, query) {
                tools.router.push({ path: url, query: query })
            }
        },
        mounted() {
            var _this = this;
            this.$store.state.useType = 'publish';
            this.$store.state.showFooter = false;

        },
        components: {

        }
    }
</script>

<style scoped lang='scss'>
    @import "../../assets/scss/tool.scss";
    .userinfo {
        width: 1264px;
        margin: 0 auto;
        margin-top: 208px;
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
                    height: 16px;
                }
            }
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
            font-size: 20px;
            font-weight: bold;
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
            span{
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
        color: #000000;
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