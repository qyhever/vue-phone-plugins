<template>
  <ComPage>
    <canvas id="myChart" width="320" height="260"></canvas>
  </ComPage>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  mounted() {
    const data = [
      { name: 'Sports', value: 275 },
      { name: 'Strategy', value: 115 },
      { name: 'Action', value: 120 },
      { name: 'Shooter', value: 350 },
      { name: 'Other', value: 150 }
    ]
    const chart = new window.F2.Chart({
      id: 'myChart',
      pixelRatio: window.devicePixelRatio // 指定分辨率
    })
    chart.source(data)
    chart
      .interval()
      .position('name*value')
      .color('name')
    chart.render()
  }
}
</script>
