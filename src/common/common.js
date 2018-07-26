import Vue from 'vue'
var methods = {
    upload(fileObj, url, data, callback) {
        // fileObj 传递的是 files[0] 对象，eg:fildObj = document.getElementById('file_pic').files[0]<br>var FILES = function(fileObj,url,callback,data){
        if (!fileObj) {
            alert('请选择发布文件');
            return;
        };
        var FileController = url; // 接收上传文件的后台地址   
        // FormData 对象
        var form = new FormData(); // 可以增加表单数据
        // 存入文件对象
        form.append("file", fileObj);
        // 其他描述参数解析
        if (data != '') {
            for (var key in data) {
                form.append(key, data[key]);
            };
        };
        // XMLHttpRequest 对象
        var xhr = new XMLHttpRequest();
        xhr.open("POST", FileController, true);
        xhr.onload = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // 查看后台反馈
                if (callback) {
                    var req = JSON.parse(xhr.responseText);
                    callback(req);
                };
            } else if (xhr.readyState == 4 && xhr.status == 404) {
                callback({ allow: 'error' });
                return;
            };
        };
        // xhr.upload.onprogress = function(evt) {
        //     //侦查附件上传情况 
        //     //通过事件对象侦查 
        //     //该匿名函数表达式大概0.05-0.1秒执行一次 
        //     //console.log(evt); 
        //     //console.log(evt.loaded);  //已经上传大小情况 
        //     //evt.total; 附件总大小 
        //     var loaded = evt.loaded;
        //     var tot = evt.total;
        //     var per = Math.floor(100 * loaded / tot);
        //     var son = document.getElementById('son');
        //     son.innerHTML = per + "%";
        //     son.style.width=per+"%"; 
        // }
        xhr.send(form);

    },
    unitAjax: function(type, url, data, success, failed, async = 'true') {
        var sign = '';
        // 创建ajax对象
        var xhr = null;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP')
        }
        var type = type.toUpperCase();

        // 用于清除缓存
        var random = Math.random();

        //获取用户id
        // data.userId = methods.getValue("userId") == null ? "" : methods.getValue("userId");
        //获取token
        // data.token = methods.getValue("token") == null ? "" : methods.getValue("token");


        if (typeof data == 'object') {

            if (type != 'POST') {

                if (data) {
                    let geturl = ''
                    for (let key in data) {
                        geturl = geturl + key + '=' + data[key] + '&';
                    }
                    geturl = geturl.substr(0, geturl.length - 1);
                    url = url + '?' + geturl
                    xhr.open(type, url, true);
                }
                xhr.send();

            } else if (type == 'POST') {
                xhr.open('POST', url, async);
                // 如果需要像 html 表单那样 POST 数据，请使用 setRequestHeader() 来添加 http 头。
                xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
                xhr.send(JSON.stringify(data));
            }

            // 处理返回数据
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        success(JSON.parse(xhr.responseText));
                        let code = JSON.parse(xhr.responseText).code;
                        if (code == 403) {
                            this.$message('请先设置笔名信息')
                            setTimeout(() => {
                                this.$router.push({ path: '/login', query: { penName: false } })
                            }, 2000);

                        } else if (code == 300) {
                            this.$message('登录过期')
                            setTimeout(() => {
                                this.$router.push({ path: '/login', query: { penName: true } })
                            }, 2000);
                        } else if (code == 304) {
                            // this.$message('登录超时')
                            // setTimeout(() => {
                            this.$router.push({ path: '/login', query: { penName: true } })
                                // }, 3000);
                        } else if (code == 203) {
                            this.$router.push({ path: '/forbid', query: { userId: this.$route.query.userId } })
                        }

                    } else {
                        if (failed) {
                            failed(xhr.status);
                        }
                    }
                }
            }
        }
    },
    //->设置
    setValue: function(options) {
        var _default = {
            name: null,
            value: null,
            expires: new Date(new Date().getTime() + (30 * 1000 * 60 * 60 * 24)),
            path: '/'
        };
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                _default[key] = options[key];
            }
        }
        // document.cookie = _default.name + "=" + escape(_default.value) + ";expires=" + _default.expires.toGMTString() + ";path=" + _default.path + ";domain=" + _default.domain;
        document.cookie = _default.name + "=" + escape(_default.value) + ";expires=" + _default.expires.toGMTString() + ";path=" + _default.path;

    },

    //->获取
    getValue: function(name) {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) {
            return unescape(arr[2]);
        }
        return null;

    },

    //->删除
    removeValue: function(options) {
        var _default = {
            name: null,
            path: '/'
        };
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                _default[key] = options[key];
            }

        }
        if (methods.getValue(_default.name)) {
            // document.cookie = _default.name + "= ;path=" + _default.path + ";domain=" + _default.domain + ";expires=Fri,02-Jan-1970 00:00:00 GMT";
            document.cookie = _default.name + "= ;path=" + _default.path + ";expires=Fri,02-Jan-1970 00:00:00 GMT";

        }

    },
    //清除所有
    clearAllCookie() {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (var i = keys.length; i--;)
                document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        }
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
    /**
     *
     * @param url 图片路径
     * @param ext 图片格式
     * @param callback 结果回调
     */
    getUrlBase64(url, ext, width, height, callback) {
        var canvas = document.createElement("canvas"); //创建canvas DOM元素
        var ctx = canvas.getContext("2d");
        var img = new Image;
        img.crossOrigin = 'Anonymous';
        img.src = url;
        img.onload = function() {
            canvas.width = width; //指定画板的宽度，自定义
            canvas.height = height; //指定画板的高度,自定义
            ctx.drawImage(img, 0, 0, width, height); //参数可自定义
            var dataURL = canvas.toDataURL("image/" + ext);
            callback.call(this, dataURL); //回掉函数获取Base64编码
            canvas = null;
        };
    },
    initUeditor(dome, flag) {

        this.editor = UE.getEditor("container", {
            toolbars: [],
            focus: true,
            initialFrameWidth: 984,
            initialFrameHeight: 734,
            autoHeightEnabled: false,
            enableAutoSave: true,
            saveInterval: 5000,
            wordCount: false,
            elementPathEnabled: false,
            scaleEnabled: flag
        });
        var editor = this.editor;
        this.editor.ready(function() {
            editor.setContent(dome);
        });
        return;
        setInterval(() => {
            let data = editor.execCommand("getlocaldata");
            console.log(data);

        }, 5000);
    },
}
export default methods;