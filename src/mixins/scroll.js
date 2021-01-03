import { throttle } from 'lodash'

function getScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
}

export default {
  data() {
    return {
      paper: {
        currentPage: 1,
        pageSize: 10
      },
      reachBottomDistance: 100, // 触底距离
      isReachBottom: false, // 是否到达触底区域
      lastScrollTop: 0, // 上一次 scrollTop
      isTotalLoaded: false, // 是否加载完全部数据
      lockScroll: false, // 加载中锁定滚动
      currentScrollTop: 0 // 用来做 没有更多数据 的显示判断，如果数据不满一屏，显示 没有更多数据 不太好
    }
  },
  
  created() {
    if (typeof this.query !== 'function') {
      throw new Error('Please declare the query method')
    }
    const _onScroll = throttle(this.onScroll, 50)
    window.addEventListener('scroll', _onScroll)
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('scroll', _onScroll)
    })
    this.query(this.paper)
  },

  methods: {
    onScroll() {
      this.currentScrollTop = getScrollTop()
      // 全部数据加载完成
      if (this.isTotalLoaded) {
        return
      }
      // 数据加载中
      if (this.lockScroll) {
        return
      }
      const viewH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      const totalH = document.documentElement.scrollHeight || document.body.scrollHeight
      const scrollT = this.lastScrollTop = getScrollTop()
      const currentH = viewH + scrollT + this.reachBottomDistance
      // 在 distance 区域外滚动，重置 isReachBottom
      if (currentH < totalH && this.isReachBottom) {
        this.isReachBottom = false
      }
      // 在 distance 区域内滚动，如果执行过 query 方法，直接返回
      if (this.isReachBottom) {
        return
      }
      if (currentH >= totalH) {
        this.onReachBottom()
      }
    },
    onReachBottom() {
      console.log('onReachBottom')
      this.lockScroll = true
      this.isReachBottom = true
      this.pager.currentPage += 1
      this.query(this.pager)
    },
    // 通过总数据条数结束
    endBySize(totalSize) {
      this.isTotalLoaded = this.paper.currentPage * this.paper.pageSize >= totalSize
      this.endScroll()
    },
    // 通过总页数结束
    endByPage(totalPage) {
      this.isTotalLoaded = this.paper.currentPage === totalPage
      this.endScroll()
    },
    endByList(currentLen) {
      this.isTotalLoaded = currentLen < this.paper.pageSize
      this.endScroll()
    },
    // 自定义方式，自己知道数据全部加载完成
    endSuccess(currentLen, totalLoaded) {
      if (typeof totalLoaded !== 'undefined') {
        this.isTotalLoaded = totalLoaded
      } else {
        this.isTotalLoaded = currentLen < this.paper.pageSize
      }
      this.endScroll()
    },
    endScroll() {
      this.$nextTick(() => {
        this.lockScroll = false
        this.isReachBottom = false
        // if (this.lastScrollTop !== getScrollTop()) {
        //   // window.scrollTo(0, this.scrollTop)
        //   document.documentElement.scrollTop = this.lastScrollTop
        // }
      })
    },
    // 在表单控件变化时调用
    changeQuery() {
      this.isTotalLoaded = false
      this.paper.currentPage = 1
      this.query(this.paper)
    }
  }
}
