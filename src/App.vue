<template>
  <keep-alive :include="['CubeScrollPage']">
    <router-view/>
  </keep-alive>
</template>

<script>
export default {
  name: 'App'
}
</script>
