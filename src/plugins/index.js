import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import FastClick from 'fastclick'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)

//  hack the active pseudo-classes failure caused by -webkit-overflow-scrolling touch
FastClick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('@/assets/images/loading2.gif')
})

import './vant'
import './cube'
import './constant'
import './method'
import './component'
