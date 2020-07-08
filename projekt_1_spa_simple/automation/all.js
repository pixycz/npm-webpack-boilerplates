const { buildHtml } = require('./html.js')
const { buildCss } = require('./css.js')
const { buildImg } = require('./img.js')
const { buildJs } = require('./js.js')

async function buildAll (options = {}) {
  return await Promise.all([
    buildHtml(options),
    buildCss(options),
    buildImg(options),
    buildJs(options)
  ])
}

module.exports = {
  buildAll
}
