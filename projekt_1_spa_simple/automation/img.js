const { readFile, writeFile } = require('fs').promises
const path = require('path')
const mkdirp = require('mkdirp')
const { promisify } = require('util')
const glob = promisify(require('glob'))
const imagemin = require('imagemin')
const imageminJpeg = require('imagemin-jpegtran')
const imageminGif = require('imagemin-gifsicle')
const imageminWebp = require('imagemin-webp')
const imageminPng = require('imagemin-pngquant')
const imageminSvg = require('imagemin-svgo')
const { log } = require('./common.js')
const { DIST_PATH, SRC_PATH } = require('./config.js')

const GLOB_IMG_PATTERN = `${SRC_PATH}/**/*.{jpg,png,webp,gif,svg}`

function getImgHandler (options) {
  return async (filePath) => {
    log('IMG', filePath)
    let content = await readFile(filePath)

    if (options.minify) {
      const result = await imagemin([filePath], {
          plugins: [
            imageminJpeg(),
            imageminGif(),
            imageminWebp(),
            imageminPng(),
            imageminSvg()
          ]
        }
      )
      content = result[0].data
    }

    const outputPath = filePath.replace(SRC_PATH, DIST_PATH)
    await mkdirp(path.dirname(outputPath))
    await writeFile(outputPath, content)
  }
}

async function buildImg (options) {
  log('IMG', 'START')
  const files = await glob(GLOB_IMG_PATTERN)
  const handleFile = getImgHandler(options)
  await Promise.all(files.map(handleFile))
  log('IMG', 'DONE')
}

module.exports = {
  getImgHandler,
  buildImg,
  GLOB_IMG_PATTERN
}
