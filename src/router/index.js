import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../components/Home.vue'

Vue.use(Router)

export default new Router({
   routes: [
      {
         path: '/',
         redirect: '/login',
         name: '登录页',
         hidden: true,
         component: () => import('@/components/Login')
      },
      {
         path: '/login',
         name: 'Login',
         hidden: true,
         component: () => import('@/components/Login')
      },
      {
         path: '/admin/login',
         name: 'AdminLogin',
         hidden: true,
         component: () => import('@/components/AdminLogin')
      },
      {
         path: '/register',
         name: 'Register',
         hidden: true,
         component: () => import('@/components/register')
      },
      {
         path: '*',
         name: 'NotFound',
         hidden: true,
         component: () => import('@/components/NotFound')
      },
      {
         path: '/body/:aId',
         name: '文章详情页',
         hidden: true,
         component: () => import('@/components/index/Body')
      }
      ,
      {
         path: '/index',
         name: '首页列表',
         hidden: true,
         redirect: 'index/index',
         component: () => import('@/components/HomeIndex'),
         children: [
            {
               path: '/index/index',
               name: '首页',
               component: () => import('@/components/index/Index')
            },
         ]
      },

      {
         path: '/home',
         name: "人员管理",
         iconClass: 'fa fa-users',
         redirect: 'home/elder',
         component: () => import('@/components/Home'),
         children: [
            {
               path: '/home/elder',
               name: '老人列表',
               component: () => import('@/components/people/ElderList')
            },
            {
               path: '/home/relative',
               name: '亲属列表',
               component: () => import('@/components/people/RelativeList')
            },
            {
               path: '/home/employee',
               name: '劳工管理',
               component: () => import('@/components/people/EmployeeList')
            }
         ]
      },
      {
         path: '/home',
         name: "文章管理",
         iconClass: 'fa fa-th-list',
         component: () => import('@/components/Home'),
         children: [
            {
               path: '/home/article',
               name: '文章列表',
               component: () => import('@/components/article/ArticleList')
            },
            {
               path: '/home/moderation',
               name: '文章审核',
               component: () => import('@/components/article/ArticleModeration')
            },
            {
               path: '/home/common',
               name: '评论管理',
               component: () => import('@/components/article/CommonMent')
            },
            {
               path: '/home/carousel',
               name: '轮播图管理',
               component: () => import('@/components/article/CarouselMent')
            },
         ]
      },
      {
         path: '/home',
         name: "数据分析",
         iconClass: 'fa fa-bar-chart',
         component: () => import('@/components/Home'),
         children: [
            {
               path: '/home/dataView',
               name: '数据概览',
               iconClass: 'fa fa-line-chart',
               component: () => import('@/components/dataAnalysis/DataView')
            },
            {
               path: '/home/mapview',
               name: '地图概览',
               iconClass: 'fa fa-line-chart',
               component: () => import('@/components/dataAnalysis/MapView')
            },
            {
               path: '/home/score',
               name: '分数地图',
               iconClass: 'fa fa-line-chart',
               component: () => import('@/components/dataAnalysis/ScoreMap')
            },
            {
               path: '/home/travel',
               name: '旅游地图',
               iconClass: 'fa fa-line-chart',
               component: () => import('@/components/dataAnalysis/TravelMap')
            }
         ]
      },
      {
         path: '/users',
         name: "用户中心",
         iconClass: 'fa fa-user',
         component: () => import('@/components/Home'),
         children: [
            {
               path: '/users/user',
               name: '权限管理',
               iconClass: 'fa fa-user',
               component: () => import('@/components/users/User')
            },
         ]
      }
   ],
   mode: 'hash'
})
      // {
      //    path: '/home',
      //    // component:Home
      //    // component:() => import('@/components/Home') // 路由懒加载
      //    component: resolve => require(['@/components/Home'], resolve) //异步组件
      // }