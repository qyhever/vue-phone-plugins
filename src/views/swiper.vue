<template>
  <ComPage>
    <div class="wrapper">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide
          v-for="(item, index) in 5"
          :key="index"
        >
          <img :src="require(`@/assets/images/carousel/${index + 1}.jpg`)" width="100%">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </ComPage>
</template>

<script>
  export default {
    data() {
      return {
        swiperOptions: {
          pagination: {
            el: '.swiper-pagination'
          }
        }
      }
    },
    mounted() {
      console.log('Current Swiper instance object', this.$refs.mySwiper.$swiper)
      this.$refs.mySwiper.$swiper.slideTo(3, 1000, false)
    }
  }
</script>

<style lang="less" scoped>
  .wrapper {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 0;
    padding-bottom: 32%;
    .swiper-container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
</style>
