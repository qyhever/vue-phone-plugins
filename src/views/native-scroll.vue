<template>
  <ComPage>
    <div v-for="(item, index) in 50" :key="index">{{item}}</div>
  </ComPage>
</template>

<script>
export default {
  mounted() {
    const viewH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    const contentH = document.documentElement.scrollHeight || document.body.scrollHeight
    window.addEventListener('scroll', () => {
      const scrollT = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      console.log('viewH----可视区高度(窗口高度)------', viewH)
      console.log('contentH----内容/真实高度(文档内容高度)------', contentH)
      console.log('scrollT----卷曲高度------', scrollT)
      if (contentH - viewH - scrollT <= 0) {
        console.log('底部')
      }
    })
  }
}
</script>

<style>

</style>
