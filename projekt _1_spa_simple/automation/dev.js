const path = require('path')
const { watch } = require('chokidar')
const { cleanup, log, getCliArgs } = require('./common.js')
const { SRC_PATH } = require('./config.js')
const { buildAll } = require('./all.js')
const { startServer } = require('./../server/index.js')
const { getHtmlHandler } = require('./html.js')
const { buildJs } = require('./js.js')
const { getCssHandler, SCSS_INDEX_PATH } = require('./css.js')
const { getImgHandler } = require('./img.js')

const noop = () => {}

function getHandlersByType (options) {
  const imgHandler = getImgHandler(options)
  const cssHandler = getCssHandler(options)
  return {
    html: getHtmlHandler(options),
    scss: () => cssHandler(SCSS_INDEX_PATH),
    js: () => buildJs(options),
    gif: imgHandler,
    jpg: imgHandler,
    png: imgHandler,
    svg: imgHandler
  }
}

function getFileHandler (options) {
  const handlersByType = getHandlersByType(options)
  return function (filePath) {
    log('WATCH', filePath)
    const extension = path.extname(filePath).replace(/^\./, '')
    const handler = handlersByType[extension] || noop
    handler(filePath)
  }
}

async function startWatcher (options) {
  log('WATCH', 'START')
  const fileHandler = getFileHandler(options)
  const watchPattern = `${SRC_PATH}/**/*`
  const watcher = watch(watchPattern, { persistent: true, ignoreInitial: true })
  watcher.on('add', fileHandler)
  watcher.on('change', fileHandler)
  return watcher
}

(async () => {
  log('DEV', 'START')
  const options = getCliArgs()
  if (!options['no-cleanup']) { await cleanup() }
  await buildAll(options)
  await startWatcher(options)
  await startServer(options)
})()
