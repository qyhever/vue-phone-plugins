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
        '//cdn.bootcss.com/axios/0.18.0/axios.js'
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
      js: [
        '//qiniu.qyhever.com/js/vue.min.js',
        '//qiniu.qyhever.com/js/vue-router.min.js',
        '//qiniu.qyhever.com/js/vuex.min.js',
        '//qiniu.qyhever.com/js/echarts.min.js',
        '//cdn.bootcss.com/axios/0.18.0/axios.min.js'
      ]
    }
  }
}
