<template>
  <ComPage>
    <input ref="txt" type="text" v-model="value" placeholder="请输入" @input="onInput">
  </ComPage>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      startIndex: 0,
      endIndex: 0
    }
  },
  mounted() {
    setTimeout(() => {
      this.value = 'abc @v_lisa thisiscontent'
      this.startIndex = this.value.indexOf(' @')
      this.endIndex = this.value.indexOf(' ', this.startIndex + 1)
    }, 500)
  },
  methods: {
    onInput() {
      const reg = /\s@(_|\w)+$/
      if (reg.test(this.value)) {
        this.value = this.value.slice(0, this.startIndex) + this.value.slice(this.endIndex)
        this.restoreCursor()
      }
      const currentIndex = this.$refs.txt.selectionStart
      if (currentIndex > this.startIndex && currentIndex < this.endIndex) {
        this.value = this.value.replace(/\s@(_|\w)+\s/, '')
        this.restoreCursor()
      }
    },
    restoreCursor() {
      setTimeout(() => {
        this.$refs.txt.setSelectionRange(this.startIndex, this.startIndex)
        this.startIndex = 0
        this.endIndex = 0
      }, 20)
    }
  }
}
</script>

<style lang="less" scoped>
  input {
    display: block;
    width: 90%;
    height: 28px;
    line-height: 28px;
    padding-left: .5em;
    margin: 10px auto 0;
    border: 1px solid #eee;
    border-radius: 4px;
  }
  .txt {
    height: 28px;
    line-height: 28px;
    padding-left: .5em;
    margin: 10px auto 0;
    border: 1px solid #eee;
    border-radius: 4px;
  }
</style>
