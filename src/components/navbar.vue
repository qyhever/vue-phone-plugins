<template>
  <van-nav-bar
    class="navbar"
    :title="$route.meta.title"
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
    computed: {
      title() {
        const { meta } = this.$route
        if (meta && meta.title) {
          return meta.title
        }
        return 'title'
      },
      leftArrowVisible() {
        const { meta } = this.$route
        if (meta && meta.leftArrowHidden) {
          return false
        }
        return true
      }
    }
  }
</script>

<style lang="less" scoped>
  .navbar {
    &:after {
      border-color: #ccc;
    }
    /deep/ .van-nav-bar__title {
      font-weight: 700;
    }
  }
</style>
