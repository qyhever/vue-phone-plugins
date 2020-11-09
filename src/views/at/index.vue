<template>
  <ComPage>
    <input ref="txt" type="text" v-model="value" placeholder="请输入" @input="onInput">
    <SelectStaff :visible.sync="visible"></SelectStaff>
  </ComPage>
</template>

<script>
import SelectStaff from './select-staff'
export default {
  components: {
    SelectStaff
  },
  data() {
    return {
      value: '',
      startIndex: 0,
      endIndex: 0,
      visible: false
    }
  },
  methods: {
    onInput() {
      console.log(this.value)
      this.visible = true
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
</style>
