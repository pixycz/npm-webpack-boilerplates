const { writeFile } = require('fs').promises
const path = require('path')
const { promisify } = require('util')
const mkdirp = require('mkdirp')
const transpileSass = promisify(require('node-sass').render)
const autoprefixer = require('autoprefixer')
const postcss = require('postcss')
const { DIST_PATH, SRC_PATH } = require('./config.js')
const { log } = require('./common.js')
const glob = promisify(require('glob'))

const GLOB_SCSS_PATTERN = `${SRC_PATH}/**/*.scss`
const SCSS_INDEX_PATH = `${SRC_PATH}/sass/index.scss`

const noop = () => {}

function getCssHandler (options) {
  return async (filePath) => {
    log('CSS', filePath)
    const outputPath = filePath
      .replace(SRC_PATH, DIST_PATH)
      .replace(/\/sass\//, '/css/')
      .replace(/\.scss$/, '.css')
    await mkdirp(path.dirname(outputPath))

    const { css: transpiledCss, map: sassMap } = await transpileSass({
      file: filePath,
      outFile: outputPath,
      sourceMap: options.sourcemap,
      outputStyle: options.minify ? 'compressed' : 'expanded'
    })

    const result = await postcss([autoprefixer])
      .process(transpiledCss, {
        from: filePath,
        to: outputPath,
        map: options.sourceMap ? { inline: false, prev: sassMap.toString() } : null
      })
    const { css: prefixedCss, map: postcssMap } = result

    await Promise.all([
      writeFile(outputPath, prefixedCss),
      postcssMap ? writeFile(`${outputPath}.map`, postcssMap) : noop
    ])
  }
}

async function buildCss (options) {
  log('CSS', 'START')
  const files = await glob(SCSS_INDEX_PATH)
  const handleFile = getCssHandler(options)
  await Promise.all(files.map(handleFile))
  log('CSS', 'DONE')
}

module.exports = {
  getCssHandler,
  buildCss,
  GLOB_SCSS_PATTERN,
  SCSS_INDEX_PATH
}
