<template lang="html">
    <div class="bookinfo">
        <div class="book">
            <div class="book__img">
                <img src="" alt="">
            </div>
            <div class="book__msg">
                <div class="book__name">不问远征 无关朝夕</div>
                <div class="book__author">独立出版：余甘</div>
                <div class="book__price">23.00￥</div>
                <div class="book__feedback">
                    <strong>
                        <img src="../../assets/images/publish/108 浏览.png" alt="">
                    </strong>
                    <span>39</span>
                    <strong>
                        <img src="../../assets/images/publish/109 收藏.png" alt="">
                    </strong>
                    <span>39</span>
                    <strong>
                        <img src="../../assets/images/publish/111 评论回复.png" alt="">
                    </strong>
                    <span>39</span>
                </div>
                <div class="book__intro">
                    <span>介绍：</span>不问远征 无关朝夕</div>
                <div class="book__time">出版日期：2017.09.26 无修订<img class="editimg" src="../../assets/images/editor/88 编辑.png" alt=""></div>
            </div>
            <div class="book__btn">
                <router-link :to="{path:'/read',query:{type:$route.query.type}}">
                <button class="book__trybtn">试读</button>
                </router-link>
                <button class="book__collectbtn">收藏</button>
               
                <br>
                <button class="book__addbtn">加入书单</button>
                <br>
                <button class="book__buybtn">立即购买</button>
                <br>
            </div>
        </div>
        <div class="show clearfix">
            <div class="show__catalog utBorder ">
                <div class="show__cataloghead">
                    <div class="show__more">
                        <img src="../../assets/images/publish/131 书架-更多-黑.png" alt="">
                    </div>
                    <div class="show__total">总字数：555554545</div>
                </div>
                <div class="show__cataloglist">
                    <div class="titile" :class="$route.query.type=='white'?'ut-white1':'ut-black1'" ref="navTree">
                        <div class="line" :class="$route.query.type=='white'?'navBorder-b pagecolr-black-after':'navBorder-w pagecolr-white-after'"></div>
                        
                         <ul v-for="(item, index) in datalist" :key="index">
                              <li class='bor' :class="navid==item.id?'active-nav':''">
                                  <a href='javascript:;' :class="$route.query.type=='white'?'nav-treeWhite':'nav-treeBlack'" @click="settitile(item.label,item.id)">{{item.label}}
                                     </a></li>
                              <label  v-for="(i, idx) in item.children" :key="idx">
                              <li class="big-titile" :class="navid==i.id?'active-nav':''">
                                  <a href='javascript:;' @click="settitile(i.label,i.id)" :class="$route.query.type=='white'?'nav-treeWhite':'nav-treeBlack'">{{i.label}}
                                       </a> 
                                 
                              </li>
                              <li class="small-titile" :class="navid==count.id?'active-nav':''" v-for="(count,num) in i.children" :key="num">
                                  <a href='javascript:;' @click="settitile(count.label,count.id)" :class="$route.query.type=='white'?'nav-treeWhite':'nav-treeBlack'">{{count.label}}
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
                            <img v-show="$route.query.type=='white'" src="../../assets/images/publish/116 评论回复-黑.png" alt="">
                            <img v-show="$route.query.type=='black'" src="../../assets//images/publish/111 评论回复.png" alt="">
                        </span>
                    </div>
                    <div class="clearfix"></div>
                    <div class="comment__item utBorder">
                        <div class="tool">
                            <a href='javascript:;' class="maxTop">
                                <img src="../../assets/images/article/top-a.png" alt="">
                                <!-- <img src="../../assets/images/article/top-b.png" alt="">
                                <img src="../../assets/images/article/top-w.png" alt=""> -->
                            </a>
                            <a href='javascript:;'>
                            <img src="../../assets/images/article/90 删除.png" alt="">
                            <!-- <img src="../../assets/images/article/105 删除-白.png" alt="">
                            <img src="../../assets/images/article/del.png" alt=""> -->
                        </a>
                        
                        </div>
                        <div class="clearfix">
                            <div class="comment__userimg"></div>
                            <div class="comment__text">
                                <div class="comment__username">路人甲</div>
                                <div class="comment__content">发表你的见解或欣赏</div>
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


                        <div class="comment__s clearfix">
                            <div class="comment__time">2017 11 18 / 23:59</div>
                            <div class="comment__feedback">
                                <!-- <strong>
                                    <img src="../../assets/images/publish/108 浏览.png" alt="">
                                </strong>
                                <span>39</span>
                                <strong> -->
                                    <img src="../../assets/images/publish/111 评论回复.png" alt="">
                                </strong>
                                <span>39</span>
                                <strong>
                                    <img src="../../assets/images/publish/110 赞扬.png" alt="">
                                </strong>
                                <span>39</span>
                            </div>
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
                datalist: [{
                    label: '一级 1',
                    children: [{
                        label: '二级 1-1',
                        children: [{
                            label: '三级 1-1-1'
                        }]
                    }]
                }, {
                    label: '一级 2',
                    children: [{
                        label: '二级 2-1',
                        children: [{
                            label: '三级 2-1-1'
                        }]
                    }, {
                        label: '二级 2-2',
                        children: [{
                            label: '三级 2-2-1'
                        }]
                    }]
                }, {
                    label: '结语',
                  
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                navid:0,
            }
        },
        created() {
           
        },
        methods: {
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
                      &:nth-last-child(1){
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
</style>