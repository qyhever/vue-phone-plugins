module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        "modules": false,
        // useBuiltIns: 'usage', 根据 package.json 中的 browserslist 来按需引用 polyfill
        useBuiltIns: 'entry', // or 'entry'
        corejs: 3
      }
    ]
  ],
  plugins: [
    // must install `babel-plugin-transform-vue-jsx` and `babel-plugin-syntax-jsx`
    'babel-plugin-transform-vue-jsx',
    // [
    //   '@babel/plugin-transform-runtime',
    //   {
    //     corejs: false, // 默认值 false
    //     helpers: true, // 默认值 true
    //     regenerator: false, // 通过 preset-env 已经使用了全局的 regeneratorRuntime, 不再需要 transform-runtime 提供的 不污染全局的 regeneratorRuntime
    //     useESModules: true, // 使用 es modules helpers, 减少 commonJS 语法代码
    //   }
    // ],
    // mint-ui import
    ['babel-plugin-component', { libraryName: 'mint-ui', style: true }],
    // vant-ui
    ['babel-plugin-import', { libraryName: 'vant', libraryDiretory: 'es', style: true }, 'vant'],
    // can use `import()`
    '@babel/plugin-syntax-dynamic-import',
    ["transform-modules", {
      "cube-ui": {
        "transform": "cube-ui/lib/${member}",
        "kebabCase": true,
        "style": {
          "ignore": [
            "create-api",
            "better-scroll",
            "locale"
          ]
        }
      }
    }]
  ],
}
// 可以在配置中使用包名称的简写形式（删除preset-、plugin-或babel-plugin）