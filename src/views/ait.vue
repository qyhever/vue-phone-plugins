<template>
  <div>
    <input ref="txt" type="text" v-model="value" placeholder="请输入" @input="onInput">
  </div>
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
    /* eslint-disable */
    // onInput() {
    //   const newVal = this.sendInfo.msg
    //   // 删除到 @ 后面，直接选中 用户名，方便删除
    //   // 光标当前位置
    //   const currentPosition = this.$refs.box.selectionStart
    //   const endIndex = newVal.indexOf(' ', currentPosition) + 1
    //   const startIndex = newVal.lastIndexOf(' @', currentPosition)
    //   // 光标在名字中间
    //   if (endIndex > 0 && startIndex > 0) {
    //     this.sendInfo.msg = this.sendInfo.msg.slice(0, startIndex) + this.sendInfo.msg.slice(endIndex)
    //     this.$nextTick(() => {
    //       this.$refs.box.setSelectionRange(startIndex, startIndex)
    //     })
    //   } else if (/\s@(\w)+/.test(newVal)) { // 光标在名字后面
    //     const startPosition = newVal.lastIndexOf(' @', currentPosition)
    //     this.$refs.box.setSelectionRange(startPosition, currentPosition)
    //   } else if (/\s@(\w)+$/.test(newVal)) { // 光标在名字后面，名字在整个评论内容的最后
    //     const endPosition = newVal.length
    //     const startPosition = newVal.lastIndexOf(' @')
    //     this.$refs.box.setSelectionRange(startPosition, endPosition)
    //   }
    // }
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
