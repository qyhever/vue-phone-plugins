import Vue from 'vue'
import MescrollVue from 'mescroll.js/mescroll'
import VueLazyload from 'vue-lazyload'
import FastClick from 'fastclick'
Vue.component('mescroll', MescrollVue)
//  hack the active pseudo-classes failure caused by -webkit-overflow-scrolling touch
FastClick.attach(document.body)
Vue.use(VueLazyload, {
  loading: require('@/assets/images/loading.gif')
})
import './vant'
import './cube'
import './constant'
import './method'
import './component'
