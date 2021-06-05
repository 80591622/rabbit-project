const path = require('path')
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 配置哪些文件需要自动导入
        path.join(__dirname, './src/styles/variables.less')
      ]
    }
  }
}
