<template>
  <div class="wrapper">
    <!-- <cube-button @click="handleSearch">设置searchKey重新查询</cube-button> -->
    <div class="scroll-wrapper">
      <com-mescroll-more
        ref="scrollMore"
        :fetch-data="fetchData"
        :params="params">
        <template slot-scope="{list}">
          <div class="item" v-for="(item, index) in list" :key="index">
            <b>{{index+1}}</b>
            <img class="avatar" :data-src="item.imgurl" src="http://www.mescroll.com/demo/res/img/loading2.gif" alt="avatar">
            <p>{{item.dissname}}</p>
          </div>
        </template>
      </com-mescroll-more>
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
      return axios({
        url: 'https://qyhever.com/disc',
        params: Object.assign({}, paper, this.params)
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
