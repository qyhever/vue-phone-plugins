<template>
  <ComPage>
    <div class="item" v-for="(item, index) in list" :key="index">
      <b>{{index+1}}</b>
      <img class="avatar" v-lazy="item.imgurl" alt="avatar">
      <p>{{item.dissname}}</p>
    </div>
    <!-- <empty v-show="!tableData.length && !querying" text="暂无数据"></empty> -->
    <div v-show="list.length && isReachBottom" class="scroll-tip">拼命加载中...</div>
    <div v-show="list.length && isTotalLoaded && currentScrollTop" class="scroll-tip">已经到底了</div>
    <ComBacktop></ComBacktop>
  </ComPage>
</template>

<script>
import { scroll } from '@/mixins'
import request from '@/utils/request'
export default {
  mixins: [scroll],

  data() {
    return {
      list: []
    }
  },

  methods: {
    query({ currentPage, pageSize }) {
      request({
        url: 'https://qyhever.com/common/disc',
        params: {
          page: currentPage,
          size: pageSize
        },
        showLoading: currentPage === 1
      }).then(res => {
        const list = res.list
        const total = res.total
        if (currentPage === 1) {
          this.list = list
        } else {
          this.list = this.list.concat(list)
        }
        this.endBySize(total)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  display: flex;
  align-items: center;
  padding: 25px 20px 0;
  background-color: #fff;
}
.avatar {
  width: 40px;
  height: 40px;
}
.item b {
  margin-right: 12px;
}
.item p {
  margin-left: 12px;
}
.scroll-tip {
  padding: 15px;
  text-align: center;
  color: #999;
}
</style>
