<template lang="html">
    <div class="apply" :class="$route.query.type=='black'?'ut-input-black':'ut-input-white'">
        <div class="input__item">
            <input type="text" id="name" placeholder="真实姓名">
        </div>
        <div class="input__item">
            <input type="text" id="name" placeholder="联系手机">
        </div>
        <div class="input__item">
            <input type="text" id="name" placeholder="常用邮箱">
        </div>
        <input type='file' id='file' class="files" ref='Idcard' @change='changeImg' style='width:0;height:0;position:fixed;top:-2000px;'>
        <div class="upload">
            <div class="upload__item"  @click="getIdcard(1)">
                <img :src="imgcard1" alt="身份证" v-show="imgcard1">
                <span v-show="!imgcard1">身份证正面照片
                    <br>(带有头像照片)</span>
            </div>
            <div class="upload__item" @click="getIdcard(2)">
                    <img :src="imgcard2" alt="身份证"  v-show="imgcard2">
                <span v-show="!imgcard2">身份证反面照片
                    <br>(带有头像照片)</span>
            </div>
        </div>
        <div class="hint">上传文件要求为扫码件或清晰照片；图片格式为jpg、png，大小不超过3M。</div>
        <div class="input__intro">
            <input type="text" placeholder="个人介绍">
        </div>
        <div class="textarea">
            <div class="textarea__hint">正式出版的书籍（此处为选填加分项）
                <br>请填写书名、作者名，出版社，出版时间。可附作品链接。
                <br>实例：</div>
            <textarea :class="$route.query.type=='black'?'ut-black1':'ut-white1'" name="" id="" cols="30" rows="10"></textarea>
        </div>
        <div class="textarea">
            <div class="textarea__hint">已发表的文章
                <br>请填写您在任何报刊杂志或网络上公开发表的作品，并附上相关链接。
             </div>
            <textarea  :class="$route.query.type=='black'?'ut-black1':'ut-white1'" name="" id="" cols="30" rows="10"></textarea>
        </div>
        <div class="agreement">
            协议
        </div>
        <div class="checkagree"><input type="checkbox">我以阅读并接受以上协议 </div>
        <div class=""><a class="submitbtn" href="javaScript:;"> 确认提交</a> </div>
    </div>
</template>
<script>
    export default {

        data() {
            return {
                Idcard: 0,
                imgcard1: '',
                imgcard2: '',
            }
        },
        methods: {
            getIdcard(value) {
                this.$refs.Idcard.click()
                if (value == 1) {
                    this.Idcard = 1;
                } else {
                    this.Idcard = 2;
                }
            },
            changeImg(e) {
                //图片change回调
                var file = e.target.files[0];
                // debugger
                try {
                    if (file.type.indexOf("image") >= 0) {
                        //是图片文件
                        if (file.size / 1024 / 1024 < 5) {
                            //图片小于5M
                            var url = this.getFileUrl(file);
                            if (url) {
                                if (this.Idcard == 1) {
                                    this.imgcard1 = url;
                                } else {
                                    this.imgcard2 = url;
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
                    // this.$message.error("请选择图片文件");
                }
            },
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
    @import '../../assets/scss/tool.scss';
    .apply {
        width: 610px;
        margin: 0 auto;
        margin-top: 140px;
        padding-bottom: 108px;
    }
    
    .hint {
        color: #666;
        margin: 12px 0 28px 0;
    }
    
    input,
    textarea {
        padding: 0;
        border: none;
        color: #666;
        font-weight: bold;
        width: 100%;
        height: 100%;
    }
    
    .input__item {
        padding-left: 20px;
        height: 60px;
        width: 250px;
        border: 1px solid #000;
        margin-bottom: 28px;
        input {}
    }
    
    .upload {
        overflow: hidden;
    }
    
    .upload__item {
        width: 290px;
        height: 180px;
        text-align: center;
        float: left;
        border: 1px solid #000;
        color: #666;
        img {
            width: 290px;
            height: 180px;
        }
        span {
            display: block;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
        }
    }
    
    .input__intro {
        padding-left: 20px;
        height: 60px;
        width: 100%;
        border: 1px solid #000;
        margin-bottom: 28px;
        cursor: pointer;
        input {
            height: 100%;
        }
    }
    
    .upload__item:nth-child(2) {
        margin-left: 30px;
    }
    
    .textarea {
        padding: 20px;
        width: 100%;
        border: 1px solid #000;
        margin-bottom: 28px;
        overflow: hidden;
        color: #666;
        position: relative;
        textarea {
            margin-top: 14px;
        }
    }
    
    .textarea__hint {
        /* position: absolute;
        top:20px;
        left:20px; */
    }
    
    .agreement {
        padding: 20px;
        width: 100%;
        border: 1px solid #000;
        height: 175px;
        margin-bottom: 14px;
    }
    
    .checkagree {
        input[type='checkbox'] {
            width: 14px;
            height: 14px;
            border: 1px solid #ccc;
            // background: #fff;
            vertical-align: middle;
            cursor: pointer;
        }
    }
    
    .submitbtn {
        width: 290px;
        height: 56px;
        line-height: 56px;
        background: #000000;
        color: #ffffff;
        text-align: center;
        margin-top: 14px;
        float: right;
    }
</style>