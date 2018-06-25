<template>
<div class="edit" ref="idea" :class='{black:utstyle != "white"}' :style='{height:height + "px"}' @click="showset=false">

  <div class="header">
    <img @click='change' v-if='utstyle == "white"' class='logo' src="../assets/images/utter/logo.png" alt="UTTER">
    <img @click='change' v-else class='logo' src="../assets/images/utter/logow.png" alt="UTTER">

    <div class="toolsView clearfix">
      <input type='file' id='file' ref='file' @change='changeImg' style='width:0;height:0;position:fixed;top:-2000px;'>

      <div class="icon utBorder pull-left" :class="index==toolindex?'iconBorder':''"
        @click.self='handleTool(i.key,index)'
        :style="{'background-image': utstyle == 'white' ? 'url('+ i.bicon +')' : 'url('+ i.wicon +')' }" 
        v-for='(i,index) in toolsList' :key="index">

        <div class="fontsizeTools utBorder" v-if='activeTools == "fontsize" && i.key == "fontsize"'>
          <div class="item" @click='fontsizeHandle(7 + i)' v-for='i in 21'>{{7 + i}}</div>
        </div>

        <div class="fontfamilyTools utBorder" v-if='activeTools == "fontfamily" && i.key == "fontfamily"'>
          <div class="item" v-for='(item,index) in familyList' @click='fontfamilyHandle(item)' :key="index">{{item}}</div>
        </div>

        <div class="forecolorTools utBorder" v-if='activeTools == "forecolor" && i.key == "forecolor"'>
          <div class="item" v-for='i in colorList' @click='forecolorHandle(i)'>
            <div class="color" :style='{"background-color":i}'></div>
          </div>
        </div>
        
        <div class="fontsizeTools utBorder" v-if='activeTools == "lineheight" && i.key == "lineheight"'>
          <div class="item" v-for='i in 21' @click='lineheightHandle(7 + i)'>{{7 + i}}</div>
        </div>

        <div class="fontsizeTools utBorder" v-if='activeTools == "rowspacing" && i.key == "rowspacing"'>
          <div class="item" v-for='i in 10'>{{i - 1}}</div>
        </div>

        <div class="linkTools utBorder" v-if='activeTools == "link" && i.key == "link"'>
          <input placeholder='请输入内容…' v-model='linkObj.textValue'>
          <input placeholder='输入超链接地址…' v-model='linkObj.url' @keydown.enter='linkHandle'>
        </div>

        <div class="draftTools utBorder" v-if='activeTools == "draft" && i.key == "draft"'>
          <div class="item utBorder" v-for='i in 10'>不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕</div>
        </div>

        <div class="ideaTools utBorder" v-if='activeTools == "idea" && i.key == "idea"'>
          <div class="item utBorder" v-for='i in 5' @click='ideaHandle'>不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕不问远征 无关朝夕</div>
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
          <li class="clearfix"><span class="fl borderbox utBorder"  @click='openfun(1)'>
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
          <li class="creatimg"><img src="../../static/img/1.jpg" alt="" @click="setcreatColor('../../static/img/1.jpg')"></li>
          <li  class="creatimg"><img src="../../static/img/2.jpg" alt=""  @click="setcreatColor('../../static/img/2.jpg')"></li>
          <li  class="creatimg"><img src="../../static/img/3.jpg" alt=""  @click="setcreatColor('../../static/img/3.jpg')"></li>
          <li  class="creatimg"><img src="../../static/img/4.jpg" alt=""  @click="setcreatColor('../../static/img/4.jpg')"></li>
          </label>
        </ul>
    </div>
  </div>

  <div class="middleView">
      <h2 :class="utstyle=='white'?'ut-input-white':'ut-input-black'"><input  class="title" type="text" value="标题" ></h2>
    <div id="container" @click="showset=false"></div>
  </div>
    <!-- 设置-发表信息 -->
    <div class="sendmsg" v-show="tabcreat==1&&showset" @click.stop="showset=true">
      <!-- 发表信息 -->
        <div class="send " v-show="$route.query.editor=='publish'">
            <div class="clearfix">
            <div class="left fl ut-white1">
                <div class="row utBorder" v-show="showcreat"><input type="text"></div>
                <ul>
                  <li :class="tabActive==index?'ut-black1':''" v-for="(item,index) in 4" :key='index' @click="tabActive=index">默认分类{{index}}</li>
                </ul>
            </div>
          
            <div class="right fr">
                <div class="creat fr ut-white1" @click="showcreat=true"><a href="javaScript:;" class="ut-white1">创建类别</a></div>
                <div class="istrue ut-white1"><a href="javaScript:;" class="ut-white1">确认</a></div>
            </div>
            </div>
            <div class="bottom ut-white1">
                  <textarea name="name" rows="8" cols="45" placeholder='为文章写一段摘要'></textarea>
        <el-tooltip effect="dark" content="发表" placement="bottom">
          <img src="../assets/images/article/submit.png" class='submit' alt="发表">
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
                     <li class="utBorder" :class="poperTab==index?'poperActive':''" @click="poperTab=index" v-for="(item,index) in 3" :key="index">
                       <p class="frend-left fl"><span class="imgbox"><img src="../assets/images/utter/userw.png" alt=""></span><span>一笑而过</span></p>
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
                   <textarea name="booksay" id="" cols="56" rows="14" placeholder="为书本写一段介绍"></textarea>
                    <a class="fr saysumbmit" href="javaScript:;"> <img src="../assets/images/article/submit.png" alt="发表"></a>
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
                <ul>
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
          
            <div class="right idea fr">
                <div class="creat fr ut-white1" @click="showcreat=true"><a href="javaScript:;" class="ut-white1">设置封面</a></div>
                <div class="fr cover"><p>封面尺寸:w:150 h:180</p>  <p>封面格式:jpg、png</p></div>
               
                 <div class="istrue booksay ut-white1"><a href="javaScript:;" class="ut-white1" @click="setbooksay">书本介绍</a></div>
                <div class="istrue money ut-white1"><input type="text" class="ut-white1" v-model=" 0.21">￥</div>
                <div class="istrue thiry"><input type="checkbox"><a href="javaScript:;" @click="readyNote">我已阅读接受此协议</a></div>
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
      <div class="tree fl" v-show="$route.query.editor=='idea'">
      <a href="javaScript:;" >
      <img v-show="utstyle=='white'" class="navimg treeimg" src="../assets/images/editor/175 创作区-目录.png" alt="" @click="getnvetree">
      <img v-show="utstyle=='black'" class="navimg treeimg" src="../assets/images/editor/192 创作区-目录-白.png" alt="" @click="getnvetree">
      </a>
      <!-- <el-tree v-show="showTree=false" :class="utstyle=='white'?'ut-white':'ut-black'" class="nav-tree" :data="data" :props="defaultProps" @node-click="handleNodeClick"  node-key="id"
  :default-expand-all="true"   :expand-on-click-node="false">
  
    </el-tree> -->
       <div class="titile" :class="utstyle=='white'?'ut-white1':'ut-black1'">
           <div class="line" :class="utstyle=='white'?'navBorder-b pagecolr-black-after':'navBorder-w pagecolr-white-after'"></div>
            <ul>
                <li class='bor'>前言</li>
               
            </ul>
            <ul>
                 <li class='bor'>第一章</li>
                 <li class="big-titile">标题</li>
                 <li class="small-titile">小标题</li>
            </ul>
            <ul> <li class='bor'>结语</li></ul>
       </div> 
  </div>
  

