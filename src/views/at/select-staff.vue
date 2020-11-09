<template>
  <transition name="van-slide-up">
    <div class="staff-page" v-show="visible">
      <van-row class="header" type="flex" align="center">
        <van-button size="small" class="cancel-button" @click="onClose">取消</van-button>
        <van-search
          class="search"
          v-model="value"
          placeholder="搜索"
          input-align="center"
        />
        <van-button
          class="confirm-button"
          type="primary"
          size="small"
          :disabled="!selectedList.length"
        >
          确定
        </van-button>
      </van-row>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean
    }
  },
  data() {
    return {
      value: '',
      startIndex: 0,
      endIndex: 0,
      selectedList: []
    }
  },
  methods: {
    onClose() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="less" scoped>
  .staff-page {
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255);
    transform: translate3d(0, 0, 0);
  }
  .header {
    padding-right: 10px;
  }
  .cancel-button {
    border: 0;
  }
  .search {
    padding-left: 0;
  }
  .confirm-button {
    max-width: 72px;
    min-width: 52px;
  }
</style>
