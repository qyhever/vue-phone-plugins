<template>
  <ComPage>
    <div class="scroll">
      <div class="img-list">
        <img
          class="img-item"
          v-for="(item, index) in imgs"
          :key="index"
          :src="item"
          alt="image">
      </div>
    </div>
    <div class='footer'>
      <input type='text' class='txt' placeholder='请输入...' @focus="handleFocus" @blur="handleBlur">
      <van-button class='submit' type='primary'>发送</van-button>
    </div>
  </ComPage>
</template>

<script>
const imgs = [
  'http://p.qpic.cn/music_cover/Hepa6V8aXWj4x9UyxSztnZ8RTPCBw6QibWBEug9jWuI32kklx185ibEQ/600?n=1',
  'http://p.qpic.cn/music_cover/etRVVF7aQu1fex4ZQECBHYXFDCvzH2FZjXx63K0hSuiak6mI3uzskIQ/600?n=1',
  'http://p.qpic.cn/music_cover/Biax4WTSMic4N0bgPWDwUCsxxToQaLdpKFYOGJiaan6RYrN8e9LGBqaQQ/600?n=1',
  'http://p.qpic.cn/music_cover/h1M1V6hujiaDI90lX1CKAzOicHwsOlrFdoOC0F8GawSCr9WwalnzoKtA/600?n=1',
  'http://p.qpic.cn/music_cover/xJLWlNicFPzWw3p1m4U86nQ1uMQfNaBJv80NPP4TfSvywjG4ZE8fE6A/600?n=1',
  'http://p.qpic.cn/music_cover/aaxX4Babic4VicBPicJOwr5xr4iaHPHvTFBB9ibYEzETt2YWVxBt2TFwSsA/600?n=1',
  'http://p.qpic.cn/music_cover/0yiaX8d9LSmnROyId1RsUUzzGu6xgUdAtvwspSe7cp6cASP4woHZQaw/600?n=1',
  'http://p.qpic.cn/music_cover/FBicu030Yo6HCiavRCRg0vJHgwlmQtJd9rmGXTlexuUzpPDH0LAQ4fgA/600?n=1',
  'http://p.qpic.cn/music_cover/Hepa6V8aXWj4x9UyxSztnZ8RTPCBw6QibWBEug9jWuI32kklx185ibEQ/600?n=1',
  'http://p.qpic.cn/music_cover/etRVVF7aQu1fex4ZQECBHYXFDCvzH2FZjXx63K0hSuiak6mI3uzskIQ/600?n=1'
]
export default {
  name: 'bottom-input',
  data() {
    return {
      imgs: [].concat(...Array(15).fill(imgs))
    }
  },
  methods: {
    handleFocus() {
      // document.body.scrollTop = document.body.scrollHeight
    },
    handleBlur() {
      setTimeout(() => {
        const scrollHeight =
          document.documentElement.scrollTop || document.body.scrollTop || 0
        window.scrollTo(0, Math.max(scrollHeight - 1, 0))
      }, 20)
    }
  }
}
</script>

<style lang="less" scoped>
img {
	-webkit-touch-callout: none;
}
.scroll {
  position: fixed;
  top: 46px;
  bottom: 44px;
  overflow: auto;
}
.img-list {
  padding-left: 12px;
}
.img-item {
  width: 50px;
  height: 50px;
  border-radius: 4px;
  margin-top: 12px;
  margin-right: 12px;
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
}
.txt {
  flex: 1;
  padding-left: 1em;
  padding-top: 6px;
  padding-bottom: 6px;
  line-height: 18px;
  border: 1px solid #ddd;
  border-left: 0;
  border-right: 0;
  border-radius: 0;
  background-color: #edeef1;
}
.submit {
  width: 80px;
}
</style>
