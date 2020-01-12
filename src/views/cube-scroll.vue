<template>
  <div class="scroll-list-wrap">
    <cube-scroll
      ref="scroll"
      :data="list"
      :options="options"
      :scrollEvents="['scroll']"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp"
      @scroll="onScroll">
      <div class="item" v-for="(item, index) in list" :key="index">
        <b>{{index+1}}</b>
        <img class="avatar" :src="item.imgurl" alt="avatar">
        <p>{{item.dissname}}</p>
      </div>
      <div class="weui-loadmore weui-loadmore_line" v-if="allLoaded">
        <span class="weui-loadmore__tips">我是有底线的</span>
      </div>
      <!--<template slot="pulldown" slot-scope="props">-->
        <!--<div-->
          <!--v-if="props.pullDownRefresh"-->
          <!--class="cube-pulldown-wrapper"-->
          <!--:style="props.pullDownStyle">-->
          <!--<div-->
            <!--v-show="props.beforePullDown"-->
            <!--class="before-trigger"-->
            <!--:style="{paddingTop: props.bubbleY + 'px'}">-->
            <!--<span :class="{rotate: props.bubbleY > pullDownRefreshThreshold - 40}">↓</span>-->
          <!--</div>-->
          <!--<div class="after-trigger" v-show="!props.beforePullDown">-->
            <!--<div v-show="props.isPullingDown" class="loading">-->
              <!--<cube-loading></cube-loading>-->
            <!--</div>-->
            <!--<div v-show="!props.isPullingDown" class="text"><span class="refresh-text">更新成功</span></div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</template>-->
    </cube-scroll>
  </div>
</template>

<script>
  import axios from 'axios'
  import { addClass, removeClass } from '@/utils'
  export default {
    name: 'cube-scroll-page',
    data() {
      return {
        list: [],
        params: {
          page: 1,
          count: 10
        },
        pullDownRefreshThreshold: 60,
        allLoaded: false,
        options: {
          pullDownRefresh: {
            threshold: 90,
            stopTime: 0,
            txt: ' '
          },
          pullUpLoad: true
        }
      }
    },
    mounted() {
      this.query(true)
      this.$nextTick(() => {
        this.createBackTop()
      })
    },
    methods: {
      fetchData() {
        this.$loading.open()
        return axios({
          url: 'http://qyhever.com/disc',
          params: Object.assign({}, this.params)
        })
          .then(res => {
            return res.data.data
          })
          .finally(() => {
            this.$loading.close()
          })
      },
      query(first) {
        this.fetchData().then(list => {
          if (this.params.page === 1) {
            this.list = list
            if (!first) {
              this.$refs.scroll.disable()
              setTimeout(() => {
                this.$refs.scroll.enable()
              }, 600)
            }
            // this.$nextTick(() => {
            //   this.$refs.scroll.refresh()
            // })
          } else {
            this.list = this.list.concat(list)
          }
          if (list.length < this.params.count) {
            this.allLoaded = true
            this.options.pullUpLoad = false
          }
        })
      },
      onPullingDown() {
        this.params.page = 1
        this.allLoaded = false
        this.options.pullUpLoad = true
        this.query()
      },
      onPullingUp() {
        this.params.page = this.params.page + 1
        this.query()
      },
      onScroll({y}) {
        if (Math.abs(y) >= 1000) {
          addClass(this.backTopDom, 'show')
        } else {
          removeClass(this.backTopDom, 'show')
        }
      },
      // 创建 返回顶部 按钮
      createBackTop() {
        const backTopDom = document.createElement('div')
        backTopDom.className = 'back-top'
        const imgDom = document.createElement('img')
        imgDom.src = require('@/assets/images/back-top.png')
        backTopDom.appendChild(imgDom)
        document.body.appendChild(backTopDom)
        this.backTopDom = backTopDom
        backTopDom.addEventListener('click', () => {
          this.$refs.scroll.scrollTo(0, 0, 500)
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .cube-pulldown-wrapper {
    .before-trigger  {
      font-size: 30px;
      line-height: 30px;
      align-self: flex-end;
      span {
        display: inline-block;
        transition: all 0.3s;
        color: #666;
        &.rotate {
          transform: rotate(180deg);
        }
      }
    }
    .after-trigger {
      .refresh-text {
        color: grey;
      }
    }
  }
  .scroll-list-wrap {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    bottom: 0;
    transform: rotate(0deg); // fix 子元素超出边框圆角部分不隐藏的问题
    overflow: hidden;
    background-color: #fff;
  }
  .weui-loadmore {
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
