const PULL_UPLOAD = {
  txt: {
    more: '加载中...',
    noMore: '我是有底线的'
  }
}
export default {
  data() {
    return {
      list: [],
      pager: {
        page: 1,
        size: 10
      },
      options: {
        scrollbar: true,
        pullDownRefresh: {
          txt: '更新成功'
        },
        pullUpLoad: PULL_UPLOAD
      },
      allLoaded: false,
      backtopOffset: 1000,
      backtopVisible: false
    }
  },
  mounted() {
    this.query()
  },
  methods: {
    getInstance() {
      return this.$refs.scrollContainer.scroll
    },
    refresh() {
      this.$refs.scrollContainer.refresh()
    },
    onScroll({ y }) {
      this.backtopVisible = Math.abs(y) >= this.backtopOffset
    },
    onBacktop() {
      this.$refs.scrollContainer.scrollTo(0, 0, 500)
    },
    // 下拉刷新
    onPullingDown() {
      this.allLoaded = false
      this.pager.page = 1
      this.query()
    },
    // 上拉加载更多
    onPullingUp() {
      if (this.allLoaded) {
        this.$refs.scrollContainer.forceUpdate(true, true)
        return
      }
      this.pager.page += 1
      this.query()
    },
    // 组件内部需要实现 query 查询数据方法
    query() {
      // ...
      // if (!this.firstQuery) {
      //   this.$refs.scrollContainer.disable()
      //   setTimeout(() => {
      //     this.$refs.scrollContainer.enable()
      //   }, 600)
      // }
      // if (this.firstQuery) {
      //   this.firstQuery = false
      // }
    },
    afterQuery(list, total) {
      if (this.pager.page === 1) {
        this.list = list
      } else {
        this.list = this.list.concat(list)
      }
      if (this.list.length === total) {
        this.allLoaded = true
        this.$refs.scrollContainer.forceUpdate(true, true)
      }
    }
  }
}
