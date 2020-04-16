<template>
  <div>
    <input type="decimal" v-model="value1" placeholder="小数">
    <input type="numeric" v-model="value2" placeholder="数字">
    <input type="email" v-model="value3" placeholder="邮箱">
    <input type="tel" v-model="value4" placeholder="电话">
    <input type="url" v-model="value5" placeholder="地址">
    <input type="search" v-model="value6" placeholder="搜索">
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: ''
    }
  }
}
</script>

<style lang="less" scoped>
  input {
    display: block;
    height: 28px;
    line-height: 28px;
    padding-left: .5em;
    margin: 10px 10px 0;
    border: 1px solid #eee;
    border-radius: 4px;
  }
</style>
