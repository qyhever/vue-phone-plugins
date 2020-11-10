<template>
  <transition name="van-slide-up">
    <div class="staff-page" v-show="visible">
      <van-row class="header" type="flex" align="center">
        <van-button size="small" class="cancel-button" @click="onClose">取消</van-button>
        <van-search
          class="search"
          v-model="searchKey"
          placeholder="搜索"
          input-align="center"
        />
        <van-button
          class="confirm-button"
          type="primary"
          size="small"
          :disabled="!selectedKeys.length"
          @click="onSubmit"
        >
          <span v-if="selectedKeys.length">({{selectedKeys.length}})</span>
          确定
        </van-button>
      </van-row>
      <div class="avatar-wrapper">
        <div class="avatar-list">
          <img
            class="avatar"
            v-lazy="item.imgurl"
            alt="avatar"
            v-for="(item, index) in selectedList"
            :key="index"
            @click="onAvatarClick(item)"
          >
        </div>
      </div>
      <van-loading class="loading" v-show="querying" size="30" color="#ccc" />
      <div class="list-wrapper" v-show="!querying">
        <div class="list">
          <van-checkbox-group v-model="selectedKeys">
            <div
              class="item"
              v-for="(item, index) in list"
              :key="index"
            >
              <van-checkbox :name="item._id"></van-checkbox>
              <img class="avatar" v-lazy="item.imgurl" alt="avatar">
              <p>{{item.dissname}}</p>
            </div>
          </van-checkbox-group>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { debounce, uniqBy } from 'lodash'
import request from '@/utils/request'
export default {
  props: {
    visible: {
      type: Boolean
    }
  },
  data() {
    this._handleSearchKeyChange = debounce(this.handleSearchKeyChange, 200)
    return {
      searchKey: '',
      selectedList: [],
      selectedKeys: [],
      list: [],
      querying: false,
      cacheList: []
    }
  },
  watch: {
    visible(newVisible) {
      if (newVisible) {
        this.selectedKeys = []
        this.searchKey = ''
      }
    },
    searchKey: {
      handler(val, oldVal) {
        this._handleSearchKeyChange(val, oldVal)
      }
    },
    selectedKeys(keys) {
      this.selectedList = this.cacheList.filter(item => keys.includes(item._id))
    }
  },
  methods: {
    onClose() {
      this.$emit('update:visible', false)
    },
    handleSearchKeyChange(val) {
      console.log(val)
      this.query()
    },
    onAvatarClick({ _id }) {
      this.selectedKeys = this.selectedKeys.filter(v => v !== _id)
    },
    onSubmit() {
      this.onClose()
      this.$emit('confirm', this.selectedList)
    },
    query() {
      request({
        url: 'https://qyhever.com/common/disc',
        params: {
          page: 1,
          size: 20
        },
        showLoading: false,
        loadingCb: v => this.querying = v
      }).then(res => {
        const list = res.list || []
        const data = list.map(item => {
          return {
            ...item,
            dissname: item.dissname.slice(0, 2)
          }
        })
        this.cacheList = uniqBy( this.list.concat(data), '_id' )
        this.list = data
      })
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
    display: flex;
    flex-direction: column;
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
    min-width: 60px;
  }
  .avatar-wrapper {
    width: 100%;
    height: 40px;
    flex: 0 0 40px;
    overflow-x: auto;
  }
  .avatar-list {
    height: 40px;
    white-space: nowrap;
  }
  .loading {
    text-align: center;
  }
  .list-wrapper {
    flex: auto;
    overflow: hidden;
  }
  .list {
    height: 100%;
    overflow: auto;
  }
  .item {
    display: flex;
    align-items: center;
    padding: 25px 20px 0;
    background-color: #fff;
    &:last-of-type {
      padding-bottom: 25px;
    }
  }
  .avatar {
    width: 40px;
    height: 40px;
    margin-left: 12px;
    border-radius: 2px;
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
