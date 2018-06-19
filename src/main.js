// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './assets/css/base.css'
Vue.use(ElementUI)
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        utstyle: 'white',
        showHeader: true,
        showFooter: true,
        useType: '',
        prevModule: null
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
        }
    }
});
// router.afterEach((to, from, next) => {
//     window.scrollTo(0, 0);
// });
Vue.prototype.$store = store;

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