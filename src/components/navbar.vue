<template>
  <van-nav-bar
    class="navbar"
    :title="title"
    :left-arrow="leftArrowVisible"
    fixed
    @click-left="$router.back()"
    @touchmove.native.stop.prevent
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
  export default {
    data() {
      return {
        hideLeftArrowList: ['/home', '/record', '/search', '/my']
      }
    },
    computed: {
      title() {
        const { meta } = this.$route
        if (meta && meta.title) {
          return meta.title
        }
        return 'title'
      },
      leftArrowVisible() {
        const { path } = this.$route
        return !this.hideLeftArrowList.includes(path)
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
