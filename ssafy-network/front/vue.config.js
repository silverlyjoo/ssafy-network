module.exports = {
    chainWebpack: config => {
        config.module
          .rule('svg')
          .use('file-loader')
          .loader('svg-sprite-loader')
      }
}