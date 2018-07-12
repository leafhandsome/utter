<template>
  <div class="container" :class="readcolor=='white'?'ut-white1':'ut-black1'" @click="showmore=false">
    <div class="tree fl">
      <a href="javaScript:;">
      <img v-show="readcolor=='white'" class="navimg " src="../../assets/images/editor/175 创作区-目录.png" alt="" @click="getnvetree">
      <img v-show="readcolor=='black'" class="navimg " src="../../assets/images/editor/192 创作区-目录-白.png" alt="" @click="getnvetree">
      </a>
      <div class="show__cataloglist">
            <div class="titile" :class="$route.query.type=='white'?'ut-white1':'ut-black1'" ref="navTree">
                <div class="line" :class="$route.query.type=='white'?'navBorder-b pagecolr-black-after':'navBorder-w pagecolr-white-after'"></div>
                
                 <ul v-for="(item, index) in bookInfo.catalogues" :key="index">
                      <li class='bor' :class="navid==item.id?'active-nav':''">
                          <a href='javascript:;' :class="$route.query.type=='white'?'nav-treeWhite':'nav-treeBlack'" @click="settitile(item.name,item.id,$event)">{{item.name}}
                             </a></li>
                      <label  v-for="(i, idx) in item.children" :key="idx">
                      <li class="big-titile" :class="navid==i.id?'active-nav':''">
                          <a href='javascript:;' @click="settitile(i.name,i.id,$event)" :class="$route.query.type=='white'?'nav-treeWhite':'nav-treeBlack'">{{i.name}}
                               </a> 
                         
                      </li>
                      <li class="small-titile" :class="navid==count.id?'active-nav':''" v-for="(count,num) in i.children" :key="num">
                          <a href='javascript:;' @click="settitile(count.name,count.id,$event)" :class="$route.query.type=='white'?'nav-treeWhite':'nav-treeBlack'">{{count.name}}
                          </a> </li>
                      </label>
                 </ul>
            </div> 
        </div>
  </div>
  <div class="back fr" @click="$router.go(-1)">
   <a href="javascript:;"><img src="../../assets//images//editor/backa.png" alt=""></a>
  </div>
  <div class="content">
      <h3>{{titile}}</h3>
      <div class="reader-content" v-html="textcontent.text">
       
      </div>
     
  </div>
      <div class="footer">
         <div class="innerbox clearfix">
             <div class="pull-left">
                <span>{{ideapage}}</span>  
        <img v-show="ideapage==1" src="../../assets/images/article/prev.png" alt="上一页">
          <img v-show="$route.query.type=='white'&&ideapage!=1" src="../../assets/images/article/prev-black.png" alt="上一页" @click="prepage">
          <img  v-show="$route.query.type=='black'&&ideapage!=1" src="../../assets/images/article/prev-w.png" alt="上一页" @click="prepage">
              </div>
              <a href='javaScript:;'  @click.stop="showmore=true">
              <img v-show="readcolor=='white'" class="more" src="../../assets/images/article/more.png" alt="" @click.stop="showmore=true">
              <img v-show="readcolor=='black'" class="more" src="../../assets/images/article/more-w.png" alt="" @click.stop="showmore=true">
              </a>
               <div class="pull-right" >
                
                <img v-show="ideapage ==ideaTotal||ideaTotal==0" src="../../assets/images/article/next-a.png" alt="">
                  <a href='javascript:;' v-if="ideaTotal!=0">
            <img v-show="$route.query.type=='white'&&ideapage !=ideaTotal" src="../../assets/images/article/next.png" alt=""  @click="nextpage">
            <img v-show="$route.query.type=='black'&&ideapage !=ideaTotal" src="../../assets/images/article/next-w.png" alt="下一页" @click="nextpage">
        
            </a>
                <span>{{ideaTotal}}</span>
              </div> 
              <div class="more-set" v-show="showmore" @click.stop="showmore=true">
                  <a href="javaScript:;">
                    <img v-show="readcolor=='black'" src="../../assets/images/editor/173 创作区背景-白.png" alt="" @click="getreadercolor('white')">
                    <img v-show="readcolor=='white'" src="../../assets/images/editor/174 创作区背景-黑.png" alt="" @click="getreadercolor('black')">
                    </a>
                     <a href="javaScript:;">
                    <img v-show="readcolor=='white'"  src="../../assets/images/article/share.png" alt="">
                    <img v-show="readcolor=='black'"  src="../../assets/images/article/103 分享-白.png" alt="">
                    </a>
                     <a href="javaScript:;">
                    <img v-show="readcolor=='white'"  src="../../assets/images/article/moredown.png" alt="">
                    <img v-show="readcolor=='black'"  src="../../assets/images/article/down-w.png" alt="">
                    </a>
              </div>
            </div>
      </div>
      
  </div>
