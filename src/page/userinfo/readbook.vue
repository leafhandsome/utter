<template>
  <div class="container" :class="readcolor=='white'?'ut-white1':'ut-black1'" @click="showmore=false">
    <div class="tree fl">
      <a href="javaScript:;">
      <img v-show="readcolor=='white'" class="navimg " src="../../assets/images/editor/175 创作区-目录.png" alt="" @click="getnvetree">
      <img v-show="readcolor=='black'" class="navimg " src="../../assets/images/editor/192 创作区-目录-白.png" alt="" @click="getnvetree">
      </a>
      <el-tree v-show="showTree" :class="readcolor=='white'?'ut-white1':'ut-black1'" class="nav-tree" :data="data" :props="defaultProps" @node-click="handleNodeClick"  node-key="id"
  :default-expand-all="true"></el-tree>
  </div>
  <div class="back fr" @click="$router.go(-1)">
   <a href="javascript:;"><img src="../../assets//images//editor/backa.png" alt=""></a>
  </div>
  <div class="content">
      <h3>写下你的一生</h3>
      <div class="reader-content">
        心的角落，没有垃圾桶怎么容下她微尘。<br>
        心的角落，没有垃圾桶怎么容下她微尘。<br>
        心的角落，没有垃圾桶怎么容下她微尘。<br>
        心的角落，没有垃圾桶怎么容下她微尘。<br>
      </div>
      <div class="reader-content">
         心的角落，没有垃圾桶怎么容下她微尘。 心的角落，没有垃圾桶怎么容下她微尘。 心的角落，没有垃圾桶怎么容下她微尘。 心的角落，没有垃圾桶怎么容下她微尘。 心的角落，没有垃圾桶怎么容下她微尘。
      </div>
  </div>
      <div class="footer">
         <div class="innerbox clearfix">
              <div class="pull-left">
                <span>0</span>  <!-- <img v-show="" src="../assets/images/article/prev.png" alt="上一页"> -->
          <img v-show="readcolor=='white'" src="../../assets/images/article/prev-black.png" alt="上一页">
          <img  v-show="readcolor=='black'" src="../../assets/images/article/prev-w.png" alt="上一页">
              </div>
              <a href='javaScript:;'  @click.stop="showmore=true">
              <img v-show="readcolor=='white'" class="more" src="../../assets/images/article/more.png" alt="" @click.stop="showmore=true">
              <img v-show="readcolor=='black'" class="more" src="../../assets/images/article/more-w.png" alt="" @click.stop="showmore=true">
              </a>
              <div class="pull-right" v-show="readcolor=='white'">
                <img src="../../assets/images/article/next.png" alt="下一页"><span>1</span>
              </div>
               <div class="pull-right" v-show="readcolor=='black'">
                <img src="../../assets/images/article/next-w.png" alt="下一页"><span>1</span>
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
                data: [{
                    label: "一级 1",
                    children: [{
                        label: "二级 1-1",
                        children: [{
                            label: "三级 1-1-1"
                        }]
                    }]
                }, {
                    label: "一级 2",
                    children: [{
                        label: "二级 2-1",
                        children: [{
                            label: "三级 2-1-1"
                        }]
                    }, {
                        label: "二级 2-2",
                        children: [{
                            label: "三级 2-2-1"
                        }]
                    }]
                }, {
                    label: "一级 3",
                    children: [{
                        label: "二级 3-1",
                        children: [{
                            label: "三级 3-1-1"
                        }]
                    }, {
                        label: "二级 3-2",
                        children: [{
                            label: "三级 3-2-1"
                        }]
                    }]
                }],
                defaultProps: {
                    children: "children",
                    label: "label"
                },
                showTree: false,
                showmore: false,
                readcolor: 'white'
            };
        },
        created() {
            this.readcolor = this.$route.query.type;
        },
        methods: {
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
            width: 300px;
            margin: 100px 0 0 50px;
            .navimg {}
            .nav-tree {}
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