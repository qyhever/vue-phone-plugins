<template>
  <div class="wrapper">
    <div class="item" v-for="(item, index) in list" :key="index" @click="onItemClick">
      <b>{{index+1}}</b>
      <img class="avatar" :data-src="item.imgurl" src="http://www.mescroll.com/demo/res/img/loading2.gif" alt="avatar">
      <p>{{item.dissname}}</p>
    </div>
    <transition name="van-slide-right">
      <div class="detail" v-show="visible" @click="visible = false"></div>
    </transition>
  </div>
</template>

<script>
import MeScroll from 'mescroll.js'
import request from '@/utils/request'
export default {
  data() {
    return {
      lastScrollTop: 0, // 路由切换时滚动条的位置
      visible: false,
      list: [],
      params: {
        searchKey: ''
      }
    }
  },
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     if (vm.mescroll) {
  //       if (vm.lastScrollTop) {
  //         vm.mescroll.setScrollTop(vm.lastScrollTop)
  //       }
  //     }
  //   })
  // },
  // beforeRouteLeave(to, from, next) {
  //   if (this.mescroll) {
  //     this.lastScrollTop = this.mescroll.getScrollTop() // 记录当前滚动条的位置
  //   }
  //   next()
  // },
  watch: {
    visible(newVal) {
      // hack 滚动穿透
      if (newVal) {
        document.body.classList.add('van-overflow-hidden')
      } else {
        document.body.classList.remove('van-overflow-hidden')
      }
    }
  },
  mounted() {
    this.initMescroll()
  },
  beforeDestroy() {
    this.mescroll && this.mescroll.destroy()
  },
  methods: {
    initMescroll() {
      if (this.mescroll) {
        return
      }
      this.mescroll = new MeScroll('body', {
        up: {
          callback: this.upCallback,
          htmlNodata: '<p class="upwarp-nodata">-- 已经到底了 --</p>',
          lazyLoad: {
            use: true,
            attr: 'data-src'
          }
        },
        down: {
          mustToTop: true
        }
      })
    },
    upCallback(pager, mescroll) {
      this.fetchData(pager)
        .then(data => {
          const list = data.list || []
          const total = data.total || 0
          if (pager.num === 1) {
            this.list = list
          } else {
            this.list = this.list.concat(list)
          }
          this.$nextTick(() => {
            mescroll.endBySize(list.length, total)
          })
        })
        .catch(err => {
          console.log(err)
          mescroll.endErr()
        })
    },
    fetchData(paper) {
      const { num: page, size } = paper
      return request({
        url: 'https://qyhever.com/common/disc',
        params: {
          page,
          size
        }
      })
    },
    onItemClick() {
      this.visible = true
    },
    handleSearch() {
      this.params.searchKey = 'liuli'
      this.mescroll.research()
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  display: flex;
  align-items: center;
  padding: 25px 20px 0;
  background-color: #fff;
}
.avatar {
  width: 40px;
  height: 40px;
}
.item b {
  margin-right: 12px;
}
.item p {
  margin-left: 12px;
}
.detail {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .2);
  transform: translate3d(0, 0, 0);
}
</style>
