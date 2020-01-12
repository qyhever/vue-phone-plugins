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
      path: '/mescroll',
      component: BasicLayout,
      children: [
        {
          name: 'mescroll',
          path: '',
          meta: {
            title: 'mescroll'
          },
          component: () => import( /* webpackChunkName: "mescroll" */ '@/views/mescroll')
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
    }
  ]
})
