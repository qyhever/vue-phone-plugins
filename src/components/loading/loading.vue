<template>
  <transition name="loading">
    <div id="loadingToast" v-show="visible">
      <div class="weui-mask_transparent" @touchmove.stop.prevent></div>
      <div class="weui-toast">
        <i class="weui-loading weui-icon_toast"></i>
        <p class="weui-toast__content" v-show="text">{{text}}</p>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        visible: false
      }
    },
    props: {
      text: {
        type: String,
        default: '加载中...'
      }
    }
  }
</script>

<style scoped>
  .loading-enter,
  .loading-leave-active {
    opacity: 0;
  }
  #loadingToast {
    transition: opacity .2s linear;
  }
</style>
