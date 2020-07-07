const { promisify } = require('util')
const rimraf = promisify(require('rimraf'))
const mkdirp = require('mkdirp')
const chalk = require('chalk')
const commandLineArgs = require('command-line-args')

const { DIST_PATH, environments } = require('./config.js')

const cliArgs = [
  { name: 'no-cleanup', alias: 'c', type: Boolean, defaultValue: false },
  { name: 'minify', alias: 'm', type: Boolean, defaultValue: false },
  { name: 'sourcemap', alias: 's', type: Boolean, defaultValue: false },
  { name: 'https', alias: 'h', type: Boolean, defaultValue: false },
  {
    name: 'environment',
    alias: 'e',
    type: (input) => environments.includes(input) ? input : environments[0],
    defaultValue: environments[0]
  }
]

async function cleanup () {
  log('CLEANUP', 'Cleanup dist directory', DIST_PATH)
  await rimraf(DIST_PATH)
  await mkdirp(DIST_PATH)
}

function log (group, ...args) {
  console.log(
    chalk.inverse(` ${ group } `),
    ...args
  )
}

function getCliArgs () {
  return commandLineArgs(cliArgs)
}


module.exports = {
  cleanup,
  log,
  getCliArgs
}
