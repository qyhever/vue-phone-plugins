<template>
  <div class="wrapper">
    <!-- <cube-button @click="handleSearch">设置searchKey重新查询</cube-button> -->
    <div class="scroll-wrapper">
      <ComMescrollMore
        ref="scrollMore"
        :fetch-data="fetchData"
        :params="params">
        <template slot-scope="{list}">
          <div class="item" v-for="(item, index) in list" :key="index">
            <b>{{index+1}}</b>
            <img class="avatar" :data-src="item.thumbnail" src="http://www.mescroll.com/demo/res/img/loading2.gif" alt="avatar">
            <p>{{item.title}}</p>
          </div>
        </template>
      </ComMescrollMore>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      params: {
        searchKey: ''
      }
    }
  },
  methods: {
    fetchData(paper) {
      const { page, count } = paper
      return axios({
        // url: `https://gank.io/api/v2/data/category/Girl/type/Girl/page/${page}/count/${count}`
        url: 'https://rabtman.com/api/v2/acgclub/category/moeimg/pictures',
        params: {
          offset: page,
          limit: count
        }
      }).then(res => {
        return res.data.data
      })
    },
    handleSearch() {
      this.params.searchKey = 'liuli'
      this.$refs.scrollMore.research()
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