</template>
<script>
    export default {
        data() {
            return {
                data: [],
                defaultProps: {
                    children: "children",
                    label: "label"
                },
                showTree: false,
                showmore: false,
                readcolor: 'white',
                navid: 0,
                textcontent: {},
                contentList: [],
                ideapage: 1,
                ideaTotal: 1,
                titile: '',
            };
        },
        created() {
            this.$store.commit('getbookId', this.$route.query.bookId)
            this.readcolor = this.$route.query.type;
            this.navid = this.$store.state.bookInfo.catalogues[0].id;
            this.titile = this.$store.state.bookInfo.catalogues[0].name;
        },
        computed: {
            bookInfo() {
                return this.$store.state.bookInfo;
            }
        },
        methods: {
            settitile(value, id, e) {
                this.navid = id;
                this.ideapage = 1;
                this.titile = value;
                if (this.showTree = true) {
                    let arr = document.querySelectorAll('.navtab')
                    for (let i = 0; i < arr.length; i++) {
                        arr[i].className = 'navtab';
                    }
                    if (this.$route.query.type == 'white') {
                        e.target.className = 'nav-treeWhite navtab'
                    } else {
                        e.target.className = 'nav-treeBlack navtab'
                    }

                }
                this.getbooksContent()
            },
            getbooksContent() {
                if (this.navid != 0) {
                    this.unitAjax('get', 'v1/book/listChapter', {
                        bookId: Number(this.$route.query.bookId),
                        catalogueId: this.navid
                    }, res => {
                        if (res.code == 200) {
                            // this.editor.execCommand("getlocaldata")
                            this.contentList = res.data
                            this.ideaTotal = res.data.length
                            if (res.data.length > 0) {
                                this.textcontent = res.data[0]
                            }
                        }
                    })
                }
            },

            // 书籍翻页
            nextpage() {
                this.ideapage++;
                this.textcontent = this.contentList[this.ideapage - 1]

            },
            prepage() {
                if (this.ideapage > 1) {
                    this.ideapage--;
                    this.textcontent = this.contentList[this.ideapage - 1]
                } else {
                    this.ideapage = 1
                }

            },
            getnvetree() {
                this.showTree = true;
            },
            //更换背景色
            getreadercolor(color) {
                this.readcolor = color;
            },
            handleNodeClick(data) {
                console.log(data);
            }
        }
    };
</script>
<style lang="scss" scoped>
    .container {
        height: 100%;
        .back {
            margin: 30px;
        }
        .tree {
            margin: 100px 0 0 50px;
        }
        .show__cataloglist {
            margin-top: 28px;
            margin-left: 20px;
        }
        .titile {
            position: relative;
            .line {
                height: 100%;
                position: absolute;
                top: 13px;
                left: 4.5px;
                border-left: 1px solid;
                padding-bottom: 58px;
                width: 2px;
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
        .innerbox {
            width: 200px;
            height: 25px;
            margin: 0 auto;
            position: relative;
            .more {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate3d(-50%, -50%, 0);
                width: 20px;
                height: 18px;
            }
            .more-set {
                position: absolute;
                top: -200%;
                left: 0;
                img {
                    margin-left: 30px;
                    vertical-align: middle;
                }
            }
            .pull-left,
            .pull-right {
                height: 25px;
                line-height: 25px;
                cursor: pointer;
                img {
                    height: 25px;
                }
                span {
                    display: inline-block;
                    vertical-align: top;
                    margin: 0 10px;
                }
            }
        }
        .content {
            width: 1000px;
            margin: 0 auto;
            padding-top: 100px;
            height: 800px;
            h3 {
                margin: 0;
            }
            .reader-content {
                margin-top: 50px;
                line-height: 30px;
            }
        }
    }
</style>