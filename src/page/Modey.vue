<template lang="html">
  <div class="modey" ref='modey' :class='className' @click='closeshow'>
      <!-- <div :class="rowcol=='col'?'col':'row'"> -->
    <div class="ing" ref='align' :class='!ingActive?"":rowcol=="row"?"active row":"active col"' v-show='!hiddenArrow'>
        
      <div v-show="!showinput" class="big" ref='titile' @dblclick="showinput=true">
       {{userInfo.siteName}}
      </div>
      <input class="big" type="text" v-model="siteName" v-show="showinput" @keydown.enter="setting(siteName)">
      <div class="sub" ref='content' v-show="!showinputText"  @dblclick="showinputText=true">
       {{userInfo.siteInfoDetail||'个性签名'}}
      </div>
      <input class="sub" v-model="siteInfoDetail" type="text" v-show="showinputText"  @keydown.enter="setting(siteInfoDetail)">
    <!-- </div> -->
    </div>
    <!-- //设置 -->
    <div class="setting" :class='stylecolor=="white"?"active-white":"active-black"' v-show='showset' @click.stop='showset=true'>
          <div v-show='!rightimgshow'>
          <div class="left">
            <img src="../assets//images/module/53 个人首页-横版左对齐.png" alt="" @click="setrowalign('left')">
            <img src="../assets//images/module/56 个人首页-竖版上对齐.png" alt=""  @click="setrowalign('top','col')">
            <img src="../assets//images/module/54 个人首页-横版居中.png" alt="" @click="setrowalign('center')">
            <img src="../assets//images/module/57 个人首页-竖版居中.png" alt=""  @click="setrowalign('center','col')">
            <img src="../assets//images/module/55 个人首页-横版右对齐.png" alt="" @click="setrowalign('right')">
            <img src="../assets//images/module/58 个人首页-竖版下对齐.png" alt=""  @click="setrowalign('bottom','col')">
          </div>
          <div class="center">
            <div class='slider' :class="stylecolor=='white'?'slider-black':'slider-white'">
              <el-slider v-model="fontvalue" :max='maxtitile' :min='mintitile' :show-tooltip="false"></el-slider>
              <el-slider v-model="fontvalue2" :max='maxcontent' :min='mincontent' :show-tooltip="false"></el-slider>
              </div>
              <div class="titilefont utBorder" @click="showtitilefont=true">{{titlevalue}}
                  <ul  @click.stop="showtitilefont=false" v-show="showtitilefont" class="utBorder" :class="$route.query.type=='white'?'ut-white1':'ut-black1'">
                      <li class="utBorder" v-for="(item, index) in titilefonts" :key="index" @click="gettitilefonts(item)">{{item}}</li>
                  </ul>
                  </div>
                  <div class="contentfont utBorder" @click="showcontentfont=true">{{contentvalue}}
                        <ul  @click.stop="showcontentfont=false" v-show="showcontentfont" class="utBorder"  :class="$route.query.type=='white'?'ut-white1':'ut-black1'">
                                <li  class="utBorder" v-for="(item, index) in contentfonts" :key="index" @click="getcontentfonts(item)">{{item}}</li>
                            </ul>
                  </div>
          </div>
          </div>
          <div v-show='rightimgshow' class='setimgwidth'>
            <span :class='stylecolor=="white"?"ut-black":"ut-white"'>推荐壁纸</span>
            <span :class='stylecolor=="black"?"ut-black":"ut-white"'>上传壁纸</span>
          </div>
          <div class="right">
            <a href='javaScript:;' @click="gettitleactiveimg(1)">
            <img v-show='settitleimgshow' src="../assets//images/module/50 个人首页-标题设置.png" alt="" >
            <img v-show='(!settitleimgshow||settab==1)&&$route.query.type=="white"' src="../assets//images/module/60 个人首页-标题设置-黑.png" alt="" >
            <img v-show='(!settitleimgshow||settab==1)&&$route.query.type=="black"' src="../assets//images/module/69 个人首页-标题设置-白.png" alt="">
            </a>
            <a href='javaScript:;' @click="getactiveimg(2)">
            <img v-show='setimgshow' src="../assets//images/module/51 个人首页-壁纸设置.png" alt="" >
            <img  v-show='(!setimgshow||settab==2)&&$route.query.type=="white"' src="../assets//images/module/61 个人首页-壁纸设置-黑.png" alt="">
            <img v-show='(!setimgshow||settab==2)&&$route.query.type=="black"'  src="../assets//images/module/70 个人首页-壁纸设置-白.png" alt="">
            </a>
          </div>
    </div>
    <div class="set" @click.stop='settingfun' v-if="!$route.query.userId">
      <a href='javaScript:;'>
      <img v-if='stylecolor=="white"' src="../assets//images/module//49 个人首页-首页设置-黑.png" alt="">
      <img v-if='stylecolor=="black"' src="../assets//images/module/59 个人首页-首页设置-白.png" alt="">
      </a>
      </div>
      <!-- 右边壁纸 -->
    <!-- <img :src="imgurl" alt=""> -->
      <div class="rihgtimgs" :class='stylecolor=="white"?"active-white":"active-black"' v-show='rightimgshow'>
        <!-- <span class="initcolor" @click='setbackgroundimg("none")'></span> -->
        <img src="../../static/img/1.jpg" alt="" @click='setbackgroundimg("../../static/img/1.jpg","white")'>
        <img src="../../static/img/2.jpg" alt="" @click='setbackgroundimg("../../static/img/2.jpg","white")'>
        <img src="../../static/img/3.jpg" alt="" @click='setbackgroundimg("../../static/img/3.jpg","black")'>
        <img src="../../static/img/4.jpg" alt="" @click='setbackgroundimg("../../static/img/4.jpg","black")'>
       
      </div>
    <div class="module" :class='{"active":showAll}' @click.stop='show'>
      <!-- 返回海报设置 -->
      <div class="backset fr" v-show='hiddenArrow&&!showbooks' >
        <a href='javascript:;'>
        <img src="../assets/images/editor/backa.png" alt=""  @click.stop='getbackset'>
      </a>
      </div>
      <!-- <div class="out">
      <img src="../assets/images/module/down.png" class='down' v-show='!hiddenArrow && className== "white"' :class='{"active":showAll}' @click.stop='show'>
      <img src="../assets/images/module/downw.png" class='down' v-show='!hiddenArrow && className== "black"' :class='{"active":showAll}' @click.stop='show'> -->
      <img src="../assets/images/module/up.png" class='down' v-show='!hiddenArrow'  @click.stop='show'> 
      <div class="inner" :class='{"active":hiddenArrow}'  v-show='showbooks'>
        <div class="arw utBorder">
          <div class="box">
            <img src="../assets/images/module/arrow.png" v-show='className == "white"'>
            <img src="../assets/images/module/arroww.png" v-show='className == "black"'>
          </div>
        </div>

        <p>设置您的海报样式</p>

        <div class="moduleSelect">

          <div class="line">
            <label v-if="$route.query.type=='white'">
            <img src="../assets/images/module/m1.png" class='m1' @click='setstyle(1)'>
            <img src="../assets/images/module/m2.png" class='m2' @click='setstyle(2)'>
            <img src="../assets/images/module/m3.png" class='m3'  @click='setstyle(3)'>
          </label>
          <label v-if="$route.query.type=='black'">
            <img src="../assets/images/module/m-b1.png" class='m1' @click='setstyle(1)'>
            <img src="../assets/images/module/m-b2.png" class='m2' @click='setstyle(2)'>
            <img src="../assets/images/module/m-b3.png" class='m3'  @click='setstyle(3)'>
          </label>
          </div>
          
          <!-- <div class="line">
            <img src="../assets/images/module/m4.png" class='m4'>
            <img src="../assets/images/module/m5.png" class='m5'>
            <img src="../assets/images/module/m6.png" class='m6'>
          </div> -->
        </div>
      </div>
    <input type='file' id='file' class="files" ref='file' @change='changeImg' style='width:0;height:0;position:fixed;top:-2000px;'>
      <!-- 海报图片设置 -->
      <div  :class="$route.query.type=='white'?'ut-input-white':'ut-input-black'" v-show='!showbooks' class="outbooks utBorder" :ref="'styletwo'+index"  v-for='(item,index) in stylelist' :key='index'>
            <div class="images"  v-show='hiddenArrow&&styleindex!=0'>
                 <img v-if="styleindex==1&&imageUrl1"  :src='imageUrl1' class="avatar">
                 <img v-if="styleindex==2&&index==0&&imageUrl2"  :src='imageUrl2' class="avatar">
                 <img v-if="styleindex==2&&index==1&&imageUrl3"  :src='imageUrl3' class="avatar">
                 <img v-if="styleindex==3&&index==0&&imageUrl4"  :src='imageUrl4' class="avatar">
                 <img v-if="styleindex==4&&index==1&&imageUrl5"  :src='imageUrl5' class="avatar">
             </div>
            <div class="sendimg" >
              <a href="javaScript:;" @click="changeImge(index)">
              <img class="linkimg" src="../assets/images//module/37 个人首页-海报区上传图片.png" alt="">
            
                <!-- <el-upload
                    class="avatar-uploader file"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess(index)"
                    :before-upload="beforeAvatarUpload">
                   
                    <i  class="el-icon-plus "></i>
                  </el-upload> -->
            </a>
            <div class="rihgtdiv">
            <a href="javaScript:;" @click='getbtnshow(index)' :ref="'linkborder'+index">
              <img src="../assets/images//module/38 个人首页-海报区超链接.png" alt="">
             
            </a>
            <input class="utBorder" type="text" :ref='"btnshow"+index'  placeholder="请输入超链接地址...">
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
                className: "white",
                showAll: false,
                hiddenArrow: false,
                ingActive: false,
                showmodule: true,
                showbooks: true,
                stylelist: 1,
                fontvalue: 50,
                fontvalue2: 40,
                showset: false,
                stylecolor: "white", //背景色
                setimgshow: true,
                settitleimgshow: false,
                settab: 1,
                imgurl: "",
                rightimgshow: false,
                rowcol: "row",
                maxtitile: 130,
                mintitile: 10,
                maxcontent: 65,
                mincontent: 10,
                titilefonts: [
                    "16",
                    "17",
                    "18",
                    "19",
                    "20",
                    "21",
                    "22",
                    "23",
                    "24",
                    "25",
                    "26",
                    "27",
                    "28",
                    "29",
                    "30",
                    "31",
                    "32",
                    "33",
                    "34",
                    "35",
                    "36"
                ],
                contentfonts: [
                    "16",
                    "17",
                    "18",
                    "19",
                    "20",
                    "21",
                    "22",
                    "23",
                    "24",
                    "25",
                    "26",
                    "27",
                    "28",
                    "29",
                    "30",
                    "31",
                    "32",
                    "33",
                    "34",
                    "35",
                    "36"
                ],
                titlevalue: "32",
                contentvalue: "16",
                showtitilefont: false,
                showcontentfont: false,
                imageUrl1: "",
                imageUrl2: "",
                imageUrl3: "",
                imageUrl4: "",
                imageUrl5: "",
                imageUrl: {},
                styleindex: 0,
                imgindex: 0,
                point: "",
                showinput: false,
                showinputText: false,
                siteInfoDetail: '',
                siteName: '',
                userInfo: {},
            };
        },
        watch: {
            "$store.state.utstyle": function(val) {
                this.className = val;
            },
            fontvalue: function(val) {
                this.$refs.align.style.marginLeft = val * 10 + "px";
            },
            fontvalue2: function(val) {
                this.$refs.align.style.marginTop = val * 10 + "px";
            }
        },
        created() {
            this.getuserInfo()
            this.stylecolor = this.$route.query.type;
            //读取
            window.onload = () => {
                if (this.getValue('background')) {
                    this.$refs.modey.style.background = "url(" + this.getValue('background') + ")";
                    this.$refs.modey.style.backgroundSize = "100%";
                    // this.stylecolor = this.getValue('color');
                }
            }

        },
        methods: {
            getuserInfo() {
                this.unitAjax('get', 'v1/me/index', {
                    userId: this.$route.query.userId || this.getValue('userId')
                }, res => {
                    if (res.code == 200) {
                        this.userInfo = res.data;
                        this.$refs.titile.style.fontSize = res.data.siteNameSize + "px";
                        this.$refs.content.style.fontSize = res.data.siteDetailSize + "px";
                        this.titlevalue = res.data.siteNameSize || "32";
                        this.contentvalue = res.data.siteDetailSize || "16";
                        if (res.data.siteInfoShowMode) {
                            let list = res.data.siteInfoShowMode.split(',');
                            this.setrowalign(list[0], list[1])
                        }

                        this.fontvalue = res.data.siteInfoXPoint || 50;
                        this.fontvalue2 = res.data.siteInfoYPoint || 40;
                        this.setValue({
                                name: 'userName',
                                value: res.data.userName
                            })
                            //海报  this.userInfo.posterInfo
                            //               {
                            //     "poster": "http://www.baidu.com/images/1.jpg",
                            //     "url": "http://www.baidu.com"
                            // },
                    }
                })
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
                                if (this.styleindex == 1) {
                                    this.imageUrl1 = url;
                                } else if (this.styleindex == 2) {
                                    if (this.imgindex == 0) {
                                        this.imageUrl2 = url;
                                    } else {
                                        this.imageUrl3 = url;
                                    }
                                } else {
                                    if (this.imgindex == 0) {
                                        this.imageUrl4 = url;
                                    } else {
                                        this.imageUrl5 = url;
                                    }
                                }
                            }
                            this.$refs.file.value = "";
                        } else {
                            this.$message.error("图片大于5M,请更换一张");
                        }
                    } else {
                        this.$message.error("请选择图片文件");
                    }
                } catch (e) {
                    this.$message.error("请选择图片文件");
                }
            },
            //控制字体
            gettitilefonts(value) {
                this.titlevalue = value;
                this.$refs.titile.style.fontSize = value + "px";
            },
            getcontentfonts(value) {
                this.contentvalue = value;
                this.$refs.content.style.fontSize = value + "px";
            },
            settingfun() {
                this.showset = !this.showset;
                this.gettitleactiveimg()
                    //保存设置
                if (this.showset == false) {
                    this.setting()
                }

                if (this.stylecolor == "white") {
                    for (
                        let i = 0; i < document.querySelectorAll(".el-slider__bar").length; i++
                    ) {
                        document.querySelectorAll(".el-slider__bar")[
                                i
                            ].style.backgroundColor =
                            "black";
                    }
                    for (
                        let i = 0; i < document.querySelectorAll(".el-slider__runway").length; i++
                    ) {
                        document.querySelectorAll(".el-slider__runway")[
                                i
                            ].style.backgroundColor =
                            "black";
                    }
                }
            },
            //切换皮肤
            setbackgroundimg(value, fontColor) {
                //  this.stylecolor=fontColor
                if (value == "none") {
                    if (this.$route.query.type == "white") {
                        this.$refs.modey.style.background = "#efefef";
                    } else {
                        this.$refs.modey.style.background = "#1b1b1b";
                    }
                } else {
                    this.$refs.modey.style.backgroundImage = "url(" + value + ")";
                    this.$refs.modey.style.backgroundSize = "100%";
                }
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
            gettitleactiveimg(num) {
                this.settitleimgshow = false;
                this.setimgshow = true;
                this.settab = num;
                this.rightimgshow = false;
            },
            getactiveimg(num) {
                this.settab = num;
                this.setimgshow = false;
                this.settitleimgshow = true;
                this.rightimgshow = true;
            },
            setting(value) {
                if (value) {
                    this.showinputText = false;
                    this.showinput = false;
                }
                let params = {
                    siteName: this.siteName || "独立出版",
                    siteInfoDetail: this.siteInfoDetail || "签名",
                    siteInfoShowMode: this.point,
                    siteInfoXPoint: this.fontvalue,
                    siteInfoYPoint: this.fontvalue2,
                    siteNameSize: Number(this.titlevalue),
                    siteDetailSize: Number(this.contentvalue),
                }
                this.unitAjax('post', 'v1/me/siteInfoSetting', params, res => {
                    if (res.code == 200) {
                        if (value) {
                            this.siteName = "";
                            this.siteInfoDetail = "";
                            //重新调用
                            this.getuserInfo()
                        }
                        this.$message({
                            message: '设置成功',
                            type: 'success'
                        });
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            },
            //设置横排对齐方式
            setrowalign(align, col) {
                this.point = align + ',' + col;

                if (col && col != "undefined") {
                    this.rowcol = "col";
                    this.$refs.titile.style.transform = "translateY(0)";
                    this.$refs.titile.style.marginBottom = "0px";
                    this.$refs.content.style.transform = "translateY(0)";
                    this.$refs.titile.style.top = "unset";
                    this.$refs.titile.style.bottom = "unset";
                    this.$refs.content.style.top = "unset";
                    this.maxcontent = 30;
                    this.mincontent = 10;
                    this.maxtitile = 170;
                    switch (align) {
                        case "bottom":
                            this.$refs.titile.style.bottom = "0";
                            this.$refs.content.style.bottom = "0";

                            break;
                        case "center":
                            this.$refs.titile.style.top = "50%";
                            this.$refs.content.style.top = "50%";
                            this.$refs.titile.style.transform = "translateY(-50%)";
                            this.$refs.content.style.transform = "translateY(-50%)";
                            break;
                        default:
                            this.$refs.titile.style.top = "0";
                            this.$refs.content.style.top = "0";
                            break;
                    }
                } else {
                    this.rowcol = "row";
                    this.$refs.align.style.textAlign = align;
                    this.$refs.titile.style.marginBottom = "32px";
                    this.maxtitile = 130;
                    this.maxcontent = 65;
                    this.mincontent = 10;
                }

            },
            // 风格样式
            setstyle(num) {
                this.showbooks = false;
                this.styleindex = num;
                if (num == 1) {
                    this.stylelist = 1;
                } else if (num == 2) {
                    this.stylelist = 2;
                    setTimeout(() => {
                        this.$refs.styletwo0[0].style.width = "50%";
                        this.$refs.styletwo0[0].style.float = "left";
                        this.$refs.styletwo0[0].style.borderRight = "1px solid #efefef";
                        this.$refs.styletwo1[0].style.width = "50%";
                        this.$refs.styletwo1[0].style.float = "left";
                    }, 20);
                } else if (num == 3) {
                    this.stylelist = 2;
                    setTimeout(() => {
                        this.$refs.styletwo0[0].style.height = "50%";
                        // this.$refs.styletwo0[0].style.float = "left";
                        this.$refs.styletwo0[0].style.borderBottom = "1px solid #efefef";
                        this.$refs.styletwo1[0].style.height = "50%";
                        // this.$refs.styletwo1[0].style.float = "left";
                    }, 20);
                }
            },
            getbackset() {
                this.showbooks = true;
                if (this.stylelist != 1) {
                    this.$refs.styletwo0[0].style.width = "100%";
                    this.$refs.styletwo1[0].style.width = "100%";
                    this.$refs.styletwo0[0].style.float = "unset";
                    this.$refs.styletwo0[0].style.border = "none";
                    this.$refs.styletwo0[0].style.height = "100%";
                    this.$refs.styletwo1[0].style.height = "100%";
                }
            },
            getbtnshow(index) {
                setTimeout(() => {
                    if (index == 0) {
                        this.$refs.btnshow0[0].style.display = "inline";
                        if (this.$route.query.type == "white") {
                            this.$refs.linkborder0[0].style.border = "1px solid #dcdddd";
                        } else {
                            this.$refs.linkborder0[0].style.border = "1px solid #1b1b1b";
                        }
                        this.$refs.linkborder0[0].style.height = "38px";
                        this.$refs.linkborder0[0].style.width = "38px";
                    } else {
                        this.$refs.btnshow1[0].style.display = "inline";
                        if (this.$route.query.type == "white") {
                            this.$refs.linkborder1[0].style.border = "1px solid #dcdddd";
                        } else {
                            this.$refs.linkborder1[0].style.border = "1px solid #1b1b1b";
                        }
                        this.$refs.linkborder1[0].style.height = "38px";
                        this.$refs.linkborder1[0].style.width = "38px";
                    }
                }, 20);
            },
            changeImge(index) {
                this.$refs.file.click()
                this.imgindex = index;
            },
            closeshow() {
                this.showAll = false;
                this.showset = false;
                this.rightimgshow = false;
                this.settab = 1;
                this.setimgshow = true;
                this.settitleimgshow = false;
                this.showcontentfont = false;
                this.showtitilefont = false;
                setTimeout(() => {
                    this.hiddenArrow = false;
                }, 1000);
            },
            tourl(url) {
                tools.router.push({
                    path: url
                });
            },
            show() {
                var _this = this;
                this.showAll = true;
                this.showPersonal = false;
                setTimeout(function() {
                    _this.hiddenArrow = true;
                }, 1000);
            }
        },
        mounted() {
            var _this = this;
            this.$store.commit("changeFooter", false);
            this.$store.commit("changeHeader", true);
            this.$store.commit("changeType", "user");
            setTimeout(function() {
                _this.ingActive = true;
            }, 200);

            try {
                this.className = this.$route.query.type;

                if (this.className == "black") {
                    this.$store.commit("changeStyle", "black");
                } else {
                    this.$store.commit("changeStyle", "white");
                }
            } catch (e) {
                this.className = "white";
                this.$store.commit("changeStyle", "white");
            }
        },
        components: {}
    };
</script>

<style scoped lang='scss'>
    @import "../assets/scss/tool.scss";
    .modey {
        overflow: hidden;
        min-height: 100vh;
        position: relative;
        .set {
            position: absolute;
            right: 42.7px;
            bottom: 30px;
            z-index: 101;
        }
        .active-white {
            background: white;
        }
        .active-black {
            background: black;
        }
        .rihgtimgs {
            position: absolute;
            right: 0;
            bottom: 136px;
            width: 300px;
            height: 720px;
            overflow-y: scroll;
            text-align: center;
            z-index: 25;
            img,
            .initcolor {
                width: 250px;
                margin-top: 20px;
                cursor: pointer;
            }
            .initcolor {
                display: inline-block;
                background-color: #efefef;
                height: 140px;
                margin-top: 50px;
            }
        }
        .setimgwidth {
            width: 200px;
            height: 200px;
            float: left;
            span {
                display: inline-block;
                width: 75px;
                height: 40px;
                text-align: center;
                font-size: 14px;
                line-height: 40px;
                cursor: pointer;
                margin: 50px 0 0 20px;
            }
        }
        .setting {
            width: 300px;
            height: 137px;
            position: absolute;
            right: 0;
            bottom: 0;
            z-index: 100;
            opacity: .9;
            img {
                cursor: pointer;
            }
            .left {
                float: left;
                width: 70px;
                margin-left: 10px;
                img {
                    margin-right: 15px;
                    margin-top: 18px;
                }
            }
            .center {
                float: left;
                width: 100px;
                margin-left: 20px;
                .slider {
                    margin-top: 10px;
                }
                .titilefont,
                .contentfont {
                    display: inline-block;
                    width: 47%;
                    text-align: center;
                    margin-top: 5px;
                    border: 1px solid;
                    height: 26px;
                    line-height: 26px;
                    cursor: pointer;
                    position: relative;
                    box-sizing: border-box;
                    ul {
                        width: 100%;
                        position: absolute;
                        bottom: 26px;
                        left: 0;
                        border: 1px solid;
                        color: #999;
                        z-index: 10000;
                    }
                }
                .titilefont {
                    float: left;
                }
                .contentfont {
                    float: right;
                }
            }
            .right {
                float: left;
                width: 30px;
                margin-left: 40px;
                img {
                    margin-top: 20px;
                }
            }
        }
        .outbooks {
            height: 100%;
            position: relative;
            .images {
                width: 100%;
                height: 100%;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            a {
                display: inline-block;
                width: 40px;
                height: 40px;
                img {
                    margin: 0 auto;
                    vertical-align: middle;
                }
            }
            .sendimg {
                position: absolute;
                left: 0;
                bottom: 20px;
                text-align: center;
                width: 100%;
                height: 40px;
                line-height: 40px;
                a {
                    position: relative;
                }
                .linkimg {
                    margin-right: 20px;
                    cursor: pointer;
                }
                .rihgtdiv {
                    display: inline-block;
                    position: relative;
                }
                input {
                    width: 265px;
                    height: 38px;
                    position: absolute;
                    top: 0;
                    left: 42px;
                    padding-left: 10px;
                    display: none;
                    border: 1px solid #ccc;
                    border-left: none;
                }
                .files {
                    width: 40px;
                    height: 40px;
                    left: 46%;
                    top: 2px;
                    display: inline;
                    //    opacity: 0;
                    position: absolute;
                    cursor: pointer;
                    .el-upload {
                        display: inline-block;
                        width: 40px;
                        height: 40px;
                    }
                    i {
                        display: inline;
                        position: absolute;
                        width: 40px;
                        height: 40px;
                        top: 0;
                        left: -25px;
                    }
                    .el-icon-plus:before {
                        content: "";
                    }
                }
            }
        }
        &.white {
            background: #efefef;
        }
        &.black {
            background: #1b1b1b;
            .ing {
                color: #fff;
            }
            .box {
                background: #000 !important;
            }
            .module {
                background: #000;
                .moduleSelect {
                    .line {
                        [class^="m"] {
                            &:hover {
                                box-shadow: 0 5px 30px rgba(255, 255, 255, 0.3) !important;
                            }
                        }
                    }
                }
            }
        }
        .ing {
            /* width: 1200px; */
            @include automid;
            text-align: center;
            transition: transform 1s ease;
            opacity: 0;
            transform: translateY(-100px);
            &.active {
                opacity: 1;
                transform: translateY(0);
            }
            .big {
                font-size: 35px;
                font-weight: 600;
                margin-bottom: 32px;
                // word-wrap:break-word;
            }
            .sub {
                font-size: 20px;
                word-break: break-all;
                word-wrap: break-word;
            }
        }
        .row {
            width: 500px;
            height: 98px;
            .big {}
        }
        .col {
            width: 80px;
            height: 500px;
            position: relative;
            .big {
                width: 30px;
                float: right;
                position: absolute;
                right: 0;
            }
            .sub {
                width: 15px;
                float: left;
                position: absolute;
                left: 0;
            }
        }
        .module {
            width: 1354px;
            height: 747px;
            background: #ffffff;
            position: fixed;
            left: 50%;
            bottom: -610px;
            transform: translate3d(-50%, 0, 0);
            transition: all 1s ease-in-out;
            z-index: 10;
            &.active {
                transform: translate3d(-50%, -92%, 0);
            }
            .backset {
                margin: 20px;
                position: absolute;
                top: 0;
                right: 0;
                z-index: 5;
            }
            .down {
                width: 44px;
                height: 44px;
                margin: 47px auto 0;
                display: block;
                transition: all 1s ease-in-out;
                @include hand;
                &.active {
                    transform: rotate(180deg);
                    opacity: 0;
                }
            }
            .inner {
                width: 1040px;
                height: 28px;
                margin: 104px auto 0;
                text-align: center;
                opacity: 0;
                transition: all 1s linear;
                &.active {
                    opacity: 1;
                }
                .arw {
                    width: 100%;
                    height: 28px;
                    margin-bottom: 27px;
                    position: relative;
                    &:after {
                        content: "";
                        width: 100%;
                        height: 1px;
                        position: absolute;
                        top: 50%;
                        left: 0;
                        transform: translateY(-50%);
                        background: #e6e6e6;
                        z-index: -1;
                    }
                    .box {
                        width: 100px;
                        height: 28px;
                        margin: 0 auto;
                        background: #fff;
                        img {
                            height: 28px;
                            width: 23px;
                            display: block;
                            margin: 0 auto;
                        }
                    }
                }
                .moduleSelect {
                    width: 1040px;
                    height: 200px;
                    position: relative;
                    margin: 70px auto 0;
                    .line {
                        width: 100%;
                        position: relative;
                        [class^="m"] {
                            @include hand;
                            @include trans;
                            &:hover {
                                box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
                            }
                        }
                        .m2,
                        .m5 {
                            margin: 0 auto;
                            display: block;
                        }
                        .m1 {
                            position: absolute;
                            top: 0;
                            left: 0;
                        }
                        .m3 {
                            position: absolute;
                            top: 0;
                            right: 0;
                        }
                        .m4 {
                            position: absolute;
                            bottom: 0;
                            left: 0;
                        }
                        .m6 {
                            position: absolute;
                            bottom: 0;
                            right: 0;
                        }
                        &:last-child {
                            position: absolute;
                            left: 0;
                            bottom: 0;
                        }
                    }
                }
            }
        }
    }
</style>