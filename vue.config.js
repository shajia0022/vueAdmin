module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://localhost:80/', //服务端域名和端口
        changeOrigin: true, //如果设置成true，请求头中host会设置成target
        pathRewrite: {
          // 用'/'替换浏览器请求url中的'/api'
          // 例如浏览器请求为 http://localhost:8080/api/xxx,
          // 则对应的服务端接口为 http://localhost:80/xxx
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  }
}