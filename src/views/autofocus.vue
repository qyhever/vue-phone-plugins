<template>
  <div class="page">
    <input type="text" class="txt" placeholder="请输入关键字" ref="txt">
    <cube-button ref="btn" @click="handleFocus" v-trigger>获取焦点</cube-button>
  </div>
</template>

<script>
export default {
  name: 'autofocus',
  methods: {
    handleFocus() {
      this.$nextTick(() => {
        this.$refs.txt.focus()
      })
    }
  },
  directives: {
    trigger: {
      inserted(el) {
        el.click()
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .page {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
  }
  .txt {
    display: block;
    width: 80%;
    margin: 12px auto;
    padding-left: 1em;
    padding-top: 6px;
    padding-bottom: 6px;
    line-height: 18px;
    border-radius: 15px;
    background-color: #F5F5F6;
    // .input-placeholder(@color-text-placeholder);
  }
</style>
