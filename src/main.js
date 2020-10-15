import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import './assets/icons'
import './plugins'
import './assets/styles/index.less'
// if (process.env.NODE_ENV === 'development') {
//   new window.VConsole()
// }
if (process.env.NODE_ENV !== 'development') {
  console.log(navigator.userAgent)
  console.log(`last delopy: %c${process.env.NOW}`, 'color: #67C23A')
}
// document.body.addEventListener('ontouchmove', e => {
//   e.preventDefault()
// }, {
//   passive: true
// })
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
