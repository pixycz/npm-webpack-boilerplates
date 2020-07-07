const { ensureCertificates, keyPath, certPath } = require('./../automation/keys.js')
const { HTTP_PORT, HTTPS_PORT, DIST_PATH } = require('./../automation/config.js')
const { readFile } = require('fs').promises
const { log } = require('./../automation/common.js')

const express = require('express')
const https = require('https')
const http = require('http')

async function startServer (options = {}) {
  if (options.https) {
    const hasCertificates = await ensureCertificates()
    if (!hasCertificates) {
      return
    }
  }

  const app = express()
  app.use(express.static(DIST_PATH))

  const [key, cert] = await Promise.all([
    readFile(keyPath),
    readFile(certPath)
  ])

  const servers = {}

  const httpLink = `http://localhost:${HTTP_PORT}`
  servers.http = http.createServer(app).listen(HTTP_PORT)
  log('SERVER', 'HTTP', httpLink)

  if (options.https) {
    const httpsLink = `https://localhost:${HTTPS_PORT}`
    servers.https = https.createServer({ key, cert }, app).listen(HTTPS_PORT)
    log('SERVER', 'HTTPS', httpsLink)
  }

  return servers
}

module.exports = {
  startServer
}
