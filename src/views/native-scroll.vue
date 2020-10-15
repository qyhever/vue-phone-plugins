<template>
  <ComPage>
    <div v-for="(item, index) in 100" :key="index">{{item}}</div>
  </ComPage>
</template>

<script>
export default {
  data() {
    return {
      isReachBottom: false
    }
  },
  mounted() {
    const viewH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    const totalH = document.documentElement.scrollHeight || document.body.scrollHeight
    const reachBottomDistance = 100
    window.addEventListener('scroll', () => {
      const scrollT = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      const currentH = viewH + scrollT + reachBottomDistance
      // 在 distance 区域以外区域滚动，重置 isReachBottom
      if (currentH < totalH && this.isReachBottom) {
        this.isReachBottom = false
      }
      if (this.isReachBottom) {
        return
      }
      if (currentH >= totalH) {
        this.isReachBottom = true
        console.log('底部')
      }
    })
  }
}
</script>

<style>

</style>
