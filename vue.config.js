 const path = require('path')

function resolve(dir) {
  return path.join(__dirname, './', dir)
}

module.exports = {

//配置代理，解决跨域问题
  devServer: {
　　　　host: 'localhost',
　　　　port: 8080,
　　　　proxy: {
　　　　　　'/index.php': {
　　　　　　　　target: 'http://192.168.50.198',// 要跨域的域名
　　　　　　　　changeOrigin: true, // 是否开启跨域
　　　　　　　　pathRewrite: {
　　　　　　　　'^/index.php': '/index.php' // 在请求的时候 凡是/api开头的地址都可以跨域
　　　　　　　　}
　　　　　　},
　　　　}
　　},


  chainWebpack: config => {
    // svg loader
    const svgRule = config.module.rule('svg') // 找到svg-loader
    svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
    svgRule // 添加svg新的loader处理
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    // 修改images loader 添加svg处理
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(resolve('src/icons'))
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
  }

  
}
