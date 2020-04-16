<template>
  <div class="wrapper">
    <van-uploader v-model="photos" :after-read="afterRead" />
  </div>
</template>

<script>
// import axios from '@/utils/request'
export default {
  data() {
    return {
      photos: []
    }
  },
  mounted() {
    // axios({
    //   url: 'http://localhost:4399/upload/photo'
    // }).then(res => {
    //   console.log(res)
    // })
  },
  methods: {
    afterRead({file, content}) {
      console.log({file, content})
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
  padding: 15px;
  background-color: #fff;
}
</style>
