const path = require('path')
const { promisify } = require('util')
const { readFile, writeFile } = require('fs').promises
const glob = promisify(require('glob'))
const mkdirp = require('mkdirp')
const { minify: minifyHtml } = require('html-minifier')
const { DIST_PATH, SRC_PATH } = require('./config.js')
const { log } = require('./common.js')

const GLOB_HTML_PATTERN = `${SRC_PATH}/**/*.html`

const htmlMinifierOptions = {
  collapseWhitespace: true,
  removeComments: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeTagWhitespace: true
}

function getHtmlHandler (options, minifierOptions = htmlMinifierOptions) {
  return async (filePath) => {
    log('HTML', filePath)
    let content = await readFile(filePath)

    if (options.minify) {
      content = minifyHtml(String(content), minifierOptions)
    }

    const outputPath = filePath.replace(SRC_PATH, DIST_PATH)
    await mkdirp(path.dirname(outputPath))
    await writeFile(outputPath, content)
  }
}

async function buildHtml (options) {
  log('HTML', 'START')
  const files = await glob(GLOB_HTML_PATTERN)
  const handleFile = getHtmlHandler(options)
  await Promise.all(files.map(handleFile))
  log('HTML', 'DONE')
}

module.exports = {
  getHtmlHandler,
  buildHtml,
  GLOB_HTML_PATTERN
}
