import Vue from 'vue'
import Router from 'vue-router'
// import BasicLayout from '@/layouts/basic-layout'

Vue.use(Router)
export default new Router({
  base: '/vue-phone-plugins/',
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
        title: '首页',
        leftArrowHidden: true
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
    }
  ]
})
