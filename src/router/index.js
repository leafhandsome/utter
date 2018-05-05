import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Login'
// import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path:'/',
      component: resolve => require(['../page/Utter'],resolve)
    },
    {
      path:'/login',
      component: resolve => require(['../page/Login'],resolve)
    },
    {
      path:'/createtemplate',
      component: resolve => require(['../page/CreateTemplate'],resolve)
    },
    {
      path:'/modey',
      component: resolve => require(['../page/Modey'],resolve)
    },
    {
      path:'/modex',
      component: resolve => require(['../page/Modex'],resolve)
    },
    {
      path:'/myarticle',
      component: resolve => require(['../page/MyArticle'],resolve)
    },
    {
      path:'/articleinfo',
      component: resolve => require(['../page/ArticleInfo'],resolve)
    },
    {
      path:'/idea',
      component: resolve => require(['../page/Idea'],resolve)
    }
    // {
    //   path:'/index',
    //   component: resolve => require(['../page/Index'],resolve)
    // }
  ]
})
