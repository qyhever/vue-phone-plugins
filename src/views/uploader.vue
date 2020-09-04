<template>
  <ComPage>
    <van-uploader v-model="photos" :after-read="afterRead" />
  </ComPage>
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
