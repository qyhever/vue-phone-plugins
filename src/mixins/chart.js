const echarts = window.echarts

export default {
  data() {
    this.chart = null
    this.option = {}
    return {
      data: {} // 数据
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
    window.addEventListener('resize', this.resize)
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.resize)
    })
  },
  methods: {
    init() {
      if (this.$refs.chart) {
        this.chart = echarts.init(this.$refs.chart)
        this.setOption && this.setOption()
      }
    },
    render(option) {
      this.$nextTick(() => {
        if (this.chart) {
          this.chart.setOption(option)
          this.events()
        }
      })
    },
    events() {
      // ...
    },
    resize() {
      this.$nextTick(() => {
        if (this.chart) {
          this.chart.resize()
        }
      })
    },
    linearGradient(...rest) {
      return new echarts.graphic.LinearGradient(...rest)
    }
  }
}
