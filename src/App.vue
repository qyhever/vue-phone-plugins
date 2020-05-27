<template>
  <div id="app">
    <navbar v-if="navbarVisible"/>
    <div class="page-wrapper" :class="{top: navbarVisible, bottom: tabbarVisible}">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/navbar'
export default {
  name: 'app',
  components: {
    Navbar
  },
  computed: {
    navbarVisible() {
      const { meta } = this.$route
      if (meta && meta.navbarHidden) {
        return false
      }
      return true
    },
    tabbarVisible() {
      const { meta } = this.$route
      return meta && meta.tabbarVisible
    }
  }
}
</script>
