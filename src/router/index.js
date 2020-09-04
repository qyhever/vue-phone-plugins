import Vue from 'vue'
import Router from 'vue-router'
// import BasicLayout from '@/layouts/basic-layout'

Vue.use(Router)
export default new Router({
  base: process.env.BASE_URL,
  mode: process.env.VUE_APP_HASH ? 'hash' : 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      name: 'home',
      path: '/home',
      component: () => import( /* webpackChunkName: "home" */ '@/views/home'),
      meta: {
        title: '首页'
      }
    },
    {
      name: 'record',
      path: '/record',
      component: () => import( /* webpackChunkName: "record" */ '@/views/record'),
      meta: {
        title: '订单'
      }
    },
    {
      name: 'search',
      path: '/search',
      component: () => import( /* webpackChunkName: "search" */ '@/views/search'),
      meta: {
        title: '搜索'
      }
    },
    {
      name: 'my',
      path: '/my',
      component: () => import( /* webpackChunkName: "my" */ '@/views/my'),
      meta: {
        title: '我的'
      }
    },
    {
      name: 'mescrollPage',
      path: '/mescroll-page',
      component: () => import( /* webpackChunkName: "mescroll-page" */ '@/views/mescroll-page'),
      meta: {
        title: 'mescroll-page'
      }
    },
    {
      name: 'cubeScroll',
      path: '/cube-scroll',
      component: () => import( /* webpackChunkName: "cube-scroll" */ '@/views/cube-scroll'),
      meta: {
        title: 'cube-scroll'
      }
    },
    {
      name: 'cubeScrollDetail',
      path: '/cube-scroll-detail',
      component: () => import( /* webpackChunkName: "cube-scroll-detail" */ '@/views/cube-scroll-detail'),
      meta: {
        title: 'cube-scroll-detail'
      }
    },
    {
      name: 'autofocus',
      path: '/autofocus',
      component: () => import( /* webpackChunkName: "autofocus" */ '@/views/autofocus'),
      meta: {
        title: 'autofocus'
      }
    },
    {
      name: 'bottomInput',
      path: '/bottom-input',
      component: () => import( /* webpackChunkName: "bottom-input" */ '@/views/bottom-input'),
      meta: {
        title: 'bottom-input'
      }
    },
    {
      name: 'uploader',
      path: '/uploader',
      component: () => import( /* webpackChunkName: "uploader" */ '@/views/uploader'),
      meta: {
        title: 'uploader'
      }
    },
    {
      name: 'inputmode',
      path: '/inputmode',
      component: () => import( /* webpackChunkName: "inputmode" */ '@/views/inputmode'),
      meta: {
        title: 'inputmode'
      }
    },
    {
      name: 'ait',
      path: '/ait',
      component: () => import( /* webpackChunkName: "ait" */ '@/views/ait'),
      meta: {
        title: 'ait'
      }
    },
    {
      name: 'multipleSelect',
      path: '/multiple-select',
      component: () => import( /* webpackChunkName: "multiple-select" */ '@/views/multiple-select'),
      meta: {
        title: 'multiple-select'
      }
    },
    {
      name: 'areaPicker',
      path: '/area-picker',
      component: () => import( /* webpackChunkName: "area-picker" */ '@/views/area-picker'),
      meta: {
        title: 'area-picker'
      }
    },
    {
      name: 'swiper',
      path: '/swiper',
      component: () => import( /* webpackChunkName: "swiper" */ '@/views/swiper'),
      meta: {
        title: 'swiper'
      }
    },
    {
      name: 'charts',
      path: '/charts',
      component: () => import( /* webpackChunkName: "charts" */ '@/views/charts'),
      meta: {
        title: 'charts'
      }
    },
    {
      name: 'f2chart',
      path: '/f2chart',
      component: () => import( /* webpackChunkName: "f2chart" */ '@/views/f2chart'),
      meta: {
        title: 'f2chart'
      }
    }
  ]
})
