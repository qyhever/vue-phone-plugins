<template>
  <div class="home">
    <van-cell
      v-for="(item, index) in navs"
      :key="index"
      :title="item.label"
      :to="item.value"
      is-link />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        navs: [
          // { label: 'mescroll', value: '/mescroll' },
          { label: 'mescroll-page', value: '/mescroll-page' },
          { label: 'cube-scroll', value: '/cube-scroll' }
        ]
      }
    }
  }
</script>

<style lang="less" scoped>
  .home {
    // padding-top: 46px;
  }
</style>