</div>
</template>

<script>
    import "../../static/ue/ueditor.config.js";
    import "../../static/ue/ueditor.all.min.js";
    import "../../static/ue/lang/zh-cn/zh-cn.js";
    let id = 1000;
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
                data: [{
                    label: "前言",
                    id: 0,
                }, {
                    label: "一级",
                    id: 1,
                    children: [{
                        label: "二级 2-1",
                        id: 2,
                        children: [{
                            label: "三级 2-1-1"
                        }]
                    }, {
                        id: 3,
                        label: '一级 2',
                        children: [{
                            id: 5,
                            label: '二级 2-1'
                        }, {
                            id: 6,
                            label: '二级 2-2'
                        }]
                    }]
                }, {
                    label: "结语",

                }],
                defaultProps: {
                    children: "children",
                    label: "label"
                },
                showTree: false,
                // showmore: false,
                readcolor: "white",
                // 右边设置
                tabcreat: 0,
                showclose: true,
                showopen: false,
                opentab: 1,
                toolindex:100,
            };
        },
        beforeCreate(){
             UE.delEditor("container");
        },
        created() {
            this.utstyle = this.$route.query.type;
              setTimeout(() => {
                  console.log(document.querySelector('iframe'))
                if(document.querySelector('iframe')){
                     if (this.$route.query.type == "black") {
                   document.querySelector('iframe').contentWindow.document.querySelector("body").style.color = "white";
                } else {
                    // this.forecolorHandle("#1b1b1b");
                   document.querySelector('iframe').contentWindow.document.querySelector("body").style.color = "black";

                }
                }
                   }, 2000);
        },
        methods: {
            // 创作背景
            setcreatColor(value) {
                this.$refs.idea.style.background = "url(" + value + ")";
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
                    document.querySelector('.treeimg').style.transform = "rotate(90deg)";
                } else {
                    document.querySelector('.treeimg').style.transform = "rotate(0deg)";
                }
            },
            // append(data) {
            //     const newChild = {
            //         id: id++,
            //         label: 'testtest',
            //         children: []
            //     };
            //     if (!data.children) {
            //         this.$set(data, 'children', []);
            //     }
            //     data.children.push(newChild);
            // },

            // remove(node, data) {
            //     const parent = node.parent;
            //     const children = parent.data.children || parent.data;
            //     const index = children.findIndex(d => d.id === data.id);
            //     children.splice(index, 1);
            // },
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
            //联合出版
            sendidea(value) {
                this.sumActive = value;
                if (value == 2) {
                    this.showpopel = true;
                } else {
                    this.showpopel = false;
                }
            },
            back() {
                this.$router.go(-1);
            },
            ideaHandle() {
                this.editor.setContent("<p>new text</p>", true);
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
            handleTool(key,index) {
                this.activeTools = this.activeTools == key ? "" : key;
                console.log(key);
                this.toolindex=index;    
                switch (key) {
                    case "italic":
                        this.editor.execCommand("italic");
                        break;
                    case "underline":
                        this.editor.execCommand("underline");
                        break;
                    case "justifyl":
                        this.editor.execCommand("justify", "left");
                        break;
                    case "justifym":
                        this.editor.execCommand("justify", "center");
                        break;
                    case "justifyr":
                        this.editor.execCommand("justify", "right");
                        break;
                    case "insertimage":
                        this.$refs.file.click();
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
            initUeditor() {
               
                this.editor = UE.getEditor("container", {
                    toolbars: [],
                    focus: true,
                    initialFrameWidth: 984,
                    initialFrameHeight: 734,
                    autoHeightEnabled: false,
                    enableAutoSave: true,
                    saveInterval: 5000,
                    wordCount: false,
                    elementPathEnabled: false
                });
                var editor = this.editor;
                this.editor.ready(function() {
                    console.log("ue finish");

                    editor.setContent("<h2>545</h2>");
                });
                return;
                // UE.dom.domUtils.setStyles(this.editor.body, {
                //   color: "#fff",
                //   "font-family":
                //     "'Microsoft Yahei','Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif",
                //   "font-size": "14px"
                // });
                setInterval(() => {
                    let data = editor.execCommand("getlocaldata");
                    console.log(data);

                    // editor.setContent(data);

                    // editor.getContent();
                }, 5000);
            }
        },
        watch: {
            "$store.state.utstyle": function(val) {
                this.utstyle = val;
            }
        },
        beforeDestroy(){
            if(typeof(UE.getEditor("container")) !='undefined'){
                 UE.getEditor("container").destroy();
            }
        },
        mounted() {
            var _this = this;
            this.height = window.innerHeight;

            window.onresize = function() {
                _this.height = window.innerHeight;
            };

            this.initUeditor();
        }
    };
</script>

<style scoped lang='scss'>
    @import "../assets/scss/tool.scss";
    .edit {
        width: 100%;
        height: 100%;
        transition: background 0.3s ease;
        .custom-tree-node {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            padding-right: 8px;
        }
        .activeset {
            border: 1px solid #e6e6e6;
        }
        .tree {
            position: absolute;
            top: 100px;
            left: 35px;
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
                    .bor {
                        list-style-type: initial;
                        //  padding-left:10px;
                    }
                    .big-titile {
                        margin-left: 15px;
                    }
                    .small-titile {
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
                .right {
                    width: 50%;
                    height: 217px;
                    position: relative;
                    text-align: center;
                    line-height: 54px;
                    .creat {
                        width: 80%;
                        height: 54px;
                        a {
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
                        bottom: 85px;
                        line-height: 40px;
                    }
                    .cover {
                        width: 80%;
                        height: 50px;
                        text-align: left;
                        color: #ababab;
                        font-size: 12px;
                        line-height: 20px;
                        padding: 5px 0;
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
            width: 928px;
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
            .iconBorder{
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
                top: -50px;
                left: 50%;
                transform: translate(-50%, 0);
                width: 984px;
                margin: 0 auto;
            }
            #container {
                max-width: 1000px;
                height: 750px;
                overflow: hidden;
                margin: 100px auto 0;
                padding-bottom: 16px;
            }
            .title {
                width: 100%;
                font-size: 17px;
                font-weight: 700;
            }
        }
    }
</style>