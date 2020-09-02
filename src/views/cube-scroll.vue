<template>
  <div class="scroll-wrapper">
    <cube-scroll
      class="cube-scroll"
      ref="scrollContainer"
      :data="list"
      :options="options"
      :scrollEvents="['scroll']"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp"
      @scroll="onScroll"
    >
      <div class="item" v-for="(item, index) in list" :key="index" @click="onItemClick">
        <b>{{index+1}}</b>
        <img class="avatar" v-lazy="item.imgurl" alt="avatar">
        <p>{{item.dissname}}</p>
      </div>
    </cube-scroll>
    <transition name="van-fade">
      <div v-show="backtopVisible" class="backtop" @click="onBacktop">
        <img src="@/assets/images/back-top.png" alt="backtop">
      </div>
    </transition>
  </div>
</template>

<script>
import request from '@/utils/request'
import { cubeScroll } from '@/mixins'
export default {
  name: 'CubeScrollPage',
  mixins: [cubeScroll],
  data() {
    return {}
  },
  beforeRouteEnter(to, from, next) {
    if (from.path === '/home') {
      next(vm => {
        // 非详情页进入，返回顶部
        if (vm.$refs.scrollContainer) {
          vm.$refs.scrollContainer.scrollTo(0, 0, 0)
        }
      })
    } else {
      next()
    }
  },
  methods: {
    query() {
      request({
        url: 'https://qyhever.com/common/disc',
        params: this.pager
      }).then(data => {
        const list = data.list || []
        const total = data.total || 0
        if (this.pager.page === 1) {
          this.list = list
        } else {
          this.list = this.list.concat(list)
        }
        if (this.list.length === total) {
          this.allLoaded = true
          this.$refs.scrollContainer.forceUpdate(true, true)
        }
      })
    },
    onItemClick() {
      this.$router.push({
        path: '/cube-scroll-detail'
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .scroll-wrapper {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    bottom: 0;
    transform: rotate(0deg); // fix 子元素超出边框圆角部分不隐藏的问题
    overflow: hidden;
    background-color: #fff;
  }
  .item {
    display: flex;
    align-items: center;
    padding: 0 20px 20px;
    background-color: #fff;
  }
  .item:first-of-type {
    padding-top: 20px;
  }
  .avatar {
    width: 60px;
    height: 60px;
  }
  .item b {
    margin-right: 12px;
  }
  .item p {
    margin-left: 12px;
  }
</style>
