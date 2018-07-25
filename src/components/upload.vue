<template>
    <div>
        <div class="oss_file">
            <input type="file" :id="id" :multiple="multiple" @change="doUpload"/>
        </div>
        <div @click="getimg">上传</div>
    </div>
</div>
</template>
<script>
    export default {
        props: {
            multiple: {
                type: Boolean,
                twoWay: false
            },
            id: {
                type: String,
                twoWay: false
            },
            url: {
                type: Array,
                twoWay: true
            }
        },
        data() {
            return {
                region: 'Your oss Region',
                bucket: 'Bucket Name',
                signature: '',
                expire: '',
                accessid: "",
                host: ""
            };
        },
        methods: {
            // signatureUrl(name, options) {
            //     options = options || {};
            //     name = this._objectName(name);
            //     options.method = options.method || 'GET';
            //     const expires = utility.timestamp() + (options.expires || 1800);
            //     const params = {
            //         bucket: this.options.bucket,
            //         object: name,
            //     };

            //     const resource = this._getResource(params);

            //     if (this.options.stsToken) {
            //         options['security-token'] = this.options.stsToken;
            //     }

            //     const signRes = signHelper._signatureForURL(this.options.accessKeySecret, options, resource, expires);

            //     const url = urlutil.parse(this._getReqUrl(params));
            //     url.query = {
            //         OSSAccessKeyId: this.options.accessKeyId,
            //         Expires: expires,
            //         Signature: signRes.Signature,
            //     };

            //     copy(signRes.subResource).to(url.query);

            //     return url.format();
            // },
            getimg() {
                console.log(this.host)
                this.unitAjax('get', '/rep' + this.host, {
                    OSSAccessKeyId: this.accessid,
                    Expires: this.expire,
                    Signature: this.signature
                }, res => {
                    console.log(res)
                })
            },
            doUpload() {
                const _this = this;
                // this.unitAjax.get('/alioss/getOssToken').then((result) => {
                this.unitAjax('post', 'v1/upload/generateUploadInfo', {
                    userId: Number(this.getValue('userId'))
                }, res => {
                    this.accessid = res.data.accessid;
                    this.expire = res.data.expire;
                    this.signature = res.data.signature;
                    this.host = res.data.host;
                    console.log(this.host)
                })

                // this.unitAjax('post', 'v1/upload/generateUploadInfo', {
                //     userId: Number(this.getValue('userId'))
                // }, res => {
                //     this.unitAjax('get', res.host, {
                //             accessKeyId: res.accessid,
                //             Expires: res.expire,
                //             Signature: res.signature
                //         }, result => {
                //             console.log(result)
                //         })
                //         // this.signatureUrl()
                //     const client = new OSS.Wrapper({
                //         region: _this.region,
                //         accessKeyId: res.accessid,
                //         accessKeySecret: res.signature || result.data.token.AccessKeySecret,
                //         stsToken: res.policy || result.data.token.SecurityToken,
                //         bucket: res.dir
                //     })
                //     const files = document.getElementById(_this.id);
                //     if (files.files) {
                //         const fileLen = document.getElementById(_this.id).files
                //         const resultUpload = [];
                //         for (let i = 0; i < fileLen.length; i++) {
                //             const file = fileLen[i];
                //             const storeAs = file.name;
                //             client.multipartUpload(storeAs, file, {

                //             }).then((results) => {
                //                 if (results.url) {
                //                     resultUpload.push(results.url);
                //                 }
                //             }).catch((err) => {
                //                 console.log(err);
                //             });
                //         }
                //         _this.url = resultUpload;
                //     }
                // });
            }
        }
    };
</script>
<style type="text/css">
    .oss_file {
        height: 100px;
        width: 100%;
    }
    
    .oss_file input {
        right: 0;
        top: 0;
        opacity: 0;
        filter: alpha(opacity=0);
        cursor: pointer;
        width: 100%;
        height: 100%;
    }
</style>