import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import './plugins'
// the styles must be after the element-ui
import './assets/styles/index.less'
// if (process.env.NODE_ENV === 'development') {
//   new window.VConsole()
// }
document.body.addEventListener('ontouchmove', e => {
  e.preventDefault()
}, {
  passive: true
})
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
