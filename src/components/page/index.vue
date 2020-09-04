<template>
  <div class="com-page">
    <van-nav-bar
      v-show="navbarVisible"
      class="navbar"
      @touchmove.native.stop.prevent
      fixed
      :left-arrow="leftArrow"
      @click-left="handleClickLeft"
      :title="navTitle"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template slot="left">
        <slot name="left"></slot>
      </template>
      <template slot="right">
        <slot name="right"></slot>
      </template>
    </van-nav-bar>
    <div class="page-wrapper" :class="{top: navbarVisible, bottom: tabbarVisible}">
      <slot></slot>
    </div>
    <Tabbar v-show="tabbarVisible"/>
  </div>
</template>

<script>
import Tabbar from '@/components/tabbar'
export default {
  name: 'ComPage',
  components: {
    Tabbar
  },
  props: {
    navbarVisible: {
      type: Boolean,
      default: true
    },
    tabbarVisible: {
      type: Boolean,
      default: false
    },
    leftArrow: {
      type: Boolean,
      default: true
    },
    onClickLeft: {
      type: Function
    },
    title: {
      type: String
    }
  },
  computed: {
    navTitle() {
      if (this.title) {
        return this.title
      }
      const { meta } = this.$route
      if (meta && meta.title) {
        return meta.title
      }
      return 'title'
    }
  },
  methods: {
    handleClickLeft() {
      if (this.onClickLeft) {
        this.onClickLeft()
      } else {
        this.$router.back()
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .navbar {
    z-index: 999 !important;
    &:after {
      border-color: #ccc;
    }
    /deep/ .van-nav-bar__title {
      font-weight: 700;
    }
  }
</style>
