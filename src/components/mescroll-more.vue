<template>
  <mescroll
    ref="mescroll"
    :down="mescrollDown"
    :up="mescrollUp"
    @init="mescrollInit">
    <slot :list="list"></slot>
    <div id="empty"></div>
  </mescroll>
</template>

<script>
  import { easeout, addClass, removeClass } from '@/utils'
  export default {
    props: {
      fetchData: {
        type: Function,
        required: true
      },
      params: {
        type: Object,
        defatul: () => ({})
      }
    },
    data() {
      this.mescroll = null
      this.backTopDom = null
      return {
        list: [],
        mescrollDown: {
          mustToTop: true
        },
        mescrollUp: {
          isBounce: false,
          callback: this.upCallback,
          htmlNodata: `<div class="weui-loadmore weui-loadmore_line" style="background-color: #fff">
                        <span class="weui-loadmore__tips">我是有底线的</span>
                      </div>`,
          // toTop: {
          //   src: require('@/assets/images/back-top.png'),
          //   duration: 500
          // },
          empty: {
            // 必须给一个 容器 ID
            warpId: 'empty',
            icon: require('@/assets/images/empty.png'),
            tip: '暂无数据'
          },
          lazyLoad: {
            use: true,
            attr: 'data-src'
          },
          onScroll: this.onScroll
        },
        backTopVisible: false
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.createBackTop()
      })
    },
    methods: {
      mescrollInit(mescroll) {
        this.mescroll = mescroll
      },
      upCallback(pager, mescroll) {
        this.$loading.open()
        this.fetchData({
          page: pager.num,
          count: pager.size
        })
        .then(list => {
          if (pager.num === 1) {
            this.list = list
            if (!list.length) {
              // 没有数据，锁定下拉刷新
              this.mescroll.lockDownScroll(true)
            }
          } else {
            this.list = this.list.concat(list)
          }
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endSuccess(list.length)
          })
        })
        .catch(() => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态
          mescroll.endErr()
        })
        .finally(() => {
          this.$loading.close()
        })
      },
      // 重新查询，用于列表筛选条件变化或切换菜单时重新刷新列表数据
      research() {
        this.mescroll.resetUpScroll(true)
      },
      onScroll(_, y) {
        if (y >= 1000) {
          addClass(this.backTopDom, 'show')
        } else {
          removeClass(this.backTopDom, 'show')
        }
      },
      // 创建 返回顶部 按钮
      createBackTop() {
        const scrollDom = document.querySelector('.mescroll')
        const backTopDom = document.createElement('div')
        backTopDom.className = 'back-top'
        const imgDom = document.createElement('img')
        imgDom.src = require('@/assets/images/back-top.png')
        backTopDom.appendChild(imgDom)
        document.body.appendChild(backTopDom)
        this.backTopDom = backTopDom
        backTopDom.addEventListener('click', () => {
          easeout(this.mescroll.getScrollTop(), 0, 10, val => {
            scrollDom.scrollTop = val
          })
        })
      }
    }
  }
</script>
