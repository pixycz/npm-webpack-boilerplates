const webpack = require('webpack')
const webpackConfig = require('./../webpack.config.js')
const { log } = require('./common.js')
const { SRC_PATH } = require('./config.js')

const GLOB_JS_PATTERN = `${SRC_PATH}/**/*.js`

async function buildJs (options) {
  log('JS', 'START')
  return new Promise((resolve, reject) => {
    const config = {
      ...webpackConfig,
      mode: options.environment === 'development' ? 'development' : 'production'
    }
    const compiler = webpack(config)
    compiler.run((error, stats) => {
      if (error) {
        reject(error)
      } else {
        resolve(stats)
        log('JS', 'DONE')
      }
    })
  })
}

module.exports = {
  buildJs,
  GLOB_JS_PATTERN
}
