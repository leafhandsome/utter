<template lang="html">
  <div class="idea clearfix" @click="closeshow">
    <!-- <button type="button" @click='bold' name="button">加粗</button>
    <div id='container' class="ue">

    </div> -->

    <div class="leftCate pull-left utBorder" :style='height'>
      <div class="cateList utBorder">
        <div class="cate utBorder" :class="cateTab==0?($route.query.type=='white'? ' active':' active-w'):''" @click='catefun(0)'>
          想法
        </div>
        <div v-show="!$route.query.userId" class="cate utBorder" :class="cateTab==1?($route.query.type=='white'? ' active':' active-w'):''" @click='catefun(1)'>
          灵感
        </div>

      </div>
    </div>
    <!-- 想法 -->
    <div class="list pull-left utBorder" v-show="cateTab==0" >
      <div class="mainItem utBorder" v-show="!$route.query.userId">
        <textarea :class="$route.query.type=='white'?'ut-white1':'ut-black1 '" name="name" rows="8" cols="100" auto-complete="off"
        placeholder='写下你的想法吧...' v-model="ideaUserInfo"></textarea>
        <el-tooltip effect="dark" content="发表" placement="bottom">
                <img v-if="!submitactive" src="../assets/images/userinfo/112 提交.png" class='submit'  @click.stop="senduserInfo">
                <img v-if="submitactive&&pagecolor=='white'" src="../assets/images/editor/issueb.png" class='submit'  @click.stop="submitactive=true">
                <img v-if="submitactive&&pagecolor=='black'" src="../assets/images/editor/issuew.png" class='submit'  @click.stop="submitactive=true">
        </el-tooltip>
        <div class="itemTools utBorder">
          <div class="tools utBorder" @click='openfun(1)'>
            <el-tooltip effect="dark" content="公开" placement="right">
              <img v-if='showopen' src="../assets/images/article/open-c.png" alt="公开">
              <img v-if='(!showopen||opentab==1)&&$route.query.type=="white"'  src="../assets/images/article/open.png" alt="公开">
              <img v-if='(!showopen||opentab==1)&&$route.query.type=="black"'  src="../assets/images/article/open-w.png" alt="公开">
              
            </el-tooltip>
          </div>
          <div class="tools"  @click='closefun(2)'>
            <el-tooltip effect="dark" content="保密" placement="right">
               <img  v-if='showclose' src="../assets/images/article/close-c.png" alt="保密">
              <img  v-if='(!showclose||opentab==2)&&$route.query.type=="white"'  src="../assets/images/article/close.png" alt="保密">
              <img  v-if='(!showclose||opentab==2)&&$route.query.type=="black"'  src="../assets/images/article/close-w.png" alt="保密">
            </el-tooltip>
          </div>

        </div>
      </div>
    
      <div class="items" v-for="(item, index) in ideaList" :key="index">
        <div class="item clearfix utBorder">
          <div class="leftSide">
            <div class="content">
              {{item.idea}}
            </div>
          </div>

          <div class="rightSide clearfix">
            <div class="time">
             {{item.createTime}}
            </div>
            
            <div class="tools">
              <div class="tool utBorder">
                <!-- <img src="../assets/images/article/see.png" alt="关注"> -->
                 <img src="../assets/images/publish/108 浏览.png" alt="关注">
                 <span>{{item.viewCount}}</span>
              </div>
              <div class="tool">
                 <img v-show="!showsay" src="../assets/images/publish/111 评论回复.png" alt="评论" @click="showsay=true">
                <img v-show="showsay" src="../assets/images/article/comments.png" alt="评论"> 
                <span>{{item.commentCount}}</span>
              </div>
              <div class="tool">
                  <img v-if="!showgood" src="../assets/images/publish/110 赞扬.png" alt="点赞" @click="setgood(item.id)"> 
                <img v-if="$route.query.type=='white'&&showgood" src="../assets/images/article/good.png" alt="点赞">
                <img v-if="$route.query.type=='black'&&showgood" src="../assets/images/publish/120 赞扬-白.png" alt="点赞">
                 <span>{{item.likeCount}}</span>
              </div>
            </div>
            <el-tooltip effect="dark" content="更多" placement="bottom" class="toolright tools" v-show="!$route.query.userId">
            <img v-if="!moreActive" src="../assets/images/article/more-w.png" alt="更多" @click.stop="getmoretools(index)">
            <img v-if="pagecolor=='black'&&moreActive" src="../assets/images/article/135 书架-更多-白.png" alt="更多" @click.stop="getmoretools(index)">
            <img v-if="pagecolor=='white'&&moreActive" src="../assets/images/article/more.png" alt="更多" @click.stop="getmoretools(index)">
          </el-tooltip>
          </div>

          <div class="itemTools remove utBorder" v-show="showtools==index" @click.stop="showtools=index">
            <div class="tools utBorder"  @click.stop="gettools(1)">
              <el-tooltip effect="dark" content="编辑" placement="right">
                <img v-if="toolactive!=1" src="../assets/images/article/88 编辑.png" alt="编辑">
                <img v-if="$route.query.type=='white'&&toolactive==1" src="../assets/images/article/edit.png" alt="编辑">
                <img v-if="$route.query.type=='black'&&toolactive==1" src="../assets/images/article/104 编辑-白.png" alt="编辑">
              </el-tooltip>
            </div>
            <div class="tools utBorder" @click.stop="gettools(2,item.id)">
              <el-tooltip effect="dark" content="删除" placement="right" >
                <img v-if="toolactive!=2" src="../assets/images/article/90 删除.png" alt="删除">
                <img v-if="$route.query.type=='white'&&toolactive==2" src="../assets/images/article/del.png" alt="删除">
                <img v-if="$route.query.type=='black'&&toolactive==2"  src="../assets/images/article/105 删除-白.png" alt="删除">
              </el-tooltip>
            </div>
          </div>
        </div>

          <!-- 评论 -->
      <div class="mainItem utBorder" >
        <textarea :class="$route.query.type=='white'?'ut-white1':'ut-black1 '" name="name" rows="8" cols="100" v-focus="showsay"
         placeholder='写下你的评论吧...' v-model="commentText"></textarea>
        <el-tooltip effect="dark" content="发表" placement="bottom">
                <img v-if="!submitactive" src="../assets/images/userinfo/112 提交.png" class='submit'  @click.stop="sendsayInfo">
                <img v-if="submitactive&&pagecolor=='white'" src="../assets/images/editor/issueb.png" class='submit'  @click.stop="submitactive=true">
                <img v-if="submitactive&&pagecolor=='black'" src="../assets/images/editor/issuew.png" class='submit'  @click.stop="submitactive=true">
        </el-tooltip>
        
      </div>

        <div class="comments" v-for="(item, index) in sayList" :key="index">
          <div class="comment utBorder">
            <el-tooltip effect="dark" content="删除" placement="bottom" class="fr">
                 <img v-if="!$route.query.userId" src="../assets/images/article/90 删除.png" alt="删除" class='del' @click="removeSay(item.id)">
              <!-- <img  v-if="$route.query.type=='white'" src="../assets/images/article/del.png" class='del' alt="删除">
              <img else src="../assets/images/article/105 删除-白.png" alt="删除" class='del'> -->
            </el-tooltip>
            <div class="leftSide clearfix">

              <div class="cover pull-left"></div>
              <div class="info pull-left">
                <div class="nickName">{{item.penName}}</div>
                <div class="content">
                 {{item.comment}}
                </div>
              </div>
            </div>

            <div class="rightSide clearfix">
              <div class="time">
                {{item.createTime}}
              </div>

              <!-- <div class="tools toolright">
            
                <div class="tool">
                  <img src="../assets/images/article/comments.png" alt="评论">
                   <img src="../assets/images/publish/111 评论回复.png" alt="评论">
                   <span>03</span>
                </div>
                <div class="tool">
                  <img src="../assets/images/article/good.png" alt="点赞"> 
                  <img src="../assets/images/publish/110 赞扬.png" alt="点赞"> 
                  <span>28</span>
                </div>
              </div> -->

              <!-- <el-tooltip effect="dark" content="更多" placement="bottom">
                <img v-if="$route.query.type=='white'" src="../assets/images/article/more.png" class='more' alt="更多">
                <img else src="../assets/images/article/more-w.png" class='more' alt="更多">
              </el-tooltip> -->
            </div>

          </div>
        </div>
      </div>
     <div class="pageTools">
      <div class="innerbox clearfix">
        <div class="pull-left">
          <!-- <span>{{ideapage}}</span> -->
          <img v-show="ideapage==1" src="../assets/images/article/prev.png" alt="上一页">
          <img v-show="$route.query.type=='white'&&ideapage!=1" src="../assets/images/article/prev-black.png" alt="上一页" @click="prepage">
          <img  v-show="$route.query.type=='black'&&ideapage!=1" src="../assets/images/article/prev-w.png" alt="上一页" @click="prepage">
        </div>
         <div class="pageindex">{{ideapage}}</div>
        <div class="pull-right">
            <a href='javascript:;'>
            <img v-show="ideapage ==ideaTotal" src="../assets/images/article/next-a.png" alt="">
          <img v-show="$route.query.type=='white'&&ideapage !=ideaTotal" src="../assets/images/article/next.png" alt=""  @click="nextpage">
          <img v-show="$route.query.type=='black'&&ideapage !=ideaTotal" src="../assets/images/article/next-w.png" alt="下一页" @click="nextpage">
          <!-- <span>{{ideaTotal}}</span> -->
        </a>
        </div>
      </div>
    </div>
    </div>
    
        <!-- 灵感 -->
        <div class="list pull-left utBorder" v-show="cateTab==1&&getValue('userId')!==''">
            <div class="mainItem utBorder">
              <textarea :class="$route.query.type=='white'?'ut-white1':'ut-black1 '" v-model="inspirationTex" name="name" rows="8" cols="100" placeholder='写下你的灵感吧...'></textarea>
              <el-tooltip effect="dark" content="发表" placement="bottom">
                      <img v-if="!submitactive" src="../assets/images/userinfo/112 提交.png" class='submit'  @click.stop="sendinspiration">
                      <img v-if="submitactive&&pagecolor=='white'" src="../assets/images/editor/issueb.png" class='submit'  @click.stop="submitactive=true">
                      <img v-if="submitactive&&pagecolor=='black'" src="../assets/images/editor/issuew.png" class='submit'  @click.stop="submitactive=true">
              </el-tooltip>
            </div>
      
            <div class="items" v-for="(item, index) in inspirationList" :key="index">
              <div class="item clearfix utBorder"  @click.stop="toolactive==3" >
                <div class="leftSide" v-show="setactive!=index">
                  <div class="content">
                    {{item.inspiration}}
                  </div>
                </div>
                <textarea v-show="setactive==index":class="$route.query.type=='white'?'ut-white1':'ut-black1 '"  v-model="ideaText" v-focus="setactive==index"
                 name="name" rows="5" cols="100" placeholder=''></textarea>
                <div class="rightSide clearfix">
                  <div class="time">
                    {{item.lastUpdateTime}}
                  </div>
                    <el-tooltip effect="dark" content="发表" placement="bottom" class="toolright tools"   v-show="setactive==index">
                        <a href='javascript:;' class="inpiration">
                      <img v-if="!submitactive" src="../assets/images/userinfo/112 提交.png" class='submit'  @click.stop="setinspiration(item.inspiration,item.id)">
                      <img v-if="submitactive&&pagecolor=='white'" src="../assets/images/editor/issueb.png" class='submit'  @click.stop="submitactive=true">
                      <img v-if="submitactive&&pagecolor=='black'" src="../assets/images/editor/issuew.png" class='submit'  @click.stop="submitactive=true">
                    </a>
                 </el-tooltip>
                  <el-tooltip  v-show="setactive!=index" effect="dark" content="更多" placement="bottom" class="toolright tools">
                  <img v-if="!moreActive" src="../assets/images/article/more-w.png" alt="更多" @click.stop="getmoretools(index)">
                  <img v-if="pagecolor=='black'&&moreActive" src="../assets/images/article/135 书架-更多-白.png" alt="更多" @click.stop="getmoretools(index)">
                  <img v-if="pagecolor=='white'&&moreActive" src="../assets/images/article/more.png" alt="更多" @click.stop="getmoretools(index)">
                </el-tooltip>
                </div>
      
                <div class="itemTools remove utBorder" v-show="showtools==index" @click.stop="showtools=index">
                  <div class="tools utBorder"  @click.stop="gettools(3,index,item.inspiration)">
                    <el-tooltip effect="dark" content="编辑" placement="right">
                      <img v-if="setactive!=index" src="../assets/images/article/88 编辑.png" alt="编辑">
                      <img v-if="$route.query.type=='white'&&setactive==index" src="../assets/images/article/edit.png" alt="编辑">
                      <img v-if="$route.query.type=='black'&&setactive==index" src="../assets/images/article/104 编辑-白.png" alt="编辑">
                    </el-tooltip>
                  </div>
                  <div class="tools utBorder" @click.stop="gettools(4,item.id)">
                    <el-tooltip effect="dark" content="删除" placement="right" >
                      <img v-if="toolactive!=4" src="../assets/images/article/90 删除.png" alt="删除">
                      <img v-if="$route.query.type=='white'&&toolactive==4" src="../assets/images/article/del.png" alt="删除">
                      <img v-if="$route.query.type=='black'&&toolactive==4"  src="../assets/images/article/105 删除-白.png" alt="删除">
                    </el-tooltip>
                  </div>
                </div>
              </div>
      
             
            </div>
       <div class="pageTools">
      <div class="innerbox clearfix">
        <div class="pull-left">
          <!-- <span>{{pageinspriation}}</span> -->
          <img v-show="pageinspriation==1" src="../assets/images/article/prev.png" alt="上一页">
          <img v-show="$route.query.type=='white'&&pageinspriation!=1" src="../assets/images/article/prev-black.png" @click="prevIndex" alt="上一页">
          <img  v-show="$route.query.type=='black'&&pageinspriation!=1" src="../assets/images/article/prev-w.png" @click="prevIndex" alt="上一页">
        </div>
            <div class="pageindex">{{pageinspriation}}</div>
        <div class="pull-right">
            <img v-show="pageinspriation ==Math.ceil(pageIndex/2)" src="../assets/images/article/next-a.png" alt="">
          <img v-show="$route.query.type=='white'&&pageinspriation !=Math.ceil(pageIndex/2)" src="../assets/images/article/next.png" alt="" @click='nextPageindex'>
          <img v-show="$route.query.type=='black'&&pageinspriation !=Math.ceil(pageIndex/2)" src="../assets/images/article/next-w.png" alt="下一页" @click='nextPageindex'>
          <!-- <span>{{ Math.ceil(pageIndex/2)}}</span> -->
        </div>
      </div>
    </div>
          </div>
      
    
  </div>
