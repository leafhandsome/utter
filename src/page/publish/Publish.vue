<template lang="html">
    <div class='container'>
    <div class="publish" v-show='!showboks&&!$store.state.showapply'>
        <div class="tab">
            <a href='javaScript:;' class="tab__item utBorder" :class="tabIndex==0?($route.query.type=='white'?'tab__item--active':'tab__item--active-w'):''" @click="changeTab(0)">作品</a>
            <a href='javaScript:;' class="tab__item utBorder"  :class="tabIndex==1?($route.query.type=='white'?'tab__item--active':'tab__item--active-w'):''" @click="changeTab(1)">已购</a>
            <a href='javaScript:;' class="tab__item lastitem"  :class="tabIndex==2?($route.query.type=='white'?'tab__item--active':'tab__item--active-w'):''" @click="changeTab(2)">收藏</a>
        </div>
        <div class="mywriting" v-show="tabIndex==0">
            <a href="javaScript:;" class="mywriting__btn" :class="$route.query.type=='white'?'ut-black1':'ut-white1'" v-if="!isApplyBtn" @click='setshowtab(true)'>
                申请独立出版
            </a>
            <div class="list clearfix">
                <div class="list__item" v-if="mywritingBooks.length>0" v-for="(item,idx) in mywritingBooks">
                    <div class="list__img cursor" @click="toBookInfo(item.id)">
                        <img src="" alt="">
                        <div class="comment">
                            <img class="fr" src="../../assets/images/article/90 删除.png" alt="" @click.stop="deletebook(item.id)">
                            <!-- <h1>{{item.cover}}</h1>
                            <div class="book">{{item.introduce}}</div> -->
                        </div>
                        <div class="idea"  >
                            <router-link :to="{path:'/editor',query:{editor:'idea',type:$route.query.type,id:item.id}}">
                            <img src="../../assets/images/article/idea.png" alt="">
                            </router-link>
                        </div>
                    </div>
                    <div class="list__bottom utBorder">
                        <div class="list__icon"  @click="gettools1">
                            <strong>
                                <img src="../../assets//images/publish/books-c.png" alt="">
                                <!-- <img v-show="$route.query.type=='white'" src="../../assets/images/publish/129 书架-独立出版-黑.png" alt="">
                                <img v-show="$route.query.type=='black'" src="../../assets/images/publish/133 书架-独立出版-白.png" alt=""> -->
                            </strong>
                            <span>{{item.publishUserId?"独立出版":"草稿"}}</span>
                        </div>
                        <div class="list__icon" >
                            <a href='javascript:;'>
                            <strong>
                                <!-- //saved收藏过 -->
                                <span v-if="!item.favority">
                                <img v-show="!tools.save" src="../../assets/images/publish/126 书架-收藏.png" alt="" @click="addfavority(item.id)">
                            </span>
                            <span else>
                                <img v-show="$route.query.type=='white'&&(tools.save||item.favority)" src="../../assets/images/publish/130 书架-收藏-黑.png" alt="">
                                <img  v-show="$route.query.type=='black'&&(tools.save||item.favority)" src="../../assets/images/publish/134 书架-收藏-白.png" alt="">
                            </span>
                            </strong>
                           <span v-show="!tools.save" :class="!(tools.save||item.favority)?'fontColor':$route.query.type=='white'?'ut-white1':'ut-black1'">{{Number(item.favorityCount)}}</span>
                           <span v-show="tools.save" :class="!(tools.save||item.favority)?'fontColor':$route.query.type=='white'?'ut-white1':'ut-black1'">{{Number(item.favorityCount)+1}}</span>
                        </a>
                        </div>
                        <div class="list__icon"  @click="gettools3(item.id)">
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
                            <span>{{Number(item.price).toFixed(2)}}￥</span>
                        </a>
                        </div>
                    </div>
                </div>
                <div v-show="mywritingBooks.length==0" style="height: 500px; width: 500px;text-align: center;margin: 273px auto;">暂无作品</div>
            </div>

        </div>
        <div class="purchased" v-show="tabIndex==1">
            <div class="list" v-show="false">
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
            <div style="height: 500px; width: 500px;text-align: center;margin: 273px auto;">暂无购买</div>
        </div>
        <div class="collection" v-show="tabIndex==2">
            <div class="list" v-show="collectionBooks.length>0">
                <div class="list__item" v-for="(item,idx) in collectionBooks">
                    <div class="list__img">
                        <img src="" alt="">
                         <div class="comment">
                             <a href='javascript:;'>
                            <img class="fr" src="../../assets/images/article/90 删除.png" alt="" @click.stop="deletefavority(item.id)">
                        </a>
                            <!-- <h1>{{item.cover}}</h1>
                            <div class="book">{{item.introduce}}</div> -->
                        </div>
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
                            <span>{{Number(item.favorityCount)}}</span>
                        </div>
                        <div class="list__icon"  @click="gettools3(item.id)">
                            <strong>
                                <img src="../../assets/images/publish/131 书架-更多-黑.png" alt="">
                            </strong>
                            <span>详情</span>
                        </div>
                        <div class="list__icon">
                            <strong>
                                <img src="../../assets/images/publish/132 书架-购物车-黑.png" alt="">
                            </strong>
                            <span>￥{{Number(item.price).toFixed(2)}}</span>
                        </div>
                    </div>
                </div>
            </div>
             <div v-show="collectionBooks.length==0" style="height: 500px; width: 500px;text-align: center;margin: 273px auto;">暂无收藏</div>
        </div>
    </div>
    <bookinfo v-show='showboks' :book="bookId"></bookinfo>
    <apply v-show='$store.state.showapply' @showbox="setshowtab"></apply>
    </div>
