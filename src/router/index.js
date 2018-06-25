import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Login'
// import Hello from '@/components/Hello'

Vue.use(Router)
export default new Router({

    linkActiveClass: 'active',
    // mode: 'history',
    routes: [{
            path: '/',
            component: resolve => require(['@/page/index'], resolve),
            redirect: '/index',
            children: [

                { path: '/index', component: resolve => require(['@/page/Utter'], resolve) },

            ]
        },
        //登录后个人首页
        {
            path: '/whiterow',
            component: resolve => require(['@/page/stylemode/whiterow.vue'], resolve),
            children: [{
                    path: 'modey',
                    component: resolve => require(['@/page/Modey'], resolve)
                }, {
                    path: 'myarticle',
                    component: resolve => require(['@/page/MyArticle'], resolve)
                },
                {
                    path: 'idea',
                    component: resolve => require(['@/page/Idea'], resolve)
                },
                {
                    path: 'publish',
                    component: resolve => require(['@/page/publish/Publish'], resolve),
                    name: '版本'
                },
                {
                    path: 'userinfo',
                    component: resolve => require(['@/page/userinfo/UserInfo'], resolve),
                    name: '用户信息'
                },
                // {
                //     path: 'bookinfo',
                //     component: resolve => require(['@/page/publish/BookInfo'], resolve),
                //     name: '出版书介绍'
                // },
            ]
        },
        //纵向
        {
            path: '/whitecol',
            component: resolve => require(['@/page/stylemode/whitecol.vue'], resolve),
            name: '白色col风格',
            children: [{
                    path: 'modex',
                    component: resolve => require(['@/page/Modex.vue'], resolve),
                    // name: 'Modex',
                }, {
                    path: 'myarticle',
                    component: resolve => require(['@/page/MyArticle'], resolve)
                },
                {
                    path: 'idea',
                    component: resolve => require(['@/page/Idea'], resolve)
                },
                {
                    path: 'publish',
                    component: resolve => require(['@/page/publish/Publish'], resolve),
                    // name: '版本'
                },
                {
                    path: 'userinfo',
                    component: resolve => require(['@/page/userinfo/UserInfo'], resolve),
                    // name: '用户信息'
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['@/page/Login'], resolve)
        },
        {
            path: '/createtemplate',
            component: resolve => require(['@/page/CreateTemplate'], resolve)
        },
        {
            path: '/read',
            component: resolve => require(['@/page/userinfo/readbook.vue'], resolve),
            name: 'readbook'
        },
        // {
        //     path: '/modex',
        //     component: resolve => require(['../page/Modex'], resolve)
        // },

        // {
        //     path: '/articleinfo',
        //     component: resolve => require(['../page/ArticleInfo'], resolve)
        // },


        // {
        //     path: '/apply',
        //     component: resolve => require(['../page/publish/Apply'], resolve),
        //     name: '申请资料填写'
        // },


        {
            path: '/forbid',
            component: resolve => require(['../page/Forbid'], resolve),
            name: '禁止访问'
        },
        {
            path: '/editor',
            component: resolve => require(['../components/EditTools.vue'], resolve),
            name: '编辑器'
        },
        // {
        //     path: '/personal',
        //     component: resolve => require(['../components/Personal'], resolve)
        // },
        // {
        //   path:'/index',
        //   component: resolve => require(['../page/Index'],resolve)
        // }

    ]
})