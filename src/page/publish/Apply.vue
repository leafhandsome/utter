<template lang="html">
    <div class="apply">
        <div class="input__item">
            <input type="text" id="name" placeholder="真实姓名">
        </div>
        <div class="input__item">
            <input type="text" id="name" placeholder="联系手机">
        </div>
        <div class="input__item">
            <input type="text" id="name" placeholder="常用邮箱">
        </div>
        <div class="upload">
            <div class="upload__item">
                <span>身份证正面照片
                    <br>(带有头像照片)</span>
            </div>
            <div class="upload__item">
                <span>身份证反面照片
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
            <textarea name="" id="" cols="30" rows="10"></textarea>
        </div>
        <div class="textarea">
            <div class="textarea__hint">已发表的文章
                <br>请填写您在任何报刊杂志或网络上公开发表的作品，并附上相关链接。
             </div>
            <textarea name="" id="" cols="30" rows="10"></textarea>
        </div>
        <div class="agreement">
            协议
        </div>
        <div class="checkagree"><input type="checkbox">我以阅读并接受以上协议 </div>
        <div class="submitbtn">确认提交</div>
    </div>
</template>
<script>
    export default {

        data() {
            return {

            }
        },
        methods: {
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
        padding-bottom: 28px;
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
       
        height: 60px;
        width: 250px;
        border: 1px solid #000;
        margin-bottom: 28px;
        input{
             padding-left: 20px;
        }
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
        span {
            display: block;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
        }
    }

    .input__intro {
        padding: 20px;
        width: 100%;
        border: 1px solid #000;

        margin-bottom: 28px;

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
        textarea{
            margin-top: 14px;
        }
    }
    .textarea__hint{
        /* position: absolute;
        top:20px;
        left:20px; */
    }
    .agreement{
        padding: 20px;
        width: 100%;
        border: 1px solid #000;
        height: 175px;
        margin-bottom:14px;
    }
    .checkagree{
        input[type='checkbox']{
            width: 14px;
            height: 14px;
            border: 1px solid #ccc;
            background: #fff;
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