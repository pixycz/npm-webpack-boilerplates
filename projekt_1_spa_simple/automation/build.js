const { cleanup, log, getCliArgs } = require('./common.js')
const { buildAll } = require('./all.js')

module.exports = {
  buildAll
}

(async () => {
  log('BUILD', 'START')
  const options = getCliArgs()
  if (!options['no-cleanup']) { await cleanup() }
  await buildAll(options)
  log('BUILD', 'DONE')
})()
