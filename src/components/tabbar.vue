<template>
  <ul class="tabbar van-hairline--top">
    <li
      class="tabbar-item"
      v-for="(item, index) in tabs"
      :key="index"
    >
      <router-link class="tabbar-item__link" :to="{name: item.value}">
        <com-svg-icon class="tabbar-item__icon" :name="item.value"/>
        <span class="tabbar-item__title">{{item.title}}</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
  export default {
    data() {
      return {
        tabs: [
          { value: 'home', title: '首页' },
          { value: 'record', title: '订单' },
          { value: 'search', title: '搜索' },
          { value: 'my', title: '我的' }
        ]
      }
    },
    computed: {
      title() {
        const { meta } = this.$route
        if (meta && meta.title) {
          return meta.title
        }
        return 'title'
      },
      leftArrowVisible() {
        const { meta } = this.$route
        if (meta && meta.leftArrowHidden) {
          return false
        }
        return true
      }
    }
  }
</script>

<style lang="less" scoped>
  .tabbar {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    background-color: #fff;
    display: flex;
    &:after {
      border-color: #ccc;
    }
  }
  .tabbar-item {
    flex: 1;
  }
  .tabbar-item__link {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &.router-link-active {
      .tabbar-item__icon, .tabbar-item__title {
        color: #2878ff;
      }
      .tabbar-item__icon {
        // animation: zoom 0.4s;
      }
    }
  }
  .tabbar-item__icon {
    font-size: 20px;
  }
  .tabbar-item__title {
    padding-top: 4px;
    font-size: 12px;
  }
  @keyframes zoom {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
