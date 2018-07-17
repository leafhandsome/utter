// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router/index'
import axios from 'axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './assets/css/base.css'
Vue.use(ElementUI)
Vue.use(Vuex)

//methods.js导入自定义方法(/变量)用于全局方法
import methods from './common/common.js';
//方法挂靠全局
Object.keys(methods).forEach((key) => {
    Vue.prototype[key] = methods[key];
})
import message from './common/tool.js'
Vue.prototype.$message = message;
axios.defaults.headers.post['Content-Type'] = 'application/json;charse=UTF-8'
const store = new Vuex.Store({
    state: {
        utstyle: 'white',
        showHeader: true,
        showFooter: true,
        useType: '',
        prevModule: null,
        articleText: null,
        showapply: false,
        bookid: 0,
        bookInfo: null,
        bookbuylist: [],
        commentList: [],
        arguments: '',
    },
    mutations: {
        changeStyle(state, data) {
            if (data) {
                state.utstyle = data;
                return;
            }
            state.utstyle = state.utstyle == 'white' ? 'black' : 'white';
        },
        changeFooter(state, data) {
            state.showFooter = data;
        },
        changeHeader(state, data) {
            state.showHeader = data;
        },
        changeType(state, data) {
            state.useType = data;
        },
        articleText(state, data) {
            state.articleText = data;
        },
        showbox(state, data) {
            state.showapply = data
        },
        getbookId(state, data) {
            state.bookid = data
            methods.unitAjax('get', 'v1/book/bookDetail', {
                bookId: state.bookid
            }, res => {
                if (res.code == 200) {
                    state.bookInfo = res.data
                }
            })
        },
        getbookBuy(state, data) {
            state.bookid = data
            methods.unitAjax('get', 'v1/book/booklist/list', {
                page: 1,
                pageSize: 10,
                userId: methods.getValue('userId')
            }, res => {
                if (res.code == 200) {
                    state.bookbuylist = res.data
                }
            })
        },
        //获取协议
        getagreement(state, data) {
            methods.unitAjax('get', 'v1/agreement', { type: data }, res => {
                if (res.code == 200) {
                    state.arguments = res.data
                }
            })
        },
        //获取评论列表
        getlist(state, data) {
            let params = {
                page: 1,
                pageSize: 50,
                bookId: data
            }
            methods.unitAjax('get', 'v1/book/comment/list', params, res => {
                if (res.code == 200) {
                    state.commentList = res.data.rows
                    console.log(state.commentList)
                }
            })
        },
    }
});
// router.afterEach((to, from, next) => {
//     window.scrollTo(0, 0);
// });
Vue.prototype.$store = store;
Vue.prototype.$http = axios;


Vue.config.productionTip = false

window.tools = {};
window.tools.vue = Vue;
window.tools.router = router;

/* eslint-disable no-new */
window.vm = new Vue({
    el: '#app',
    render: h => h(App),
    router,
    template: '<App/>',
    components: { App }
})