</template>
<script>
    import '../../static/ue/ueditor.config.js';
    import '../../static/ue/ueditor.all.min.js';
    import '../../static/ue/lang/zh-cn/zh-cn.js'
    export default {

        data() {
            return {
                editor: null,
                height: {
                    height: '0px'
                },
                height2: {
                    height: '0px'
                },
                cateTab: 0,
                showclose: true,
                showopen: false,
                opentab: 1,
                submitactive: false,
                pagecolor: this.$route.query.type,
                moreActive: false,
                showtools: -1,
                toolactive: 0,
                ideaUserInfo: '',
                ideaList: [],
                showsay: false,
                ideaId: '12',
                commentText: '',
                inspirationTex: '', //灵感
                inspirationList: [],
                sayList: [], //想法评论
                ideapage: 1,
                ideaTotal: '',
                showpre: false,
                showgood: false,
                pageinspriation: 1,
                pageIndex: '',
                setactive: -1,
                ideaText: '',
            }
        },
        created() {
            this.getidea()

        },
        directives: {
            focus: {
                update: function(el, {
                    value
                }) {
                    if (value) {
                        el.focus()
                    }
                }
            }
        },
        methods: {
            //下一页灵感
            nextPageindex() {
                if (this.pageinspriation == Math.ceil(this.pageIndex / 2)) {
                    return;
                } else {
                    this.pageinspriation++
                        this.getinspiration()
                }

            },
            prevIndex() {
                if (this.pageinspriation != 1) {
                    this.pageinspriation--
                        this.getinspiration()
                } else {
                    this.pageinspriation = 1
                }
            },
            //发表灵感
            sendinspiration() {
                if (this.inspirationTex) {
                    this.submitactive = true
                    this.unitAjax('post', 'v1/inspiration/add', {

                        text: this.inspirationTex
                    }, res => {
                        this.submitactive = false
                        if (res.code == 200) {
                            this.inspirationTex = ''
                            this.getinspiration()
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                }

            },
            // 编辑灵感
            setinspiration(text, id) {

                if (this.ideaText) {
                    this.submitactive = true
                    this.unitAjax('post', 'v1/inspiration/edit', {
                        inspirationId: id,
                        text: this.ideaText
                    }, res => {
                        this.submitactive = false
                        if (res.code == 200) {
                            this.setactive = -1;
                            // 更多
                            this.moreActive = false;
                            // tools
                            this.showtools = -1;
                            this.getinspiration()
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                }
            },
            // 灵感列表
            getinspiration() {
                this.unitAjax('get', 'v1/inspiration/list', {
                    page: this.pageinspriation,
                    pageSize: '2'
                }, res => {
                    if (res.code == 200) {
                        this.inspirationList = res.data.rows;
                        this.pageIndex = res.data.total;
                    }
                })
            },
            // 获取想法列表
            getidea() {
                this.unitAjax('get', 'v1/idea/list', {
                    page: this.ideapage,
                    pageSize: '1',

                }, res => {
                    if (res.code == 200) {
                        this.ideaList = res.data.rows;
                        this.ideaId = res.data.rows[0].id;
                        this.ideaTotal = res.data.total
                        this.getsaylist()
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            },
            //想法先赞
            setgood(id) {
                this.unitAjax('post', 'v1/idea/like/add', {
                    ideaId: Number(id)
                }, res => {
                    if (res.code == 200) {
                        this.showgood = true
                        this.getidea()
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            },
            // 想法翻页
            nextpage() {
                if (this.ideapage == this.ideaTotal) {
                    this.ideapage = this.ideaTotal
                } else {
                    this.ideapage++;
                    this.getidea()
                }

            },
            prepage() {
                if (this.ideapage > 1) {
                    this.ideapage--;
                    this.getidea()
                } else {
                    this.ideapage = 1
                }

            },
            // 获取评论列表
            getsaylist() {
                this.unitAjax('get', 'v1/idea/comment/list', {
                    page: '1',
                    pageSize: '50',
                    ideaId: this.ideaId,
                }, res => {
                    if (res.code == 200) {
                        this.sayList = res.data.rows
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            },
            //发表想法
            senduserInfo() {
                if (this.ideaUserInfo) {
                    this.submitactive = true
                    this.unitAjax('post', 'v1/idea/add', {
                        idea: this.ideaUserInfo,
                        open: this.opentab == 1,
                    }, res => {
                        this.ideaUserInfo = ""
                        this.submitactive = false
                        if (res.code == 200) {
                            this.getidea()
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                }

            },

            // ·发表评论
            sendsayInfo() {
                //                 ideaId	string	是	想法ID		
                // replyUserId	string	是	被回复的人ID(若对原想法评论，则为空)		
                // commentText
                if (this.commentText) {
                    let params = {
                        ideaId: Number(this.ideaId),
                        replyUserId: '',
                        commentText: this.commentText
                    }

                    this.unitAjax('post', 'v1/idea/comment/add', params, res => {
                        if (res.code == 200) {
                            this.commentText = "";
                            // this.showsay = false;
                            this.getsaylist()
                        } else {
                            this.$message.error(res.msg)
                        }
                    })

                }
            },
            gettools(value, id, text) {
                this.toolactive = value;
                if (value == 2) {

                }
                // 灵感编辑
                if (value == 3) {
                    this.setactive = id;
                    this.ideaText = text
                }
                //删除想法
                if (value == 4) {
                    this.$confirm('此操作将永久删除该想法, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.unitAjax('delete', 'v1/inspiration/delete', {
                            inspirationId: id
                        }, res => {
                            if (res.code == 200) {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                this.getinspiration()
                            }
                        })

                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });

                }
            },
            removeSay(id) {
                //删除想法的评论
                this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.unitAjax('delete', 'v1/idea/comment/delete', {
                        commentId: id
                    }, res => {
                        if (res.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getsaylist()
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            closeshow() {
                this.moreActive = false;
                this.showtools = -1;
                this.submitactive = false;
                this.toolactive = 0;
            },
            // 更多
            getmoretools(index) {
                this.moreActive = true;
                this.showtools = index
            },
            //是否公开
            openfun(value) {
                this.showopen = false;
                this.showclose = true;
                this.opentab = value;
            },
            closefun(value) {
                this.showclose = false;
                this.showopen = true;
                this.opentab = value;
            },
            //切换想法
            catefun(value) {
                this.cateTab = value;
                if (value == 1) {
                    this.getinspiration()
                }
            },
            bold() {
                this.editor.execCommand('bold');
            },
            tourl(url, query) {
                tools.router.push({
                    path: url,
                    query: query
                })
            }
        },
        mounted() {
            var _this = this;
            this.$store.commit('changeFooter', false);
            this.$store.commit('changeHeader', true);
            this.$store.commit('changeType', 'user');
            this.height.height = window.innerHeight - 155 + 'px';
            this.height2.height = window.innerHeight - 155 - 50 + 'px';
            return
            // this.editor = UE.getEditor('container', {
            //     toolbars: [],
            //     autosave: false,
            //     enableAutoSave: false,
            //     wordCount: false,
            //     elementPathEnabled: false
            // });
        },
        components: {

        }
    }
</script>

<style scoped lang='scss'>
    @import "../assets/scss/tool.scss";
    .idea {
        width: 1264px;
        margin: 0 auto;
        padding-top: 135px;
        position: relative;
        .leftCate {
            // height: 886px;
            width: 310px;
            border-right: 1px solid #E6E6E6;
            margin-right: 70px;
            position: fixed;
            top: 135px;
            .cateList {
                width: 244px;
                height: 100%;
                border-top: 1px solid #E6E6E6;
                position: relative;
                .cate {
                    height: 80px;
                    border-bottom: 1px solid #E6E6E6;
                    line-height: 80px;
                    text-align: center;
                    font-size: 15px;
                    color: #A0A0A0;
                    @include hand;
                    @include trans;
                    /* &:hover {
                        background: rgba(0, 0, 0, .1);
                    } */
                    &.active {
                        color: #000;
                        font-weight: bold;
                    }
                    &.active-w {
                        color: white;
                        font-weight: bold;
                    }
                }
            }
        }
        .list {
            width: 880px;
            // overflow-y: auto;
            margin-left: 380px;
            border-top: 1px solid #E6E6E6;
            padding-bottom: 100px;
            position: relative;
            .mainItem {
                position: relative;
                textarea {
                    border: none;
                    resize: none;
                    outline: none;
                }
                .submit {
                    position: absolute;
                    bottom: 30px;
                    right: 19px;
                    @include hand;
                }
            }
            .item,
            .mainItem,
            .comment {
                height: 218px;
                width: 100%;
                border-bottom: 1px solid #E6E6E6;
                padding: 40px 19px;
                position: relative;
                &:hover {
                    .itemTools {
                        display: block;
                    }
                }
                .rightSide {
                    color: #A0A0A0;
                    font-size: 15px;
                    position: absolute;
                    height: 25px;
                    width: 100%;
                    bottom: 30px;
                    right: 19px;
                    padding-left: 38px;
                    .more {
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        @include hand;
                    }
                    .tools {
                        position: absolute;
                        // opacity: .6;
                        bottom: 0;
                        right: 50px;
                        .tool {
                            height: 17px;
                            vertical-align: middle;
                            display: inline-block;
                            font-size: 15px;
                            margin-right: 10px;
                            @include hand;
                            &:last-child {
                                margin-right: 0;
                            }
                            span {
                                vertical-align: top;
                            }
                        }
                    }
                    .toolright {
                        right: 0;
                        cursor: pointer;
                    }
                }
                .itemTools {
                    border: 1px solid #E6E6E6;
                    position: absolute;
                    right: -54px;
                    width: 54px;
                    height: 110px;
                    bottom: -1px;
                    display: none;
                    .tools {
                        width: 54px;
                        height: 54px;
                        line-height: 54px;
                        text-align: center;
                        @include hand;
                        border-bottom: 1px solid #E6E6E6;
                        &:last-child {
                            border-bottom: none;
                        }
                    }
                }
                .remove {
                    display: block;
                }
            }
            .comments {
                position: relative;
                .del {
                    position: absolute;
                    @include hand;
                    top: 30px;
                    right: 19px;
                }
                .leftSide {
                    margin-bottom: 60px;
                    position: relative;
                    .cover {
                        width: 44px;
                        height: 44px;
                        background: black;
                    }
                    .info {
                        margin-left: 15px;
                        position: relative;
                        .nickName {
                            line-height: 11px;
                            margin-bottom: 13px;
                        }
                    }
                }
                .rightSide {
                    .inpiration {}
                }
                .comment {
                    height: auto;
                }
            }
        }
    }
    
    .pageTools {
        // width: 880px;
        position: fixed;
        bottom: 0;
        padding-bottom: 50px;
        // background: #fff;
        height: 25px;
        line-height: 25px;
        margin-left: 380px;
        .innerbox {
            width: 200px;
            height: 25px;
            margin: 0 auto;
            @include copynone;
            position: relative;
            // &:after {
            //     content: '';
            //     display: block;
            //     position: absolute;
            //     left: 50%;
            //     top: 0;
            //     width: 1px;
            //     height: 100%;
            //     background: #E6E6E6;
            // }
        }
        .pull-left,
        .pull-right {
            height: 25px;
            line-height: 25px;
            @include hand;
            img {
                height: 25px;
            }
            span {
                display: inline-block;
                vertical-align: middle;
                margin: 0 10px;
            }
        }
    }
</style>