<template>
  <ComPage>
    <div class="mescroll-downwarp mescroll-downwarp-reset" :style="{height: downHight + 'px'}">
      <div class="downwarp-content">
        <p class="downwarp-progress" style="transform: rotate(570.6deg);"></p>
        <p class="downwarp-tip">加载中 ...</p>
      </div>
    </div>
    <virtual-list class="list-infinite scroll-touch"
      data-key="_id"
      :data-sources="list"
      :data-component="itemComponent"
      :estimate-size="70"
      :item-class="'list-item-infinite'"
      :footer-class="'loader-wrapper'"
      @totop="onScrollToTop"
      @tobottom="onScrollToBottom"
      @scroll="onScroll"
      page-mode
    >
      <div slot="footer" class="loader" v-show="!isTotalLoaded"></div>
      <div slot="footer" v-show="list.length && isTotalLoaded" class="scroll-tip">已经到底了</div>
    </virtual-list>
  </ComPage>
</template>

<script>
import VirtualList from 'vue-virtual-scroll-list'
import Item from './item'
import request from '@/utils/request'
import { getScrollTop } from '@/utils/dom'
// 根据点击滑动事件获取第一个手指的坐标
function getPoint(e) {
  return {
    x: e.touches ? e.touches[0].pageX : e.clientX,
    y: e.touches ? e.touches[0].pageY : e.clientY
  }
}
const minAngle = 45
const optDown = {
  offset: 80,
  inOffsetRate: 1,
  outOffsetRate: 0.2
}
export default {
  name: 'VirtualScroll',
  components: {
    VirtualList
  },
  data() {
    return {
      itemComponent: Item,
      list: [],
      loading: false,
      isTotalLoaded: false,
      pager: {
        page: 1,
        size: 10
      },
      downHight: 0
    }
  },
  created() {
    this.query()
  },
  mounted() {
    document.body.addEventListener('touchmove', this.onTouchMove)
    document.body.addEventListener('touchstart', this.onTouchStart)
    document.body.addEventListener('touchend', this.onTouchEnd)
    this.$once('hook:beforeDestroy', () => {
    document.body.removeEventListener('touchmove', this.onTouchMove)
    document.body.removeEventListener('touchstart', this.onTouchStart)
    document.body.removeEventListener('touchend', this.onTouchEnd)
    })
  },
  methods: {
    onTouchStart(e) {
      this.startPoint = getPoint(e) // 记录起点
      this.lastPoint = this.startPoint // 重置上次move的点
      console.log('startPoint', this.startPoint)
      console.log('lastPoint', this.lastPoint)
    },
    onTouchEnd() {
      if (this.isMoveDown) {
        if (this.downHight >= optDown.offset) {
          // 符合触发刷新的条件
          // me.triggerDownScroll()
          this.downHight = 0
          this.isTotalLoaded = false
          this.pager.page = 1
          this.query()
        } else {
          // 不符合的话 则重置
          // me.downwarp.classList.add(me.optDown.resetClass) // 加入高度重置的动画,过渡平滑
          this.downHight = 0
          // me.downwarp.style.height = 0;
        }
        this.movetype = 0
        this.isMoveDown = false
      }
    },
    onTouchMove(e) {
      const scrollTop = getScrollTop() // 当前滚动条的距离
      const curPoint = getPoint(e) // 当前点
      const moveY = curPoint.y - this.startPoint.y // 和起点比,移动的距离,大于0向下拉,小于0向上拉
      if (moveY > 0) {
        console.log('向下拉')
        // 在顶部
        if (scrollTop <= 0) {
          // 下拉的角度是否在配置的范围内
          const x = Math.abs(this.lastPoint.x - curPoint.x)
          const y = Math.abs(this.lastPoint.y - curPoint.y)
          const z = Math.sqrt(x * x + y * y)
          if (z !== 0) {
            const angle = Math.asin(y / z) / Math.PI * 180 // 两点之间的角度,区间 [0,90]
            if (angle < minAngle) { // 如果小于配置的角度,则不往下执行下拉刷新
              return
            }
          }
          const diff = curPoint.y - this.lastPoint.y // 和上次比,移动的距离 (大于0向下,小于0向上)
          // 下拉距离  < 指定距离
          if (this.downHight < optDown.offset) {
            if (this.movetype !== 1) {
              this.movetype = 1 // 加入标记,保证只执行一次
              // me.optDown.inOffset(me) // 进入指定距离范围内那一刻的回调,只执行一次
              // me.downwarp.classList.remove(me.optDown.resetClass) // 移除高度重置的动画
              this.isMoveDown = true // 标记下拉区域高度改变,在touchend重置回来
              // if (me.os.ios && !me.isKeepTop) { // 下拉过程中,滚动条一直在顶部的,则不必取消回弹,否则会闪白屏
              //   me.scrollDom.classList.add(me.optDown.hardwareClass); // 开启硬件加速,解决iOS下拉因隐藏进度条而闪屏的问题
              //   me.scrollDom.style.webkitOverflowScrolling = 'auto'; // 取消列表回弹效果,避免与下面me.downwarp.style.height混合,而导致界面抖动闪屏
              //   me.isSetScrollAuto = true; // 标记设置了webkitOverflowScrolling为auto
              // }
            }
            this.downHight += diff * optDown.inOffsetRate // 越往下,高度变化越小

            // 指定距离  <= 下拉距离
          } else {
            if (this.movetype !== 2) {
              this.movetype = 2 // 加入标记,保证只执行一次
              // me.optDown.outOffset(me) // 下拉超过指定距离那一刻的回调,只执行一次
              // me.downwarp.classList.remove(me.optDown.resetClass) // 移除高度重置的动画
              this.isMoveDown = true // 标记下拉区域高度改变,在touchend重置回来
            }
            if (diff > 0) { // 向下拉
              this.downHight += diff * optDown.outOffsetRate // 越往下,高度变化越小
            } else { // 向上收
              this.downHight += diff // 向上收回高度,则向上滑多少收多少高度
            }
          }

          // me.downwarp.style.height = me.downHight + 'px' // 实时更新下拉区域高度
          // var rate = me.downHight / me.optDown.offset; // 下拉区域当前高度与指定距离的比值
          // me.optDown.onMoving(me, rate, me.downHight); // 下拉过程中的回调,一直在执行
        }
      } else {
        console.log('向上拉')
      }

      this.lastPoint = curPoint // 记录本次移动的点
    },
    query() {
      this.loading = true
      request({
        url: 'https://qyhever.com/common/disc',
        params: this.pager,
        showLoading: false
      }).then(res => {
        this.loading = false
        const list = res.list
        this.isTotalLoaded = list.length < this.pager.size
        if (this.pager.page === 1) {
          this.list = list
        } else {
          this.list = this.list.concat(list)
        }
      })
    },
    onScroll() {
      // console.log('event', event)
    },
    onScrollToTop () {
      console.log('at top')
    },
    onScrollToBottom() {
      if (this.isTotalLoaded) {
        return
      }
      if (this.loading) {
        return
      }
      this.pager.page++
      this.query()
    }
  }
}
</script>

<style lang="less">
  .loader-wrapper {
    padding: 1em;
  }
  .loader {
    font-size: 10px;
    margin: 0px auto;
    text-indent: -9999em;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #ffffff;
    background: linear-gradient(to right, #9b4dca 10%, rgba(255, 255, 255, 0) 42%);
    position: relative;
    animation: load3 1.4s infinite linear;
    transform: translateZ(0);
  }
  .loader:before {
    width: 50%;
    height: 50%;
    background: #9b4dca;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
  }
  .loader:after {
    background: #ffffff;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  @keyframes load3 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .scroll-tip {
    text-align: center;
    color: #999;
  }
</style>
