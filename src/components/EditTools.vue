<template>
<div class="edit" ref="idea" :class='{black:utstyle != "white"}' :style='{height:height + "px"}' @click="showset=false">

  <div class="header">
    <img @click='change' v-if='utstyle == "white"' class='logo' src="../assets/images/utter/logo.png" alt="UTTER">
    <img @click='change' v-else class='logo' src="../assets/images/utter/logow.png" alt="UTTER">

    <div class="toolsView clearfix">
      <input type='file' id='file' ref='file' @change='changeImg' style='width:0;height:0;position:fixed;top:-2000px;'>

      <div class="icon utBorder pull-left" :class="index==toolindex?'iconBorder':''"
        @click.stop='handleTool(i.key,index)'
        :style="{'background-image': utstyle == 'white' ? 'url('+ i.bicon +')' : 'url('+ i.wicon +')' }" 
        v-for='(i,index) in toolsList' :key="index">

        <div class="fontsizeTools utBorder" v-if='activeTools == "fontsize" && i.key == "fontsize"'>
          <div class="item" @click='fontsizeHandle(7 + i)' v-for='i in 21' :key="i">{{7 + i}}</div>
        </div>

        <div class="fontfamilyTools utBorder" v-if='activeTools == "fontfamily" && i.key == "fontfamily"'>
          <div class="item" v-for='(item,index) in familyList' @click='fontfamilyHandle(item)' :key="index">{{item}}</div>
        </div>

        <div class="forecolorTools utBorder" v-if='activeTools == "forecolor" && i.key == "forecolor"'>
          <div class="item" v-for='i in colorList' @click='forecolorHandle(i)' :key="i">
            <div class="color" :style='{"background-color":i}'></div>
          </div>
        </div>
        
        <div class="fontsizeTools utBorder" v-if='activeTools == "lineheight" && i.key == "lineheight"'>
          <div class="item" v-for='i in 21' @click='lineheightHandle(7 + i)' :key="i">{{7 + i}}</div>
        </div>

        <div class="fontsizeTools utBorder" v-if='activeTools == "rowspacing" && i.key == "rowspacing"'>
          <div class="item" v-for='i in 10' :key="i">{{i - 1}}</div>
        </div>

        <div class="linkTools utBorder" v-if='activeTools == "link" && i.key == "link"'>
          <input placeholder='请输入内容…' v-model='linkObj.textValue' @click.stop="activeTools = 'link'">
          <input placeholder='输入超链接地址…' v-model='linkObj.url' @keydown.enter='linkHandle'>
        </div>

        <div class="draftTools utBorder" v-if='activeTools == "draft" && i.key == "draft"'>
          <div class="item utBorder" v-for="(item, index) in ideaList"  @click.stop='ideaHandle(item.idea)' :key="index">{{item.idea}}</div>
        </div>

        <div class="ideaTools utBorder" v-if='activeTools == "idea" && i.key == "idea"'>
          <div class="item utBorder" v-for='(item,index) in insparitionList' @click.stop='ideaHandle(item.inspiration)' :key="index">{{item.inspiration}}</div>
        </div>
        

      </div>

    </div>

    <div class="rightTools clearfix">
      <div class="set pull-left utBorder" :class='showset?"activeset":""' @click.stop="showset=true">
        <img v-show="showset&&utstyle == 'black'" class="w" src="../assets/images/editor/setw.png" alt="">
        <img v-show="showset&&utstyle == 'white'" class="" src="../assets/images/editor/setb.png" alt="">
        <img v-show="!showset" src="../assets/images/editor/seta.png" alt="">
      
      </div>

      <div class="back pull-left" :class='{b:utstyle == "white",w:utstyle != "white"}' @click="back"></div>
        <!-- 右边设置 -->
        <ul class="right-set" v-show="showset" @click.stop="showset=true">
          <li class="clearfix" v-if="$route.query.editor=='publish'"><span class="fl borderbox utBorder"  @click='openfun(1)'>
                <img v-show='showopen' src="../assets/images/article/open-c.png" alt="公开">
              <img v-show='(!showopen||opentab==1)&&utstyle=="white"'  src="../assets/images/article/open.png" alt="公开">
              <img v-show='(!showopen||opentab==1)&&utstyle=="black"'  src="../assets/images/article/open-w.png" alt="公开">
            </span><span class="fr"  @click='closefun(2)'>
              <img  v-show='showclose' src="../assets/images/article/close-c.png" alt="保密">
              <img  v-show='(!showclose||opentab==2)&&utstyle=="white"'  src="../assets/images/article/close.png" alt="保密">
              <img  v-show='(!showclose||opentab==2)&&utstyle=="black"'  src="../assets/images/article/close-w.png" alt="保密">
              </span></li>
          <li v-show="$route.query.editor=='publish'" :class="tabcreat==1?utstyle=='white'?'font-activeb':'font-activew':''" @click="tabcreat=1">发表信息</li>
          <li v-show="$route.query.editor=='idea'" :class="tabcreat==1?utstyle=='white'?'font-activeb':'font-activew':''" @click="tabcreat=1">出版信息</li>
          <li :class="tabcreat==2?utstyle=='white'?'font-activeb':'font-activew':''" @click="tabcreat=2">创作背景</li>
          <label v-show="tabcreat==2">
          <li class="creatColor"><span class="fl borderbox utBorder" @click="getreadercolor('white')"><img src="../assets/images/editor/173 创作区背景-白.png" alt=""></span>
          <span class="fl"  @click="getreadercolor('black')"><img src="../assets/images/editor/174 创作区背景-黑.png" alt=""></span>
          </li>
          <li class="creatimg"><img src="../../static/img/1.jpg" alt="" @click="setcreatColor('../../static/img/1.jpg','white')"></li>
          <li  class="creatimg"><img src="../../static/img/2.jpg" alt=""  @click="setcreatColor('../../static/img/2.jpg','white')"></li>
          <li  class="creatimg"><img src="../../static/img/3.jpg" alt=""  @click="setcreatColor('../../static/img/3.jpg','black')"></li>
          <li  class="creatimg"><img src="../../static/img/4.jpg" alt=""  @click="setcreatColor('../../static/img/4.jpg','black')"></li>
          </label>
        </ul>
    </div>
  </div>
    <!-- 编辑器 -->
  <div class="middleView" >
      <h2 :class="utstyle=='white'?'ut-input-white':'ut-input-black'">
          <input  @keydown.enter="getkeydown" ref="text" class="title" type="text" placeholder="请输入标题" v-model="titile"></h2>
    <div id="container" @click="showset=false"></div>
    <!-- page -->
     <div class="pageTools">
      <div class="innerbox clearfix">
        <div class="pull-left">
          <!-- <span>1</span> -->
          <img v-show="pageIndex==1" src="../assets/images/article/prev.png" alt="上一页">
          <img v-show="$route.query.type=='white'&&pageIndex!=1" src="../assets/images/article/prev-black.png" alt="上一页"  @click="removepage">
          <img  v-show="$route.query.type=='black'&&pageIndex!=1" src="../assets/images/article/prev-w.png" alt="上一页" @click="removepage">
        </div>
        <div class="page">{{pageIndex}}</div>
        <div class="pull-right">
             <!-- <img v-show="publishPageL ==ideaTotal" src="../assets/images/article/next-a.png" alt=""> -->
          <img v-show="$route.query.type=='white'" src="../assets/images/article/next.png" alt="" @click="addpage">
          <img v-show="$route.query.type=='black'" src="../assets/images/article/next-w.png" alt="下一页"  @click="addpage">
          <!-- <span>1</span> -->
        </div>
      </div>
    </div>
  </div>
    <!-- 设置-发表信息 -->
    <div class="sendmsg" v-show="tabcreat==1&&showset" @click.stop="showset=true">
      <!-- 发表信息 -->
        <div class="send " v-show="$route.query.editor=='publish'">
            <div class="clearfix">
            <div class="left fl ut-white1">
                <div class="row utBorder" v-show="showcreat"><input type="text" v-model="typeText" v-focus="showcreat==true"></div>
                <ul>
                  <li :class="tabActive==item.id?'ut-black1':''" v-for="(item,index) in typeList" :key='index' @click="settabactive(item)">
                     <span v-show="tabActive!=item.id||!showidea"> {{item.type}}</span>
                     <input class="ut-black1" v-show="tabActive==item.id&&showidea" type="text" v-model="sortValue" @click.stop="setidea(item.type)">
                    </li>
                </ul>
            </div>
          
            <div class="right fr">
                <div class="creat fr ut-white1" v-show="!showcreat" @click="showcreat=true"><a href="javaScript:;" class="ut-white1">创建类别</a></div>
                <div class="creat fr top ut-white1" v-show="ideaisShow&&!showcreat" @click="setsort"><a href="javaScript:;" class="ut-white1">修改类别</a></div>
                <div class="istrue ut-white1" v-show="showcreat"><a  href="javaScript:;" class="ut-white1" @click="creatType">确认</a></div>
            </div>
            </div>
            <div class="bottom ut-white1">
                  <textarea name="name" rows="6.5" cols="45" placeholder='为文章写一段摘要' v-model="importantText"></textarea>
        <el-tooltip effect="dark" content="发表" placement="bottom">
          <img src="../assets/images/article/submit.png" class='submit' alt="发表" @click="publishArticle(false)">
        </el-tooltip>
            </div>
        </div>
        <!-- 出版信息 -->
        <div  v-show="$route.query.editor=='idea'">
             <!-- //邀请出版 -->
            <div class="" v-show="showpopel&&!showbooksay">
               <div class="poper-content">
                 <div class="poper-header">utter/墨海</div>
                 <div class="frend utBorder">
                   <ul class="utBorder">
                     <li class="utBorder" :class="poperTab==index?'poperActive':''" @click="poperTab=index" v-for="(item,index) in friendlist" :key="index">
                       <p class="frend-left fl"><span class="imgbox">
                           <img v-if="!item.friendAvatar" src="../assets/images/utter/userw.png" alt="">
                           <img v-if="item.friendAvatar" :src="item.friendAvatar" alt=""></span><span>{{item.friendPenName}}</span></p>
                        <p class="frend-right fl" v-show="poperTab==index"><span><input :autofocus="poperTab==index" type="text">%</span>
                        <a class="fr" href="javaScript:;"><img src="../assets/images/userinfo/112 提交.png" alt=""></a></p>
                   </li>
                   <i></i>
                   </ul>
                  
                 </div>
                 </div> 
            <div class="idea-btn">
               <div class="btn-center">
                 <a href="javaScript:;" class="fl"  :class="sumActive==1?'ut-black1':'ut-white1'" @click="sendidea(1)">独立出版</a>
                 <a href="javaScript:;" class="fr" :class="sumActive==2?'ut-black1':'ut-white1'" @click="sendidea(2)">联合出版</a>
                 </div>
            </div>
            </div>
            <!-- 书本介绍 -->
              <div class="" v-show="showbooksay">
               <div class="poper-content">
                   <textarea name="booksay" id="" cols="56" rows="11" placeholder="为书本写一段介绍" v-model="introduce"></textarea>
                    <a class="fr saysumbmit" href="javaScript:;" @click="backindex"> <img src="../assets/images/article/submit.png" alt="发表"></a>
                 </div> 
            <div class="idea-btn">
               <div class="btn-center">
                 <a href="javaScript:;" class="fl"  :class="sumActive==1?'ut-black1':'ut-white1'">独立出版</a>
                 <a href="javaScript:;" class="fr" :class="sumActive==2?'ut-black1':'ut-white1'">联合出版</a>
                 </div>
            </div>
            </div>
            <!-- 协议 -->
            <div class="note" v-show="shownote">
                <ul v-html="agreement">
                  <li>作者可获得80%的作品销售收益(联合出版同上);</li>
                  <li>每条销售数据实时展示，上个月收益结算后可随时体现。</li>
                  <li>作者必须保证其作品的原创性;</li>
                  <li>作者出版免费书籍时作品中部能出现插图;</li>
                  <li>联合出版的图书请提前确定好每位联合作者的收益占比;</li>
                  <li>联合出版的图书在上架后会自动在每位联合作者的站点同时上架;</li>
                  <li>正式出版的图书暂时不可随意下架，作者可进行图书修订。</li>
                </ul>
                <p><a href="javaScript:;"><img src="../assets/images/article/see.png" alt="" @click="shownote=false"></a></p>
            </div>
            <!-- 独立出版 -->
          <div class="send "  v-show="!showpopel&&!shownote">
            <div class="clearfix idea-content utBorder">
            <div class="left fl bookimg">
               
            </div>
          <div class="fl cover"><p>封面尺寸:w:880 h:1080</p>  <p>封面格式:jpg、png</p></div>
            <div class="right idea fr">
                <div class="creat fr ut-white1" style="paddingLeft:10px" @click="showcreat=true"><input type="text" class="ut-white1" v-model="bookname" placeholder="请输入书名"></div>
                 <div class="istrue booksay ut-white1"><a href="javaScript:;" class="ut-white1" @click="setbooksay">书本介绍</a></div>
                <div class="istrue money ut-white1"><input type="number" class="ut-white1" placeholder="请输入金额" v-model="money">￥</div>
                <div class="istrue thiry"><input type="checkbox" v-model="check" @click="check=!check"><a href="javaScript:;" @click="readyNote">我已阅读接受此协议</a></div>
            </div>
            </div>
         
            <div class="idea-btn">
               <div class="">
                 <a href="javaScript:;" class="fl"  :class="sumActive==1?'ut-black1':'ut-white1'" @click="sendidea(1)">独立出版</a>
                 <a href="javaScript:;" class="fr" :class="sumActive==2?'ut-black1':'ut-white1'" @click="sendidea(2)">联合出版</a>
                 </div>
            </div>
        </div>
        
           </div>
    </div>
    <!-- 左边目录 -->
      <div class="treel fl" v-show="$route.query.editor=='idea'">
      <a href="javaScript:;" >
      <img v-show="utstyle=='white'" class="navimg treeimg" src="../assets/images/editor/175 创作区-目录.png" alt="" @click="getnvetree">
      <img v-show="utstyle=='black'" class="navimg treeimg" src="../assets/images/editor/192 创作区-目录-白.png" alt="" @click="getnvetree">
      </a>
    
       <div class="titile" :class="utstyle=='white'?'ut-white1':'ut-black1'" ref="navTree" v-show="showTree">
           <div class="line" :class="utstyle=='white'?'navBorder-b pagecolr-black-after':'navBorder-w pagecolr-white-after'"></div>
           
            <ul v-for="(item, index) in datalist" :key="index" >
                 <li class='bor active-nav'>
                     <a href='javascript:;' class="navtab" ref="sd" @click="settitile(item.name,item.id,$event)">{{item.name}}
                          <i class="navBorder" @click.stop="addnav(datalist,index,'')">+</i>
                 <i class="navBorder remove" @click.stop="removenav(datalist,index)">-</i>  </a></li>
                 <label  v-for="(i, idx) in item.children" :key="idx">
                 <li class="big-titile active-nav">
                     <a href='javascript:;' class="navtab" ref="sv" @click="settitile(i.name,i.id,$event)" >{{i.name}}
                         <i class="navBorder" @click.stop="addTitle(item.children,idx,item.id)">+</i>
                     <i class="navBorder remove" @click.stop="removeTitle(item.children,idx)">-</i>   </a> 
                    
                 </li>
                 <li class="small-titile active-nav" v-for="(count,num) in i.children" :key="num">
                     <a href='javascript:;' class="navtab" ref='sn' @click="settitile(count.name,count.id,$event)" >{{count.name}}
                     <i class="navBorder" @click.stop="addidea(i.children,num,i.id)">+</i><i class="navBorder remove" @click.stop="removeidea(i.children,num)">-</i>   </a> </li>
                 </label>
            </ul>
       </div> 
  </div>
  

