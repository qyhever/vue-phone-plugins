<template>
  <div class="scroll-wrapper">
    <com-cube-loadmore
      ref="scrollMore"
      :fetch-data="fetchData">
      <template slot-scope="{list}">
        <div class="item" v-for="(item, index) in list" :key="index">
          <b>{{index+1}}</b>
          <img class="avatar" v-lazy="item.thumbnail" alt="avatar">
          <p>{{item.title}}</p>
        </div>
      </template>
    </com-cube-loadmore>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'cube-scroll-page',
    data() {
      return {}
    },
    methods: {
      fetchData({page, count}) {
        return axios({
          // url: `https://gank.io/api/v2/data/category/Girl/type/Girl/page/${page}/count/${count}`,
          url: 'https://rabtman.com/api/v2/acgclub/category/moeimg/pictures',
          params: {
            offset: page,
            limit: count
          }
        }).then(res => {
          return res.data.data
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .scroll-wrapper {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    bottom: 0;
    transform: rotate(0deg); // fix 子元素超出边框圆角部分不隐藏的问题
    overflow: hidden;
    background-color: #fff;
  }
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
