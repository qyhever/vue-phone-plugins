<template>
  <ComPage>
    <input ref="txt" type="text" v-model="value" placeholder="请输入" @input="onInput">
    <SelectStaff
      :visible.sync="visible"
      @confirm="onSelectConfirm"
    >
    </SelectStaff>
    <footer class="footer">
      <van-button type="primary" block @click="onSubmit">确定</van-button>
    </footer>
  </ComPage>
</template>

<script>
import SelectStaff from './select-staff'
// 输入框获取光标
function getPosition(element) {
  let cursorPos = 0
  if (document.selection) {
    const selectRange = document.selection.createRange()
    selectRange.moveStart('character', -element.value.length)
    cursorPos = selectRange.text.length
  } else {
    cursorPos = element.selectionStart
  }
  return cursorPos
}
export default {
  components: {
    SelectStaff
  },
  data() {
    return {
      value: '',
      oldVal: '',
      visible: false
    }
  },
  watch: {
    value(val, oldVal) {
      this.oldVal = oldVal
    }
  },
  methods: {
    onInput() {
      const val = this.value
      const oldVal = this.oldVal
      // console.log('val', val)
      // 出现 空格 + @ 时，打开选择框
      if (/^(.+\s)?@$/.test(val)) {
        this.visible = true
      }
      const atLastIndex = val.lastIndexOf('@')
      const currentCursorIndex = getPosition(this.$refs.txt)
      if (val.length < oldVal.length || oldVal.length === 0) { // 当前长度小于上次长度，判断为删除
        // 光标在最后
        if (/^(.+\s)?@.+\s$/.test(oldVal) && currentCursorIndex === val.length) {
          this.value = this.value.slice(0, atLastIndex)
        }
        // 光标不在最后
        if (currentCursorIndex !== val.length) {
          // '@abc'
          if (/^@\w+\s/.test(val)) {
            console.log('@在前面')
          }
          // 'conent @abc conent @def'
          if (/\s@\w+\s/.test(val)) {
            const intervals = {}
            // 搜集 @ 到 空格 的下标
            for (let i = 0; i < val.length; i++) {
              if (val[i] === '@' && val[i - 1] === ' ') {
                if (!(i in intervals)) {
                  intervals[i] = {}
                }
                intervals[i].start = i
                const end = val.indexOf(' ', i)
                intervals[i].end = end === -1 ? val.length : end
              }
            }
            // 判断 光标位置 是否在 intervals 内
            const inCenter = Object.values(intervals).some(item => {
              return item.start < currentCursorIndex && currentCursorIndex < item.end
            })
            if (inCenter) {
              const start = val.lastIndexOf('@', currentCursorIndex)
              const end = val.indexOf(' ', currentCursorIndex)
              this.value = val.slice(0, start) + val.slice(end + 1)
              this.$nextTick(() => {
                this.$refs.txt.setSelectionRange(currentCursorIndex - 1, currentCursorIndex - 1)
              })
            }
          }
        }
      }
    },
    onSelectConfirm(rows) {
      const atListString = rows.map(item => ('@' + item.dissname)).join(' ')
      const before = this.value.slice(0, -2)
      if (before) {
        this.value = before + ' ' + atListString + ' '
      } else {
        this.value = atListString + ' '
      }
    },
    onSubmit() {
      const atList = this.value.match(/@((\w|[\u4e00-\u9fa5])+(?=\s))/g)
      console.log(atList)
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
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>