</div>
</template>

<script>
    import "../../static/ue/ueditor.config.js";
    import "../../static/ue/ueditor.all.min.js";
    import "../../static/ue/lang/zh-cn/zh-cn.js";
    let id = 1000;
    let arr = [];
    export default {
        data() {
            return {
                utstyle: "white",
                showset: false,
                activeTools: "",
                toolsList: [{
                    //字体大小
                    key: "fontsize",
                    wicon: require("../assets/images/editor/fontsizew.png"),
                    bicon: require("../assets/images/editor/fontsizeb.png")
                }, {
                    //字体
                    key: "fontfamily",
                    wicon: require("../assets/images/editor/fontfamilyw.png"),
                    bicon: require("../assets/images/editor/fontfamilyb.png")
                }, {
                    //字体颜色
                    key: "forecolor",
                    wicon: require("../assets/images/editor/forecolorw.png"),
                    bicon: require("../assets/images/editor/forecolorb.png")
                }, {
                    //字体倾斜
                    key: "italic",
                    wicon: require("../assets/images/editor/italicw.png"),
                    bicon: require("../assets/images/editor/italicb.png")
                }, {
                    //下划线
                    key: "underline",
                    wicon: require("../assets/images/editor/underlinew.png"),
                    bicon: require("../assets/images/editor/underlineb.png")
                }, {
                    //行高
                    key: "lineheight",
                    wicon: require("../assets/images/editor/lineheightw.png"),
                    bicon: require("../assets/images/editor/lineheightb.png")
                }, {
                    //字间距
                    key: "rowspacing",
                    wicon: require("../assets/images/editor/rowspacingw.png"),
                    bicon: require("../assets/images/editor/rowspacingb.png")
                }, {
                    //字间距 左
                    key: "justifyl",
                    wicon: require("../assets/images/editor/justifyleftw.png"),
                    bicon: require("../assets/images/editor/justifyleftb.png")
                }, {
                    //字间距 中
                    key: "justifym",
                    wicon: require("../assets/images/editor/justifymidw.png"),
                    bicon: require("../assets/images/editor/justifymidb.png")
                }, {
                    //字间距 右
                    key: "justifyr",
                    wicon: require("../assets/images/editor/justifyrightw.png"),
                    bicon: require("../assets/images/editor/justifyrightb.png")
                }, {
                    //超链接
                    key: "link",
                    wicon: require("../assets/images/editor/linkw.png"),
                    bicon: require("../assets/images/editor/linkb.png")
                }, {
                    //图片
                    key: "insertimage",
                    wicon: require("../assets/images/editor/insertimagew.png"),
                    bicon: require("../assets/images/editor/insertimageb.png")
                }, {
                    //草稿
                    key: "draft",
                    wicon: require("../assets/images/editor/draftw.png"),
                    bicon: require("../assets/images/editor/draftb.png")
                }, {
                    //灵感
                    key: "idea",
                    wicon: require("../assets/images/editor/ideaw.png"),
                    bicon: require("../assets/images/editor/ideab.png")
                }, {
                    //垃圾桶
                    key: "ashcan",
                    wicon: require("../assets/images/editor/ashcanw.png"),
                    bicon: require("../assets/images/editor/ashcanb.png")
                }, {
                    //发表
                    key: "issue",
                    wicon: require("../assets/images/editor/issuew.png"),
                    bicon: require("../assets/images/editor/issueb.png")
                }],
                // 方正兰亭黑体+宋体+仿宋+黑体+圆体+微软雅黑
                familyList: ['方正兰亭黑体', '宋体', '仿宋', '黑体', '圆体', '微软雅黑'],
                colorList: [
                    "#1B1B1B",
                    "#F7F7F7",
                    "#434343",
                    "#A40035",
                    "#FE0000",
                    "#EB6100",
                    "#FFF100",
                    "#5A493F",
                    "#D0A972",
                    "#001C58",
                    "#1D2089",
                    "#00A0EA",
                    "#F29C9F",
                    "#E5007F",
                    "#8C98CC",
                    "#22AB37",
                    "#ACD697",
                    "#019E95",
                    "#898989"
                ],
                height: 0,
                editor: null,
                linkObj: {
                    url: "",
                    textValue: "",
                    target: "_blank"
                },
                //set
                tabActive: 0,
                showcreat: false,
                sumActive: 0,
                showpopel: false,
                poperTab: "",
                showbooksay: false,
                shownote: false,
                // 目录
                datalist: [],
                navid: 0, //激活id
                defaultProps: {
                    children: "children",
                    name: "name"
                },
                showTree: false,
                // showmore: false,
                readcolor: "white",
                // 右边设置
                tabcreat: 0,
                showclose: true,
                showopen: false,
                opentab: 1,
                toolindex: 100,
                titile: '', //标题
                typeText: '',
                typeList: [],
                importantText: '',
                articletext: [],
                showidea: true,
                ideaisShow: false,
                sortValue: '',
                defaultType: false,
                pageIndex: 1, //文章页码
                articleList: [],
                insparitionList: [],
                ideaList: [], //想法
                booksid: "",
                beforeid: "",
                creatTitle: ['前言', '章节', "结语"],
                parentId: '',
                oldid: "",
                friendlist: [],
                introduce:'',//书籍介绍
                autherId:'',
                bookname:'',
                cover:'',
                money:'',
               check:false,
               agreement:"作者可获得80%的作品销售收益(联合出版同上);每条销售数据实时展示，上个月收益结算后可随时体现。作者必须保证其作品的原创性;作者出版免费书籍时作品中部能出现插图; 联合出版的图书请提前确定好每位联合作者的收益占比; 联合出版的图书在上架后会自动在每位联合作者的站点同时上架;正式出版的图书暂时不可随意下架，作者可进行图书修订。",
            };
        },
        beforeCreate() {
            // UE.delEditor("container");
            //  if (typeof(UE.getEditor("container")) != 'undefined') {
            //     UE.getEditor("container").destroy();
            // }
        },
        created() {
            this.utstyle = this.$route.query.type;

            setTimeout(() => {
                if (document.querySelector('iframe')) {
                    if (this.$route.query.type == "black") {
                        document.querySelector('iframe').contentWindow.document.querySelector("body").style.color = "white";
                    } else {
                        // this.forecolorHandle("#1b1b1b");
                        document.querySelector('iframe').contentWindow.document.querySelector("body").style.color = "black";

                    }
                    //读取
                    if (this.getValue('background')) {
                        this.$refs.idea.style.background = "url(" + this.getValue('background') + ")";
                        this.$refs.idea.style.backgroundSize = "100%";
                        document.querySelector('.edui-editor').style.backgroundColor = 'unset';
                        document.querySelector('.edui-editor-iframeholder').style.backgroundColor = 'unset';
                        document.querySelector('.title').style.backgroundColor = 'unset';
                        this.$refs.navTree.style.backgroundColor = 'unset';
                        this.getreadercolor(this.getValue('color'));
                    }
                }

            }, 2000);
            // this.getbookDetail()
            if (this.$route.query.editor == 'publish') {
                this.getidea()
                this.gettypeList()
                    // console.log(this.editor, 122)
                    // this.initUeditor("");
            }
            this.getinspration()
            this.getideaList()
                //添加草稿书籍
            if (this.$route.query.editor == 'idea') {
                if (this.$route.query.id) {

                    this.booksid = this.$route.query.id;
                    this.getnav(true)

                } else {

                    this.getbook(true)
                }
                this.getfriend()
            }

        },
        //自定指令
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
            //出版书籍
            sendbook(){
                if(this.bookname){
                    if(this.check){
                      let params={
                    id:Number(this.booksid),//	string	是			
                    bookName:this.bookname,//	string	是			
                    introduce:this.introduce,//	string	是			
                    cover:this.cover,//	string	是			
                    price:this.money,//	string	是			
                    agreement:this.agreement,//
                }
                this.unitAjax('post','v1/book/publishBook',params,res=>{
                    if(res.code==200){
                        this.showset=false
                        this.$message('出版成功')
                    }
                })
                }else{
                    this.$message('请先阅读协议')
                }
                }else if(this.bookname==''){
                    this.$message('请填写书名')
                }
              
            },
            //获取好友
            getfriend() {
                let params = {
                    page: 1,
                    pageSize: 100,
                    userId: Number(this.getValue('userId'))
                }
                this.unitAjax('get', 'v1/user/friend/list', params, res => {
                    if (res.code == 200) {
                        this.friendlist = res.data.rows
                    }
                })
            },
            //查询书籍内容
            getbooksContent() {

                if (this.navid != 0) {
                    this.unitAjax('get', 'v1/book/listChapter', {
                        bookId: this.booksid,
                        catalogueId: this.navid
                    }, res => {
                        if (res.code == 200) {
                            // this.editor.execCommand("getlocaldata")
                            let newArr = []
                            if (res.data.length > 0) {
                                this.initUeditor(res.data[0].text);
                                for (let key in res.data) {
                                    newArr.push(res.data[key].text)
                                }
                                this.articleList = newArr;
                            } else {
                                this.initUeditor("");
                            }

                        }
                    })
                } else {

                }

            },
            //编辑书籍     
            setbook(flog) {
                this.articletext = this.articleList
                this.articletext[this.pageIndex - 1] = this.editor.getContent()
                if (flog) {
                    this.articleList = this.articletext
                }
                let params = {
                    bookId: Number(this.booksid),
                    catalogueId: Number(this.navid),
                    title: this.titile,
                    text: this.articletext,
                }
                this.unitAjax('post', 'v1/book/editChapter', params, res => {
                    if (res.code == 200) {

                    }
                })
            },
            //添加书籍目录
            setCatalogue(id, parentid, name, flog) {
                let params = {
                    bookId: Number(this.booksid),
                    parentId: Number(parentid) == 0 ? '' : Number(parentid),
                    beforeId: Number(id) == 0 ? '' : Number(id),
                    title: name,
                }
                this.unitAjax('post', 'v1/book/addCatalogue', params, res => {
                    if (res.code == 200) {
                        // this.oldid = res.data.id
                        if (flog) {
                            if (flog == "addnav") {
                                this.setCatalogue("", res.data.id, "新加篇名", "addTitle")
                            } else {
                                this.setCatalogue("", res.data.id, "新加小节", "")
                            }

                        }
                        this.getnav()

                    }
                })
            },
            //获取书籍目录
            getnav(flag) {
                this.unitAjax('get', 'v1/book/listCatalogue', {
                    bookId: this.booksid
                }, res => {
                    if (res.code == 200) {
                        this.datalist = res.data;

                        if (this.$route.query.id && flag) {
                            this.navid = res.data[0].id;
                            this.titile = res.data[0].name
                            this.getbooksContent()
                        }
                    }
                })
            },
            //添加草稿书籍
            getbook(flag) {
                let arr = [{
                    "name": "前言"
                }, {
                    "children": [{
                        "children": [{
                            "name": "小节"
                        }, {
                            "name": "小节"
                        }],
                        "name": "篇名"
                    }],
                    "name": "章节"
                }, {
                    "name": "结语"
                }]
                this.unitAjax('post', 'v1/book/addBook', {
                    data: JSON.stringify(arr)
                }, res => {
                    if (res.code == 200) {
                        this.booksid = res.data.catalogue[0].bookId;
                        this.datalist = res.data.catalogue;
                        this.navid = res.data.catalogue[0].id;
                        if (flag) {
                            this.initUeditor("")
                        }
                        if (this.booksid) {
                            // this.setCatalogue()
                            // this.getnav()
                        }

                    }
                })
            },
            //重新编辑文章
            ArticleRest() {
                let params = {
                    title: this.titile,
                    open: this.opentab == 1,
                    text: this.articletext,
                    open: this.opentab == 1,
                    typeId: Number(this.$route.query.typeId || this.tabActive),
                    identify: this.$route.query.id,
                    abstractText: this.importantText,
                }
                this.unitAjax('post', 'v1/article/edit', params, res => {
                    if (res.code == 200) {
                        this.showset = false;
                        // this.$message({
                        //     type: 'success',
                        //     message: '发表成功!'
                        // })
                    }
                })
            },
            //获取文章详情
            getidea() {
                // if (this.$route.query.id) {
                this.unitAjax('get', "v1/article/detail", {
                        identify: this.$route.query.id
                    }, res => {
                        if (res.code == 200) {
                            this.articleList = res.data.pages;
                            arr = res.data.pages;
                            if (this.articleList) {
                                this.titile = this.articleList[this.pageIndex - 1].title;
                                this.initUeditor(this.articleList[this.pageIndex - 1].text);
                            } else if (this.pageIndex > this.articleList.length) {
                                this.initUeditor('');
                            }
                        } else {
                            this.initUeditor('');
                        }

                    })
                    // } else {
                    //     console.log(747)
                    //         //  if (typeof(UE.getEditor("container")) != 'undefined') {
                    //         // UE.getEditor("container").destroy();
                    //     console.log(UE.getEditor("container"), 655)
                    //         // this.initUeditor('');
                    //         //  }
                    //         //  location.reload()
                    // }

            },
            //添加文章page
            addpage() {

                this.articletext[this.pageIndex - 1] = this.editor.getContent()
                if (this.articletext[this.pageIndex - 1]) {
                    //内容是否有变化
                    // if (this.articletext[this.pageIndex - 1] != arr[this.pageIndex - 1]) {
                    if (this.$route.query.editor == "publish") {
                        if (this.$route.query.id) {
                            this.ArticleRest()
                        } else {
                            //    this.publishArticle(true) 
                        }

                    } else if (this.$route.query.editor == "idea") {
                        this.setbook('flog')
                    }

                    // }

                    this.pageIndex++;
                    if (this.$route.query.editor == "publish" && this.$route.query.id) {
                        this.getidea()
                    }

                    // this.getbooksContent()

                    if (this.articleList[this.pageIndex - 1]) {
                        this.initUeditor(this.articleList[this.pageIndex - 1]);
                    } else {
                        this.initUeditor('');
                    }
                } else {
                    this.$message.error('请编写内容')
                }

                UE.getEditor('container').focus();
            },
            removepage() {
                if (this.$route.query.editor == "publish") {

                    if (this.$route.query.id) {
                        this.ArticleRest()
                        this.getidea()
                    } else {
                        this.articleList = this.articletext
                    }

                } else if (this.$route.query.editor == "idea") {
                    this.setbook('flog')

                }
                // this.articletext[this.pageIndex - 1] = this.editor.getContent()
                //   if( this.articletext[this.pageIndex-1]!==arr[this.pageIndex-1]){
                //           this.ArticleRest()
                //      }
                //重新获取articleList

                this.pageIndex--;
                if (this.articleList[this.pageIndex - 1]) {

                    this.initUeditor(this.articleList[this.pageIndex - 1]);
                } else {
                    this.initUeditor('');
                }
                UE.getEditor('container').focus();

            },
            setsort() {
                this.unitAjax('post', 'v1/article/type/edit', {
                    id: Number(this.tabActive),
                    type: this.sortValue,
                    isDefault: this.defaultType
                }, res => {
                    if (res.code == 200) {
                        this.showidea = false
                        this.ideaisShow = false
                        this.gettypeList()
                    }
                })
            },
            settabactive(item) {
                this.tabActive = item.id;
                this.ideaisShow = false;
                this.sortValue = item.type;
                this.defaultType = item.defaultType
            },
            // 修改类别
            setidea(value) {
                this.ideaisShow = true;
                this.showcreat = false;

            },
            //发表文章
            publishArticle(flog) {
                this.articletext[this.pageIndex - 1] = this.editor.getContent()
                    // this.articletext=JSON.stringify(this.articletext).replace(/\"/g,"'")
                if (flog) {
                    this.tabActive = 1
                }
                let params = {
                    title: this.titile,
                    text: this.articletext,
                    open: this.opentab == 1,
                    typeId: Number(this.tabActive),
                    abstractText: this.importantText,
                }
                this.unitAjax('post', 'v1/article/add', params, res => {
                    if (res.code == 200) {
                        this.showset = false;
                        if (flog) {
                            this.$message('已保存至草稿')
                        } else {
                            this.$message({
                                type: 'success',
                                message: '发表成功!'
                            })
                        }

                    }
                })
            },

            //分类列表
            gettypeList() {
                this.unitAjax('get', 'v1/article/type/list', {}, res => {
                    if (res.code == 200) {
                        this.typeList = res.data;
                        let flag = true
                        for (let key in res.data) {
                            if (res.data[key].type == '默认分类') {
                                flag = false
                            }
                        }
                        if (flag) {
                            this.creatdefaultType()
                        }
                    }
                })
            },
            //创建类别
            creatType() {
                if (this.typeText) {
                    this.unitAjax('post', 'v1/article/type/add', {
                        type: this.typeText,
                        isDefault: false
                    }, res => {
                        if (res.code == 200) {
                            this.showcreat = "";
                            this.typeText = '';
                            //调用
                            this.gettypeList()
                        }
                    })
                } else {
                    this.$message('类别内容不能为空')
                }

            },
            creatdefaultType() {
                this.unitAjax('post', 'v1/article/type/add', {
                    type: "默认分类",
                    isDefault: true
                }, res => {
                    if (res.code == 200) {
                        this.typeText = '';
                        //调用
                        this.gettypeList()
                    }
                })
            },

            getkeydown() {
                // this.initUeditor(UE.getEditor('container').getContent())
                let params = {
                    bookId: Number(this.booksid),
                    editId: Number(this.navid),
                    title: this.titile,
                }
                this.unitAjax('post', 'v1/book/editCatalogue', params, res => {
                    if (res.code == 200) {
                        //重新获取目录
                        this.getnav()
                    }
                })
                UE.getEditor('container').focus();


            },
            settitile(value, id, e) {
                this.getkeydown()
                this.setbook()
                this.pageIndex = 1;
                //   this.articleList=[];
                this.titile = value;
                // this.initUeditor(value);
                //保存上次目录内容
                this.navid = id;
                if (this.showTree = true) {
                    let arr = document.querySelectorAll('.navtab')
                    for (let i = 0; i < arr.length; i++) {
                        arr[i].className = 'navtab';
                    }
                    if (this.utstyle == 'white') {
                        e.target.className = 'nav-treeWhite navtab'
                    } else {
                        e.target.className = 'nav-treeBlack navtab'
                    }

                }

                //获取点击目录的内容
                this.getbooksContent()
                this.articletext = []
                this.articleList = []
            },
            //添加章节
            addnav(value, index, parentid) {
                var id = index == 0 ? "" : value[index].id

                this.setCatalogue(id, parentid, "新加章名", "addnav")
                    //   for(let i=0;i<2;i++){
                    // this.setCatalogue(id, this.oldid)
                    //   }

                // value.splice(index + 1, 0, {
                //     id: 'a' + value[index].id++,
                //     name: "第" + (index + 1) + "章",
                //     children: [{
                //         name: "第1篇",
                //         id: 'ab' + value[index].id++,
                //         children: [{
                //             name: "第1节",
                //             id: 'abc' + value[index].id++,
                //         }]
                //     }]
                // });
            },
            addTitle(list, index, parentid) {
                this.setCatalogue(list[index].id, parentid, "新加篇名", 'addTitle')

                // list.splice(count + 1, 0, {
                //     id: 'b' + list[count].id++,
                //     name: "第" + (count + 2) + "篇",
                //     children: [{
                //         name: "第1节",
                //         id: 'bc' + list[count].id++,

                //     }]
                // });
            },
            addidea(list, index, parentid) {
                this.setCatalogue(list[index].id, parentid, "新加小节")

                // list.splice(index + 1, 0, {
                //     id: 'c' + list[index].id++,
                //     name: "第" + (index + 2) + "节",
                // })
            },
            //删除章节
            removenav(list, index) {
                this.deleteTree(list, index, list[index].id)
            },
            removeTitle(list, index) {
                this.deleteTree(list, index, list[index].id)
            },
            removeidea(list, index) {
                this.deleteTree(list, index, list[index].id)

            },
            //删除章节
            deleteTree(list, index, id) {
                //删除想法的评论
                this.$confirm('此操作将永久删除该章节, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.unitAjax('delete', 'v1/book/deleteCatalogue', {
                        bookId: Number(this.booksid),
                        deleteId: Number(id)
                    }, res => {
                        if (res.code == 200) {
                            list.splice(index, 1)
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
            // 创作背景
            setcreatColor(value, fontColor) {
                this.$refs.idea.style.background = "url(" + value + ")";
                this.$refs.idea.style.backgroundSize = "100%";
                document.querySelector('.edui-editor').style.backgroundColor = 'unset';
                document.querySelector('.edui-editor-iframeholder').style.backgroundColor = 'unset';
                document.querySelector('.title').style.backgroundColor = 'unset';
                this.$refs.navTree.style.backgroundColor = 'unset';
                this.getreadercolor(fontColor);
                //存储
                this.setValue({
                    name: 'background',
                    value: value
                })
                this.setValue({
                    name: 'color',
                    value: fontColor
                })
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
            // 目录树
            getnvetree() {
                // console.log( document.querySelector('.treeimg'))transform: rotate(90deg);
                this.showTree = !this.showTree;
                if (this.showTree) {
                    let arr = document.querySelectorAll('.navtab')
                    for (let i = 0; i < arr.length; i++) {
                        if (this.utstyle == 'white') {
                            arr[0].className = 'nav-treeWhite navtab'
                        } else {
                            arr[0].className = 'nav-treeBlack navtab'
                        }
                    }

                }

            },

            //更换背景色
            getreadercolor(color) {
                this.utstyle = color;
                if (color == "black") {
                    this.forecolorHandle("#F7F7F7");
                    document.querySelector('iframe').contentWindow.document.querySelector("body").style.color = "white";
                } else {
                    this.forecolorHandle("#1b1b1b");
                    document.querySelector('iframe').contentWindow.document.querySelector("body").style.color = "black";
                }
            },
            handleNodeClick(data) {
                console.log(data);
            },
            //协议
            readyNote() {
                this.showpopel = false;
                this.showbooksay = false;
                this.shownote = true;
            },
            //书本介绍
            setbooksay() {
                this.showpopel = true;
                this.showbooksay = true;
            },
            backindex(){
                this.showpopel = false;
                this.showbooksay=false
            },
            //联合出版
            sendidea(value) {
                  if (value == 2) {
                    this.showpopel = true;
                } else if(value == 1){
                    this.showpopel = false;
                     this.sendbook()
                }
                this.sumActive = value;
              
                
            },
            back() {
                this.$router.go(-1);
            },
            ideaHandle(item) {
                this.editor.setContent(item, true);
                this.activeTools = "";
            },
            linkHandle() {
                console.log(this.linkObj);
                this.editor.execCommand("link", this.linkObj);

                this.linkObj = {
                    url: "",
                    textValue: "",
                    target: "_blank"
                };

                this.activeTools = "";
            },
            lineheightHandle(data) {
                console.log(data);
                this.editor.execCommand("lineheight", data / 10);
            },
            fontsizeHandle(data) {
                console.log(data);
                this.activeTools = "";
                this.editor.execCommand("fontsize", data + "px");
            },
            fontfamilyHandle(data) {
                console.log(data);
                this.activeTools = "";
                this.editor.execCommand("fontfamily", data);
            },
            forecolorHandle(data) {
                console.log(data);
                this.activeTools = "";
                this.editor.execCommand("forecolor", data);
            },
            getFileUrl(file) {
                //获取文件临时路径
                var url;
                // debugger
                if (navigator.userAgent.indexOf("MSIE") >= 1) {
                    // IE
                    url = file.value;
                } else if (navigator.userAgent.indexOf("Firefox") > 0) {
                    // Firefox
                    url = window.URL.createObjectURL(file);
                } else if (navigator.userAgent.indexOf("Chrome") > 0) {
                    // Chrome
                    url = window.URL.createObjectURL(file);
                } else {
                    url = window.URL.createObjectURL(file);
                }
                return url;
            },
            changeImg(e) {
                //图片change回调
                var file = e.target.files[0];
                var _this = this;
                // debugger
                try {
                    if (file.type.indexOf("image") >= 0) {
                        //是图片文件
                        if (file.size / 1024 / 1024 < 5) {
                            //图片小于5M
                            var url = this.getFileUrl(file);
                            // this.getUrlBase64(url,'png',)
                            // ext=
                            console.log(url,file)
                            if (url) {
                                var img = new Image();
                                img.src = url;
                                img.onload = function() {
                                    _this.editor.focus();
                                    _this.editor.execCommand(
                                        "inserthtml",
                                        '<p><img style="width:100px;height:100px;" src="' +
                                        url +
                                        '"></p>'
                                    );
                                };
                            }
                            this.$refs.file.value = "";
                        } else {
                            tools.toastWarn("图片大于5M,请更换一张");
                        }
                    } else {
                        tools.toastWarn("请选择图片文件");
                    }
                } catch (e) {
                    tools.toastWarn("请选择图片文件");
                }
            },
            handleTool(key, index) {
                this.activeTools = this.activeTools == key ? "" : key;
                console.log(key);
                this.toolindex = index;
                switch (key) {
                    case "italic":
                        this.editor.execCommand("italic");
                        break;
                    case "underline":
                        this.editor.execCommand("underline");
                        break;
                    case "justifyl":
                        this.editor.execCommand("justify", "left");
                        // this.$refs.text.style.textAlign = 'left';
                        break;
                    case "justifym":
                        // this.$refs.text.style.textAlign = 'center';
                        this.editor.execCommand("justify", "center");
                        break;
                    case "justifyr":
                        // this.$refs.text.style.textAlign = 'right';
                        this.editor.execCommand("justify", "right");
                        break;
                    case "insertimage":
                        this.$refs.file.click();
                        break;
                    case "issue":
                        // if(){
                        this.tabcreat = 1;
                        this.showset = true;
                        // }else{
                        //     this.setbook()
                        // }
                        break;
                }
            },
            change() {
                // this.$store.commit("changeStyle");
                this.$router.push('/index');
            },
            tourl(url) {
                tools.router.push({
                    path: url
                });
            },
            //灵感
            getinspration() {
                this.unitAjax('get', 'v1/inspiration/list', {
                    page: 1,
                    pageSize: 50
                }, res => {
                    if (res.code == 200) {
                        this.insparitionList = res.data.rows
                    }
                })
            },
            //想法
            getideaList() {
                this.unitAjax('get', 'v1/idea/list', {
                    page: 1,
                    pageSize: 50
                }, res => {
                    if (res.code == 200) {
                        this.ideaList = res.data.rows
                    }
                })
            }
        },
        watch: {
            "$store.state.utstyle": function(val) {
                this.utstyle = val;
            }
        },
        beforeDestroy() {
            this.tabActive = 1;

            if (this.editor.getContent()) {

                if (this.$route.query.editor == "idea") {
                    //保存书籍
                    this.setbook()
                } else if (this.$route.query.editor == "publish") {
                    this.publishArticle(true)
                }

            }
            if (typeof(UE.getEditor("container")) != 'undefined') {
                UE.getEditor("container").destroy();
            }
        },
        computed: {
            articleText() {
                return this.$store.state.articleText;
            }
        },
        mounted() {
            var _this = this;
            this.height = window.innerHeight;
            window.onresize = function() {
                _this.height = window.innerHeight;
            };


        }
    };
</script>

<style scoped lang='scss'>
    @import "../assets/scss/tool.scss";
    .edit {
        width: 100%;
        height: 100%;
        transition: background 0.3s ease;
        .activeset {
            border: 1px solid #e6e6e6;
        }
        .top {
            margin-top: 15px;
        }
        .treel {
            position: absolute;
            top: 100px;
            left: 35px;
            .active-nav {
                .nav-treeBlack {
                    color: white;
                }
                .nav-treeWhite {
                    color: black;
                }
            }
            .titile {
                margin-top: 58px;
                position: relative;
                .line {
                    height: 700px;
                    position: absolute;
                    top: 13px;
                    left: 5px;
                    border-left: 1px solid;
                    &::after {
                        content: '';
                        width: 10px;
                        height: 10px;
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        transform: translateX(-50%);
                        border-radius: 50%;
                    }
                }
                ul {
                    margin-top: 30px;
                    line-height: 30px;
                    padding: 0 20px;
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
        }
        .sendmsg {
            width: 492px;
            height: 492px;
            background-color: #eeeeee;
            padding: 20px;
            position: fixed;
            top: 50%;
            left: 50%;
            z-index: 1000;
            transform: translate(-50%, -50%);
            .note {
                height: 450px;
                background-color: white;
                padding: 30px 0 0 30px;
                ul {
                    li {
                        line-height: 30px;
                    }
                     :nth-child(3) {
                        margin-top: 20px;
                    }
                     :nth-child(7) {
                        margin-top: 20px;
                    }
                }
                p {
                    text-align: center;
                    margin-top: 100px;
                }
            }
            .poper-content {
                height: 290px;
                background-color: white;
                font-weight: 700;
                textarea {
                    margin: 20px;
                }
                .saysumbmit {
                    margin-right: 10px;
                }
                a {
                    font-weight: 700;
                }
                .poper-header {
                    height: 60px;
                    line-height: 60px;
                    padding-left: 25px;
                }
                .frend {
                    border-top: 1px solid #dcdddd;
                    position: relative;
                    ul {
                        &::after {
                            content: "";
                            position: absolute;
                            top: 0;
                            left: 50%;
                            height: 230px;
                            border-right: 1px solid #dcdddd;
                        }
                        li {
                            height: 46px;
                            line-height: 46px;
                            .frend-left {
                                width: 50%;
                                cursor: pointer;
                                //  padding: 5px 0;
                                .imgbox {
                                    display: inline-block;
                                    width: 40px;
                                    height: 40px;
                                    text-align: center;
                                    line-height: 40px;
                                    background: #cacaca;
                                    margin: 0 5px;
                                    img {
                                        vertical-align: middle;
                                    }
                                }
                            }
                            .frend-right {
                                width: 50%;
                                height: 100%;
                                input {
                                    width: 50px;
                                    height: 100%;
                                    padding-left: 5px;
                                }
                            }
                        }
                        .poperActive {
                            border-top: 1px solid #dcdddd;
                            border-bottom: 1px solid #dccddd;
                            background-color: #e6e6e6;
                        }
                    }
                }
            }
            .idea-btn {
                text-align: center;
                line-height: 50px;
                margin-top: 55px;
                .btn-center {
                    width: 372px;
                    margin: 0 auto;
                }
                a {
                    display: inline-block;
                    width: 150px;
                    height: 50px;
                }
            }
            .send {
                padding: 40px;
                .left {
                    width: 50%;
                    height: 217px;
                    overflow-y: auto;
                    overflow-x: hidden;
                    .row {
                        border-bottom: 1px solid #dcdddd;
                        height: 53px;
                        padding: 0 20px;
                        input {
                            height: 100%;
                            border: none;
                        }
                    }
                    ul {
                        margin-top: 10px;
                        li {
                            padding: 0 20px;
                            height: 30px;
                            line-height: 30px;
                            cursor: pointer;
                        }
                    }
                }
                .bookimg {
                    background-color: #b5b5b5;
                    width: 150px;
                    height: 180px;
                }
                .idea-content {
                    position: relative;
                    .cover {
                        position: absolute;
                        bottom: 15px;
                        left: 0;
                        width: 80%;
                        height: 50px;
                        text-align: left;
                        color: #ababab;
                        font-size: 12px;
                        line-height: 20px;
                        padding: 5px 0;
                    }
                }
                .right {
                    width: 50%;
                    height: 217px;
                    position: relative;
                    text-align: center;
                    line-height: 54px;
                    .creat {
                        width: 80%;
                        height: 54px;
                        input {
                            display: inline-block;
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .istrue {
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        width: 80%;
                        height: 54px;
                        a {
                            display: inline-block;
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .booksay {
                        height: 40px;
                        bottom: 110px;
                        line-height: 40px;
                    }
                }
                .idea {
                    a {
                        font-weight: 700;
                    }
                    .creat,
                    .istrue {
                        height: 40px;
                        line-height: 40px;
                    }
                    .money {
                        bottom: 35px;
                        input {
                            width: 80%;
                            height: 100%;
                        }
                    }
                    .thiry {
                        text-align: left;
                        input {
                            vertical-align: middle;
                            cursor: pointer;
                        }
                        a {
                            display: inline;
                            font-size: 12px;
                            color: #ababab;
                            text-decoration: underline;
                        }
                    }
                }
                .bottom {
                    width: 100%;
                    height: 140px;
                    margin-top: 20px;
                    padding: 10px 10px 0 10px;
                    position: relative;
                    textarea {
                        border: none;
                        outline: none;
                        resize: none;
                    }
                    img {
                        position: absolute;
                        right: 15px;
                        bottom: 15px;
                        cursor: pointer;
                    }
                }
            }
            .idea-content {
                height: 250px;
                border-bottom: 1px solid #dcdddd;
            }
        }
        &.black {
            background: #000;
            .fontsizeTools,
            .fontfamilyTools,
            .forecolorTools,
            .linkTools input,
            .draftTools {
                background: rgba(0, 0, 0, 0.5);
                color: #fff;
            }
            .draftTools,
            .ideaTools {
                .item {
                    &:hover {
                        color: #fff;
                    }
                }
            }
        }
        .header {
            height: 56px;
            position: relative;
        }
        .logo {
            position: absolute;
            height: 26px;
            top: 16px;
            left: 35px;
            @include hand;
        }
        .toolsView {
            width: 900px;
            margin: 0 auto;
            .icon {
                position: relative;
                width: 56px;
                height: 56px;
                background-position: 50% 50%;
                background-repeat: no-repeat;
                @include hand;
                transition: border-color 0.3s ease;
                &:hover {
                    border-color: #e6e6e6;
                }
            }
            .iconBorder {
                border: 1px solid;
            }
        }
        .rightTools {
            position: absolute;
            right: 30px;
            top: 0;
            height: 56px;
            div {
                width: 56px;
                height: 56px;
                // border: 1px solid transparent;
                background-position: 50% 50%;
                background-repeat: no-repeat;
                @include hand;
                transition: border-color 0.3s ease;
                &:hover {
                    border-color: #e6e6e6;
                }
            }
            .set {
                text-align: center;
                vertical-align: center;
                line-height: 56px;
                position: relative;
                // background-size: 19px 23px;
                // &.w {
                //   background-image: url("../assets/images/editor/setw.png");
                // }
                // &.b {
                //   background-image: url("../assets/images/editor/setb.png");
                // }
                // &:hover {
                //   background-image: url("../assets/images/editor/seta.png") !important;
                // }
            }
            .right-set {
                position: absolute;
                top: 56px;
                right: 0;
                margin-right: 56px;
                width: 100%;
                text-align: center;
                line-height: 56px;
                color: #b0b0b0;
                z-index: 1000;
                li {
                    border: 1px solid #e6e6e6;
                    height: 56px;
                    cursor: pointer;
                }
                .creatimg {
                    img {
                        width: 100%;
                        height: 100%;
                        border-right: none;
                    }
                }
                 :nth-child(1) {
                    // padding: 5px 0;
                    span {
                        margin-top: 15px;
                        height: 30px;
                        line-height: 30px;
                        width: 50%;
                        img {
                            border: none;
                        }
                    }
                    .borderbox {
                        border-right: 1px solid #e6e6e6;
                    }
                }
            }
            .back {
                &.w {
                    background-image: url("../assets/images/editor/backw.png");
                }
                &.b {
                    background-image: url("../assets/images/editor/backa.png");
                }
                // &:hover {
                //   background-image: url("../assets/images/editor/backa.png") !important;
                // }
            }
        }
        @mixin tool() {
            border: 1px solid #e6e6e6;
            position: absolute;
            top: 54px;
            left: -1px;
            background: rgba(255, 255, 255, 0.5);
        }
        // 字号工具
        .fontsizeTools {
            z-index: 10000;
            @include tool;
            width: 56px;
            transition: all 0.3s ease;
            .item {
                height: 35px;
                font-size: 13px;
                text-align: center;
                line-height: 35px;
                transition: all 0.3s ease;
                &:hover {
                    background: #e6e6e6;
                }
            }
        }
        // 字体工具
        .fontfamilyTools {
            z-index: 10000;
            @include tool;
            width: 172px;
            color: #aeaeae;
            font-size: 13px;
            line-height: 35px;
            text-align: center;
            .item {
                transition: all 0.3s ease;
                &:hover {
                    background: #e6e6e6;
                }
            }
            .item.active {
                color: #000;
            }
        }
        // 字体颜色
        .forecolorTools {
            z-index: 10000;
            @include tool;
            width: 56px;
            transition: all 0.3s ease;
            .item {
                transition: all 0.3s ease;
                height: 35px;
                padding-top: 10px;
                &:hover {
                    background: #e6e6e6;
                }
                .color {
                    width: 24px;
                    height: 13px;
                    margin: 0 auto;
                }
            }
        }
        .linkTools {
            z-index: 10000;
            border: 1px solid #e6e6e6;
            position: absolute;
            top: 54px;
            left: -1px;
            input {
                padding: 0 20px;
                line-height: 56px;
                border: none;
                width: 334px;
                height: 56px;
                background: rgba(255, 255, 255, 0.5);
            }
        }
        .draftTools {
            z-index: 10000;
            width: 286px;
            height: 286px;
            overflow-y: auto;
            border: 1px solid #e6e6e6;
            position: absolute;
            top: 54px;
            right: -1px;
            .item {
                height: 46px;
                line-height: 46px;
                width: 266px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                padding: 0 15px;
                border-bottom: 1px solid #e6e6e6;
                color: #a0a0a0;
                &:hover {
                    color: #000;
                }
            }
        }
        .ideaTools {
            z-index: 10000;
            width: 343px;
            height: 343px;
            overflow-y: auto;
            border: 1px solid #e6e6e6;
            position: absolute;
            top: 54px;
            right: -1px;
            .item {
                padding: 15px;
                font-size: 13px;
                line-height: 1.5;
                border-bottom: 1px solid #e6e6e6;
                color: #a0a0a0;
                &:hover {
                    color: #000;
                }
            }
        }
        .middleView {
            position: relative;
            h2 {
                position: absolute;
                top: -70px;
                left: 50%;
                transform: translate(-50%, 0);
                width: 1000px;
                height: 100px;
                margin: 0 auto;
            }
            #container {
                width: 1000px;
                height: 750px;
                overflow: hidden;
                margin: 100px auto 0;
                padding-bottom: 16px;
            }
            .title {
                width: 968px;
                font-size: 17px;
                font-weight: 700;
                height: 50px;
                padding: 0 8px;
                margin-right: 54px;
                text-align: center;
            }
            .pageTools {
                width: 880px;
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
                    .page {
                        position: absolute;
                        top: 0;
                        right: 50%;
                    }
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
        }
    }
</style>