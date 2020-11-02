<template>
  <div class="item">
    <b>{{index + 1}}</b>
    <img class="avatar" v-lazy="source.imgurl" alt="avatar">
    <p>{{source.dissname}}</p>
  </div>
</template>

<script>
export default {
  props: {
    index: { // index of current item
      type: Number
    },
    source: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .item {
    display: flex;
    align-items: center;
    padding: 0 20px 20px;
    background-color: #fff;
  }
  .item:first-of-type {
    padding-top: 20px;
  }
  .avatar {
    width: 60px;
    height: 60px;
  }
  .item b {
    margin-right: 12px;
  }
  .item p {
    margin-left: 12px;
  }
</style>
