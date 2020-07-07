const path = require('path')

const ROOT_PATH = path.resolve(__dirname, '..')
const SRC_PATH = path.resolve(ROOT_PATH, 'src')
const DIST_PATH = path.resolve(ROOT_PATH, 'dist')
const SERVER_PATH = path.resolve(ROOT_PATH, 'server')

const HTTP_PORT = '80'
const HTTPS_PORT = '443'

const environments = [
  'production',
  'development'
]

module.exports = {
  ROOT_PATH,
  SRC_PATH,
  DIST_PATH,
  SERVER_PATH,
  HTTP_PORT,
  HTTPS_PORT,
  environments
}
