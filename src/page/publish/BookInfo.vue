<template lang="html">
    <div class="bookinfo" v-if="bookInfo">
        <div class="book">
            <div class="book__img">
                <!-- <a href='javascript:;' v-if="bookInfo.cover">
                <img :src="bookInfo.cover" alt="">
            </a> -->
            </div>
            <div class="book__msg">
                <div class="book__name" v-if="bookInfo.bookName">{{bookInfo.bookName}}</div>
                <div class="book__author">独立出版{{bookInfo.publishUserId}}：{{bookInfo.authorName}}</div>
                <div class="book__price">{{Number(bookInfo.price).toFixed(2)}}￥</div>
                <div class="book__feedback">
                    <strong>
                        <img src="../../assets/images/publish/108 浏览.png" alt="">
                    </strong>
                    <span>{{Number(bookInfo.viewCount)}}</span>
                    <strong>
                        <img src="../../assets/images/publish/109 收藏.png" alt="">
                    </strong>
                    <span>{{Number(bookInfo.favorityCount)}}</span>
                    <strong>
                        <img src="../../assets/images/publish/111 评论回复.png" alt="">
                    </strong>
                    <span>{{Number(bookInfo.commentCount)}}</span>
                </div>
                <div class="book__intro">
                    <span>介绍：</span>{{bookInfo.introduce}}</div>
                <div class="book__time">出版日期：{{bookInfo.createTime}} {{bookInfo.lastUpdateTime==bookInfo.createTime?'无修订':'修订日期'+bookInfo.lastUpdateTime}}
                    <a href='javascript:;' v-if="!$route.query.userId">
                    <img class="editimg" src="../../assets/images/editor/88 编辑.png" alt="" @click="linkto(bookInfo.id)">
                </a>
                    </div>
            </div>
            <div class="book__btn" v-if="$route.query.userId">
                <router-link :to="{path:'/read',query:{type:$route.query.type,bookId:bookInfo.id}}">
                <button class="book__trybtn">试读</button>
                </router-link>
                <button class="book__collectbtn" @click="addfavority(bookInfo.id)">{{bookInfo.favority?"已收藏":"收藏"}}</button>
               
                <br>
                <button class="book__addbtn" @click="addbuyBooks(bookInfo.id)">加入书单</button>
                <br>
                <button class="book__buybtn">立即购买</button>
                <br>
            </div>
              <div class="book__btn" v-if="!$route.query.userId">
                <router-link :to="{path:'/read',query:{type:$route.query.type,bookId:bookInfo.id}}">
                <button class="book__trybtn">阅读</button>
                </router-link>
            </div>
        </div>
        <div class="show clearfix">
            <div class="show__catalog utBorder ">
                <div class="show__cataloghead">
                    <div class="show__more">
                        <img src="../../assets/images/publish/131 书架-更多-黑.png" alt="">
                    </div>
                    <div class="show__total">总字数：{{Number(bookInfo.totalCountOfWords)}}</div>
                </div>
                <div class="show__cataloglist">
                    <div class="titile" :class="$route.query.type=='white'?'ut-white1':'ut-black1'" ref="navTree">
                        <div class="line" :class="$route.query.type=='white'?'navBorder-b pagecolr-black-after':'navBorder-w pagecolr-white-after'"></div>
                        
                         <ul v-for="(item, index) in bookInfo.catalogues" :key="index">
                              <li class='bor' >
                                  <a href='javascript:;' :class="$route.query.type=='white'?'nav-treeWhite':'nav-treeBlack'">{{item.name}}
                                     </a></li>
                              <label  v-for="(i, idx) in item.children" :key="idx">
                              <li class="big-titile" >
                                  <a href='javascript:;'  :class="$route.query.type=='white'?'nav-treeWhite':'nav-treeBlack'">{{i.name}}
                                       </a> 
                                 
                              </li>
                              <li class="small-titile"  v-for="(count,num) in i.children" :key="num">
                                  <a href='javascript:;'  :class="$route.query.type=='white'?'nav-treeWhite':'nav-treeBlack'">{{count.name}}
                                  </a> </li>
                              </label>
                         </ul>
                    </div> 
                </div>
            </div>
            <div class="show__comment">
                <div class="comment">
                    <div class="comment__head utBorder">
                        <span>
                            <a href='javascript:;'>
                            <img v-show="$route.query.type=='white'" src="../../assets/images/publish/116 评论回复-黑.png" alt="">
                            <img v-show="$route.query.type=='black'" src="../../assets//images/publish/111 评论回复.png" alt="">
                        </a>
                        </span>
                    </div>
                    <div class="clearfix">
                            <div class="mainItem utBorder">
                                    <textarea :class="$route.query.type=='white'?'ut-white1':'ut-black1 '" v-model="commentText" name="name" rows="8" cols="100" placeholder='写下你的评论吧...'></textarea>
                                    <el-tooltip effect="dark" content="发表" placement="bottom">
                                            <img v-if="!submitactive" src="../../assets/images/userinfo/112 提交.png" class='submit' @click="sendsub(bookInfo.id)">
                                            <img v-if="submitactive&&$route.query.type=='white'" src="../../assets/images/editor/issueb.png" class='submit'  @click.stop="submitactive=true">
                                            <img v-if="submitactive&&$route.query.type=='black'" src="../../assets/images/editor/issuew.png" class='submit'  @click.stop="submitactive=true">
                                    </el-tooltip>
                                  </div>
                    </div>
                    <div class="comment__item utBorder" v-for="(item, index) in commentList" :key="index">
                        <div class="tool">
                            <a href='javascript:;' class="maxTop">
                                <img src="../../assets/images/article/top-a.png" alt="">
                                <!-- <img src="../../assets/images/article/top-b.png" alt="">
                                <img src="../../assets/images/article/top-w.png" alt=""> -->
                            </a>
                            <a href='javascript:;'>
                            <img src="../../assets/images/article/90 删除.png" alt="" @click="delcommont(item.id,bookInfo.id)">
                            <!-- <img src="../../assets/images/article/105 删除-白.png" alt="">
                            <img src="../../assets/images/article/del.png" alt=""> -->
                        </a>
                        
                        </div>
                        <div class="clearfix">
                            <div class="comment__userimg"></div>
                            <div class="comment__text">
                                <div class="comment__username">{{item.penName}}</div>
                                <div class="comment__content">{{item.comment}}</div>
                            </div>
                            <div class="comment__btn">
                                <span class="comment__up">
                                    <img src="" alt="">
                                </span>
                                <span class="comment__close">
                                    <img src="" alt="">
                                </span>
                            </div>
                        </div>


                        <!-- <div class="comment__s clearfix">
                            <div class="comment__time">{{item.createTime}}</div>
                            <div class="comment__feedback">
                                <strong>
                                    <img src="../../assets/images/publish/108 浏览.png" alt="">
                                </strong>
                                <span>39</span>
                                <strong>
                                    <img src="../../assets/images/publish/111 评论回复.png" alt="">
                                </strong>
                                <span>39</span>
                                <strong>
                                    <img src="../../assets/images/publish/110 赞扬.png" alt="">
                                </strong>
                                <span>39</span>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['book'],
        data() {
            return {
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                navid: 0,
                submitactive: false,
                commentText: '',
            }
        },
        created() {
            console.log(this.$store.state.commentList)
        },
        computed: {
            bookInfo() {
                return this.$store.state.bookInfo;
            },
            commentList() {
                return this.$store.state.commentList
            }
        },
        methods: {
            //加入书单
            addbuyBooks(id) {
                this.unitAjax('post', 'v1/book/booklist/add', {
                    bookId: Number(id)
                }, res => {
                    if (res.code == 200) {
                        this.$message('已加入书单')
                    }
                })
            },
            //收藏
            addfavority(id) {
                this.unitAjax('post', "v1/book/favority/add", {
                    bookId: Number(id)
                }, res => {
                    if (res.code == 200) {
                        this.$message('收藏成功')
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
            //发表评论
            sendsub(id) {
                if (this.commentText) {
                    let params = {
                        bookId: Number(id), //	string	是	想法ID		
                        replyUserId: "", //	string	是	被回复的人ID(若对原想法评论，则为空)		
                        commentText: this.commentText, //	string	是	评论内容
                    }
                    this.submitactive = true
                    this.unitAjax('post', 'v1/book/comment/add', params, res => {
                        this.submitactive = false
                        if (res.code == 200) {
                            this.commentText = ""
                            this.$store.commit('getlist', id)
                            this.$message('发表成功')
                        } else {
                            this.$message(res.msg)
                        }
                    })
                } else {
                    this.$message('评论内容不能为空')
                }

            },
            //删除评论
            delcommont(id, bookId) {
                this.$confirm('此操作将删除该评论, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.unitAjax('delete', 'v1/book/comment/delete', {
                        commentId: id
                    }, res => {
                        if (res.code == 200) {
                            this.$store.commit('getlist', bookId)
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
            tourl(url, query) {
                tools.router.push({
                    path: url,
                    query: query
                })
            },
            handleNodeClick(data) {
                console.log(data);
            }
        },
        mounted() {
            var _this = this;
            this.$store.state.useType = 'bookinfo';
            this.$store.state.utstyle = 'white';
            this.$store.state.showFooter = false;
        },
        components: {

        }
    }
</script>

<style scoped lang='scss'>
    @import "../../assets/scss/tool.scss";
    .el-tree {
        border: none;
    }
    
    .bookinfo {
        width: 1264px;
        margin: 0 auto;
        margin-top: 140px;
        padding-bottom: 200px;
        // overflow: hidden;
    }
    
    button {
        background: #fff;
    }
    
    .book {
        overflow: hidden;
    }
    
    .book__img {
        width: 418px;
        height: 510px;
        background: #eeeeee;
        float: left;
        img {
            width: 100%;
            height: 100%;
        }
    }
    
    .book__msg {
        float: left;
        margin-left: 50px;
    }
    
    .book__name {
        font-size: 26px;
        font-weight: bold;
    }
    
    .book__author {
        font-weight: bold;
        margin-top: 30px;
    }
    
    .book__price {
        font-size: 26px;
        margin-top: 74px;
        font-weight: bold;
    }
    
    .book__feedback {
        margin-top: 18px;
        color: #aaa;
        strong,
        span {
            display: inline-block;
            vertical-align: top;
        }
        span {
            padding-right: 20px;
        }
    }
    
    .book__intro {
        width: 550px;
        height: 218px;
        margin-top: 42px;
        span {
            font-weight: bold;
        }
    }
    
    .book__time {
        color: #aaa;
        position: relative;
        .editimg {
            position: absolute;
            top: 0;
            right: -232px;
        }
    }
    
    .book__btn {
        float: right;
        text-align: center;
        line-height: 52px;
        // font-weight: bold;
        overflow: hidden;
        button {
            cursor: pointer;
        }
    }
    
    .book__trybtn,
    .book__collectbtn {
        float: left;
        width: 98px;
        height: 52px;
        border: 1px solid #000000;
        overflow: hidden;
    }
    
    .book__collectbtn {
        margin-left: 16px;
    }
    
    .book__addbtn,
    .book__buybtn {
        width: 210px;
        height: 52px;
        border: 1px solid #000000;
        margin-top: 14px;
        overflow: hidden;
        cursor: pointer;
    }
    
    .show {
        margin-top: 96px;
    }
    
    .show__catalog {
        border-top: 1px solid #eee;
        float: left;
        width: 414px;
    }
    
    .show__cataloghead {
        padding: 26px;
    }
    
    .show__more {
        float: left;
    }
    
    .show__total {
        float: right;
        font-size: 12px;
        color: #aaa;
        /* font-weight: bold; */
    }
    
    .show__cataloglist {
        margin-top: 28px;
        margin-left: 20px;
    }
    
    .show__comment {
        width: 800px;
        float: right;
    }
    
    .comment {}
    
    .comment__head {
        text-align: center;
        span {
            display: block;
            float: left;
            padding: 0 38px;
            // position: relative;
            // top: -10px;
            transform: translateY(-50%);
            z-index: 5;
        }
    }
    
    .comment__head::before,
    .comment__head::after {
        width: 346px;
        height: 1px;
        background: #eee;
        content: '';
        float: left;
    }
    
    .comment__item {
        padding: 30px 20px;
        // overflow: hidden;
        border-bottom: 1px solid;
        position: relative;
        .tool {
            position: absolute;
            top: 20px;
            right: 22px;
            .maxTop {
                margin-right: 15px;
            }
        }
    }
    
    .comment__userimg {
        width: 44px;
        height: 44px;
        background: #ccc;
        float: left;
    }
    
    .comment__text {
        float: left;
        margin-left: 14px;
    }
    
    .comment__time {
        float: left;
    }
    
    .comment__feedback {
        float: right;
        strong,
        span {
            display: inline-block;
            vertical-align: middle;
        }
        span {
            padding-left: 8px;
            padding-right: 26px;
        }
        span:last-child {
            padding-right: 0;
        }
    }
    
    .comment__content {
        margin-top: 8px;
    }
    
    .comment__s {
        margin-top: 40px;
        color: #aaa;
        /* font-weight: bold; */
        font-size: 14px;
    }
    
    .titile {
        position: relative;
        .line {
            height: 100%;
            position: absolute;
            top: 13px;
            left: 5px;
            border-left: 1px solid;
            padding-bottom: 58px;
        }
        ul {
            margin-top: 30px;
            line-height: 30px;
            padding: 0 20px;
            &:nth-last-child(1) {
                transform: translateY(30px);
            }
            a {
                position: relative;
                color: #898989;
                i {
                    position: absolute;
                    top: 2px;
                    right: -50px;
                    width: 15px;
                    height: 15px;
                    line-height: 13px;
                    border-radius: 50%;
                    border: 1px solid;
                    text-align: center;
                    display: none;
                    &:hover {
                        display: inline;
                    }
                }
                .remove {
                    right: -80px;
                }
                /* &:hover {
                            i {
                                
                            }
                        } */
            }
            li:hover {
                i {
                    display: inline;
                }
            }
            .bor {
                list-style-type: initial;
                width: 200px;
                //  padding-left:10px;
            }
            .big-titile {
                margin-left: 15px;
                width: 200px;
            }
            .small-titile {
                width: 200px;
                display: block;
                margin-left: 30px
            }
        }
    }
    
    .mainItem {
        position: relative;
        border-bottom: 1px solid;
        textarea {
            border: none;
            resize: none;
            outline: none;
        }
        .submit {
            position: absolute;
            bottom: 20px;
            right: 19px;
            @include hand;
        }
    }
</style>