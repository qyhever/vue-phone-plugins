<template>
  <div class="pie">
    <div ref="chart" style="height: 150px" class="chart"></div>
    <ul class="legend-list">
      <li
        class="legend-item"
        :class="{disabled: disabledLegendIndexs.includes(index)}"
        v-for="(item, index) in originalList"
        :key="index"
        @click="onLegendItemClick(index)"
      >
        <div class="round" :style="{backgroundColor: originalColors[index]}"></div>
        <div class="content">
          <span class="name">{{item.name}}</span>
          <span class="percent">{{item.percent}}%</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { chart } from '@/mixins'
export default {
  mixins: [chart],
  props: {
    chartData: {
      type: Array,
      default: () => []
    },
    color: {
      type: Array,
      default: () => ['#1890ff', '#13c2c2', '#2fc25b', '#facc14', '#f04864', '#8543e0']
    }
  },
  data() {
    return {
      disabledLegendIndexs: [],
      originalColors: [],
      colors: [],
      originalList: [],
      list: []
    }
  },
  watch: {
    chartData: {
      handler() {
        this.$nextTick(() => {
          this.initData()
          this.renderChart()
        })
      },
      immediate: true
    }
  },
  methods: {
    // 初始化两份数据，一份源数据，一份做交互用
    // list, colors 用来做显示，originalList, originalColors（根据 disabledLegendIndexs ） 用来计算出 list, colors
    initData() {
      this.originalList = this.chartData.slice()
      const values = this.originalList.map(v => v.value) // map value
      const total = values.reduce((x, y) => x + y, 0) // calc sum
      this.originalList = this.originalList.map(item => {
        const percent = item.value / (total || 1) * 100
        return {
          name: item.name,
          value: item.value,
          percent: Math.round(percent)
        }
      })
      this.list = this.chartData.slice()
      // 根据 数据 list 长度 和 prop color，补全不够的 colorItem
      const colorGroup = this.color
      const groupLen = this.color.length
      const len = Math.ceil((this.list.length / groupLen) || 1)
      const colors = [].concat(...Array(len).fill(colorGroup)) // 扁平化
      this.originalColors = colors.slice()
      this.colors = colors.slice()
    },
    onLegendItemClick(clickIndex) {
      if (this.disabledLegendIndexs.indexOf(clickIndex) >= 0) { // 选中集合中已有，放出当前点击数据
        this.disabledLegendIndexs = this.disabledLegendIndexs.filter(v => v !== clickIndex)
      } else { // 选中集合中没有，排除当前点击数据
        this.disabledLegendIndexs.push(clickIndex)
      }
      // 计算出新的数据后渲染
      this.list = this.originalList.filter((_, i) => this.disabledLegendIndexs.indexOf(i) < 0)
      this.colors = this.originalColors.filter((_, i) => this.disabledLegendIndexs.indexOf(i) < 0)
      this.renderChart()
    },
    renderChart() {
      const option = {
        color: this.colors,
        tooltip: {
          show: true,
          trigger: 'item',
          confine: true,
          textStyle: {
            fontSize: 10
          }
        },
        series: [
          {
            type: 'pie',
            radius: ['48%', '78%'],
            label: {
              show: false
            },
            hoverAnimation: false,
            data: this.list
          }
        ]
      }
      this.render(option)
    }
  }
}
</script>

<style lang="less" scoped>
  .pie {
    display: flex;
  }
  .chart {
    flex: 1;
  }
  .legend-list {
    flex: 0 0 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .legend-item {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    font-size: 12px;
    &:last-child {
      margin-bottom: 0;
    }
    &.disabled {
      .round {
        background-color: #999 !important;
      }
      .name, .percent {
        color: #999;
      }
    }
    .round {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
    .name {
      margin: 0 4px;
      color: #151d35;
    }
    .percent {
      color: #666;
    }
  }
</style>
