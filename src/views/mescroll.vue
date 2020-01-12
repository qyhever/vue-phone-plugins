<template>
  <div class="wrapper">
    <!-- <cube-button @touchstart.native="handleSearch">按钮</cube-button> -->
    <mescroll ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="item" v-for="(item, index) in list" :key="index">
        <b>{{index+1}}</b>
        <img class="avatar" :data-src="item.imgurl" src="http://www.mescroll.com/demo/res/img/loading2.gif" alt="avatar">
        <p>{{item.dissname}}</p>
      </div>
      <div id="empty"></div>
    </mescroll>
  </div>
</template>

<script>
  import axios from 'axios'
  import { easeout } from '@/utils'
  export default {
    data() {
      this.mescroll = null
      this.backTopDom = null
      return {
        list: [],
        params: {
          searchKey: ''
        },
        mescrollDown: {
          mustToTop: true
        },
        mescrollUp: {
          isBounce: false,
          callback: this.upCallback,
          htmlNodata: `<div class="weui-loadmore weui-loadmore_line">
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
        this.scrollDom = document.querySelector('.mescroll')
        const backTopDom = document.createElement('div')
        backTopDom.className = 'back-top'
        const imgDom = document.createElement('img')
        imgDom.src = require('@/assets/images/back-top.png')
        backTopDom.appendChild(imgDom)
        document.body.appendChild(backTopDom)
        this.backTopDom = backTopDom
        backTopDom.addEventListener('click', () => {
          easeout(this.mescroll.getScrollTop(), 0, 10, val => {
            this.scrollDom.scrollTop = val
          })
        })
      })
    },
    methods: {
      fetchData(data) {
        this.$loading.open()
        return axios({
          url: 'http://qyhever.com/disc',
          params: Object.assign({}, data, this.params)
        })
        .then(res => {
          return res.data.data
        })
        .finally(() => {
          this.$loading.close()
        })
      },
      mescrollInit(mescroll) {
        this.mescroll = mescroll
      },
      upCallback(pager, mescroll) {
        this.fetchData({
          page: pager.num,
          count: pager.size
        })
        .then(list => {
          if (!list.length) {
            // 锁定下拉刷新
            this.mescroll.lockDownScroll(true)
          }
          if (pager.num === 1) {
            this.list = list
          } else {
            this.list = this.list.concat(list)
          }
          this.$nextTick(() => {
            mescroll.endSuccess(list.length)
          })
        })
        .catch(() => {
          mescroll.endErr()
        })
      },
      handleSearch() {
        this.params.searchKey = '346092346'
        this.mescroll.resetUpScroll(true)
      },
      onScroll(_, y) {
        if (y >= 1000) {
          this.backTopDom.classList.add('show')
        } else {
          this.backTopDom.classList.remove('show')
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .wrapper {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
  .back-top {
    position: fixed;
    right: 20px;
    bottom: 20px;
    width: 40px;
    height: 40px;
    transition: opacity .3s;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .item {
    display: flex;
    align-items: center;
    padding: 0 20px 20px;
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
