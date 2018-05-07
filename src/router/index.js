import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Login'
// import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: resolve => require(['../page/Utter'], resolve)
    },
    {
      path: '/login',
      component: resolve => require(['../page/Login'], resolve)
    },
    {
      path: '/createtemplate',
      component: resolve => require(['../page/CreateTemplate'], resolve)
    },
    {
      path: '/modey',
      component: resolve => require(['../page/Modey'], resolve)
    },
    {
      path: '/modex',
      component: resolve => require(['../page/Modex'], resolve)
    },
    {
      path: '/myarticle',
      component: resolve => require(['../page/MyArticle'], resolve)
    },
    {
      path: '/articleinfo',
      component: resolve => require(['../page/ArticleInfo'], resolve)
    },
    {
      path: '/idea',
      component: resolve => require(['../page/Idea'], resolve)
    },
    {
      path: '/publish',
      component: resolve => require(['../page/publish/Publish'], resolve),
      name: '版本'
    },
    {
      path: '/apply',
      component: resolve => require(['../page/publish/Apply'], resolve),
      name: '申请资料填写'
    },
    {
      path: '/bookinfo',
      component: resolve => require(['../page/publish/BookInfo'], resolve),
      name: '出版书介绍'
    },
    {
      path: '/userinfo',
      component: resolve => require(['../page/userinfo/UserInfo'], resolve),
      name: '用户信息'
    },
    {
      path: '/forbid',
      component: resolve => require(['../page/Forbid'], resolve),
      name: '禁止访问'
    },
    {
      path: '/personal',
      component: resolve => require(['../components/Personal'], resolve)
    },
    // {
    //   path:'/index',
    //   component: resolve => require(['../page/Index'],resolve)
    // }
  ]
})
