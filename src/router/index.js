import Vue from 'vue'
import Router from 'vue-router'
import BasicLayout from '@/layouts/basic-layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: BasicLayout,
      children: [
        {
          name: 'home',
          path: '',
          component: () => import( /* webpackChunkName: "home" */ '@/views/home')
        }
      ]
    },
    {
      path: '/mescroll-page',
      component: BasicLayout,
      children: [
        {
          name: 'mescrollPage',
          path: '',
          meta: {
            title: 'mescroll-page'
          },
          component: () => import( /* webpackChunkName: "mescroll-page" */ '@/views/mescroll-page')
        }
      ]
    },
    {
      path: '/cube-scroll',
      component: BasicLayout,
      children: [
        {
          name: 'cubeScroll',
          path: '',
          meta: {
            title: 'cube-scroll'
          },
          component: () => import( /* webpackChunkName: "cube-scroll" */ '@/views/cube-scroll')
        }
      ]
    },
    {
      path: '/autofocus',
      component: BasicLayout,
      children: [
        {
          name: 'autofocus',
          path: '',
          meta: {
            title: 'autofocus'
          },
          component: () => import( /* webpackChunkName: "autofocus" */ '@/views/autofocus')
        }
      ]
    },
    {
      path: '/bottom-input',
      component: BasicLayout,
      children: [
        {
          name: 'bottomInput',
          path: '',
          meta: {
            title: 'bottom-input'
          },
          component: () => import( /* webpackChunkName: "bottom-input" */ '@/views/bottom-input')
        }
      ]
    },
    {
      path: '/uploader',
      component: BasicLayout,
      children: [
        {
          name: 'uploader',
          path: '',
          meta: {
            title: 'uploader'
          },
          component: () => import( /* webpackChunkName: "uploader" */ '@/views/uploader')
        }
      ]
    },
    {
      path: '/inputmode',
      component: BasicLayout,
      children: [
        {
          name: 'inputmode',
          path: '',
          meta: {
            title: 'inputmode'
          },
          component: () => import( /* webpackChunkName: "inputmode" */ '@/views/inputmode')
        }
      ]
    },
    {
      path: '/ait',
      component: BasicLayout,
      children: [
        {
          name: 'ait',
          path: '',
          meta: {
            title: 'ait'
          },
          component: () => import( /* webpackChunkName: "ait" */ '@/views/ait')
        }
      ]
    }
  ]
})
