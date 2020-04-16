const path = require('path')

module.exports = {
  dev: {
    assetsSubDirectory: 'public',
    assetsPublicPath: '/',
    proxyTable: {},
    host: 'localhost',
    port: 10010,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    useEslint: true,
    // https://www.webpackjs.com/configuration/devtool/
    devtool: 'cheap-module-eval-source-map',
    showEslintErrorsInOverlay: false,
    cssSourceMap: true,
    parallel: true,
    cdn: {
      css: [
        '//res.wx.qq.com/open/libs/weui/2.1.3/weui.css'
      ],
      js: [
        '//qiniu.qyhever.com/js/vue.js',
        '//qiniu.qyhever.com/js/vue-router.js',
        '//qiniu.qyhever.com/js/vuex.js',
        '//qiniu.qyhever.com/js/echarts.js',
        '//qiniu.qyhever.com/js/axios.js',
        '//qiniu.qyhever.com/js/fastclick.js',
        '//qiniu.qyhever.com/js/vconsole.min.js',
        '//qiniu.qyhever.com/js/vue-lazyload.min.js'
      ]
    }
  },
  build: {
    parallel: true,
    index: path.resolve(__dirname, '../public/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'public',
    // if your application is not on root dir, you should update it `/xxx/`
    assetsPublicPath: '/vue-phone-plugins/',
    productionSourceMap: true,
    devtool: 'source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // `npm run build --report`
    bundleAnalyzerReport: process.env.npm_config_report || false,
    // `npm run build --generate_report`
    generateAnalyzerReport: process.env.npm_config_generate_report || false,
    // `npm run build --preview`
    preview: process.env.npm_config_preview || false,
    cdn: {
      css: [
        '//res.wx.qq.com/open/libs/weui/2.1.3/weui.min.css'
      ],
      js: [
        '//qiniu.qyhever.com/js/vue.min.js',
        '//qiniu.qyhever.com/js/vue-router.min.js',
        '//qiniu.qyhever.com/js/vuex.min.js',
        '//qiniu.qyhever.com/js/echarts.min.js',
        '//qiniu.qyhever.com/js/axios.min.js',
        '//qiniu.qyhever.com/js/fastclick.min.js',
        '//qiniu.qyhever.com/js/vue-lazyload.min.js'
      ]
    }
  }
}
