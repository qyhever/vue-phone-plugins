<template>
  <div class="home">
    <van-cell
      v-for="(item, index) in navs"
      :key="index"
      :title="item.label"
      :to="item.value"
      is-link
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        navs: [
          // { label: 'mescroll', value: '/mescroll' },
          { label: 'mescroll-page', value: '/mescroll-page' },
          { label: 'cube-scroll', value: '/cube-scroll' },
          { label: 'autofocus', value: '/autofocus' },
          { label: 'bottom-input', value: '/bottom-input' },
          { label: 'uploader', value: '/uploader' },
          { label: 'inputmode', value: '/inputmode' },
          { label: 'ait', value: '/ait' },
          { label: 'multiple-select', value: '/multiple-select' },
          { label: 'area-picker', value: '/area-picker' },
          { label: 'swiper', value: '/swiper' }
        ]
      }
    }
  }
</script>
