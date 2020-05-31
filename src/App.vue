<template>
  <div id="app">
    <navbar v-if="navbarVisible"/>
    <div class="page-wrapper" :class="{top: navbarVisible, bottom: tabbarVisible}">
      <router-view/>
    </div>
    <tabbar v-if="tabbarVisible"/>
  </div>
</template>

<script>
import Navbar from '@/components/navbar'
import Tabbar from '@/components/tabbar'
export default {
  name: 'app',
  components: {
    Navbar,
    Tabbar
  },
  data() {
    return {
      hideNavbarList: [],
      showTabbarList: ['/home', '/record', '/search', '/my']
    }
  },
  computed: {
    navbarVisible() {
      const { path } = this.$route
      return !this.hideNavbarList.includes(path)
    },
    tabbarVisible() {
      const { path } = this.$route
      return this.showTabbarList.includes(path)
    }
  }
}
</script>
