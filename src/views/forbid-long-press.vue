<template>
  <ComPage>
    <img width="100%" src="@/assets/images/carousel/3.jpg">
    <div class="parent" @touchstart="onParentTouch">
      <div class="son" @click.prevent="onSonClick"></div>
    </div>
    <input type="text" @focus="focus" @blur="blur">
    <div v-show="touchVisible">触发了touch</div>
    <div v-show="clickVisible">触发了click</div>
  </ComPage>
</template>

<script>
export default {
  data() {
    return {
      touchVisible: false,
      clickVisible: false,
      scrollTop: 0
    }
  },
  methods: {
    // 点击穿透，一般不混用 touch 和 click 事件即可
    // 其他解决方法，阻止默认行为 或 动态设置 底层元素 pointerEvents 属性
    onParentTouch() {
      console.log('onParentTouch')
      this.touchVisible = true
    },
    onSonClick(e) {
      e.preventDefault()
      console.log('onSonClick')
      this.clickVisible = true
    },
    focus(e) {
      e.target.scrollIntoView({
        behavior: 'smooth'
      })
      this.scrollTop = document.scrollingElement.scrollTop
    },
    
    blur() {
      document.scrollingElement.scrollTo(0, this.scrollTop)
    }
  }
}
</script>

<style lang="less" scoped>
  img {
    -webkit-touch-callout: none;
    pointer-events: none;
  }
  .parent {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    background-color: skyblue;
    margin: 20px auto;
  }
  .son {
    width: 100px;
    height: 100px;
    background-color: pink;
  }
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