</template>
<script>
    import bookinfo from './BookInfo'
    import apply from './Apply'
    export default {

        data() {
            return {
                tabIndex: 0,
                isApplyBtn: this.getValue('avatar'),
                mywritingBooks: [],
                purchasedBooks: 5,
                collectionBooks: [],
                showboks: false,
                showapply: false,
                tools: {
                    publish: false,
                    save: false,
                    details: false,
                    car: false,
                },
                bookId: '',
                pageIndex: 1,
            }
        },
        // watch: {
        //     'showapply': function() {
        //         return this.$store.state.showapply
        //     }
        // },
        created() {
            this.showboks = this.$route.query.other == 'books' ? true : false;
            this.getbooklist()
            this.getfavority()
        },
        mounted() {

            window.addEventListener('scroll', () => {
                // 判断是否滚动到底部
                console.log(255);
                if (document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) {
                    console.log(255);
                    this.pageIndex++;
                    this.getbooklist()
                }
            });

        },
        methods: {

            //收藏
            addfavority(id) {
                this.unitAjax('post', "v1/book/favority/add", {
                    bookId: Number(id)
                }, res => {
                    if (res.code == 200) {
                        this.tools.save = true;
                        this.$message('收藏成功')
                    } else {
                        this.$message(res.msg)
                    }
                })
            },
            //删除收藏
            deletefavority(id) {
                this.$confirm('此操作将删除该书籍, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.unitAjax('delete', 'v1/book/favority/delete', {
                        bookId: id
                    }, res => {
                        if (res.code == 200) {
                            this.$message('删除成功')
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            // 删除书籍
            deletebook(id) {
                this.$confirm('此操作将删除该书籍, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.unitAjax('delete', 'v1/book/deleteBook', {
                        bookId: id
                    }, res => {
                        if (res.code == 200) {
                            this.$message('删除成功')
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            //收藏书籍列表
            getfavority() {
                this.unitAjax('get', 'v1/book/favority/list', {
                    page: 1,
                    pageSize: 10,
                    userId: this.$route.query.userId || this.getValue('userId')
                }, res => {
                    if (res.code == 200) {
                        this.collectionBooks = res.data.rows
                    }
                })
            },
            //跳转编辑
            linkto(id) {
                this.$router.push({
                    path: "/editor",
                    query: {
                        editor: 'idea',
                        type: this.$route.query.type,
                        id: id
                    }
                })
            },
            getbooklist() {
                this.unitAjax('get', 'v1/book/list', {
                    page: this.pageIndex,
                    pageSize: 10,
                    userId: this.$route.query.userId || this.getValue('userId')
                }, res => {
                    if (res.code == 200) {
                        this.mywritingBooks = res.data.rows
                    }
                })
            },

            // 工具栏
            //  出版   
            gettools1() {
                this.tools.publish = true;
            },

            // 详情
            gettools3(id) {
                this.tools.details = true;
                this.toBookInfo(id)
            },
            // 购物车
            gettools4() {
                this.tools.car = true;
            },
            setshowtab(flog) {
                window.scrollTo(0, 0);
                this.$store.commit('showbox', flog)
                this.$store.commit('getagreement', 1)

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
                // if(idx==2){

                // }
            },
            toBookInfo(id) {
                this.$store.commit('getbookId', id)
                this.$store.commit('getlist', id)
                this.bookId = id
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
            // let arr = []
            // for (let i = 0; i < 10; i++) {
            //     arr.push(i)
            // }
            // this.mywritingBooks = arr
            // this.purchasedBooks = arr
            // this.collectionBooks = arr
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
        cursor: pointer;
        position: relative;
        .comment {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
            img {
                width: unset;
                height: unset;
                margin: 30px 30px 0 0;
            }
        }
        .idea {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 20%;
            background-color: rgba($color: #000000, $alpha: .3);
            text-align: center;
            line-height: 80px;
            z-index: 3;
            img {
                width: unset;
                height: unset;
            }
        }
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
        /* padding: 0 16px; */
        width: 25%;
        img {
            cursor: pointer;
        }
        strong,
        span {
            display: block;
        }
        .fontColor {
            color: #aaa;
        }
        strong {
            padding-bottom: 10px;
        }
    }
</style>