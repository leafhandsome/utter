<template lang="html">
    <div class="apply" :class="$route.query.type=='black'?'ut-input-black':'ut-input-white'">
        <div class="input__item">
            <input type="text"  placeholder="真实姓名" v-model="name" :maxlength="6"  @focus="err.name=''" @blur="namebl">
            <p class="err"  v-text="err.name">*错误提示</p>
        </div>
        <div class="input__item">
            <input type="text"  placeholder="联系手机" v-model="mobile" @focus="err.mobile=''" :maxlength="11"  @blur="mobilebl"> 
            <p class="err"  v-text="err.mobile">*错误提示</p>
        </div>
        <div class="input__item">
            <input type="text" placeholder="常用邮箱" v-model="email" @focus="err.email=''" :maxlength="26" @blur="emailbl">
            <p class="err"  v-text="err.email">*错误提示</p>
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
            <input type="text" placeholder="个人介绍" v-model="personal">
        </div>
        <div class="textarea">
            <div class="textarea__hint">正式出版的书籍（此处为选填加分项）
                <br>请填写书名、作者名，出版社，出版时间。可附作品链接。
                <br>实例：</div>
            <textarea :class="$route.query.type=='black'?'ut-black1':'ut-white1'" name="" id="" cols="30" rows="10"
            v-model="publishBookInfo"></textarea>
        </div>
        <div class="textarea">
            <div class="textarea__hint">已发表的文章
                <br>请填写您在任何报刊杂志或网络上公开发表的作品，并附上相关链接。
             </div>
            <textarea  :class="$route.query.type=='black'?'ut-black1':'ut-white1'" name="" id="" cols="30" rows="10"
            v-model="publishArticle"></textarea>
        </div>
        <div class="agreement">
                <textarea  :class="$route.query.type=='black'?'ut-black1':'ut-white1'" name="" id="" cols="30" rows="10" v-model="agreement" readonly></textarea>
        </div>
        <div class="checkagree"><input type="checkbox" v-model="check" @click="checkbox">我以阅读并接受以上协议 </div>
        <div class=""><a class="submitbtn" href="javaScript:;" @click="submitfun"> 确认提交</a> </div>
    </div>
</template>
<script>
    export default {

        data() {
            return {
                Idcard: 0,
                imgcard1: '',
                imgcard2: '',
                agreement: this.$store.state.arguments,
                err: {
                    name: '',
                    mobile: '',
                    email: '',
                },
                name: '',
                mobile: '',
                email: '',
                personal: '',
                publishBookInfo: '',
                publishArticle: '',
                check: "",
            }
        },
        computed: {
            arguments() {
                return this.$store.state.arguments
            }
        },
        methods: {
            checkbox() {
                this.check = !this.check;
                console.log(this.check)
            },

            //提交
            submitfun() {


                this.getUrlBase64(this.imgcard1, "png", function(base64) {
                    console.log(base64); //base64编码值
                });
                if (/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.mobile) && /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.email) &&
                    /[\u4E00-\u9FA5]/.test(this.name)) {
                    if (this.check) {
                        let params = {
                            fullName: this.name, //   string	是	姓名		
                            mobile: this.mobile, //string	是	手机号码		
                            email: this.email, //string	是	邮箱地址		
                            idCardFront: this.imgcard1, //string	是	正面身份证地址		
                            idCardBack: this.imgcard2, //string	是	反面身份证地址		
                            personalIntroduction: this.personal, //string	是	个人介绍		
                            publishBookInfo: this.publishBookInfo, //string	是	出版书籍信息		
                            publishArticle: this.publishArticle, //string	是	出版作品		
                            agreement: this.agreement, //string	是	协议内容		
                            checkTheAgreement: this.check, //boolean	是	是否同意协议
                        }
                        this.unitAjax('post', "v1/book/publish/applyForAuthor", params, res => {
                            if (res.code == 200) {
                                this.$message('提交成功,请耐心等待审核')
                                this.$store.commit('showbox', false)
                                window.scrollTo(0, 0);
                            }
                        })
                    } else {
                        this.$message('请先同意阅读协议')
                    }
                } else {
                    if (!/[\u4E00-\u9FA5]/.test(this.name)) {
                        this.err.name = "请填写真实姓名"
                    } else if (!/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.mobile)) {
                        this.err.mobile = '手机号码不正确'
                    } else if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.email)) {
                        this.err.email = '请填写正确的邮箱地址'
                    }
                }

            },
            namebl() {
                if (!/[\u4E00-\u9FA5]/.test(this.name)) {
                    this.err.name = "请填写真实姓名"
                }
            },
            mobilebl() {
                if (!/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.mobile)) {
                    this.err.mobile = '手机号码不正确'
                }
            },
            emailbl() {
                if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.email)) {
                    this.err.email = '请填写正确的邮箱地址'
                }
            },
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
                        if (file.size / 1024 / 1024 < 3) {
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
                            this.$message.error("图片大于3M,请更换一张");
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
        position: relative;
        .err {
            position: absolute;
            top: 0;
            right: -415px;
            height: 100%;
            width: 400px;
            line-height: 58px;
            color: red;
        }
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
        padding: 5px 20px;
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