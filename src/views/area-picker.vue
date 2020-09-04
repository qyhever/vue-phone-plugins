<template>
  <ComPage>
    <cube-button @click="showAddressPicker">Address Picker</cube-button>
    <span>{{areaString}}</span>
  </ComPage>
</template>

<script>
import { provinceList, cityList, areaList } from '@/assets/data/area'
// import data from "@/utils/pca.json"
// console.log(data)
// const ret = []
// for (let k in data) {
//   const province = data[k]
//   let temp = {
//     value: k,
//     text: k
//   }
//   temp.children = Object.keys(province)
//   ret.push(province)
// }
const addressData = provinceList
addressData.forEach(province => {
  province.children = cityList[province.value]
  province.children.forEach(city => {
    city.children = areaList[city.value]
  })
})
console.log(JSON.stringify(addressData.slice(2), null, 2))

export default {
  data() {
    return {
      areaString: '广东省^深圳市^南山区'
    }
  },
  computed: {
    areaArray() {
      const [p, c, a] = this.areaString.split('^')
      const pIndex = addressData.findIndex(item => item.text === p)
      const cList = addressData[pIndex].children
      const cIndex = cList.findIndex(item => item.text === c)
      const aList = cList[cIndex].children
      const aIndex = aList.findIndex(item => item.text === a)
      return [pIndex, cIndex, aIndex]
    }
  },
  mounted() {
    this.initPicker()
  },
  methods: {
    initPicker() {
      this.addressPicker = this.$createCascadePicker({
        title: 'Area Picker',
        data: addressData,
        selectedIndex: this.areaArray,
        onSelect: (value, index, text) => {
          console.log(value, index, text)
          this.areaString = text.join('^')
        },
        onCancel: () => {
          console.log('onCancel')
        }
      })
    },
    showAddressPicker() {
      this.addressPicker.show()
    }
  }
}
</script>
