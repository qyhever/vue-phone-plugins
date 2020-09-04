<template>
  <ComPage>
    <Pie :chartData="chartData"></Pie>
  </ComPage>
</template>

<script>
import Pie from './pie'
export default {
  name: 'Charts',
  components: {
    Pie
  },
  data() {
    return {
      chartData: []
    }
  },
  mounted() {
    setTimeout(() => {
      this.chartData = [
        {
          name: '家用电器',
          value: 4544
        },
        {
          name: '食品酒水',
          value: 3321
        },
        {
          name: '个护健康',
          value: 3113
        },
        {
          name: '服饰箱包',
          value: 2341
        },
        {
          name: '母婴产品',
          value: 1231
        },
        {
          name: '其它',
          value: 1099
        }
      ]
    }, 1000)
  }
}
</script>
